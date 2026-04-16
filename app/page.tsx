"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PredictionForm } from "@/components/prediction-form"
import { ResultsPanel } from "@/components/results-panel"
import { ModelComparison } from "@/components/model-comparison"
import { DatasetInfo } from "@/components/dataset-info"
import { Footer } from "@/components/footer"
import { callPredictionApi } from "@/lib/api/diabetes-api"
import type { PredictionResult, FormData } from "@/lib/types"

export default function Home() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const predictionRef = useRef<HTMLDivElement>(null)

  const handlePredict = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await callPredictionApi(formData)
      
      if (response.success && response.data) {
        setResult(response.data)
      } else {
        setError(response.error || "Une erreur est survenue")
      }
    } catch (err) {
      setError("Impossible de contacter le serveur")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  const scrollToPrediction = () => {
    predictionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onStartClick={scrollToPrediction} />
      
      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <HeroSection onStartClick={scrollToPrediction} />
        </section>
        
        {/* PREDICTION SECTION */}
        <section 
          ref={predictionRef} 
          id="prediction" 
          className="py-24 bg-muted/50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-primary text-sm font-medium tracking-wide uppercase mb-3">
                Outil de prediction
              </span>
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Evaluez votre risque de diabete
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Completez le formulaire avec vos donnees medicales pour obtenir 
                une estimation personnalisee basee sur notre modele.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <PredictionForm 
                onPredict={handlePredict} 
                onReset={handleReset}
                isLoading={isLoading} 
              />
              <ResultsPanel 
                result={result} 
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </section>

        {/* MODELS SECTION */}
        <section id="models">
          <ModelComparison />
        </section>

        {/* DATASET SECTION */}
        <section id="dataset">
          <DatasetInfo />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}