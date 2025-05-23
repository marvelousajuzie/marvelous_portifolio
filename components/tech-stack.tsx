"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type Technology = {
  name: string
  category: "frontend" | "backend" | "database" | "tool"
  icon: string
  proficiency: number
  description: string
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const technologies: Technology[] = [
    // Frontend

    {
      name: "Flutter",
      category: "frontend",
      icon: "⚛️",
      proficiency: 95,
      description: "Flutter for building Mobile Application for both android and IOS",
    },
    {
      name: "React.js",
      category: "frontend",
      icon: "⚛️",
      proficiency: 95,
      description: "JavaScript library for building user interfaces with component-based architecture",
    },
  
    {
      name: "TypeScript",
      category: "frontend",
      icon: "𝗧𝗦",
      proficiency: 85,
      description: "Strongly typed programming language that builds on JavaScript",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      icon: "🌊",
      proficiency: 90,
      description: "Utility-first CSS framework for rapidly building custom user interfaces",
    },
    {
      name: "JavaScrips",
      category: "frontend",
      icon: "🔄",
      proficiency: 80,
      description: "Javascripts Language",
    },

    // Backend
   
    {
      name: "Python",
      category: "backend",
      icon: "🐍",
      proficiency: 85,
      description: "Versatile language used for data processing, API development, and automation",
    },

    {
      name: "Flask",
      category: "backend",
      icon: "🧪",
      proficiency: 85,
      description: "Lightweight WSGI web application framework in Python",
    },

    {
      name: "Django",
      category: "backend",
      icon: "🎸",
      proficiency: 75,
      description: "High-level Python web framework that encourages rapid development",
    },

    // Database
    {
      name: "PostgreSQL",
      category: "database",
      icon: "🐘",
      proficiency: 90,
      description: "Powerful, open source object-relational database system",
    },
    {
      name: "MongoDB",
      category: "database",
      icon: "🍃",
      proficiency: 85,
      description: "Document-oriented NoSQL database used for high volume data storage",
    },


    // Tools
    {
      name: "Docker",
      category: "tool",
      icon: "🐳",
      proficiency: 85,
      description: "Platform for developing, shipping, and running applications in containers",
    },
    {
      name: "Git",
      category: "tool",
      icon: "🔄",
      proficiency: 90,
      description: "Distributed version control system for tracking changes in source code",
    },
    {
      name: "AWS",
      category: "tool",
      icon: "☁️",
      proficiency: 80,
      description: "Comprehensive cloud computing platform with various services",
    },

  ]

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "database", name: "Databases" },
    { id: "tool", name: "Tools" },
  ]

  const filteredTechnologies = activeCategory
    ? technologies.filter((tech) => tech.category === activeCategory)
    : technologies

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full transition-all border",
            activeCategory === null
              ? "bg-white text-black border-white"
              : "bg-transparent border-white/20 text-white hover:bg-white/5",
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-full transition-all border",
              activeCategory === category.id
                ? "bg-white text-black border-white"
                : "bg-transparent border-white/20 text-white hover:bg-white/5",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTechnologies.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mr-4 text-2xl">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold">{tech.name}</h3>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 mb-2 relative z-10">
                <motion.div
                  className="bg-white h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                ></motion.div>
              </div>
              <div className="mt-2 text-sm text-gray-400 flex justify-between relative z-10">
                <span>Proficiency</span>
                <span>{tech.proficiency}%</span>
              </div>

              <AnimatePresence>
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300 relative z-10"
                  >
                    {tech.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
