import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { ProductFAQ } from "@/components/product-faq"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} | Mother's Favorite`,
    description: product.short_description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).eq("is_active", true).single()

  if (!product) {
    notFound()
  }

  const { data: variants } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", product.id)
    .order("price", { ascending: true })

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(10)

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .neq("id", product.id)
    .limit(3)

  return (
    <div className="bg-[#FDF8F3]">
      <ProductDetails product={product} variants={variants || []} />
      <ProductReviews
        reviews={reviews || []}
        productId={product.id}
        rating={product.rating}
        reviewCount={product.review_count}
      />
      <ProductFAQ />
      <RelatedProducts products={relatedProducts || []} />
    </div>
  )
}
