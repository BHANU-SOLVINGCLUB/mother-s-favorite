"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8A87C]">
                <span className="font-serif text-xl font-bold text-white">M</span>
              </div>
            </Link>
            <h1 className="font-serif text-2xl font-bold text-[#8B7355]">Welcome Back</h1>
            <p className="text-[#A89076] mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#8B7355]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#8B7355]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
              />
            </div>

            {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</div>}

            <Button
              type="submit"
              className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-[#A89076]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-[#E8A87C] hover:underline font-medium">
              Sign up
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-[#A89076] hover:text-[#E8A87C]">
              Continue as Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
