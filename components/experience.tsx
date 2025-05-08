"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string[]
  isActive: boolean
  onClick: () => void
}

function ExperienceItem({ title, company, period, description, isActive, onClick }: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-8 relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-white/20",
        isActive ? "before:bg-white" : "before:bg-white/20",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-3 h-3 rounded-full transform -translate-x-1/2 cursor-pointer transition-all",
          isActive ? "bg-white scale-125" : "bg-white/50 scale-100",
        )}
        onClick={onClick}
      ></div>
      <div
        className={cn("transition-all cursor-pointer", isActive ? "scale-105 origin-left" : "scale-100")}
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-400">
          <span className="font-medium">{company}</span>
          <span className="hidden sm:block sm:mx-2">•</span>
          <span>{period}</span>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="mt-4 space-y-2">
          {description.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-1.5 h-1.5 mt-2 bg-white/40 rounded-full mr-3"></div>
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(0)

  const experiences = [
    {
      title: "Software Developer",
      company: "Klipto Tchnology",
      period: "2023 - 2024",
      description: [
        "Lead development of a Next.js e-commerce platform with 1M+ monthly active users",
        "Architected and implemented microservices using Node.js and Python",
        "Optimized database queries resulting in 40% reduction in response time",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Mentored junior developers and conducted technical interviews",
        "Collaborated with product managers to define technical requirements and roadmaps",
      ],
    },
   
  ]

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <ExperienceItem
          key={index}
          title={exp.title}
          company={exp.company}
          period={exp.period}
          description={exp.description}
          isActive={activeExperience === index}
          onClick={() => setActiveExperience(index)}
        />
      ))}
    </div>
  )
}
