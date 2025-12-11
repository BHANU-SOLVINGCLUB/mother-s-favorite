import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Lakshmi Devi",
    location: "Hyderabad",
    rating: 5,
    content:
      "My 8-month-old loves this Uggu! The texture is perfect and I can see the difference in her energy levels. So happy I found this authentic Telugu recipe.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Priya Reddy",
    location: "Vijayawada",
    rating: 5,
    content:
      "This brings back memories of my childhood. Now my baby gets the same traditional nutrition. No artificial ingredients, just pure goodness!",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Madhavi Rao",
    location: "Chennai",
    rating: 5,
    content:
      "Three generations of our family have grown up on Uggu. So glad to find a reliable source for this traditional food. Highly recommend!",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Loved by Telugu Parents</h2>
          <p className="text-[#A89076] max-w-2xl mx-auto">
            Join thousands of happy parents who trust Mother Uggu for their little ones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-[#FDF8F3] rounded-3xl p-8 relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-[#E8A87C]/20" />

              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-[#8B7355] mb-6 relative z-10">&ldquo;{testimonial.content}&rdquo;</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E8A87C]"
                />
                <div>
                  <div className="font-semibold text-[#8B7355]">{testimonial.name}</div>
                  <div className="text-sm text-[#A89076]">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
