import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Mother's Favorite Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) {
    notFound()
  }

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", post.id)
    .limit(3)

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-[#E8A87C] hover:text-[#D4956B] mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#A89076] mb-4">
              {post.category && <span className="px-3 py-1 bg-white rounded-full text-[#E8A87C]">{post.category}</span>}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <span>By {post.author_name}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#8B7355] mb-6 text-balance">
              {post.title}
            </h1>

            {post.excerpt && <p className="text-lg text-[#A89076]">{post.excerpt}</p>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.cover_image && (
              <div className="mb-12">
                <img
                  src={post.cover_image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full rounded-3xl shadow-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#8B7355] prose-p:text-[#A89076] prose-a:text-[#E8A87C] prose-strong:text-[#8B7355]">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#E5DDD4]">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-[#F5EDE4] rounded-full text-sm text-[#8B7355]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-[#E5DDD4]">
              <div className="flex items-center gap-4">
                <span className="text-[#8B7355] font-medium">Share this article:</span>
                <div className="flex gap-2">
                  <button className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-90">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-90">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-[#8B7355] text-white rounded-full hover:opacity-90">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                  <article className="bg-[#FDF8F3] rounded-2xl overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.cover_image || "/placeholder.svg?height=200&width=300"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#8B7355] group-hover:text-[#E8A87C] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#FFECD9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-4">Ready to Give Your Baby the Best?</h2>
          <p className="text-[#A89076] mb-6">
            Try Mother Uggu today and experience the difference of traditional nutrition
          </p>
          <Button className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
