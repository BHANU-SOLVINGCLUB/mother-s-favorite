import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
}

const productImages = [
  "/product_image1.jpeg",
  "/product_image2.jpeg",
  "/product_image3.jpeg",
]

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 bg-[#FFECD9]">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-8 text-center">You May Also Like</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group">
              <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={productImages[index % productImages.length]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-[#8B7355] group-hover:text-[#E8A87C] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-[#E8A87C]">₹{product.price}</span>
                    {product.compare_at_price && (
                      <span className="text-sm text-[#A89076] line-through">₹{product.compare_at_price}</span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
