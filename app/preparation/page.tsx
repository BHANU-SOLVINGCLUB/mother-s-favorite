import { Clock, Thermometer, Utensils, AlertCircle, Download, PlayCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Preparation Guide | Mother's Favorite",
  description: "Learn how to prepare Mother Uggu perfectly for your baby with our step-by-step guide.",
}

export default function PreparationPage() {
  const steps = [
    {
      step: 1,
      title: "Measure",
      description: "Take 2-3 tablespoons of Mother Uggu powder for one serving",
      tip: "Start with smaller quantities for babies just starting solids",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      step: 2,
      title: "Add Liquid",
      description: "Gradually add lukewarm water or breast milk/formula",
      tip: "Use about 1/2 cup of liquid for a smooth consistency",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      step: 3,
      title: "Mix Well",
      description: "Stir continuously to avoid lumps and achieve smooth texture",
      tip: "A whisk works great for getting a perfectly smooth consistency",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      step: 4,
      title: "Cook (Optional)",
      description: "For warm porridge, cook on low heat for 2-3 minutes",
      tip: "Keep stirring while cooking to prevent sticking",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      step: 5,
      title: "Cool & Serve",
      description: "Let it cool to a comfortable temperature before serving",
      tip: "Test on your wrist – it should feel lukewarm, not hot",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-6">
              How to Prepare Mother Uggu
            </h1>
            <p className="text-lg text-[#A89076]">
              Simple steps to prepare the perfect nutritious meal for your little one
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-[#E8A87C]" />
              </div>
              <div className="font-semibold text-[#8B7355]">5 Minutes</div>
              <div className="text-sm text-[#A89076]">Prep Time</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-3">
                <Thermometer className="h-6 w-6 text-[#E8A87C]" />
              </div>
              <div className="font-semibold text-[#8B7355]">Lukewarm</div>
              <div className="text-sm text-[#A89076]">Serving Temp</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-6 w-6 text-[#E8A87C]" />
              </div>
              <div className="font-semibold text-[#8B7355]">1 Serving</div>
              <div className="text-sm text-[#A89076]">Per Recipe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-video bg-[#8B7355] rounded-3xl overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=700"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <PlayCircle className="h-12 w-12 text-[#E8A87C]" />
                </button>
              </div>
            </div>
            <p className="text-center text-[#A89076] mt-4">
              Watch our step-by-step video guide for preparing Mother Uggu
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-12 text-center">Step-by-Step Instructions</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#E8A87C] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 bg-[#FDF8F3] rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-[#8B7355] mb-2">{step.title}</h3>
                      <p className="text-[#A89076] mb-4">{step.description}</p>
                      <div className="flex items-start gap-2 text-sm text-[#8B7355] bg-[#FFECD9] rounded-xl p-3">
                        <AlertCircle className="h-5 w-5 text-[#E8A87C] flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Tip:</strong> {step.tip}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-32 h-32 rounded-2xl object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Guide */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-12 text-center">Feeding Guide by Age</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                age: "6-8 Months",
                consistency: "Thin & Runny",
                amount: "1-2 tablespoons",
                frequency: "1-2 times daily",
                tip: "Start with very thin consistency mixed with breast milk",
              },
              {
                age: "9-12 Months",
                consistency: "Medium Thick",
                amount: "2-3 tablespoons",
                frequency: "2-3 times daily",
                tip: "Can add mashed fruits or vegetables for variety",
              },
              {
                age: "12-24 Months",
                consistency: "Thick Porridge",
                amount: "3-4 tablespoons",
                frequency: "2-3 times daily",
                tip: "Can serve as a meal with added nuts powder or jaggery",
              },
            ].map((guide) => (
              <div key={guide.age} className="bg-white rounded-3xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-[#E8A87C] text-white rounded-full font-semibold mb-4">
                    {guide.age}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-[#A89076]">Consistency</div>
                    <div className="font-medium text-[#8B7355]">{guide.consistency}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#A89076]">Amount per Serving</div>
                    <div className="font-medium text-[#8B7355]">{guide.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#A89076]">Frequency</div>
                    <div className="font-medium text-[#8B7355]">{guide.frequency}</div>
                  </div>
                  <div className="pt-4 border-t border-[#F5EDE4]">
                    <div className="text-sm text-[#E8A87C]">{guide.tip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-[#FFECD9]">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-12 text-center">Pro Tips for Parents</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Store Mother Uggu in an airtight container in a cool, dry place",
              "Use within 3 months of opening for best freshness",
              "Always prepare fresh for each feeding – don't store prepared Uggu",
              "Add a pinch of cardamom powder for enhanced flavor",
              "Can mix with mashed banana or apple for variety",
              "Introduce one new food at a time to check for allergies",
            ].map((tip, index) => (
              <div key={index} className="flex gap-3 items-start bg-white rounded-2xl p-4">
                <div className="w-8 h-8 bg-[#E8A87C] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-[#8B7355]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Guide */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-4">Download Printable Guide</h2>
            <p className="text-[#A89076] mb-8">
              Get our complete feeding guide with age-appropriate portions and recipes
            </p>
            <Button size="lg" className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8">
              <Download className="mr-2 h-5 w-5" />
              Download PDF Guide
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#8B7355]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Ready to Start Your Baby&apos;s Uggu Journey?
          </h2>
          <p className="text-[#D4C4B0] mb-8 max-w-2xl mx-auto">
            Order Mother Uggu today and give your baby the nutrition they deserve
          </p>
          <Button size="lg" className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
