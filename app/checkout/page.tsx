"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { getSessionId, formatPrice } from "@/lib/cart"
import { LoadingSpinner } from "@/components/loading-screen"
import type { CartItem, Product, ProductVariant } from "@/lib/types"

interface CartItemWithProduct extends CartItem {
  products: Product
  product_variants: ProductVariant | null
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

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

      if (!data || data.length === 0) {
        router.push("/cart")
        return
      }

      setCartItems(data)
    } catch (error) {
      console.error("Error loading cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getItemPrice = (item: CartItemWithProduct) => {
    return item.product_variants?.price || item.products.price
  }

  const subtotal = cartItems.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0)
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + shipping

  const generateOrderNumber = () => {
    return `MF${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const sessionId = getSessionId()
      const orderNumber = generateOrderNumber()

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          session_id: sessionId,
          status: "pending",
          subtotal,
          shipping_cost: shipping,
          tax: 0,
          total,
          payment_method: paymentMethod,
          payment_status: paymentMethod === "cod" ? "pending" : "pending",
          shipping_address: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          notes: formData.notes || null,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        product_name: item.products.name,
        variant_name: item.product_variants?.name || null,
        price: getItemPrice(item),
        quantity: item.quantity,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)
      if (itemsError) throw itemsError

      // Clear cart
      await supabase.from("cart_items").delete().eq("session_id", sessionId)

      // Redirect to confirmation
      router.push(`/order-confirmation?order=${orderNumber}`)
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="bg-[#FDF8F3] min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#E5DDD4] py-4">
        <div className="container mx-auto px-4">
          <Link href="/cart" className="inline-flex items-center text-[#8B7355] hover:text-[#E8A87C]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-[#8B7355] mb-8 text-center">Checkout</h1>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Shipping Info */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#FFECD9] rounded-full flex items-center justify-center">
                        <Truck className="h-5 w-5 text-[#E8A87C]" />
                      </div>
                      <h2 className="font-semibold text-lg text-[#8B7355]">Shipping Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-[#8B7355]">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-[#8B7355]">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email" className="text-[#8B7355]">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address" className="text-[#8B7355]">
                          Address *
                        </Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                          rows={3}
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-[#8B7355]">
                          City *
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-[#8B7355]">
                          State *
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode" className="text-[#8B7355]">
                          PIN Code *
                        </Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-[#FFECD9] rounded-full flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-[#E8A87C]" />
                      </div>
                      <h2 className="font-semibold text-lg text-[#8B7355]">Payment Method</h2>
                    </div>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <label className="flex items-center gap-4 p-4 border border-[#E5DDD4] rounded-xl cursor-pointer hover:border-[#E8A87C] transition-colors">
                          <RadioGroupItem value="cod" id="cod" />
                          <div className="flex-1">
                            <div className="font-medium text-[#8B7355]">Cash on Delivery</div>
                            <div className="text-sm text-[#A89076]">Pay when you receive your order</div>
                          </div>
                          <span className="px-3 py-1 bg-[#C9D4C5] text-[#6B5844] text-xs rounded-full font-medium">
                            Popular
                          </span>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-[#E5DDD4] rounded-xl cursor-pointer hover:border-[#E8A87C] transition-colors">
                          <RadioGroupItem value="upi" id="upi" />
                          <div className="flex-1">
                            <div className="font-medium text-[#8B7355]">UPI Payment</div>
                            <div className="text-sm text-[#A89076]">GPay, PhonePe, Paytm & more</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-[#E5DDD4] rounded-xl cursor-pointer hover:border-[#E8A87C] transition-colors">
                          <RadioGroupItem value="card" id="card" />
                          <div className="flex-1">
                            <div className="font-medium text-[#8B7355]">Credit / Debit Card</div>
                            <div className="text-sm text-[#A89076]">Visa, Mastercard, RuPay</div>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Order Notes */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <Label htmlFor="notes" className="text-[#8B7355] font-semibold">
                      Order Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      placeholder="Any special instructions for delivery..."
                      className="mt-2 border-[#E5DDD4]"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                    <h2 className="font-serif text-xl font-bold text-[#8B7355] mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src="/product_image1.jpeg"
                            alt={item.products.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#8B7355] line-clamp-1">{item.products.name}</p>
                            {item.product_variants && (
                              <p className="text-xs text-[#A89076]">{item.product_variants.name}</p>
                            )}
                            <p className="text-sm text-[#A89076]">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-sm font-medium text-[#8B7355]">
                            {formatPrice(getItemPrice(item) * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#E5DDD4] pt-4 space-y-3">
                      <div className="flex justify-between text-[#A89076]">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[#A89076]">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                      </div>
                      <div className="border-t border-[#E5DDD4] pt-3">
                        <div className="flex justify-between font-bold text-[#8B7355]">
                          <span>Total</span>
                          <span className="text-[#E8A87C]">{formatPrice(total)}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Placing Order..." : "Place Order"}
                    </Button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#A89076]">
                      <Shield className="h-4 w-4" />
                      <span>Secure & Encrypted Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
