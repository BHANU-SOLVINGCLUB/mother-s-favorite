import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

const posts = [
  {
    title: "Why Uggu is the Perfect First Food for Your Baby",
    excerpt: "Discover the centuries-old wisdom behind Telugu traditional baby food...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Dec 6, 2024",
    slug: "why-uggu-perfect-first-food",
  },
  {
    title: "Traditional Telugu Baby-Feeding Practices",
    excerpt: "Explore the time-tested feeding practices from Telugu culture...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Nov 29, 2024",
    slug: "traditional-telugu-baby-feeding",
  },
  {
    title: "5 Signs Your Baby is Ready for Solid Foods",
    excerpt: "Learn to recognize the developmental milestones that indicate...",
    image: "/placeholder.svg?height=200&width=300",
    date: "Nov 21, 2024",
    slug: "signs-baby-ready-solid-foods",
  },
]

export function BlogPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Parenting Tips & Guides</h2>
            <p className="text-[#A89076] max-w-xl">
              Expert advice on baby nutrition, feeding tips, and traditional wisdom for new parents
            </p>
          </div>
          <Button variant="ghost" className="text-[#E8A87C] hover:text-[#D4956B] mt-4 md:mt-0" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-[#FDF8F3] rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#A89076] mb-3">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <h3 className="font-semibold text-lg text-[#8B7355] mb-2 group-hover:text-[#E8A87C] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#A89076] line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
