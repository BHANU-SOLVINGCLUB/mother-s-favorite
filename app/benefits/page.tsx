import { Check, Brain, Heart, Shield, Zap, Leaf, Baby } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Benefits of Uggu | Mother's Favorite",
  description: "Discover the science-backed benefits of traditional Uggu for your baby's growth and development.",
}

export default function BenefitsPage() {
  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-6">Why Choose Mother Uggu?</h1>
            <p className="text-lg text-[#A89076]">
              Science-backed benefits of traditional Telugu baby cereal for your little one&apos;s optimal growth
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Brain Development",
                description:
                  "Rich in iron and essential fatty acids that support cognitive development during crucial early months.",
                color: "bg-[#E8A87C]",
              },
              {
                icon: Zap,
                title: "Sustained Energy",
                description:
                  "Complex carbohydrates provide steady energy release, keeping your baby active and alert throughout the day.",
                color: "bg-[#C9D4C5]",
              },
              {
                icon: Heart,
                title: "Healthy Heart",
                description:
                  "Low in saturated fats and rich in heart-healthy nutrients that set the foundation for lifelong wellness.",
                color: "bg-[#FFD9B8]",
              },
              {
                icon: Shield,
                title: "Strong Immunity",
                description:
                  "Natural vitamins and minerals boost your baby's immune system, helping fight off common infections.",
                color: "bg-[#E8A87C]",
              },
              {
                icon: Leaf,
                title: "Easy Digestion",
                description:
                  "Traditional roasting process breaks down complex starches, making it gentle on delicate tummies.",
                color: "bg-[#C9D4C5]",
              },
              {
                icon: Baby,
                title: "Healthy Growth",
                description:
                  "Complete protein profile with all essential amino acids supports muscle development and healthy weight gain.",
                color: "bg-[#FFD9B8]",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-[#8B7355] mb-3">{benefit.title}</h3>
                <p className="text-[#A89076]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Chart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">
              Mother Uggu vs Commercial Baby Cereals
            </h2>
            <p className="text-[#A89076] max-w-2xl mx-auto">
              See why traditional Uggu outperforms mass-produced alternatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#FDF8F3] rounded-3xl overflow-hidden">
              <div className="grid grid-cols-3 bg-[#8B7355] text-white p-4">
                <div className="font-semibold">Feature</div>
                <div className="font-semibold text-center">Mother Uggu</div>
                <div className="font-semibold text-center">Commercial Cereals</div>
              </div>
              {[
                { feature: "Preservatives", uggu: "None", commercial: "Added" },
                { feature: "Artificial Colors", uggu: "None", commercial: "Often Added" },
                { feature: "Sugar Content", uggu: "Natural Only", commercial: "Added Sugars" },
                { feature: "Preparation Method", uggu: "Traditional Roasting", commercial: "Industrial Processing" },
                { feature: "Ingredient Source", uggu: "Local & Fresh", commercial: "Mass Sourced" },
                { feature: "Nutrient Retention", uggu: "High", commercial: "Reduced" },
                { feature: "Digestibility", uggu: "Excellent", commercial: "Average" },
                { feature: "Cultural Authenticity", uggu: "100% Traditional", commercial: "Generic" },
              ].map((row, index) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? "bg-white" : "bg-[#FDF8F3]"}`}
                >
                  <div className="text-[#8B7355] font-medium">{row.feature}</div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-[#8B7355]">{row.uggu}</span>
                  </div>
                  <div className="text-center text-[#A89076]">{row.commercial}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nutritional Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-6">Nutritional Excellence</h2>
              <p className="text-[#A89076] mb-8">
                Each serving of Mother Uggu is packed with essential nutrients that support your baby&apos;s growth and
                development during the crucial first years of life.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { nutrient: "Protein", value: "12g", desc: "per 100g" },
                  { nutrient: "Iron", value: "15%", desc: "Daily Value" },
                  { nutrient: "Calcium", value: "10%", desc: "Daily Value" },
                  { nutrient: "Fiber", value: "4g", desc: "per 100g" },
                ].map((item) => (
                  <div key={item.nutrient} className="bg-white rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#E8A87C]">{item.value}</div>
                    <div className="font-medium text-[#8B7355]">{item.nutrient}</div>
                    <div className="text-xs text-[#A89076]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Healthy baby eating"
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Recommendation */}
      <section className="py-20 bg-[#C9D4C5]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-[#E8A87C]" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-6">Pediatrician Recommended</h2>
            <blockquote className="text-lg text-[#A89076] italic mb-6">
              &ldquo;Traditional baby foods like Uggu have been the cornerstone of infant nutrition in our culture for
              centuries. The combination of roasted grains and pulses provides an excellent nutritional profile that
              supports healthy growth while being gentle on the digestive system.&rdquo;
            </blockquote>
            <p className="text-[#8B7355] font-medium">— Dr. Priya Sharma, Pediatric Nutritionist</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FFECD9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-6">
            Give Your Baby the Best Start
          </h2>
          <p className="text-[#A89076] max-w-2xl mx-auto mb-8">
            Join thousands of parents who trust Mother Uggu for their baby&apos;s nutrition
          </p>
          <Button size="lg" className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
