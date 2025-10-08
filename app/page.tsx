"use client"

import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import UpdatedParallaxHero from "@/components/updated-parallax-hero"
import ProfileSection from "@/components/profile-section"
import UpdatedProjectCard from "@/components/updated-project-card"
import UpdatedServices from "@/components/updated-services"
import Experience from "@/components/experience"
import Testimonials from "@/components/testimonials"
import Stats from "@/components/stats"
import CaseStudy from "@/components/case-study"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })

      // Custom cursor effect
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["home", "profile", "services", "skills", "projects", "experience", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#profile" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  // Loading screen
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-300"
          >
            Marvelous Ajuzie
          </motion.div>
          <div className="relative w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed z-50 flex items-center justify-center transition-all duration-200 bg-white/10 backdrop-blur-sm"
      />

      {/* Fixed Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrollY > 50 ? "rgba(0,0,0,0.8)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Marvelous Ajuzie
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex space-x-8"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.href.substring(1) ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </motion.nav>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-lg md:hidden pt-20"
          >
            <nav className="flex flex-col items-center justify-center h-full">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-medium py-4 transition-colors ${
                      activeSection === item.href.substring(1) ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <UpdatedParallaxHero />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />

        {/* Animated particles */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-20 px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4 backdrop-blur-sm"
            >
              Fullstack Developer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            >
              <span className="block">Marvelous Ajuzie</span>
              <motion.span
                className="block mt-2 bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Building Digital Experiences
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl sm:text-2xl text-gray-400 max-w-2xl"
            >
              Crafting exceptional web applications with modern technologies.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              asChild
              className="group bg-white text-black hover:bg-gray-200 px-6 py-6 text-base relative overflow-hidden"
            >
              <Link href="#contact">
                <span className="relative z-10">Contact Me</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/20 hover:bg-white/10 px-6 py-6 text-base relative overflow-hidden"
            >
              <Link href="#projects">
                <span className="relative z-10">View Projects</span>
                <motion.span
                  className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex items-center gap-4"
          >
            <Link
              href="https://github.com/marvelousajuzie"
              target="_blank"
              aria-label="GitHub"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Github className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/marvelous-ajuzie-14652b2a4/"
              target="_blank"
              aria-label="LinkedIn"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </Link>

            <Link
              href="mailto:Chizurummarvelous14@gmail.com"
              aria-label="Email"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 border-t border-b border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stats />
        </div>
      </motion.section>

      {/* Profile Section */}
      <section id="profile">
        <ProfileSection />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, 30, 60, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, -50, 0, 50, 0],
            y: [0, -30, -60, -30, 0],
            scale: [1, 0.9, 1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Specialized Development Services
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              Expert solutions tailored to your technical challenges
            </p>
          </motion.div>
          <UpdatedServices />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Tech Stack
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-purple-300">
              Technical Expertise
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized in cutting-edge technologies for creating exceptional digital experiences.
            </p>
          </motion.div>

          <div className="relative">
            {/* Glowing orbs in background */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

            {/* 3D Rotating Tech Wheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="perspective-1000 mb-16"
            >
              <div className="tech-wheel relative h-[300px] w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-[200px] h-[200px] border border-white/20 rounded-full flex items-center justify-center">
                      <div className="w-[100px] h-[100px] border border-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {[
                  { name: "React", icon: "⚛️", angle: 0 },
                  { name: "Next.js", icon: "𝗡", angle: 40 },
                  { name: "Node.js", icon: "⬢", angle: 80 },
                  { name: "TypeScript", icon: "𝗧𝗦", angle: 120 },
                  { name: "PostgreSQL", icon: "🐘", angle: 160 },
                  { name: "MongoDB", icon: "🍃", angle: 200 },
                  { name: "Python", icon: "🐍", angle: 240 },
                  { name: "AWS", icon: "☁️", angle: 280 },
                  { name: "Docker", icon: "🐳", angle: 320 },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="absolute w-16 h-16 tech-item"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      transform: `rotate(${tech.angle}deg) translateX(150px) rotate(-${tech.angle}deg)`,
                    }}
                  >
                    <motion.div
                      className="w-full h-full bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</div>
                      <div className="text-xs mt-1 opacity-70 group-hover:opacity-100">{tech.name}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend",
                  description: "Creating beautiful, responsive user interfaces",
                  techs: [ "Flutter","React", "Next.js", "TypeScript", "Tailwind CSS",],
                  color: "from-blue-500/30 to-purple-500/30",
                  icon: (
                    <svg
                      className="w-7 h-7 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Backend",
                  description: "Building robust server-side applications",
                  techs: ["Python", "Django","Node.js", "Express", "Flask", "REST-API"],
                  color: "from-purple-500/30 to-blue-500/30",
                  icon: (
                    <svg
                      className="w-7 h-7 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Infrastructure",
                  description: "Deploying and scaling applications",
                  techs: ["AWS", "Docker", "PostgreSQL", "MongoDB"],
                  color: "from-blue-500/30 to-purple-500/30",
                  icon: (
                    <svg
                      className="w-7 h-7 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  ),
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}
                  ></div>
                  <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 h-full">
                    <motion.div
                      className="tech-category-icon w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative z-10">{category.icon}</div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1 bg-white/5 text-xs rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10" />

        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
              style={{
                top: `${index * 20 + 10}%`,
                left: 0,
                right: 0,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 15 + index * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: index * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Case Study
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              An in-depth look at one of my most impactful projects
            </p>
          </motion.div>
          <CaseStudy />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
                "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1), transparent 70%)",
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1), transparent 70%)",
                "radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1), transparent 70%)",
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 70%)",
              ],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Featured Projects
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              A selection of my recent fullstack development work
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <UpdatedProjectCard
                title="Aleris-AI"
                description="Aleris AI is a smart, conversational health companion designed to help individuals make informed decisions about their well-being. By simply describing your symptoms or asking health-related questions, Aleris uses advanced artificial intelligence to provide personalized insights"
                technologies={["Next.js", "React", "Javascripts", "Typescripts", "Supabase"]}
                image="/aleris.png"
                link="https://www.aleris-ai.site/"
              />
            </motion.div>


<motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <UpdatedProjectCard
                title="ClientFlow"
                description=" Client Flow is a secure web app where freelancers or small agencies can invite their clients to:
- View project updates  
- Download files  
- Receive/send invoices  
- Chat or leave comments  
- Track progress or deadlines  
"
                technologies={[ "Next.js", "React", "Javascripts", "Typescripts", "Supabase"]}
                image="/clientflow.png"
                link="https://clientflow.vercel.app/"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <UpdatedProjectCard
                title="SecuraBox"
                description="SecuraBox is a cutting-edge SaaS solution designed to safely store and manage your most sensitive information. From social media credentials to passwords, certificates, NIN, social security numbers, and other vital digital assets,"
                technologies={[ "Flutter", "Python", "Django","Next.js", "React", "Javascripts", "Typescripts", "PostgresQl"]}
                image="/securabox.png"
                link="https://securabox.vercel.app/"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <UpdatedProjectCard
                title="Ecommerce API"
                description="A responsive Ecommerce Application Programming Interface with buying of product, Cart, and Order"
                technologies={["Python", "Django", "PostgreSQL", "Docker"]}
                image="/Ecommerce.jpg"
                link="https://ecommerce-api-i8jm.onrender.com/"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <UpdatedProjectCard
                title="Todolist API"
                description="A responsive Todolist Application Programming Interface Where Users can create, Read, update and Delete"
                technologies={["Python", "Django", "PostgreSQL", "Docker"]}
                image="/Todolist_api.png"
                link="https://todolist-api-cv4n.onrender.com/"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              asChild
              variant="outline"
              className="border-white/20 hover:bg-white/10 relative overflow-hidden group"
            >
              <Link href="/projects">
                {/* <span className="relative z-10">View All Projects</span> */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
                <ExternalLink className="ml-2 w-4 h-4 relative z-10" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[url('/dots-pattern.png')] bg-repeat opacity-5"
            animate={{
              x: [0, 20, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              What Clients Say
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              Feedback from those who've experienced my work firsthand
            </p>
          </motion.div>
          <Testimonials />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black relative">
        {/* Animated timeline dots */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/30 left-1/2 transform -translate-x-1/2"
              style={{ top: `${index * 10 + 5}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Professional Journey
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">My career path as a fullstack developer</p>
          </motion.div>
          <div className="mt-12">
            <Experience />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
              Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              Get In Touch
            </h2>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
              Interested in working together? Let's discuss your project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative overflow-hidden group"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-x" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-4 relative overflow-hidden group-hover:bg-white/15 transition-colors">
                      <Mail className="w-5 h-5 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Email</div>
                      <a href="mailto:Chizurummarvelous14@gmail.com" className="hover:text-blue-300 transition-colors">
                      Chizurummarvelous14@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-4 relative overflow-hidden group-hover:bg-white/15 transition-colors">
                      <Linkedin className="w-5 h-5 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">LinkedIn</div>
                      <a
                        href="https://www.linkedin.com/in/marvelous-ajuzie-14652b2a4/"
                        target="_blank"
                        className="hover:text-blue-300 transition-colors"
                        rel="noreferrer"
                      >
                     linkedin.com/in/marvelous-ajuzie-14652b2a4/
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-4 relative overflow-hidden group-hover:bg-white/15 transition-colors">
                      <Github className="w-5 h-5 relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100"
                        initial={{ y: "100%" }}
                        whileHover={{ y: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">GitHub</div>
                      <a
                        href="https://github.com/marvelousajuzie"
                        target="_blank"
                        className="hover:text-blue-300 transition-colors"
                        rel="noreferrer"
                      >
                        github.com/marvelousajuzie
                      </a>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  <div className="relative z-10">
                    <h4 className="text-lg font-medium mb-4">Availability</h4>
                    <p className="text-gray-400 mb-4">
                      I'm currently available for freelance work and consulting. My typical response time is within 24
                      hours.
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Current Availability</span>
                      <span>70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all"
                      placeholder="Your name"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 w-0"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all"
                      placeholder="Your email"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 w-0"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all"
                    placeholder="Project inquiry"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all"
                    placeholder="Tell me about your project..."
                  ></textarea>
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 w-0"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-blue-500/50"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-blue-300 hover:text-white">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6 text-base relative overflow-hidden group">
                  <span className="relative z-10">Send Message</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10 relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"
            animate={{
              x: [0, 10, 0],
              y: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
                Marvelous Ajuzie
              </h3>
              <p className="mt-2 text-gray-400 max-w-md">
                Building exceptional digital experiences with modern technologies. Available for freelance work and
                consulting.
              </p>
              <div className="mt-6 flex gap-4">
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
                  <Link
                    href="https://github.com/marvelousajuzie"
                    target="_blank"
                    aria-label="GitHub"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all relative overflow-hidden"
                  >
                    <Github className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
                  <Link
                    href="https://www.linkedin.com/in/marvelous-ajuzie-14652b2a4/"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all relative overflow-hidden"
                  >
                    <Linkedin className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 500, damping: 10 }}>
                  <Link
                    href="mailto:chizurummarvelous14@gmail.com"
                    aria-label="Email"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all relative overflow-hidden"
                  >
                    <Mail className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Link href={item.href} className="text-gray-400 hover:text-blue-300 transition-colors">
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Marvelous Ajuzie. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              Designed & Built with <span className="inline-block animate-pulse text-red-500">❤️</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}
