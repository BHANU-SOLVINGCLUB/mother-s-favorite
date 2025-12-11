"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, ShoppingBag, User, Search, Home, Package, Users, Heart, ChefHat, BookOpen, Phone, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { toast } from "sonner"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkAuth()

    // Listen for auth changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    toast.success("Signed out successfully")
    router.push("/")
  }

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false)
  }

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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden lg:flex text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#E8A87C] flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-[#E5DDD4]">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-[#8B7355]">Signed in as</p>
                    <p className="text-xs text-[#A89076] truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#E5DDD4]" />
                  <DropdownMenuItem asChild className="cursor-pointer text-[#8B7355] focus:bg-[#FFECD9] focus:text-[#E8A87C]">
                    <Link href="/wishlist">
                      <Heart className="mr-2 h-4 w-4" />
                      My Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#E5DDD4]" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="cursor-pointer text-[#8B7355] focus:bg-[#FFECD9] focus:text-[#5C4A3A]"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#8B7355] hover:text-[#E8A87C] hover:bg-[#FFECD9]"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A87C] text-xs font-bold text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
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
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
                  
                  {/* User Info (if logged in) */}
                  {user && (
                    <div className="p-4 border-b border-[#F5EDE4] bg-[#FFECD9]/30">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#E8A87C] flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#8B7355]">Welcome back!</p>
                          <p className="text-xs text-[#A89076] truncate max-w-[180px]">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={handleMobileLinkClick}
                          className="flex items-center gap-3 px-4 py-3 text-[#8B7355] hover:bg-[#FFECD9] hover:text-[#E8A87C] rounded-xl transition-colors font-medium"
                        >
                          <Icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      )
                    })}
                    {/* Wishlist Link */}
                    <Link
                      href="/wishlist"
                      onClick={handleMobileLinkClick}
                      className="flex items-center gap-3 px-4 py-3 text-[#8B7355] hover:bg-[#FFECD9] hover:text-[#E8A87C] rounded-xl transition-colors font-medium"
                    >
                      <Heart className="h-5 w-5" />
                      My Wishlist
                      {wishlistCount > 0 && (
                        <span className="ml-auto bg-[#E8A87C] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </nav>
                  <div className="p-4 border-t border-[#F5EDE4]">
                    {user ? (
                      <Button 
                        variant="outline"
                        className="w-full border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white rounded-full" 
                        onClick={() => {
                          handleSignOut()
                          setIsMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    ) : (
                      <Button className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full" asChild>
                        <Link href="/auth/login" onClick={handleMobileLinkClick}>Sign In</Link>
                      </Button>
                    )}
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
