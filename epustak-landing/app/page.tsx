"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Reusable Pricing Section Component
function PricingSection() {
  return (
    <div className="mt-12 mb-8">
      <p className="text-[#ff0000] text-5xl font-bold mb-8">
        ACTUAL COST : ₹ 999/-
      </p>
      <Button 
        onClick={() => window.open('https://rzp.io/rzp/obLdjIgb', '_blank')}
        className="bg-[#ff4d4d] hover:bg-red-600 text-white text-3xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
      >
        JUST RS.99/- ONLY
      </Button>
    </div>
  )
}

export default function LandingPage() {
  const [minutes, setMinutes] = useState(9)
  const [seconds, setSeconds] = useState(58)

  // Fixed timer logic using functional updates
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 0) {
              // Reset to 9:58 when timer completes
              setSeconds(58)
              return 9
            }
            return prevMinutes - 1
          })
          return 59
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const features = [
    { id: 1, text: "90% Discount offer" },
    { id: 2, text: "800+ EBooks" },
    { id: 3, text: "Instant Access" },
    { id: 4, text: "Mobile Friendly" },
    { id: 5, text: "Lifetime Access" },
    { id: 6, text: "All PDF Files" },
    { id: 7, text: "All Hindi eBooks" },
    { id: 8, text: "Downloadable Files" },
    { id: 9, text: "High Quality eBooks" },
    { id: 10, text: "Neat and clean files" },
  ]

  const BOOK_IMAGES = ['1.webp', '2.webp', '3.webp', '4.webp', '5.jpg']

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      {/* Black Section */}
      <div className="w-full bg-black text-white py-8">
        <main className="max-w-screen-lg w-full mx-auto text-center">
          {/* Hero Section */}
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#FFD700] leading-tight">
            बिल गेट्स तो साल की <span className="text-white">50 बुक्स</span> पढ़ते है, <span className="text-green-400">अगर आपने दिन में 5 पेज भी पढ़ लिए</span> तो आप का कल बदल सकता है
          </h1>
          <br/>
          <p className="text-2xl md:text-3xl text-orange-500 mb-8">
            सफल इंसान की ये एक आदत आपको सफल बनाकर ही छोड़ेगी।
          </p>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <Image
                src="/assets/Richest_India.jpg"
                alt="Successful Business Leaders"
                width={1200}
                height={630}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
            </div>

            {/* Features List */}
            <div className="w-full md:w-1/2 text-left space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <Check 
                    aria-hidden="true" 
                    className="h-6 w-6 text-green-500 flex-shrink-0" 
                  />
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timer Section */}
          <section 
            aria-label="Countdown timer" 
            className="flex justify-center gap-12 my-12 text-[#FFD700] text-6xl font-bold"
          >
            <div>
              <span>{minutes.toString().padStart(2, "0")}</span>
              <p className="text-lg text-white">Minutes</p>
            </div>
            <div>
              <span>{seconds.toString().padStart(2, "0")}</span>
              <p className="text-lg text-white">Seconds</p>
            </div>
          </section>

          <PricingSection />
        </main>
      </div>

      {/* White Section */}
      <div className="w-full bg-white text-black py-8">
        <main className="max-w-screen-lg w-full mx-auto text-center">
          {/* Books Section */}
          <h2 className="text-4xl font-bold mt-8">
            <span className="text-pink-500">800+ किताबें</span> कौन सी होगी?
          </h2>

          {/* Book Showcase */}
          <div className="mt-8 relative">
            <div className="flex flex-wrap justify-center gap-4 p-4">
              {BOOK_IMAGES.map((img, index) => (
                <Image
                  key={index}
                  src={`/assets/${img}`}
                  alt={`Book ${index + 1}`}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform"
                  loading={index > 2 ? "lazy" : "eager"}
                />
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-[#ff0066]">800+ किताबें</span> का गूगल ड्राइव में DEMO
            </h2>
            
            <div className="flex flex-col items-center gap-8">
              <video 
                controls 
                className="w-full max-w-[400px] rounded-lg shadow-lg"
                poster="/assets/800_self_help_ebook.webp"
                playsInline
                preload="metadata"
                aria-label="Demo of 800+ eBooks in Google Drive"
              >
                <source src="/assets/eBooks_Demo_Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <PricingSection />
        </main>
      </div>
    </div>
  )
}