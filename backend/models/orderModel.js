import pool from '../config/db.js';

export async function insertOrUpdateOrder(orderObj) {
  // orderObj = { shop, shopify_order_id, name, status, created_at, total_price, customer_name, raw }
  const q = `INSERT INTO orders (shop, shopify_order_id, name, status, created_at, total_price, customer_name, raw)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  ON CONFLICT (shop, shopify_order_id) DO UPDATE
  SET name = EXCLUDED.name, status = EXCLUDED.status, created_at = EXCLUDED.created_at, total_price = EXCLUDED.total_price, customer_name = EXCLUDED.customer_name, raw = EXCLUDED.raw
  RETURNING *`;
  const vals = [
    orderObj.shop,
    orderObj.shopify_order_id,
    orderObj.name || null,
    orderObj.status || null,
    orderObj.created_at,
    orderObj.total_price || 0,
    orderObj.customer_name || null,
    orderObj.raw ? JSON.stringify(orderObj.raw) : null
  ];
  const r = await pool.query(q, vals);
  return r.rows[0];
}

export async function getAllOrdersForShop(shop) {
  const r = await pool.query('SELECT * FROM orders WHERE shop=$1 ORDER BY created_at DESC', [shop]);
  return r.rows;
}

export async function getOrderByShopifyId(shopifyId) {
  const r = await pool.query('SELECT * FROM orders WHERE shopify_order_id=$1', [shopifyId]);
  return r.rows[0];
}
