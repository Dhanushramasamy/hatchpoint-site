"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Upload, CheckCircle, X } from "lucide-react"

interface FormData {
  fullName: string
  contactNumber: string
  email: string
  location: string
  experience: string
  domainPreference: string
  otherDomain: string
  resume: File | null
  referralCode: string
  suggestions: string
}

interface OnboardingWizardProps {
  isOpen: boolean
  onClose: () => void
}

export default function OnboardingWizard({ isOpen, onClose }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    location: "",
    experience: "",
    domainPreference: "",
    otherDomain: "",
    resume: null,
    referralCode: "",
    suggestions: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    updateFormData("resume", file)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const body = new FormData()
      body.append("fullName", formData.fullName)
      body.append("contactNumber", formData.contactNumber)
      body.append("email", formData.email)
      body.append("location", formData.location)
      body.append("experience", formData.experience)
      body.append("domainPreference", formData.domainPreference)
      body.append("otherDomain", formData.otherDomain || "")
      body.append("referralCode", formData.referralCode || "")
      body.append("suggestions", formData.suggestions || "")
      if (formData.resume) {
        body.append("resume", formData.resume)
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        body,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit application")
      }

      alert("Thank you! Your application has been submitted successfully.")
      onClose()
    } catch (error: any) {
      alert(error?.message || "Something went wrong. Please try again.")
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.contactNumber && formData.email && formData.location && formData.experience
      case 2:
        return formData.domainPreference && (formData.domainPreference !== "other" || formData.otherDomain)
      case 3:
        return true
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-2xl mx-auto bg-white border border-gray-200 shadow-2xl animate-scale-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-900">Join HatchPoint</CardTitle>
          <p className="text-gray-600">Let's get started on your career journey</p>
          <div className="mt-4">
            <Progress value={progress} className="w-full h-2 bg-gray-200 [&>div]:bg-gray-900" />
            <p className="text-sm text-gray-600 mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-900">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-900">
                    Contact Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter your contact number"
                    value={formData.contactNumber}
                    onChange={(e) => updateFormData("contactNumber", e.target.value)}
                    className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-gray-900">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-3 block">
                    Are you a Fresher or Experienced? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={(value) => updateFormData("experience", value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fresher" id="fresher" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="fresher" className="cursor-pointer text-gray-700">
                        Fresher
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="experienced" id="experienced" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="experienced" className="cursor-pointer text-gray-700">
                        Experienced
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Information</h3>
                <p className="text-gray-600">Help us understand your career preferences</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-3 block">
                    Domain Preference <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.domainPreference}
                    onValueChange={(value) => updateFormData("domainPreference", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="core" id="core" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="core" className="cursor-pointer text-gray-700">
                        Core
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="it" id="it" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="it" className="cursor-pointer text-gray-700">
                        IT
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-it" id="non-it" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="non-it" className="cursor-pointer text-gray-700">
                        Non IT
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" className="border-gray-900 text-gray-900" />
                      <Label htmlFor="other" className="cursor-pointer text-gray-700">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.domainPreference === "other" && (
                    <Input
                      placeholder="Please specify your domain"
                      value={formData.otherDomain}
                      onChange={(e) => updateFormData("otherDomain", e.target.value)}
                      className="mt-3 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400 animate-slide-up"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="resume" className="text-sm font-medium text-gray-900">
                    Upload Previous Resume
                  </Label>
                  <p className="text-xs text-gray-600 mb-2">Upload 1 supported file. Max 10 MB.</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group">
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Label htmlFor="resume" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2 group-hover:text-gray-700 transition-colors duration-300" />
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                      </p>
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="referralCode" className="text-sm font-medium text-gray-900">
                    Referral Code
                  </Label>
                  <Input
                    id="referralCode"
                    placeholder="Enter referral code (if any)"
                    value={formData.referralCode}
                    onChange={(e) => updateFormData("referralCode", e.target.value)}
                    className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Additional Information</h3>
                <p className="text-gray-600">Any specific requirements or suggestions?</p>
              </div>

              <div>
                <Label htmlFor="suggestions" className="text-sm font-medium text-gray-900">
                  Any Suggestions / Specific Requirements
                </Label>
                <Textarea
                  id="suggestions"
                  placeholder="Tell us about any specific requirements, career goals, or suggestions..."
                  rows={6}
                  value={formData.suggestions}
                  onChange={(e) => updateFormData("suggestions", e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 hover:border-gray-400"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-700" />
                  Review Your Information
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong className="text-gray-900">Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong className="text-gray-900">Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong className="text-gray-900">Experience:</strong> {formData.experience}
                  </p>
                  <p>
                    <strong className="text-gray-900">Domain:</strong>{" "}
                    {formData.domainPreference === "other" ? formData.otherDomain : formData.domainPreference}
                  </p>
                  {formData.resume && (
                    <p>
                      <strong className="text-gray-900">Resume:</strong> {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-300"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white hover:scale-105 transition-all duration-300"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
