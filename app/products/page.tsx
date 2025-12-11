import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Our Products | Mother's Favorite",
  description: "Shop our range of traditional Telugu baby food products. 100% homemade, no preservatives.",
}

const productImages = [
  "/product_image1.jpeg",
  "/product_image2.jpeg",
  "/product_image3.jpeg",
]

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_featured", { ascending: false })

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-4">Our Products</h1>
          <p className="text-[#A89076] max-w-2xl mx-auto">
            Traditional Telugu baby food made with love. Each product is crafted using time-tested recipes for your
            little one&apos;s nutrition and wellbeing.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, index) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="relative aspect-square overflow-hidden bg-[#FFECD9]">
                    <Image
                      src={productImages[index % productImages.length]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.is_featured && (
                      <div className="absolute top-4 left-4 bg-[#E8A87C] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Best Seller
                      </div>
                    )}
                    {product.compare_at_price && (
                      <div className="absolute top-4 right-4 bg-[#C9D4C5] text-[#6B5844] text-xs font-bold px-3 py-1 rounded-full">
                        Save ₹{product.compare_at_price - product.price}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#A89076]">({product.review_count || 0})</span>
                    </div>
                    <h3 className="font-semibold text-lg text-[#8B7355] mb-1 group-hover:text-[#E8A87C] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#A89076] mb-4 line-clamp-2">{product.short_description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#E8A87C]">₹{product.price}</span>
                        {product.compare_at_price && (
                          <span className="text-sm text-[#A89076] line-through">₹{product.compare_at_price}</span>
                        )}
                      </div>
                      <span className="text-xs text-[#A89076] bg-[#FDF8F3] px-2 py-1 rounded-full">
                        {product.weight}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(!products || products.length === 0) && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-[#E8A87C]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-2">Products Coming Soon</h2>
              <p className="text-[#A89076] mb-6">
                We&apos;re preparing our delicious products for you. Check back soon!
              </p>
              <Button className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-[#FFECD9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-4">Why Parents Trust Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold text-[#E8A87C]">10K+</div>
              <div className="text-sm text-[#A89076]">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E8A87C]">100%</div>
              <div className="text-sm text-[#A89076]">Natural Ingredients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E8A87C]">0</div>
              <div className="text-sm text-[#A89076]">Preservatives</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#E8A87C]">4.8</div>
              <div className="text-sm text-[#A89076]">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
