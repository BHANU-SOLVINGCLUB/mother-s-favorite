import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Shield, Leaf, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#E8A87C]/10 rounded-full" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#C9D4C5]/10 rounded-full" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-[#FFD9B8]/15 rounded-full" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Star className="h-4 w-4 text-[#E8A87C] fill-current" />
              <span className="text-sm font-medium text-[#5C4A3A]">Trusted by 10,000+ Telugu Parents</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4A3A] mb-6 leading-tight text-balance">
              Pure Love in <span className="text-[#E8A87C]">Every Spoon</span>
            </h1>

            <p className="text-lg text-[#6B5844] mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
              Mother Uggu - the traditional Telugu baby cereal made with love. 100% homemade, no preservatives, no
              colors, no additives. Just pure, wholesome nutrition for your little one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8 text-lg shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#5C4A3A] text-[#5C4A3A] hover:bg-[#5C4A3A] hover:text-white rounded-full px-8 text-lg bg-transparent"
                asChild
              >
                <Link href="/benefits">Learn Benefits</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#C9D4C5]/50 rounded-full">
                  <Shield className="h-5 w-5 text-[#5C4A3A]" />
                </div>
                <span className="text-sm font-medium text-[#5C4A3A]">FSSAI Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#C9D4C5]/50 rounded-full">
                  <Leaf className="h-5 w-5 text-[#5C4A3A]" />
                </div>
                <span className="text-sm font-medium text-[#5C4A3A]">100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#C9D4C5]/50 rounded-full">
                  <Heart className="h-5 w-5 text-[#5C4A3A]" />
                </div>
                <span className="text-sm font-medium text-[#5C4A3A]">Made with Love</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up animation-delay-200">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFECD9] to-[#FFD9B8] rounded-[3rem] transform rotate-6 scale-95" />

              {/* Main Image */}
              <div className="relative bg-white rounded-[2.5rem] p-6 shadow-2xl">
                <Image
                  src="/product_image1.jpeg"
                  alt="Mother Uggu - Traditional Telugu Baby Cereal"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-2xl animate-float object-cover"
                  priority
                />

                {/* Floating Badge */}
                <div className="absolute -right-4 top-8 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#E8A87C]">4.8</div>
                    <div className="flex gap-0.5 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-[#E8A87C] fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-[#6B5844] mt-1">156 Reviews</div>
                  </div>
                </div>

                {/* Age Badge */}
                <div className="absolute -left-4 bottom-16 bg-[#C9D4C5] rounded-2xl px-4 py-3 shadow-lg">
                  <div className="text-sm font-bold text-[#4A3D30]">6+ Months</div>
                  <div className="text-xs text-[#5C4A3A]">Age Suitable</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
