"use client"

import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDF8F3]">
      <div className="flex flex-col items-center">
        {/* Logo with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping opacity-20">
            <Image
              src="/logo-uggu.png"
              alt="Loading..."
              width={120}
              height={45}
              className="h-16 w-auto object-contain"
            />
          </div>
          <Image
            src="/logo-uggu.png"
            alt="Mother's Favorite"
            width={120}
            height={45}
            className="h-16 w-auto object-contain animate-pulse"
            priority
          />
        </div>
        
        {/* Loading dots */}
        <div className="mt-8 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        
        {/* Loading text */}
        <p className="mt-4 text-sm text-[#A89076] animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export function LoadingSpinner({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "h-8 w-auto",
    default: "h-12 w-auto",
    large: "h-16 w-auto",
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Image
        src="/logo-uggu.png"
        alt="Loading..."
        width={100}
        height={40}
        className={`${sizeClasses[size]} object-contain animate-pulse`}
      />
      <div className="mt-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#E8A87C] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  )
}
