"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

const WISHLIST_KEY = "mother_uggu_wishlist"

export interface WishlistItem {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  image: string
  addedAt: number
}

interface WishlistContextType {
  items: WishlistItem[]
  wishlistCount: number
  addToWishlist: (item: Omit<WishlistItem, "addedAt">) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  wishlistCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
})

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(WISHLIST_KEY)
      if (saved) {
        try {
          setItems(JSON.parse(saved))
        } catch {
          localStorage.removeItem(WISHLIST_KEY)
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && items.length > 0) {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
    }
  }, [items])

  const addToWishlist = useCallback((item: Omit<WishlistItem, "addedAt">) => {
    setItems((prev) => {
      // Check if already in wishlist
      if (prev.some((i) => i.id === item.id)) {
        return prev
      }
      const newItems = [...prev, { ...item, addedAt: Date.now() }]
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newItems))
      return newItems
    })
  }, [])

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id)
      if (newItems.length === 0) {
        localStorage.removeItem(WISHLIST_KEY)
      } else {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(newItems))
      }
      return newItems
    })
  }, [])

  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id)
    },
    [items]
  )

  const clearWishlist = useCallback(() => {
    setItems([])
    localStorage.removeItem(WISHLIST_KEY)
  }, [])

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount: items.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}


