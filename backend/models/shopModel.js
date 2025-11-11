import pool from '../config/db.js';

export async function upsertShop(shopDomain, accessToken, scope) {
  const q = `INSERT INTO shops (shop_domain, access_token, scope)
             VALUES ($1,$2,$3)
             ON CONFLICT (shop_domain) DO UPDATE SET access_token = EXCLUDED.access_token, scope = EXCLUDED.scope, installed_at = NOW()
             RETURNING *`;
  const r = await pool.query(q, [shopDomain, accessToken, scope]);
  return r.rows[0];
}

export async function getShop(shopDomain) {
  const r = await pool.query('SELECT * FROM shops WHERE shop_domain=$1', [shopDomain]);
  return r.rows[0];
}
export async function deleteShop(shopDomain) {
  const r = await pool.query('DELETE FROM shops WHERE shop_domain=$1', [shopDomain]);
  return r.rowCount > 0;
}