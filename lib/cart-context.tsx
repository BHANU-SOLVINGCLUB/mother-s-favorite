"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { getSessionId } from "@/lib/cart"

interface CartContextType {
  cartCount: number
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0)

  const refreshCart = useCallback(async () => {
    try {
      const supabase = createClient()
      const sessionId = getSessionId()

      if (!sessionId) return

      const { data, error } = await supabase.from("cart_items").select("quantity").eq("session_id", sessionId)

      if (error) throw error

      const count = data?.reduce((sum, item) => sum + item.quantity, 0) || 0
      setCartCount(count)
    } catch (error) {
      console.error("Error fetching cart count:", error)
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  return <CartContext.Provider value={{ cartCount, refreshCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
