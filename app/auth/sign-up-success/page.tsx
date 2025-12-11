import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="w-20 h-20 bg-[#C9D4C5] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-10 w-10 text-white" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-[#8B7355] mb-4">Check Your Email</h1>

          <p className="text-[#A89076] mb-8">
            We&apos;ve sent you a confirmation email. Please click the link in the email to verify your account.
          </p>

          <div className="space-y-4">
            <Button className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
              <Link href="/auth/login">
                Go to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Link href="/" className="block text-sm text-[#A89076] hover:text-[#E8A87C]">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
