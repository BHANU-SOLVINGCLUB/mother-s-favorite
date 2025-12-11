"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: submitError } = await supabase.from("contact_messages").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject || null,
        message: formData.message,
      })

      if (submitError) throw submitError

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error("Error submitting contact form:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FDF8F3]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFECD9] to-[#FDF8F3] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B7355] mb-6">Get in Touch</h1>
            <p className="text-lg text-[#A89076]">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFECD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#E8A87C]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#8B7355]">Address</div>
                      <div className="text-[#A89076]">
                        Hyderabad, Telangana
                        <br />
                        India - 500001
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFECD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#E8A87C]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#8B7355]">Phone</div>
                      <div className="text-[#A89076]">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFECD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#E8A87C]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#8B7355]">Email</div>
                      <div className="text-[#A89076]">hello@mothersfavorite.in</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#FFECD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#E8A87C]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#8B7355]">Support Hours</div>
                      <div className="text-[#A89076]">
                        Mon - Sat: 9:00 AM - 6:00 PM
                        <br />
                        Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-[#C9D4C5]/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  <span className="font-semibold text-[#8B7355]">Quick Chat on WhatsApp</span>
                </div>
                <p className="text-sm text-[#A89076] mb-4">
                  Get instant support for your queries. We typically respond within minutes!
                </p>
                <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full" asChild>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    Chat with Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#8B7355] mb-6">Send us a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#C9D4C5] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl text-[#8B7355] mb-2">Message Sent!</h3>
                    <p className="text-[#A89076]">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <Button
                      className="mt-6 bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-[#8B7355]">
                          Your Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-[#8B7355]">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-[#8B7355]">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
                          placeholder="Enter your phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-[#8B7355]">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[#8B7355]">
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="mt-1 border-[#E5DDD4] focus:border-[#E8A87C] focus:ring-[#E8A87C]"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button
                      type="submit"
                      className="w-full bg-[#E8A87C] hover:bg-[#D4956B] text-white rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#8B7355] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#A89076] mb-8">Find quick answers to common questions about Mother Uggu</p>
          <Button
            variant="outline"
            className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white rounded-full bg-transparent"
            asChild
          >
            <a href="/faq">View All FAQs</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
