"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code, Database, Server, Shield, Zap, Layout, Globe, Smartphone, Palette } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 mb-6 group-hover:bg-white/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function UpdatedServices() {
  const services = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Frontend Development",
      description:
        "Creating responsive, interactive user interfaces with React.js, Next.js, and modern CSS frameworks like Tailwind.",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Backend Development",
      description:
        "Building robust server-side applications with Node.js, Express, and Python to power your digital products.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Development",
      description:
        "Design and implementation of RESTful and GraphQL APIs that enable seamless communication between systems.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Architecture",
      description:
        "Expert database design, optimization, and migration services for PostgreSQL, MongoDB, and other systems.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Full-Stack Web Apps",
      description:
        "End-to-end development of web applications that deliver exceptional user experiences with solid architecture.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Implementation",
      description:
        "Implementing robust authentication, authorization, and data protection measures for your applications.",
    },
   
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />
      ))}
    </div>
  )
}
