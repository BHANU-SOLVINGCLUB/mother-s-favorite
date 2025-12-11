import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Blog | Mother's Favorite",
  description: "Expert advice on baby nutrition, feeding tips, and traditional wisdom for new parents.",
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-6">Parenting Tips & Guides</h1>
            <p className="text-lg text-[#A89076]">
              Expert advice on baby nutrition, traditional wisdom, and helpful tips for new parents
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {posts[0] && (
                <Link href={`/blog/${posts[0].slug}`} className="block mb-12 group">
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={
                            posts[0].cover_image || "/placeholder.svg?height=400&width=600&query=baby nutrition article"
                          }
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-[#A89076] mb-4">
                          {posts[0].category && (
                            <span className="px-3 py-1 bg-[#FFECD9] rounded-full text-[#E8A87C]">
                              {posts[0].category}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(posts[0].published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-4 group-hover:text-[#E8A87C] transition-colors">
                          {posts[0].title}
                        </h2>
                        <p className="text-[#A89076] mb-6 line-clamp-3">{posts[0].excerpt}</p>
                        <div className="flex items-center text-[#E8A87C] font-medium">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Other Posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.cover_image || "/placeholder.svg?height=300&width=400&query=baby parenting article"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-sm text-[#A89076] mb-3">
                          {post.category && (
                            <span className="px-2 py-1 bg-[#FDF8F3] rounded-full text-xs text-[#E8A87C]">
                              {post.category}
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.published_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-[#8B7355] mb-2 group-hover:text-[#E8A87C] transition-colors line-clamp-2 flex-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#A89076] line-clamp-2">{post.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-12 w-12 text-[#E8A87C]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-2">Coming Soon</h2>
              <p className="text-[#A89076] mb-6">We&apos;re preparing helpful articles for you. Check back soon!</p>
              <Button className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#FFECD9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-[#A89076] max-w-2xl mx-auto mb-8">
            Get the latest parenting tips, exclusive offers, and updates delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white border border-[#E8A87C] rounded-full focus:outline-none focus:ring-2 focus:ring-[#E8A87C]"
              required
            />
            <Button type="submit" className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
