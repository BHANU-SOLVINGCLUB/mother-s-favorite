"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Review } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"

interface ProductReviewsProps {
  reviews: Review[]
  productId: string
  rating: number
  reviewCount: number
}

export function ProductReviews({ reviews, productId, rating, reviewCount }: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newReview, setNewReview] = useState({
    author_name: "",
    author_location: "",
    rating: 5,
    title: "",
    content: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("reviews").insert({
        product_id: productId,
        ...newReview,
      })

      if (error) throw error

      setSubmitted(true)
      setShowForm(false)
      setNewReview({
        author_name: "",
        author_location: "",
        rating: 5,
        title: "",
        content: "",
      })
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: reviews.length ? (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100 : 0,
  }))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8B7355] mb-8 text-center">Customer Reviews</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="bg-[#FDF8F3] rounded-3xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-[#E8A87C] mb-2">{rating?.toFixed(1) || "0.0"}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating || 0) ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#A89076]">Based on {reviewCount || 0} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm text-[#8B7355] w-8">{stars}★</span>
                  <div className="flex-1 h-2 bg-[#E5DDD4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8A87C] rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-[#A89076] w-8">{count}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-6 bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
              onClick={() => setShowForm(!showForm)}
            >
              Write a Review
            </Button>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Review Form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="bg-[#FFECD9] rounded-3xl p-6 mb-6">
                <h3 className="font-semibold text-[#8B7355] mb-4">Write Your Review</h3>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="text-[#8B7355]">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      value={newReview.author_name}
                      onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })}
                      required
                      className="mt-1 bg-white border-[#E5DDD4]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-[#8B7355]">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newReview.author_location}
                      onChange={(e) => setNewReview({ ...newReview, author_location: e.target.value })}
                      className="mt-1 bg-white border-[#E5DDD4]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-[#8B7355]">Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${star <= newReview.rating ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="title" className="text-[#8B7355]">
                    Review Title
                  </Label>
                  <Input
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="mt-1 bg-white border-[#E5DDD4]"
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="content" className="text-[#8B7355]">
                    Your Review
                  </Label>
                  <Textarea
                    id="content"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    required
                    rows={4}
                    className="mt-1 bg-white border-[#E5DDD4]"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#8B7355] hover:bg-[#6B5844] text-white rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            )}

            {submitted && (
              <div className="bg-[#C9D4C5] text-[#6B5844] rounded-2xl p-4 mb-6">
                Thank you for your review! It will be visible after moderation.
              </div>
            )}

            {/* Reviews */}
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-[#FDF8F3] rounded-3xl">
                <p className="text-[#A89076]">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-[#FDF8F3] rounded-3xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-[#E8A87C] fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      {review.title && <h4 className="font-semibold text-[#8B7355]">{review.title}</h4>}
                    </div>
                    {review.is_verified && (
                      <span className="text-xs bg-[#C9D4C5] text-[#6B5844] px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  <p className="text-[#A89076] mb-4">{review.content}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[#8B7355]">
                      <span className="font-medium">{review.author_name}</span>
                      {review.author_location && <span className="text-[#A89076]"> • {review.author_location}</span>}
                    </div>
                    <button className="flex items-center gap-1 text-[#A89076] hover:text-[#E8A87C]">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
