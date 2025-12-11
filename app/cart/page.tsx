"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { getSessionId, formatPrice } from "@/lib/cart"
import { useCart } from "@/lib/cart-context"
import { LoadingSpinner } from "@/components/loading-screen"
import type { CartItem, Product, ProductVariant } from "@/lib/types"

interface CartItemWithProduct extends CartItem {
  products: Product
  product_variants: ProductVariant | null
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { refreshCart } = useCart()

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const supabase = createClient()
      const sessionId = getSessionId()

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (*),
          product_variants (*)
        `)
        .eq("session_id", sessionId)

      if (error) throw error
      setCartItems(data || [])
    } catch (error) {
      console.error("Error loading cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq("id", itemId)

      if (error) throw error

      setCartItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
      await refreshCart()
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error

      setCartItems((items) => items.filter((item) => item.id !== itemId))
      await refreshCart()
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const getItemPrice = (item: CartItemWithProduct) => {
    return item.product_variants?.price || item.products.price
  }

  const subtotal = cartItems.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0)
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="bg-[#FDF8F3] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] text-center">Your Cart</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-[#E8A87C]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-2">Your Cart is Empty</h2>
              <p className="text-[#A89076] mb-6">Looks like you haven&apos;t added any items yet</p>
              <Button className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
                    <div className="flex gap-4">
                      <Link href={`/products/${item.products.slug}`} className="flex-shrink-0">
                        <img
                          src="/product_image1.jpeg"
                          alt={item.products.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.products.slug}`}>
                          <h3 className="font-semibold text-[#8B7355] hover:text-[#E8A87C] transition-colors line-clamp-1">
                            {item.products.name}
                          </h3>
                        </Link>
                        {item.product_variants && (
                          <p className="text-sm text-[#A89076]">{item.product_variants.name}</p>
                        )}
                        <p className="text-[#E8A87C] font-bold mt-1">{formatPrice(getItemPrice(item))}</p>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-[#E5DDD4] rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-[#FFECD9] rounded-l-full transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4 text-[#8B7355]" />
                            </button>
                            <span className="w-10 text-center font-medium text-[#8B7355]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-[#FFECD9] rounded-r-full transition-colors"
                            >
                              <Plus className="h-4 w-4 text-[#8B7355]" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-[#A89076] hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                  <h2 className="font-serif text-xl font-bold text-[#8B7355] mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-[#A89076]">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#A89076]">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-[#E8A87C]">Add {formatPrice(500 - subtotal)} more for free shipping</p>
                    )}
                    <div className="border-t border-[#E5DDD4] pt-4">
                      <div className="flex justify-between font-bold text-[#8B7355]">
                        <span>Total</span>
                        <span className="text-[#E8A87C]">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="mt-6 text-center">
                    <Link href="/products" className="text-sm text-[#E8A87C] hover:underline">
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-[#E5DDD4]">
                    <div className="flex flex-wrap justify-center gap-3 text-xs text-[#A89076]">
                      <span className="px-2 py-1 bg-[#FDF8F3] rounded-full">Secure Checkout</span>
                      <span className="px-2 py-1 bg-[#FDF8F3] rounded-full">COD Available</span>
                      <span className="px-2 py-1 bg-[#FDF8F3] rounded-full">Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
