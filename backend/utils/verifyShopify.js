// simple HMAC validation for OAuth callback (query params)
import crypto from 'crypto';
import { SHOPIFY_API_SECRET } from '../config/shopify.js';

export function verifyHmac(query) {
  // query: object of req.query
  const { hmac, signature, ...rest } = query;
  const message = Object.keys(rest)
    .filter(k => k !== 'hmac' && k !== 'signature')
    .sort()
    .map(k => `${k}=${rest[k]}`)
    .join('&');

  const generated = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  return generated === hmac;
}
