import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductHighlight } from "@/components/product-highlight"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PreparationPreview } from "@/components/preparation-preview"
import { TrustBadges } from "@/components/trust-badges"
import { BlogPreview } from "@/components/blog-preview"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductHighlight />
      <TestimonialsSection />
      <PreparationPreview />
      <TrustBadges />
      <BlogPreview />
    </>
  )
}
