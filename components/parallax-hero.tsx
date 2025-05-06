"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center"
        style={{ y: backgroundY }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />

      <motion.div
        className="absolute top-1/3 left-0 w-full text-center text-white text-opacity-10 text-[150px] font-bold tracking-wider pointer-events-none hidden md:block"
        style={{ y: textY }}
      >
        FULLSTACK
      </motion.div>
    </div>
  )
}
