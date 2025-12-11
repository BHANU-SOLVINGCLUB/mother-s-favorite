-- Seed data for Mother's Favorite E-commerce
-- Run this after creating tables and enabling RLS

-- Seed products
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, weight, images, ingredients, nutritional_facts, preparation_steps, age_range, rating, review_count, is_featured)
VALUES 
(
  'Mother Uggu - Traditional Baby Cereal',
  'mother-uggu',
  'Mother Uggu is a time-honored Telugu baby cereal made from carefully selected whole grains, roasted to perfection using traditional methods passed down through generations. Our Uggu is 100% homemade with no preservatives, colors, or additives - just pure, nutritious goodness for your little one. Each batch is prepared with love, ensuring the same wholesome taste that Telugu mothers have trusted for centuries.',
  '100% Homemade traditional Telugu baby cereal with no preservatives or additives',
  449.00,
  599.00,
  '300g',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['Roasted Rice', 'Roasted Wheat', 'Roasted Green Gram (Moong Dal)', 'Roasted Bengal Gram (Chana Dal)', 'Roasted Almonds', 'Roasted Cashews', 'Cardamom', 'Dry Ginger'],
  '{"calories": "380 kcal", "protein": "12g", "carbohydrates": "65g", "fat": "8g", "fiber": "4g", "iron": "15% DV", "calcium": "10% DV", "serving_size": "100g"}'::jsonb,
  '[{"step": 1, "title": "Measure", "description": "Take 2-3 tablespoons of Uggu powder"}, {"step": 2, "title": "Mix", "description": "Add lukewarm water or milk gradually"}, {"step": 3, "title": "Stir", "description": "Mix well to avoid lumps"}, {"step": 4, "title": "Serve", "description": "Serve at comfortable temperature"}]'::jsonb,
  '6-24 months',
  4.8,
  156,
  true
),
(
  'Mother Uggu - Family Pack',
  'mother-uggu-family',
  'Our family pack contains 500g of the same traditional Telugu Uggu that mothers have trusted for generations. Perfect for families who want to stock up on wholesome nutrition for their little ones. Made with the same love and care, ensuring consistent quality in every spoon.',
  'Value family pack of traditional Telugu baby cereal',
  699.00,
  899.00,
  '500g',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['Roasted Rice', 'Roasted Wheat', 'Roasted Green Gram (Moong Dal)', 'Roasted Bengal Gram (Chana Dal)', 'Roasted Almonds', 'Roasted Cashews', 'Cardamom', 'Dry Ginger'],
  '{"calories": "380 kcal", "protein": "12g", "carbohydrates": "65g", "fat": "8g", "fiber": "4g", "iron": "15% DV", "calcium": "10% DV", "serving_size": "100g"}'::jsonb,
  '[{"step": 1, "title": "Measure", "description": "Take 2-3 tablespoons of Uggu powder"}, {"step": 2, "title": "Mix", "description": "Add lukewarm water or milk gradually"}, {"step": 3, "title": "Stir", "description": "Mix well to avoid lumps"}, {"step": 4, "title": "Serve", "description": "Serve at comfortable temperature"}]'::jsonb,
  '6-24 months',
  4.9,
  89,
  true
),
(
  'Mother Uggu - Combo Pack',
  'mother-uggu-combo',
  'Get the best value with our combo pack containing 2 x 300g packs of Mother Uggu. Perfect for gifting to new parents or stocking up for your growing baby. Each pack is freshly prepared and sealed to maintain freshness.',
  'Combo pack with 2 pouches of traditional baby cereal',
  849.00,
  1198.00,
  '2 x 300g',
  ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
  ARRAY['Roasted Rice', 'Roasted Wheat', 'Roasted Green Gram (Moong Dal)', 'Roasted Bengal Gram (Chana Dal)', 'Roasted Almonds', 'Roasted Cashews', 'Cardamom', 'Dry Ginger'],
  '{"calories": "380 kcal", "protein": "12g", "carbohydrates": "65g", "fat": "8g", "fiber": "4g", "iron": "15% DV", "calcium": "10% DV", "serving_size": "100g"}'::jsonb,
  '[{"step": 1, "title": "Measure", "description": "Take 2-3 tablespoons of Uggu powder"}, {"step": 2, "title": "Mix", "description": "Add lukewarm water or milk gradually"}, {"step": 3, "title": "Stir", "description": "Mix well to avoid lumps"}, {"step": 4, "title": "Serve", "description": "Serve at comfortable temperature"}]'::jsonb,
  '6-24 months',
  4.7,
  67,
  false
);

-- Seed product variants
INSERT INTO product_variants (product_id, name, weight, price, compare_at_price, is_default)
SELECT id, '300g Pack', '300g', 449.00, 599.00, true FROM products WHERE slug = 'mother-uggu'
UNION ALL
SELECT id, '500g Pack', '500g', 699.00, 899.00, false FROM products WHERE slug = 'mother-uggu'
UNION ALL
SELECT id, 'Combo (2x300g)', '600g', 849.00, 1198.00, false FROM products WHERE slug = 'mother-uggu';

-- Seed reviews
INSERT INTO reviews (product_id, author_name, author_location, rating, title, content, is_verified)
SELECT 
  p.id,
  r.author_name,
  r.author_location,
  r.rating,
  r.title,
  r.content,
  r.is_verified
