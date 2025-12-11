import { Sparkles, Ban, Clock, Baby, Heart, Award } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "100% Homemade",
    description: "Every batch is prepared fresh in small quantities with traditional methods",
  },
  {
    icon: Ban,
    title: "No Preservatives",
    description: "Absolutely no artificial preservatives, colors, or additives",
  },
  {
    icon: Clock,
    title: "Easy to Prepare",
    description: "Ready in minutes - just add warm water or milk and serve",
  },
  {
    icon: Baby,
    title: "Baby Safe",
    description: "Gentle on tiny tummies, easy to digest, pediatrician approved",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Crafted with the same care a mother puts into her baby's food",
  },
  {
    icon: Award,
    title: "Traditional Recipe",
    description: "Time-tested Telugu recipe passed down through generations",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Why Mother Uggu?</h2>
          <p className="text-[#A89076] max-w-2xl mx-auto text-pretty">
            Every spoon of Mother Uggu carries the warmth of traditional Telugu kitchens and the purity your baby
            deserves
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-[#FDF8F3] rounded-3xl hover:bg-[#FFECD9] transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-[#E8A87C]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#E8A87C] transition-colors">
                <feature.icon className="h-7 w-7 text-[#E8A87C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-[#8B7355] mb-2">{feature.title}</h3>
              <p className="text-[#A89076] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
