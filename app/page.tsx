"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, FileText, Linkedin, Mail, Rocket, Star, Phone } from "lucide-react"
import OnboardingWizard from "@/components/onboarding-wizard"

export default function HatchPointLanding() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at 50% -20%, rgba(255,255,255,0.10), transparent 40%)",
          }}
        ></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up animation-delay-200">HatchPoint</h1>
            <div className="h-12 flex justify-center items-center mb-8">
              <p className="text-xl md:text-2xl text-slate-300 font-medium italic animate-fade-in-up animation-delay-400">
                Your Next Chapter Hatched
              </p>
            </div>

            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
              We don't just write resumes — we craft career stories that get you noticed.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { text: "ATS-Friendly", delay: "animation-delay-800" },
                { text: "Customized for You", delay: "animation-delay-1000" },
                { text: "Visually Professional", delay: "animation-delay-1200" },
                { text: "Result-Oriented", delay: "animation-delay-1400" },
              ].map((item, index) => (
                <div key={index} className={`flex items-center gap-2 text-white animate-fade-in-up ${item.delay}`}>
                  <CheckCircle className="w-5 h-5 text-sky-400" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
              className="bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-1600"
            >
              Get Started Today
            </Button>
          </div>
        </div>

        {/* Decorative shapes removed for a clean, motion-free hero */}
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Comprehensive career solutions tailored to your professional journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Resume Writing",
                subtitle: "Freshers, professionals, executives",
                description:
                  "Professional resumes that showcase your unique value proposition and get past ATS systems.",
                color: "blue",
                delay: "animation-delay-400",
              },
              {
                icon: Linkedin,
                title: "LinkedIn Optimization",
                subtitle: "Strong online presence & recruiter reach",
                description: "Optimize your LinkedIn profile to attract recruiters and build your professional brand.",
                color: "indigo",
                delay: "animation-delay-600",
              },
              {
                icon: Mail,
                title: "Cover Letters",
                subtitle: "Job-specific & impactful",
                description: "Compelling cover letters that tell your story and connect with hiring managers.",
                color: "blue",
                delay: "animation-delay-800",
              },
              {
                icon: Rocket,
                title: "Career Branding",
                subtitle: "Personal branding & interview prep",
                description: "Build a strong personal brand and prepare for interviews with confidence.",
                color: "indigo",
                delay: "animation-delay-1000",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-gray-200 bg-white hover-lift hover-glow animate-rotate-in ${service.delay} opacity-0 hover:border-${service.color}-200`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`bg-${service.color}-50 group-hover:bg-${service.color}-100 p-3 rounded-lg transition-colors duration-300 group-hover:animate-wiggle`}
                    >
                      <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.subtitle}</p>
                      <p className="text-gray-700">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Experience the difference with our proven approach to career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Creative & Modern Approach",
                description: "Innovative strategies that set you apart from the competition",
              },
              {
                icon: CheckCircle,
                title: "Recruiter-Approved Templates",
                description: "Designs that hiring managers love and ATS systems recognize",
              },
              {
                icon: FileText,
                title: "ATS Compliant = Higher Shortlisting",
                description: "Optimized for applicant tracking systems to increase visibility",
              },
              {
                icon: Rocket,
                title: "Fast Turnaround",
                description: "Quick delivery without compromising on quality",
              },
              {
                icon: Star,
                title: "End-to-End Career Support",
                description: "Comprehensive guidance throughout your career journey",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center group hover-lift animate-bounce-in animation-delay-${400 + index * 200} opacity-0`}
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300 group-hover:animate-wiggle">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">Get In Touch</h2>
            <p className="text-lg text-gray-600 animate-fade-in-up animation-delay-200">
              Ready to hatch your next career chapter? Let's start the conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slide-in-left animation-delay-400 opacity-0">
              <div className="flex items-center gap-4 hover-lift">
                <div className="bg-blue-50 p-3 rounded-lg hover:animate-wiggle">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">pointhatch@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 hover-lift">
                <div className="bg-blue-50 p-3 rounded-lg hover:animate-wiggle">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 7010163048</p>
                </div>
              </div>
            </div>

            <Card className="bg-white border-gray-200 hover-lift animate-slide-in-right animation-delay-600 opacity-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Join our professional onboarding process and let us help you craft your perfect career story.
                </p>
                <Button
                  onClick={() => setShowOnboarding(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white animate-pulse-slow hover-glow"
                >
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl text-center animate-fade-in-up">
          <h3 className="text-2xl font-bold mb-2 hover:animate-wiggle">HatchPoint</h3>
          <p className="text-gray-300 mb-4">Your Next Chapter Hatched</p>
          <p className="text-sm text-gray-400">
            © 2025 HatchPoint. All rights reserved. Crafting career stories that get you noticed.
          </p>
        </div>
      </footer>

      <OnboardingWizard isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  )
}
