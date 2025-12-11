import type React from "react"
import type { Metadata } from "next"
import { Nunito_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartProvider } from "@/lib/cart-context"
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
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
