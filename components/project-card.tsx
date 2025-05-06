"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  link?: string
}

export default function ProjectCard({ title, description, technologies, image, link }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 z-10" />
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20">
          <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">{technologies[0]}</div>
        </div>
      </div>
      <div className="p-6 relative">
        <div className="absolute -top-12 left-6 right-6 h-12 bg-gradient-to-t from-black/90 to-transparent z-0" />
        <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(1).map((tech) => (
            <span key={tech} className="px-3 py-1 bg-white/5 text-xs rounded-full border border-white/10">
              {tech}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-white group-hover:text-gray-300 transition-colors"
          >
            View Project{" "}
            <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
