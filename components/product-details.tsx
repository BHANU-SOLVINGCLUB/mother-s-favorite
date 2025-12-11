"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, ShoppingBag, Minus, Plus, Check, Truck, Shield, RotateCcw, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product, ProductVariant } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { getSessionId } from "@/lib/cart"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { toast } from "sonner"
import type { User } from "@supabase/supabase-js"

interface ProductDetailsProps {
  product: Product
  variants: ProductVariant[]
}

export function ProductDetails({ product, variants }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.find((v) => v.is_default) || variants[0] || null,
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const { refreshCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const router = useRouter()
  
  const inWishlist = isInWishlist(product.id)

  const currentPrice = selectedVariant?.price || product.price
  const comparePrice = selectedVariant?.compare_at_price || product.compare_at_price

  const images = ["/product_image1.jpeg", "/product_image2.jpeg", "/product_image3.jpeg"]

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsCheckingAuth(false)
    }
    checkAuth()

    // Listen for auth changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleWishlistClick = () => {
    if (!user) {
      toast.error("Please login to add items to your wishlist", {
        action: {
          label: "Login",
          onClick: () => router.push("/auth/login"),
        },
      })
      return
    }
    
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success("Removed from wishlist")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: currentPrice,
        comparePrice: comparePrice ?? undefined,
        image: images[0],
      })
      toast.success("Added to wishlist")
    }
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      const supabase = createClient()
      const sessionId = getSessionId()

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("session_id", sessionId)
        .eq("product_id", product.id)
        .eq("variant_id", selectedVariant?.id || null)
        .single()

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from("cart_items")
          .update({
            quantity: existingItem.quantity + quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingItem.id)
        if (error) throw error
      } else {
        // Insert new item
        const { error } = await supabase.from("cart_items").insert({
          session_id: sessionId,
          product_id: product.id,
          variant_id: selectedVariant?.id || null,
          quantity,
        })
        if (error) throw error
      }

      await refreshCart()
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#A89076] mb-8">
          <a href="/" className="hover:text-[#E8A87C]">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-[#E8A87C]">
            Products
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#8B7355]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImage] || "/product_image1.jpeg"}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              {comparePrice && (
                <Badge className="absolute top-4 left-4 bg-[#E8A87C] text-white">
                  Save {Math.round(((comparePrice - currentPrice) / comparePrice) * 100)}%
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-[#E8A87C]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/product_image1.jpeg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#A89076]">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">{product.name}</h1>

            <p className="text-[#A89076] mb-6">{product.short_description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#E8A87C]">₹{currentPrice}</span>
              {comparePrice && <span className="text-xl text-[#A89076] line-through">₹{comparePrice}</span>}
              <Badge variant="secondary" className="bg-[#C9D4C5] text-[#6B5844]">
                {product.age_range}
              </Badge>
            </div>

            {/* Variants */}
            {variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#8B7355] mb-3">Select Size</label>
                <div className="flex flex-wrap gap-3">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? "border-[#E8A87C] bg-[#FFECD9] text-[#8B7355]"
                          : "border-[#E5DDD4] text-[#A89076] hover:border-[#E8A87C]"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#8B7355] mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#E5DDD4] rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[#FFECD9] rounded-l-full transition-colors"
                  >
                    <Minus className="h-5 w-5 text-[#8B7355]" />
                  </button>
                  <span className="w-12 text-center font-medium text-[#8B7355]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[#FFECD9] rounded-r-full transition-colors"
                  >
                    <Plus className="h-5 w-5 text-[#8B7355]" />
                  </button>
                </div>
                <span className="text-sm text-[#A89076]">{product.stock} in stock</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Button
                size="lg"
                className={`flex-1 rounded-full text-lg ${
                  addedToCart
                    ? "bg-[#C9D4C5] hover:bg-[#C9D4C5] text-[#6B5844]"
                    : "bg-[#E8A87C] hover:bg-[#D4956B] text-white"
                }`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {isAdding ? "Adding..." : `Add to Cart - ₹${currentPrice * quantity}`}
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`rounded-full border-[#E5DDD4] hover:bg-[#FFECD9] bg-transparent ${
                  inWishlist ? "text-red-500 border-red-300" : "text-[#8B7355]"
                }`}
                onClick={handleWishlistClick}
                disabled={isCheckingAuth}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#FFECD9] rounded-2xl mb-8">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-[#E8A87C] mb-2" />
                <span className="text-xs text-[#8B7355] font-medium">Free Shipping</span>
                <span className="text-xs text-[#A89076]">Orders ₹500+</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-[#E8A87C] mb-2" />
                <span className="text-xs text-[#8B7355] font-medium">100% Safe</span>
                <span className="text-xs text-[#A89076]">For your baby</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-6 w-6 text-[#E8A87C] mb-2" />
                <span className="text-xs text-[#8B7355] font-medium">Easy Returns</span>
                <span className="text-xs text-[#A89076]">7-day policy</span>
              </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full bg-[#F5EDE4] rounded-full p-1">
                <TabsTrigger
                  value="description"
                  className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#8B7355]"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#8B7355]"
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="nutrition"
                  className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-[#8B7355]"
                >
                  Nutrition
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-brown max-w-none">
                  <p className="text-[#A89076]">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {product.ingredients?.map((ingredient: string) => (
                    <Badge key={ingredient} variant="secondary" className="bg-[#F5EDE4] text-[#8B7355]">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  {product.nutritional_facts &&
                    Object.entries(product.nutritional_facts).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-[#F5EDE4]">
                        <span className="text-[#8B7355] capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-[#A89076]">{value as string}</span>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preparation Steps */}
        {product.preparation_steps && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-8 text-center">How to Prepare</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {product.preparation_steps.map((step: { step: number; title: string; description: string }) => (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[#E8A87C] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[#8B7355] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#A89076]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
