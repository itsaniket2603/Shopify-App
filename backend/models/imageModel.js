import pool from '../config/db.js';

export async function insertImage(imgObj) {
  const q = `INSERT INTO images (imageurl, returnitemid, shopify_order_id)
             VALUES ($1,$2,$3) RETURNING *`;
  const vals = [imgObj.imageURL || null, imgObj.returnItemId || null, imgObj.shopify_order_id || null];
  const r = await pool.query(q, vals);
  return r.rows[0];
}

export async function getImagesByShopifyOrderId(shopifyOrderId) {
  const r = await pool.query('SELECT * FROM images WHERE shopify_order_id=$1', [shopifyOrderId]);
  return r.rows;
}
