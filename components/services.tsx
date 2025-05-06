"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Code, Database, Server, Shield, Zap, BarChart, Layout, Smartphone, Globe } from "lucide-react"

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

export default function Services() {
  const services = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Frontend Development",
      description:
        "Creating responsive, interactive user interfaces with React.js and Next.js that deliver exceptional user experiences.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Development",
      description:
        "Design and implementation of robust, scalable RESTful and GraphQL APIs that power modern applications.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Architecture",
      description:
        "Expert database design, optimization, and migration services for PostgreSQL, MongoDB, and other systems.",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Microservices",
      description: "Building distributed systems with microservices architecture for scalability and maintainability.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Responsive Web Apps",
      description: "Developing web applications that work flawlessly across all devices and screen sizes.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Full-Stack Solutions",
      description: "End-to-end development from frontend to backend, creating cohesive and integrated applications.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Implementation",
      description:
        "Implementing robust authentication, authorization, and data protection measures for web applications.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Identifying and resolving bottlenecks to enhance system performance and reduce latency.",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Data Visualization",
      description: "Building interactive dashboards and data visualization tools for complex information.",
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
