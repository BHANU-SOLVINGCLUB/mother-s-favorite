"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, ShoppingBag, User, Search, Home, Package, Users, Heart, ChefHat, BookOpen, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/benefits", label: "Benefits", icon: Heart },
  { href: "/preparation", label: "How to Prepare", icon: ChefHat },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-[#FDF8F3]/95 backdrop-blur-md shadow-sm" : "bg-[#FDF8F3]",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-uggu.png"
              alt="Mother's Favorite - Uggu"
              width={180}
              height={60}
              className="h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#8B7355] hover:text-[#E8A87C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]"
              asChild
            >
              <Link href="/auth/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]"
              asChild
            >
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A87C] text-xs font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#FDF8F3] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-[#F5EDE4]">
                    <SheetTitle className="font-serif text-lg font-bold text-[#8B7355]">Menu</SheetTitle>
                  </div>
                  <nav className="flex flex-col p-4 gap-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-3 px-4 py-3 text-[#8B7355] hover:bg-[#FFECD9] hover:text-[#E8A87C] rounded-xl transition-colors font-medium"
                        >
                          <Icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      )
                    })}
                  </nav>
                  <div className="mt-auto p-4 border-t border-[#F5EDE4]">
                    <Button className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white" asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
