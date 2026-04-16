"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, TrendingUp, TrendingDown, Activity, AlertTriangle, Info } from "lucide-react"
import type { PredictionResult } from "@/lib/types"

interface ResultsPanelProps {
  result: PredictionResult | null
  isLoading: boolean
  error: string | null
}

export function ResultsPanel({ result, isLoading, error }: ResultsPanelProps) {
  if (isLoading) {
    return (
      <Card className="border-border shadow-sm bg-white">
        <CardContent className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-6" />
            <p className="text-lg font-medium text-foreground mb-2">Analyse en cours</p>
            <p className="text-sm text-muted-foreground">Traitement des donnees par le modele...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-border shadow-sm bg-white">
        <CardContent className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Erreur</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card className="border-border shadow-sm bg-white">
        <CardContent className="flex items-center justify-center min-h-[600px]">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">Pret pour l&apos;analyse</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Completez le formulaire et cliquez sur &quot;Lancer la prediction&quot; 
              pour obtenir une estimation du risque de diabete.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskConfig = (level: string) => {
    switch (level) {
      case "low": 
        return { 
          color: "text-emerald-600", 
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          progressColor: "bg-emerald-500",
          label: "Risque faible",
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          description: "Votre profil presente un faible risque de diabete."
        }
      case "moderate": 
        return { 
          color: "text-amber-600", 
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          progressColor: "bg-amber-500",
          label: "Risque modere",
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          description: "Quelques facteurs de risque ont ete identifies."
        }
      case "high": 
        return { 
          color: "text-red-600", 
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          progressColor: "bg-red-500",
          label: "Risque eleve",
          icon: <AlertCircle className="w-6 h-6 text-red-600" />,
          description: "Plusieurs facteurs de risque importants detectes."
        }
      default: 
        return { 
          color: "text-muted-foreground", 
          bgColor: "bg-muted",
          borderColor: "border-border",
          progressColor: "bg-muted",
          label: "Inconnu",
          icon: null,
          description: ""
        }
    }
  }

  const riskConfig = getRiskConfig(result.riskLevel)

  return (
    <Card className="border-border shadow-sm bg-white">
      <CardHeader className="pb-6 border-b border-border">
        <CardTitle className="text-xl font-semibold text-foreground">
          Resultat de l&apos;analyse
        </CardTitle>
        <CardDescription>
          Prediction generee par le modele {result.modelUsed}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className={`p-6 rounded-xl ${riskConfig.bgColor} border ${riskConfig.borderColor}`}>
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl ${riskConfig.bgColor} flex items-center justify-center`}>
              {riskConfig.icon}
            </div>
            <div>
              <span className={`text-lg font-semibold ${riskConfig.color}`}>
                {riskConfig.label}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                {riskConfig.description}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-baseline gap-1 mb-3">
              <span className={`text-5xl font-bold ${riskConfig.color}`}>
                {Math.min(100, Math.max(0, result.probability))}
              </span>
              <span className="text-2xl text-muted-foreground">%</span>
            </div>
            <Progress value={Math.min(100, Math.max(0, result.probability))} className="h-3 rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">Indice de confiance du modele</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {Math.round(result.confidence * 100)}%
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Facteurs d&apos;impact
          </h4>
          <div className="space-y-2">
            {result.shapValues && result.shapValues.length > 0 ? (
              result.shapValues.slice(0, 6).map((factor, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      factor.direction === "risk" ? "bg-red-50" : "bg-emerald-50"
                    }`}>
                      {factor.direction === "risk" ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{factor.featureLabel}</span>
                  </div>
                  <span className={`text-sm font-mono font-semibold ${
                    factor.direction === "risk" ? "text-red-600" : "text-emerald-600"
                  }`}>
                    {factor.direction === "risk" ? "+" : ""}{factor.impact}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">Analyse detaillee non disponible pour cette version.</p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>Avertissement medical:</strong> Cette prediction est generee par 
              un algorithme de machine learning et ne constitue pas un diagnostic medical. 
              Consultez un professionnel de sante pour une evaluation complete.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}