-- shops
CREATE TABLE IF NOT EXISTS shops (
  id SERIAL PRIMARY KEY,
  shop_domain VARCHAR(255) UNIQUE NOT NULL,
  access_token TEXT NOT NULL,
  scope TEXT,
  installed_at TIMESTAMP DEFAULT NOW()
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  shop VARCHAR(255) NOT NULL,
  shopify_order_id TEXT NOT NULL,
  name VARCHAR(255),
  status VARCHAR(100),
  created_at TIMESTAMP,
  total_price NUMERIC(12,2),
  customer_name VARCHAR(255),
  raw JSONB,
  UNIQUE (shop, shopify_order_id)
);

-- fulfilment_items
CREATE TABLE IF NOT EXISTS fulfilment_items (
  id SERIAL PRIMARY KEY,
  returnId VARCHAR(255),
  lineItemId VARCHAR(255),
  qty INTEGER,
  reason TEXT,
  imageURL TEXT,
  shopify_order_id TEXT
);

-- images
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  imageURL TEXT,
  returnItemId VARCHAR(255),
  shopify_order_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
