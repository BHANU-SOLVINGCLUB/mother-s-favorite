import { Heart, Users, Leaf, Award, Clock, Star } from "lucide-react"

export const metadata = {
  title: "About Us | Mother's Favorite",
  description: "Learn about our story, mission, and commitment to providing traditional Telugu baby food.",
}

export default function AboutPage() {
  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-6">Our Story</h1>
            <p className="text-lg text-[#A89076]">Born from a mother&apos;s love, crafted with generations of wisdom</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Mother preparing traditional Uggu"
                className="rounded-3xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-6">A Mother&apos;s Promise</h2>
              <div className="space-y-4 text-[#A89076]">
                <p>
                  Mother&apos;s Favorite began in a small kitchen in Hyderabad, where a young mother was searching for
                  the perfect first food for her baby. Like many Telugu mothers before her, she turned to her
                  grandmother&apos;s recipe for Uggu – a traditional baby cereal that has nourished generations of
                  children.
                </p>
                <p>
                  What started as a personal quest to give her child the best possible nutrition soon became a mission
                  to share this ancient wisdom with modern parents. She realized that many young mothers, especially
                  those living away from their families, didn&apos;t have access to these traditional recipes.
                </p>
                <p>
                  Today, Mother&apos;s Favorite bridges the gap between tradition and convenience, bringing the same
                  homemade goodness that Telugu grandmothers have prepared for centuries – now available to families
                  everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Our Values</h2>
            <p className="text-[#A89076] max-w-2xl mx-auto">
              Every decision we make is guided by our commitment to your baby&apos;s health and happiness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Made with Love",
                description:
                  "Every batch is prepared with the same care and attention a mother would give to her own child's food.",
              },
              {
                icon: Leaf,
                title: "100% Natural",
                description:
                  "We use only the finest natural ingredients with absolutely no preservatives, colors, or additives.",
              },
              {
                icon: Users,
                title: "Family Legacy",
                description:
                  "Our recipes have been passed down through generations of Telugu families, preserving authentic taste.",
              },
              {
                icon: Award,
                title: "Quality First",
                description:
                  "Every ingredient is carefully sourced and every batch is tested to ensure the highest quality.",
              },
              {
                icon: Clock,
                title: "Traditional Methods",
                description:
                  "We use time-honored roasting and preparation techniques that maximize nutrition and digestibility.",
              },
              {
                icon: Star,
                title: "Parent Approved",
                description: "Trusted by thousands of parents and recommended by pediatricians across India.",
              },
            ].map((value) => (
              <div key={value.title} className="bg-[#FDF8F3] rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-[#E8A87C]" />
                </div>
                <h3 className="font-semibold text-xl text-[#8B7355] mb-3">{value.title}</h3>
                <p className="text-[#A89076]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It's Made */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">How Uggu is Made</h2>
            <p className="text-[#A89076] max-w-2xl mx-auto">
              A meticulous process that preserves nutrition and enhances digestibility
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Sourcing",
                description: "We source the finest grains and pulses from trusted local farmers",
              },
              {
                step: 2,
                title: "Cleaning",
                description: "Each ingredient is thoroughly cleaned and inspected for quality",
              },
              {
                step: 3,
                title: "Roasting",
                description: "Traditional slow-roasting to enhance flavor and digestibility",
              },
              {
                step: 4,
                title: "Grinding",
                description: "Finely ground to the perfect consistency for baby's delicate palate",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 bg-[#E8A87C] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-[#8B7355] mb-2">{item.title}</h3>
                <p className="text-sm text-[#A89076]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-[#FFECD9]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-white rounded-full text-sm text-[#E8A87C] font-medium mb-4">
                Meet the Founder
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-6">A Mother First, Entrepreneur Second</h2>
              <div className="space-y-4 text-[#A89076]">
                <p>
                  &ldquo;When I became a mother, I wanted to give my baby the same traditional nutrition I grew up with.
                  But living away from family, I realized how difficult it was to prepare authentic Uggu with my busy
                  schedule.&rdquo;
                </p>
                <p>
                  &ldquo;That&apos;s when I decided to create Mother&apos;s Favorite – not just as a business, but as a
                  solution for mothers like me who want the best for their children without compromising on tradition or
                  convenience.&rdquo;
                </p>
                <p className="font-semibold text-[#8B7355]">– Founder, Mother&apos;s Favorite</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="/placeholder.svg?height=500&width=500" alt="Founder" className="rounded-3xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Happy Families" },
              { number: "50,000+", label: "Babies Nourished" },
              { number: "4.8", label: "Average Rating" },
              { number: "15+", label: "Cities Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-[#E8A87C] mb-2">{stat.number}</div>
                <div className="text-[#A89076]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
