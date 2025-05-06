"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CaseStudy() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-12">
          <div className="inline-block px-3 py-1 border border-gray-700 rounded-full text-sm text-gray-400 mb-4">
            Case Study
          </div>
          <h3 className="text-2xl font-bold mb-4">E-commerce Platform Redesign</h3>
          <p className="text-gray-400 mb-6">
            A complete redesign and development of an e-commerce platform with Next.js frontend and Node.js backend.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">The Challenge</h4>
              <p className="text-gray-400">
                The client needed to modernize their outdated e-commerce platform to improve user experience, increase
                conversion rates, and enable rapid feature development.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">The Solution</h4>
              <p className="text-gray-400">
                I designed and implemented a modern, responsive frontend with Next.js and a scalable backend with
                Node.js microservices, using PostgreSQL for data storage and Redis for caching.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">The Results</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 mt-2 bg-white rounded-full mr-3"></div>
                  <span>42% increase in conversion rate</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 mt-2 bg-white rounded-full mr-3"></div>
                  <span>65% improvement in page load speed</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 mt-2 bg-white rounded-full mr-3"></div>
                  <span>3x faster deployment of new features</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/10">
              <Link href="#">
                Read Full Case Study <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative h-full min-h-[300px] md:min-h-full">
          <Image src="/ecommerce-case-study.jpg" alt="E-commerce Platform Redesign" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/80" />

          <div className="absolute bottom-8 right-8 md:left-8 md:right-auto">
            <div className="flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Technologies</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/10 text-xs rounded-full">Next.js</span>
                  <span className="px-2 py-1 bg-white/10 text-xs rounded-full">React.js</span>
                  <span className="px-2 py-1 bg-white/10 text-xs rounded-full">Node.js</span>
                  <span className="px-2 py-1 bg-white/10 text-xs rounded-full">PostgreSQL</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Timeline</div>
                <div className="text-sm">3 months</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
