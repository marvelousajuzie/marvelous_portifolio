"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function ProfileSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Layered background patterns for depth */}
        <div className="absolute inset-0 bg-[url('/geometric-pattern.png')] opacity-5 bg-repeat" />

        {/* Professional gradient overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-purple-800/5 to-indigo-900/15"
          animate={{
            background: [
              "linear-gradient(to bottom right, rgba(30, 64, 175, 0.15), rgba(91, 33, 182, 0.05), rgba(49, 46, 129, 0.15))",
              "linear-gradient(to bottom right, rgba(49, 46, 129, 0.15), rgba(30, 64, 175, 0.05), rgba(91, 33, 182, 0.15))",
              "linear-gradient(to bottom right, rgba(91, 33, 182, 0.15), rgba(49, 46, 129, 0.05), rgba(30, 64, 175, 0.15))",
              "linear-gradient(to bottom right, rgba(30, 64, 175, 0.15), rgba(91, 33, 182, 0.05), rgba(49, 46, 129, 0.15))",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Subtle glass effect overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] mix-blend-overlay opacity-10" />

        {/* Animated subtle lines */}
        <div className="absolute h-px w-full top-1/4 left-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute h-px w-full top-2/4 left-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute h-px w-full top-3/4 left-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Animated subtle dots/particles */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl animate-pulse"
          style={{ animationDuration: "15s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl animate-pulse"
          style={{ animationDuration: "20s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-white/5 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-white/20">
                <Image src="/marvelbrown.jpg" alt="Marvelous Ajuzie" fill className="object-cover" />
              </div>
              <div className="absolute -inset-0.5 rounded-full border border-white/20 opacity-50" />
              <div className="absolute -inset-2 rounded-full border border-white/10 opacity-30" />
              <div className="absolute -inset-3 rounded-full border border-white/5 opacity-20" />

              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  aria-label="GitHub"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="mailto:marvelous@example.com"
                  aria-label="Email"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-2/3 text-center lg:text-left"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Fullstack Developer
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="block">Marvelous Ajuzie</span>
              <span className="block mt-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Crafting Digital Experiences
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8">
              I build exceptional digital experiences with modern technologies, specializing in both frontend and
              backend development to create seamless, scalable, and user-focused applications.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-sm text-gray-400">Location</span>
                <p className="font-medium">Lagos, Nigeria</p>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-sm text-gray-400">Experience</span>
                <p className="font-medium">5+ Years</p>
              </div>
              <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-sm text-gray-400">Availability</span>
                <p className="font-medium">Open to Work</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
