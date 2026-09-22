-- Truncate-then-insert on every startup for simple, idempotent local dev seeding.
-- Deleting ./data/ecommercedb.mv.db (or these rows) fully resets the storefront data.

DELETE FROM order_item;
DELETE FROM orders;
DELETE FROM customer;
DELETE FROM product;
DELETE FROM product_category;
DELETE FROM state;
DELETE FROM country;

-- ================== Product Categories ==================
INSERT INTO product_category (id, category_name) VALUES (1, 'Books');
INSERT INTO product_category (id, category_name) VALUES (2, 'DVDs');
INSERT INTO product_category (id, category_name) VALUES (3, 'Toys');
INSERT INTO product_category (id, category_name) VALUES (4, 'Electronics');
INSERT INTO product_category (id, category_name) VALUES (5, 'Grocery');
INSERT INTO product_category (id, category_name) VALUES (6, 'Vitamins');

-- ================== Products ==================
-- Books
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (1, 'BK-001', 'The Pragmatic Programmer', 'A classic guide for software craftsmanship', 34.99, 'assets/images/products/pragmatic-programmer.jpg', true, 25, NOW(), NOW(), 1);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (2, 'BK-002', 'Clean Code', 'A handbook of agile software craftsmanship', 39.99, 'assets/images/products/clean-code.jpg', true, 18, NOW(), NOW(), 1);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (3, 'BK-003', 'Angular Up and Running', 'Learning Angular, step by step', 29.99, 'assets/images/products/angular-up-and-running.jpg', true, 30, NOW(), NOW(), 1);

-- DVDs
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (4, 'DV-001', 'Inception', 'Sci-fi thriller directed by Christopher Nolan', 14.99, 'assets/images/products/inception.jpg', true, 40, NOW(), NOW(), 2);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (5, 'DV-002', 'The Matrix', 'A hacker discovers reality is a simulation', 12.99, 'assets/images/products/the-matrix.jpg', true, 35, NOW(), NOW(), 2);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (6, 'DV-003', 'Interstellar', 'A team travels through a wormhole in space', 15.99, 'assets/images/products/interstellar.jpg', true, 22, NOW(), NOW(), 2);

-- Toys
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (7, 'TY-001', 'Building Blocks Set', '200-piece creative building block set', 24.99, 'assets/images/products/building-blocks.jpg', true, 50, NOW(), NOW(), 3);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (8, 'TY-002', 'RC Racing Car', 'Remote-controlled racing car, high speed', 44.99, 'assets/images/products/rc-car.jpg', true, 15, NOW(), NOW(), 3);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (9, 'TY-003', 'Plush Teddy Bear', 'Soft and cuddly teddy bear, 16 inches', 19.99, 'assets/images/products/teddy-bear.jpg', true, 60, NOW(), NOW(), 3);

-- Electronics
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (10, 'EL-001', 'Wireless Headphones', 'Noise-cancelling over-ear headphones', 89.99, 'assets/images/products/headphones.jpg', true, 20, NOW(), NOW(), 4);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (11, 'EL-002', 'Smart Watch', 'Fitness tracking smart watch with heart rate monitor', 129.99, 'assets/images/products/smart-watch.jpg', true, 17, NOW(), NOW(), 4);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (12, 'EL-003', 'Portable Bluetooth Speaker', 'Waterproof speaker with 12-hour battery life', 49.99, 'assets/images/products/bluetooth-speaker.jpg', true, 33, NOW(), NOW(), 4);

-- Grocery
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (13, 'GR-001', 'Organic Coffee Beans', '1 lb bag of organic whole bean coffee', 12.49, 'assets/images/products/coffee-beans.jpg', true, 80, NOW(), NOW(), 5);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (14, 'GR-002', 'Extra Virgin Olive Oil', '500ml bottle of cold-pressed olive oil', 9.99, 'assets/images/products/olive-oil.jpg', true, 45, NOW(), NOW(), 5);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (15, 'GR-003', 'Mixed Nuts', '1 lb resealable bag of assorted mixed nuts', 8.99, 'assets/images/products/mixed-nuts.jpg', true, 55, NOW(), NOW(), 5);

-- Vitamins
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (16, 'VT-001', 'Vitamin C 1000mg', '100 tablets, immune support', 11.99, 'assets/images/products/vitamin-c.jpg', true, 70, NOW(), NOW(), 6);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (17, 'VT-002', 'Multivitamin Daily', '60 capsules, complete daily multivitamin', 16.99, 'assets/images/products/multivitamin.jpg', true, 65, NOW(), NOW(), 6);
INSERT INTO product (id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated, category_id)
VALUES (18, 'VT-003', 'Omega-3 Fish Oil', '90 softgels, heart and brain health', 18.99, 'assets/images/products/fish-oil.jpg', true, 40, NOW(), NOW(), 6);

-- ================== Countries ==================
INSERT INTO country (id, code, name) VALUES (1, 'US', 'United States');
INSERT INTO country (id, code, name) VALUES (2, 'IN', 'India');

-- ================== States: United States ==================
INSERT INTO state (id, name, country_id) VALUES (1, 'Alabama', 1);
INSERT INTO state (id, name, country_id) VALUES (2, 'Alaska', 1);
INSERT INTO state (id, name, country_id) VALUES (3, 'Arizona', 1);
INSERT INTO state (id, name, country_id) VALUES (4, 'California', 1);
INSERT INTO state (id, name, country_id) VALUES (5, 'Colorado', 1);
INSERT INTO state (id, name, country_id) VALUES (6, 'Florida', 1);
INSERT INTO state (id, name, country_id) VALUES (7, 'Georgia', 1);
INSERT INTO state (id, name, country_id) VALUES (8, 'Illinois', 1);
INSERT INTO state (id, name, country_id) VALUES (9, 'New York', 1);
INSERT INTO state (id, name, country_id) VALUES (10, 'Texas', 1);
INSERT INTO state (id, name, country_id) VALUES (11, 'Washington', 1);

-- ================== States: India ==================
INSERT INTO state (id, name, country_id) VALUES (12, 'Andhra Pradesh', 2);
INSERT INTO state (id, name, country_id) VALUES (13, 'Delhi', 2);
INSERT INTO state (id, name, country_id) VALUES (14, 'Gujarat', 2);
INSERT INTO state (id, name, country_id) VALUES (15, 'Karnataka', 2);
INSERT INTO state (id, name, country_id) VALUES (16, 'Kerala', 2);
INSERT INTO state (id, name, country_id) VALUES (17, 'Maharashtra', 2);
INSERT INTO state (id, name, country_id) VALUES (18, 'Punjab', 2);
INSERT INTO state (id, name, country_id) VALUES (19, 'Rajasthan', 2);
INSERT INTO state (id, name, country_id) VALUES (20, 'Tamil Nadu', 2);
INSERT INTO state (id, name, country_id) VALUES (21, 'Uttar Pradesh', 2);
INSERT INTO state (id, name, country_id) VALUES (22, 'West Bengal', 2);

ALTER TABLE product_category ALTER COLUMN id RESTART WITH 7;
ALTER TABLE product ALTER COLUMN id RESTART WITH 19;
ALTER TABLE country ALTER COLUMN id RESTART WITH 3;
ALTER TABLE state ALTER COLUMN id RESTART WITH 23;