FROM products p
CROSS JOIN (
  VALUES 
    ('Lakshmi Devi', 'Hyderabad', 5, 'Best decision for my baby!', 'My 8-month-old loves this Uggu! The texture is perfect and I can see the difference in her energy levels. So happy I found this authentic Telugu recipe.', true),
    ('Priya Reddy', 'Vijayawada', 5, 'Just like my mother used to make', 'This brings back memories of my childhood. Now my baby gets the same traditional nutrition. No artificial ingredients, just pure goodness!', true),
    ('Sravani K', 'Bangalore', 4, 'Great quality product', 'Very happy with the quality. My baby took to it immediately. Would recommend adding a slightly larger pack option.', true),
    ('Madhavi Rao', 'Chennai', 5, 'Trusted by our family', 'Three generations of our family have grown up on Uggu. So glad to find a reliable source for this traditional food.', true),
    ('Sunitha Reddy', 'Guntur', 5, 'Perfect for working moms', 'Easy to prepare and highly nutritious. My pediatrician was impressed with my baby''s growth charts!', true)
) AS r(author_name, author_location, rating, title, content, is_verified)
WHERE p.slug = 'mother-uggu';

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, tags, is_published, published_at)
VALUES 
(
  'Why Uggu is the Perfect First Food for Your Baby',
  'why-uggu-perfect-first-food',
  'Discover the centuries-old wisdom behind Telugu traditional baby food and why modern parents are returning to this wholesome choice.',
  '## The Traditional Wisdom of Uggu

For generations, Telugu families have relied on Uggu as the perfect first solid food for their babies. This traditional cereal, made from carefully roasted grains and pulses, has stood the test of time for good reason.

### Nutritional Benefits

- **Easy Digestion**: The roasting process breaks down complex starches, making it gentle on tiny tummies
- **Complete Nutrition**: A balanced mix of carbohydrates, proteins, and healthy fats
- **Natural Energy**: Provides sustained energy for growing babies
- **No Additives**: Unlike commercial baby foods, Uggu contains no preservatives or artificial ingredients

### When to Start

Most pediatricians recommend starting Uggu around 6 months of age, when babies are ready for solid foods. Always consult your healthcare provider before introducing new foods.

### How to Prepare

1. Start with a thin consistency
2. Gradually increase thickness as baby adapts
3. Can be mixed with breast milk or formula for familiar taste
4. Add mashed fruits for variety once baby is comfortable',
  '/placeholder.svg?height=400&width=800',
  'Baby Nutrition',
  ARRAY['baby food', 'nutrition', 'traditional', 'uggu'],
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Traditional Telugu Baby-Feeding Practices Every Parent Should Know',
  'traditional-telugu-baby-feeding',
  'Explore the time-tested feeding practices from Telugu culture that modern science is now validating.',
  '## Wisdom Passed Down Through Generations

Telugu culture has always placed great emphasis on infant nutrition. Our grandmothers knew instinctively what modern nutrition science is now confirming.

### Key Practices

1. **Gradual Introduction**: Starting with single-grain preparations before introducing complex mixtures
2. **Seasonal Eating**: Adjusting baby''s diet based on weather and season
3. **Homemade Always**: Preparing fresh food daily rather than storing
4. **Mindful Feeding**: Creating a calm environment during meals

### Modern Validation

Recent studies have shown that traditional grain-based baby foods like Uggu provide excellent nutritional profiles comparable to fortified commercial alternatives, with the added benefit of being free from artificial additives.

### Tips for Modern Parents

- Maintain the traditional recipes while adapting to modern convenience
- Use quality ingredients from trusted sources
- Keep meal times consistent
- Involve grandparents in passing down food traditions',
  '/placeholder.svg?height=400&width=800',
  'Parenting',
  ARRAY['traditional', 'telugu culture', 'parenting', 'baby care'],
  true,
  NOW() - INTERVAL '12 days'
),
(
  '5 Signs Your Baby is Ready for Solid Foods',
  'signs-baby-ready-solid-foods',
  'Learn to recognize the developmental milestones that indicate your baby is ready to begin their solid food journey.',
  '## Is Your Baby Ready?

Starting solid foods is an exciting milestone! Here are the signs that your little one is ready:

### 1. Good Head Control
Your baby can hold their head steady and sit with support.

### 2. Interest in Food
They watch you eat and may reach for your food.

### 3. Loss of Tongue-Thrust Reflex
They no longer automatically push food out of their mouth.

### 4. Doubled Birth Weight
Most babies are ready around when they''ve doubled their birth weight.

### 5. Still Hungry After Milk Feeds
They seem unsatisfied after nursing or bottle-feeding.

### Starting Right

Once you notice these signs (usually around 6 months), start with simple, easily digestible foods like Uggu. Begin with thin consistencies and gradually thicken as your baby adapts.

### What to Avoid

- Don''t rush the process
- Avoid honey before 1 year
- Skip added salt and sugar
- Wait 3-5 days between new foods to check for allergies',
  '/placeholder.svg?height=400&width=800',
  'Baby Development',
  ARRAY['solid foods', 'baby development', 'feeding guide', 'milestones'],
  true,
  NOW() - INTERVAL '20 days'
);
