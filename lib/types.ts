export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  compare_at_price: number | null
  weight: string
  images: string[]
  ingredients: string[]
  nutritional_facts: {
    calories: string
    protein: string
    carbohydrates: string
    fat: string
    fiber: string
    iron: string
    calcium: string
    serving_size: string
  }
  preparation_steps: {
    step: number
    title: string
    description: string
  }[]
  age_range: string
  rating: number
  review_count: number
  stock: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  weight: string
  price: number
  compare_at_price: number | null
  stock: number
  is_default: boolean
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string | null
  author_name: string
  author_location: string | null
  rating: number
  title: string | null
  content: string
  is_verified: boolean
  is_approved: boolean
  created_at: string
}

export interface CartItem {
  id: string
  session_id: string
  user_id: string | null
  product_id: string
  variant_id: string | null
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
  variant?: ProductVariant
}

export interface Order {
  id: string
  order_number: string
  user_id: string | null
  session_id: string | null
  status: string
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  payment_method: string
  payment_status: string
  shipping_address: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  billing_address: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  } | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  product_name: string
  variant_name: string | null
  price: number
  quantity: number
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author_name: string
  category: string | null
  tags: string[]
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  is_read: boolean
  created_at: string
}
