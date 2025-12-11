import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, ShoppingBag, Check } from "lucide-react"

export function ProductHighlight() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FDF8F3] to-[#FFECD9]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-white rounded-[3rem] p-6 shadow-xl max-w-md mx-auto">
              <Image
                src="/product_image2.jpeg"
                alt="Mother Uggu 300g Pack"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl object-cover"
              />

              {/* Price Tag */}
              <div className="absolute -right-4 -bottom-4 bg-[#E8A87C] text-white rounded-2xl p-4 shadow-lg">
                <div className="text-sm line-through opacity-75">₹599</div>
                <div className="text-2xl font-bold">₹449</div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9D4C5]/30 rounded-full mb-4">
              <span className="text-sm font-medium text-[#8B7355]">Best Seller</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">
              Mother Uggu - Traditional Baby Cereal
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 5 ? "text-[#E8A87C] fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-[#A89076]">4.8 (156 reviews)</span>
            </div>

            <p className="text-[#A89076] mb-6 text-pretty">
              Our signature blend of roasted grains and pulses, prepared using traditional Telugu methods. Perfect for
              babies 6 months and above. Each batch is made fresh to ensure maximum nutrition and taste.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "100% Natural Ingredients",
                "No Preservatives or Additives",
                "Easy to Digest",
                "Rich in Protein & Iron",
                "Traditional Recipe",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#C9D4C5] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-[#6B5844]" />
                  </div>
                  <span className="text-[#8B7355]">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8 shadow-lg"
                asChild
              >
                <Link href="/products/mother-uggu">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Buy Now - ₹449
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white rounded-full px-8 bg-transparent"
                asChild
              >
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
