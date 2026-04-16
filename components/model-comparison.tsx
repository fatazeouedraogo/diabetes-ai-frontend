"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { Trophy, Zap, TreePine, LineChart } from "lucide-react"

const MODELS_DATA = [
  {
    id: "xgboost",
    name: "XGBoost",
    icon: <Trophy className="w-5 h-5 text-amber-500" />,
    tag: "Top Accuracy",
    description: "Gradient boosting optimisé",
    accuracy: 83.8,
    auc: 0.81,
    time: "2.1s",
    metrics: { accuracy: 83.8, precision: 47.1, recall: 17.7, f1: 25.8, auc: 81.0 }
  },
  {
    id: "lightgbm",
    name: "LightGBM",
    icon: <Zap className="w-5 h-5 text-blue-500" />,
    tag: "Rapide",
    description: "Entraînement ultra-rapide",
    accuracy: 83.6,
    auc: 0.81,
    time: "1.2s",
    metrics: { accuracy: 83.6, precision: 45.9, recall: 16.4, f1: 24.2, auc: 80.9 }
  },
  {
    id: "randomforest",
    name: "Random Forest",
    icon: <TreePine className="w-5 h-5 text-emerald-500" />,
    tag: "Sélectionné",
    description: "Meilleur compromis recall/précision",
    accuracy: 82.4,
    auc: 0.80,
    time: "3.4s",
    metrics: { accuracy: 82.4, precision: 43.1, recall: 33.6, f1: 37.8, auc: 80.1 }
  },
  {
    id: "logistic",
    name: "Logistic Reg.",
    icon: <LineChart className="w-5 h-5 text-purple-500" />,
    tag: "Base",
    description: "Modèle linéaire interprétable",
    accuracy: 73.4,
    auc: 0.83,
    time: "0.2s",
    metrics: { accuracy: 73.4, precision: 34.9, recall: 78.0, f1: 48.2, auc: 82.7 }
  }
]

const RADAR_DATA = [
  { metric: "Accuracy", XGBoost: 83.8, LightGBM: 83.6, "Random Forest": 82.4, "Logistic Reg.": 73.4 },
  { metric: "Précision", XGBoost: 47.1, LightGBM: 45.9, "Random Forest": 43.1, "Logistic Reg.": 34.9 },
  { metric: "Recall", XGBoost: 17.7, LightGBM: 16.4, "Random Forest": 33.6, "Logistic Reg.": 78.0 },
  { metric: "F1 Score", XGBoost: 25.8, LightGBM: 24.2, "Random Forest": 37.8, "Logistic Reg.": 48.2 },
  { metric: "AUC", XGBoost: 81.0, LightGBM: 80.9, "Random Forest": 80.1, "Logistic Reg.": 82.7 }
]

export function ModelComparison() {
  const [view, setView] = useState<"bar" | "radar">("bar")

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-wide uppercase mb-3">
            Machine Learning
          </span>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Comparaison des modeles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plusieurs algorithmes ont ete entraines et compares sur le dataset BRFSS pour identifier le meilleur compromis entre performance et fiabilité clinique.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {MODELS_DATA.map((model) => (
            <Card 
              key={model.id} 
              className={`relative overflow-hidden transition-all ${
                model.tag === "Sélectionné" ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
              }`}
            >
              {model.tag === "Sélectionné" && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Actif
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-muted">{model.icon}</div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">{model.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-semibold text-foreground">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${model.accuracy}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3" /> AUC: {model.auc}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <LineChart className="w-3 h-3" /> {model.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
            <button
              onClick={() => setView("bar")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === "bar" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Graphique en barres
            </button>
            <button
              onClick={() => setView("radar")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === "radar" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Graphique radar
            </button>
          </div>
        </div>

        {/* Charts */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Analyse comparative multi-criteres</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full">
            {view === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RADAR_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Bar dataKey="XGBoost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="LightGBM" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Random Forest" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Radar name="XGBoost" dataKey="XGBoost" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Radar name="LightGBM" dataKey="LightGBM" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Radar name="Random Forest" dataKey="Random Forest" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}