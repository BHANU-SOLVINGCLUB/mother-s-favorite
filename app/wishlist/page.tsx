"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { formatPrice } from "@/lib/cart"

const productImages = [
  "/product_image1.jpeg",
  "/product_image2.jpeg",
  "/product_image3.jpeg",
]

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

  return (
    <div className="bg-[#FDF8F3] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-[#E8A87C] fill-current" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#5C4A3A] text-center">
              My Wishlist
            </h1>
          </div>
          <p className="text-center text-[#6B5844] mt-2">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-[#E8A87C]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#5C4A3A] mb-2">
                Your Wishlist is Empty
              </h2>
              <p className="text-[#6B5844] mb-6">
                Save items you love by clicking the heart icon on products
              </p>
              <Button
                className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
                asChild
              >
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Clear All Button */}
              <div className="flex justify-end mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-[#A89076] border-[#E5DDD4] hover:bg-[#FFECD9] hover:text-[#5C4A3A]"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {/* Wishlist Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#FFECD9]">
                      <Link href={`/products/${item.slug}`}>
                        <Image
                          src={item.image || productImages[index % productImages.length]}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-current" />
                      </button>
                    </div>
                    <div className="p-4">
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="font-semibold text-[#5C4A3A] mb-2 hover:text-[#E8A87C] transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-bold text-[#E8A87C]">
                          {formatPrice(item.price)}
                        </span>
                        {item.comparePrice && (
                          <span className="text-sm text-[#A89076] line-through">
                            {formatPrice(item.comparePrice)}
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
                        asChild
                      >
                        <Link href={`/products/${item.slug}`}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          View Product
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[#E8A87C] hover:text-[#D4956B] font-medium"
                >
                  Continue Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}


