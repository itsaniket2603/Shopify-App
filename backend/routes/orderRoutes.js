import express from 'express';
import { listOrders, getOrder, fetchOrdersFromShopify } from '../controllers/orderController.js';

const router = express.Router();

// ✅ Sync from Shopify
router.get('/sync-shopify', fetchOrdersFromShopify);

// List all orders
router.get('/', listOrders);

// Get single order by ID
router.get('/:orderId', getOrder);

export default router;
