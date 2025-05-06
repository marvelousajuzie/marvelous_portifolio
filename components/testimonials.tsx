"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  avatar: string
  quote: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "CTO",
      company: "TechStart Inc.",
      avatar: "/avatar-1.jpg",
      quote:
        "Marvelous is an exceptional fullstack developer. Her ability to seamlessly work across the entire stack resulted in a product that exceeded our expectations both visually and functionally.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Product Manager",
      company: "DataFlow Systems",
      avatar: "/avatar-2.jpg",
      quote:
        "Working with Marvelous was a game-changer for our project. Her deep knowledge of React and Node.js helped us create an intuitive interface while maintaining excellent performance.",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Founder",
      company: "InnovateTech",
      avatar: "/avatar-3.jpg",
      quote:
        "Marvelous is the developer every startup dreams of having. She built our entire platform from scratch, making architectural decisions that have allowed us to scale rapidly without technical debt.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />

      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/5 rounded-full blur-xl" />

        <Quote className="w-12 h-12 text-white/20 mb-6" />

        <div className="relative h-[300px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              className="absolute inset-0"
            >
              <blockquote className="text-xl md:text-2xl font-light text-gray-300 italic mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/20">
                  <Image
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex space-x-2">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
