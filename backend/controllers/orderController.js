// controllers/orderController.js
import pool from '../config/db.js';
import { shopifyGraphQL } from '../utils/shopifyApi.js';
import { GET_ORDERS_QUERY } from '../utils/queries.js';
import { SHOPIFY_ACCESS_TOKEN, DEFAULT_SHOP } from '../config/shopify.js';

/**
 * List all orders from PostgreSQL
 */
export const listOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get single order by order ID
 */
export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = result.rows[0];

    // Fetch fulfilment items
    const itemsResult = await pool.query(
      'SELECT * FROM fulfilment_items WHERE shopify_order_id = $1',
      [order.shopify_order_id]
    );
    order.items = itemsResult.rows;

    // Fetch images
    const imagesResult = await pool.query(
      'SELECT * FROM images WHERE shopify_order_id = $1',
      [order.shopify_order_id]
    );
    order.images = imagesResult.rows;

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Fetch orders from Shopify API and insert into PostgreSQL
 */
export const fetchOrdersFromShopify = async (req, res) => {
  try {
    const data = await shopifyGraphQL(DEFAULT_SHOP, SHOPIFY_ACCESS_TOKEN, GET_ORDERS_QUERY);
    console.log(JSON.stringify(data, null, 2)); 
    if (!data.orders) {
      return res.status(500).json({ error: 'No orders returned from Shopify' });
    }

    const orders = data.orders.edges.map(edge => edge.node);

    for (let order of orders) {
      // Insert orders into PostgreSQL
      await pool.query(
        `INSERT INTO orders (shop, shopify_order_id, name, status, created_at, total_price, customer_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (shop, shopify_order_id) DO NOTHING`,
        [
          DEFAULT_SHOP,
          order.id,
          order.name,
          order.displayFinancialStatus || 'N/A',
          order.createdAt,
          order.totalPriceSet?.shopMoney?.amount || 0,
          order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : null
        ]
      );

      // Insert fulfilment items
      for (let itemEdge of order.lineItems.edges) {
        const item = itemEdge.node;
        await pool.query(
          `INSERT INTO fulfilment_items (lineItemId, qty, reason, imageURL, shopify_order_id)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (lineItemId) DO NOTHING`,
          [
            item.id,
            item.quantity,
            'N/A', // reason is unknown from Shopify
            item.image?.originalSrc || null,
            order.id
          ]
        );

        // Insert images table
        if (item.image?.originalSrc) {
          await pool.query(
            `INSERT INTO images (imageURL, returnItemId, shopify_order_id)
             VALUES ($1, $2, $3)
             ON CONFLICT (imageURL, shopify_order_id) DO NOTHING`,
            [item.image.originalSrc, null, order.id]
          );
        }
      }
    }

    res.json({ message: 'Orders synced from Shopify!' });
  } catch (err) {
    console.error('Shopify fetch error:', err);
    res.status(500).json({ error: err.message });
  }
};
