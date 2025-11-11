import fetch from 'node-fetch';
import { API_VERSION } from '../config/shopify.js';

export async function shopifyGraphQL(shop, accessToken, query, variables = {}) {
  const url = `https://${shop}/admin/api/${API_VERSION}/graphql.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (json.errors) {
    const err = new Error('Shopify GraphQL errors: ' + JSON.stringify(json.errors));
    err.raw = json;
    throw err;
  }
  return json.data;
}
