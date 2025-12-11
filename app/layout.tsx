import type React from "react"
import type { Metadata } from "next"
import { Nunito_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Mother's Favorite - Traditional Telugu Baby Food | Mother Uggu",
  description:
    "Mother Uggu - 100% homemade traditional Telugu baby cereal for babies 6+ months. No preservatives, no colors, no additives. Trusted by generations of Telugu families.",
  keywords: "baby food, uggu, telugu baby food, traditional baby cereal, homemade baby food, infant nutrition",
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#E8A87C",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
            <Toaster 
              position="top-center" 
              toastOptions={{
                style: {
                  background: '#FDF8F3',
                  border: '1px solid #E5DDD4',
                  color: '#8B7355',
                  borderRadius: '1rem',
                  fontFamily: 'var(--font-nunito)',
                },
                classNames: {
                  success: 'bg-[#C9D4C5] border-[#A8B9A3] text-[#4A5D47]',
                  error: 'bg-red-50 border-red-200 text-red-700',
                  actionButton: 'bg-[#E8A87C] text-white hover:bg-[#D4956B]',
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
