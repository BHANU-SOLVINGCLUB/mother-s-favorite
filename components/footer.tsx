import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#8B7355] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#FFECD9] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl font-bold text-[#8B7355] mb-2">Join Our Family</h3>
            <p className="text-[#A89076] mb-6">Get parenting tips, exclusive offers, and updates on new products</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border-[#E8A87C] focus:ring-[#E8A87C] rounded-full px-6"
              />
              <Button type="submit" className="bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full px-8">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo-uggu.png"
                alt="Mother's Favorite - Uggu"
                width={160}
                height={55}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-[#D4C4B0] text-sm mb-4">
              Traditional Telugu baby food made with love. 100% homemade, no preservatives, trusted by generations.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="p-2 bg-[#A89076] hover:bg-[#E8A87C] rounded-full transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-[#A89076] hover:bg-[#E8A87C] rounded-full transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-[#A89076] hover:bg-[#E8A87C] rounded-full transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-[#A89076] hover:bg-[#E8A87C] rounded-full transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Benefits of Uggu
                </Link>
              </li>
              <li>
                <Link href="/preparation" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Preparation Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#D4C4B0] hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#E8A87C] flex-shrink-0 mt-0.5" />
                <span className="text-[#D4C4B0] text-sm">Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#E8A87C] flex-shrink-0" />
                <span className="text-[#D4C4B0] text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#E8A87C] flex-shrink-0" />
                <span className="text-[#D4C4B0] text-sm">hello@mothersfavorite.in</span>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-[#A89076] rounded-full text-xs">FSSAI Certified</div>
              <div className="px-3 py-1 bg-[#A89076] rounded-full text-xs">100% Natural</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#A89076]">
          <div className="text-center">
            <p className="text-[#D4C4B0] text-sm">© 2025 Mother&apos;s Favorite. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
