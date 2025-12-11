import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

const steps = [
  { number: 1, title: "Measure", description: "Take 2-3 tablespoons of Uggu powder" },
  { number: 2, title: "Mix", description: "Add lukewarm water or milk gradually" },
  { number: 3, title: "Stir", description: "Mix well to avoid lumps" },
  { number: 4, title: "Serve", description: "Serve at comfortable temperature" },
]

export function PreparationPreview() {
  return (
    <section className="py-20 bg-[#FFECD9]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl aspect-video">
              <img
                src="/product_image3.jpeg"
                alt="How to prepare Mother Uggu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors group">
                  <Play className="h-8 w-8 text-[#E8A87C] ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Ready in Minutes</h2>
            <p className="text-[#A89076] mb-8">
              Preparing Mother Uggu is simple and quick. Follow these easy steps to serve wholesome nutrition to your
              little one.
            </p>

            <div className="space-y-6 mb-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#E8A87C] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8B7355]">{step.title}</h3>
                    <p className="text-sm text-[#A89076]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-[#8B7355] hover:bg-[#6B5844] text-white rounded-full px-8" asChild>
              <Link href="/preparation">View Full Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
