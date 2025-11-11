import crypto from 'crypto';
import fetch from 'node-fetch';
import { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, APP_URL } from '../config/shopify.js';
import { upsertShop } from '../models/shopModel.js';

// redirect to install
export function install(req, res) {
  const { shop } = req.query;
  if (!shop) return res.status(400).send('Missing shop param');
  const state = crypto.randomBytes(16).toString('hex');
  res.cookie('shopify_oauth_state', state, { httpOnly: true, sameSite: 'lax' });

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${encodeURIComponent(SHOPIFY_SCOPES)}&redirect_uri=${encodeURIComponent(`${APP_URL}/auth/callback`)}&state=${state}`;
  return res.redirect(installUrl);
}

// callback to exchange code
export async function callback(req, res) {
  try {
    const { shop, code, state } = req.query;
    const saved = req.cookies.shopify_oauth_state;
    if (!shop || !code || !state || state !== saved) {
      return res.status(400).send('Invalid OAuth callback (missing params or state mismatch)');
    }

    // exchange code for access token
    const tokenUrl = `https://${shop}/admin/oauth/access_token`;
    const resp = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code
      })
    });
    const tokenJson = await resp.json();
    if (!tokenJson.access_token) {
      return res.status(500).send('Failed to get access token: ' + JSON.stringify(tokenJson));
    }

    // store shop record
    await upsertShop(shop, tokenJson.access_token, SHOPIFY_SCOPES);

    // redirect to frontend dashboard (embedded or standalone)
    return res.redirect(`${APP_URL}/?shop=${encodeURIComponent(shop)}`);
  } catch (err) {
    console.error('OAuth callback error', err);
    return res.status(500).send('OAuth callback error');
  }
}
