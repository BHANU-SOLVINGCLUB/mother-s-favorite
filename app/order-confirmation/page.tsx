import Link from "next/link"
import { CheckCircle, Package, Truck, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Order Confirmed | Mother's Favorite",
}

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const params = await searchParams
  const orderNumber = params.order || "N/A"

  return (
    <div className="bg-[#FDF8F3] min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-[#C9D4C5] rounded-full animate-ping opacity-25" />
              <div className="relative w-32 h-32 bg-[#C9D4C5] rounded-full flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#8B7355] mb-4">Order Confirmed!</h1>
            <p className="text-lg text-[#A89076] mb-8">
              Thank you for your order. We&apos;ll send you a confirmation email shortly.
            </p>

            {/* Order Number */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
              <div className="text-sm text-[#A89076] mb-2">Order Number</div>
              <div className="text-2xl font-bold text-[#E8A87C]">{orderNumber}</div>
            </div>

            {/* What's Next */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 text-left">
              <h2 className="font-semibold text-lg text-[#8B7355] mb-6 text-center">What Happens Next?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-[#E8A87C]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#8B7355]">Order Processing</div>
                    <div className="text-sm text-[#A89076]">
                      We&apos;ll prepare your order with care. This usually takes 1-2 days.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="h-6 w-6 text-[#E8A87C]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#8B7355]">Shipping</div>
                    <div className="text-sm text-[#A89076]">
                      You&apos;ll receive a tracking number once your order ships. Expected delivery: 3-5 business days.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FFECD9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-[#E8A87C]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#8B7355]">Need Help?</div>
                    <div className="text-sm text-[#A89076]">
                      Contact us at +91 98765 43210 or hello@mothersfavorite.in for any queries.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white rounded-full px-8 bg-transparent"
                asChild
              >
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
