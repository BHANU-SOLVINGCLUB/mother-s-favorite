import { Shield, Award, Leaf, Heart, Clock, Truck } from "lucide-react"

const badges = [
  { icon: Shield, label: "FSSAI Certified", description: "Government approved food safety" },
  { icon: Leaf, label: "100% Natural", description: "No artificial ingredients" },
  { icon: Award, label: "Premium Quality", description: "Handpicked ingredients" },
  { icon: Heart, label: "Made with Love", description: "Small batch preparation" },
  { icon: Clock, label: "Fresh Daily", description: "Prepared in small quantities" },
  { icon: Truck, label: "Pan India Delivery", description: "We deliver everywhere" },
]

export function TrustBadges() {
  return (
    <section className="py-16 bg-[#8B7355]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => (
            <div key={badge.label} className="text-center">
              <div className="w-14 h-14 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-3">
                <badge.icon className="h-7 w-7 text-[#E8A87C]" />
              </div>
              <div className="font-semibold text-white text-sm mb-1">{badge.label}</div>
              <div className="text-xs text-white/70">{badge.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
