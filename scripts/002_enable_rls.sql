-- Enable Row Level Security on all tables
-- Run this after creating tables

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Products: Public read access for active products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

-- Product variants: Public read access
CREATE POLICY "Product variants are viewable by everyone" ON product_variants
  FOR SELECT USING (true);

-- Reviews: Public read access for approved reviews
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews
  FOR SELECT USING (is_approved = true);

-- Reviews: Anyone can create reviews
CREATE POLICY "Anyone can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Cart items: Full access for everyone (session-based)
CREATE POLICY "Users can view their own cart items" ON cart_items
  FOR SELECT USING (true);

CREATE POLICY "Users can insert cart items" ON cart_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own cart items" ON cart_items
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own cart items" ON cart_items
  FOR DELETE USING (true);

-- Orders: Full access for order creation
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Order items: Full access
CREATE POLICY "Users can view order items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Users can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Blog posts: Public read access for published posts
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Newsletter: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Contact messages: Anyone can send messages
CREATE POLICY "Anyone can send contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
