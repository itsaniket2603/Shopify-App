import dotenv from 'dotenv';
dotenv.config();

export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
export const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
export const SHOPIFY_SCOPES = process.env.SHOPIFY_SCOPES || 'read_orders';
export const APP_URL = process.env.APP_URL || process.env.APP_URL || 'http://localhost:5000';
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
export const API_VERSION = process.env.API_VERSION || '2024-10';
export const DEFAULT_SHOP = process.env.DEFAULT_SHOP;
export const SHOPIFY_API_VERSION = `2024-10`;   