import pool from '../config/db.js';

export async function insertFulfilmentItem(itemObj) {
  const q = `INSERT INTO fulfilment_items (returnid, lineitemid, qty, reason, imageurl, shopify_order_id)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const vals = [
    itemObj.returnId || null,
    itemObj.lineItemId || null,
    itemObj.qty || 0,
    itemObj.reason || null,
    itemObj.imageURL || null,
    itemObj.shopify_order_id || null
  ];
  const r = await pool.query(q, vals);
  return r.rows[0];
}

export async function getItemsByShopifyOrderId(shopifyOrderId) {
  const r = await pool.query('SELECT * FROM fulfilment_items WHERE shopify_order_id=$1', [shopifyOrderId]);
  return r.rows;
}
