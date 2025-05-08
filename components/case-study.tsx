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
          <h3 className="text-2xl font-bold mb-4">Aleris AI Conversational Health Companion</h3>
          <p className="text-gray-400 mb-6">
          Aleris AI is an intelligent health assistant that empowers users to manage everyday wellness through natural conversations. Built with a seamless onboarding experience and conversational AI, it helps users diagnose symptoms, get wellness tips, and access personalized advice on when to seek professional care.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">The Challenge</h4>
              <p className="text-gray-400">
              Health-related information can be overwhelming and inaccessible to many individuals, especially when trying to understand symptoms or make decisions about seeking medical help. The goal was to design an intuitive, private, and accessible tool to bridge the gap between users and reliable health guidance.

              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">The Solution</h4>
              <p className="text-gray-400">
              The frontend was built with React and TailwindCSS for fast, responsive UI development. Backend services(Supabase) (where applicable) are designed to integrate securely with AI APIs and authentication providers. The conversational AI is structured to allow for scalable prompt customization and feedback learning.
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
            </Button>
          </div>
        </div>

        <div className="relative h-full min-h-[300px] md:min-h-full">
          <Image src="/aleris-dashboard.png" alt="Aleris AI" fill className="object-cover" />
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
