"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, FileText, Linkedin, Mail, Rocket, Star, Phone } from "lucide-react"
import OnboardingWizard from "@/components/onboarding-wizard"
import Image from "next/image"

export default function HatchPointLanding() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean and Professional */}
      <section className="relative py-24 px-4" style={{ background: 'linear-gradient(135deg, #cdf545 0%, #b8e63c 50%, #a3d735 100%)' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            {/* Logo - 4x Larger sizing */}
            <div className="flex justify-center mb-2 md:mb-4">
              <Image
                src="/whitebg_logo.png"
                alt="HatchPoint Logo"
                width={1200}
                height={1200}
                priority
                className="h-48 md:h-64 lg:h-72 w-auto"
              />
            </div>
            
            {/* Main Content - Better hierarchy */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-5xl text-white font-bold mb-6 leading-tight">
                Your Next Chapter Hatched
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-0 max-w-3xl mx-auto leading-relaxed font-light">
                We craft career stories that get you noticed.
              </p>
            </div>

            {/* CTA Button - Cleaner design */}
            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
              className="bg-white text-gray-900 px-12 py-4 text-lg font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section - Clean Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional career solutions designed to accelerate your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: "Resume Writing",
                description: "ATS-optimized resumes that showcase your unique value proposition.",
              },
              {
                icon: Linkedin,
                title: "LinkedIn Optimization",
                description: "Build a strong professional brand and attract top recruiters.",
              },
              {
                icon: Mail,
                title: "Cover Letters",
                description: "Compelling cover letters that tell your story effectively.",
              },
              {
                icon: Rocket,
                title: "Career Branding",
                description: "Complete personal branding and interview preparation.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-lime-100 group-hover:bg-lime-200 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                    <service.icon className="w-8 h-8 text-lime-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Clean Benefits */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose HatchPoint?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our proven approach to career success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Modern Approach",
                description: "Innovative strategies that set you apart from the competition.",
              },
              {
                icon: CheckCircle,
                title: "ATS Compliant",
                description: "Designs that hiring managers love and ATS systems recognize.",
              },
              {
                icon: Rocket,
                title: "Fast Delivery",
                description: "Quick turnaround without compromising on quality.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Clean and Simple */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Let's craft your perfect career story together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-lime-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">pointhatch@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-lime-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 7010163048</p>
                </div>
              </div>
            </div>

            <Card className="bg-gray-50 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Journey</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Join our professional onboarding process and let us help you craft your perfect career story.
                </p>
                <Button
                  onClick={() => setShowOnboarding(true)}
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 text-lg font-semibold rounded-full"
                >
                  Begin Onboarding
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Clean and Minimal */}
      <footer className="py-16 px-4" style={{ backgroundColor: '#cdf545' }}>
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/whitebg_logo.png"
              alt="HatchPoint Logo"
              width={600}
              height={600}
              className="h-44 md:h-48 w-auto"
            />
          </div>
          <p className="text-gray-900 text-lg font-medium mb-4">Your Next Chapter Hatched</p>
          <p className="text-gray-800">
            © 2025 HatchPoint. All rights reserved.
          </p>
        </div>
      </footer>

      <OnboardingWizard isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
