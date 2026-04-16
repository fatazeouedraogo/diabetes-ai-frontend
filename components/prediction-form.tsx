"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Send, User, Activity, Heart, Cigarette } from "lucide-react"
import type { FormData } from "@/lib/types"

interface PredictionFormProps {
  onPredict: (data: FormData) => void
  onReset: () => void
  isLoading: boolean
}

const initialFormData: FormData = {
  age: 45,
  bmi: 25,
  glucose: 100,
  bloodPressure: 70,
  highBP: false,
  highChol: false,
  smoker: false,
  physicalActivity: true,
  heavyDrinker: false,
  heartDisease: false,
  stroke: false,
  diffWalk: false,
  sex: "male",
  genHealth: 3,
}

export function PredictionForm({ onPredict, onReset, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    onReset()
  }

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Sous-poids", color: "text-amber-600", bg: "bg-amber-50" }
    if (bmi < 25) return { label: "Normal", color: "text-emerald-600", bg: "bg-emerald-50" }
    if (bmi < 30) return { label: "Surpoids", color: "text-amber-600", bg: "bg-amber-50" }
    return { label: "Obesite", color: "text-red-600", bg: "bg-red-50" }
  }

  const bmiCategory = getBmiCategory(formData.bmi)

  return (
    <Card className="border-border shadow-sm bg-white">
      <CardHeader className="pb-6 border-b border-border">
        <CardTitle className="text-xl font-semibold text-foreground">
          Informations patient
        </CardTitle>
        <CardDescription>
          Remplissez les informations pour obtenir une prediction
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Demographics Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="w-4 h-4 text-primary" />
              Informations generales
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Sexe</Label>
                <Select 
                  value={formData.sex} 
                  onValueChange={(v) => updateField("sex", v as "male" | "female")}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Homme</SelectItem>
                    <SelectItem value="female">Femme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Etat de sante general</Label>
                <Select 
                  value={formData.genHealth.toString()} 
                  onValueChange={(v) => updateField("genHealth", parseInt(v))}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Excellent</SelectItem>
                    <SelectItem value="2">Tres bon</SelectItem>
                    <SelectItem value="3">Bon</SelectItem>
                    <SelectItem value="4">Moyen</SelectItem>
                    <SelectItem value="5">Mauvais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Measurements Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Activity className="w-4 h-4 text-primary" />
              Mesures cliniques
            </div>
            
            {/* Age */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Age</Label>
                <span className="text-sm font-semibold text-foreground px-3 py-1 bg-muted rounded-md">
                  {formData.age} ans
                </span>
              </div>
              <Slider
                value={[formData.age]}
                onValueChange={([v]) => updateField("age", v)}
                min={18}
                max={90}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>18 ans</span>
                <span>90 ans</span>
              </div>
            </div>

            {/* BMI */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Indice de Masse Corporelle (IMC)</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${bmiCategory.bg} ${bmiCategory.color}`}>
                    {bmiCategory.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground px-3 py-1 bg-muted rounded-md">
                    {formData.bmi} kg/m2
                  </span>
                </div>
              </div>
              <Slider
                value={[formData.bmi]}
                onValueChange={([v]) => updateField("bmi", v)}
                min={15}
                max={50}
                step={0.5}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15</span>
                <span>50</span>
              </div>
            </div>

            {/* Glucose */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Glycemie a jeun</Label>
                <span className="text-sm font-semibold text-foreground px-3 py-1 bg-muted rounded-md">
                  {formData.glucose} mg/dL
                </span>
              </div>
              <Slider
                value={[formData.glucose]}
                onValueChange={([v]) => updateField("glucose", v)}
                min={60}
                max={250}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>60 mg/dL</span>
                <span>250 mg/dL</span>
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-muted-foreground">Pression diastolique</Label>
                <span className="text-sm font-semibold text-foreground px-3 py-1 bg-muted rounded-md">
                  {formData.bloodPressure} mmHg
                </span>
              </div>
              <Slider
                value={[formData.bloodPressure]}
                onValueChange={([v]) => updateField("bloodPressure", v)}
                min={40}
                max={120}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40 mmHg</span>
                <span>120 mmHg</span>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Heart className="w-4 h-4 text-primary" />
              Antecedents medicaux
            </div>
            <div className="grid gap-3 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Hypertension arterielle</Label>
                <Switch
                  checked={formData.highBP}
                  onCheckedChange={(v) => updateField("highBP", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Cholesterol eleve</Label>
                <Switch
                  checked={formData.highChol}
                  onCheckedChange={(v) => updateField("highChol", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Maladie cardiaque</Label>
                <Switch
                  checked={formData.heartDisease}
                  onCheckedChange={(v) => updateField("heartDisease", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Antecedent AVC</Label>
                <Switch
                  checked={formData.stroke}
                  onCheckedChange={(v) => updateField("stroke", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Difficulte a marcher</Label>
                <Switch
                  checked={formData.diffWalk}
                  onCheckedChange={(v) => updateField("diffWalk", v)}
                />
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Cigarette className="w-4 h-4 text-primary" />
              Mode de vie
            </div>
            <div className="grid gap-3 p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Activite physique reguliere</Label>
                <Switch
                  checked={formData.physicalActivity}
                  onCheckedChange={(v) => updateField("physicalActivity", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Fumeur</Label>
                <Switch
                  checked={formData.smoker}
                  onCheckedChange={(v) => updateField("smoker", v)}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-foreground cursor-pointer">Consommation alcool elevee</Label>
                <Switch
                  checked={formData.heavyDrinker}
                  onCheckedChange={(v) => updateField("heavyDrinker", v)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={handleReset}
              disabled={isLoading}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reinitialiser
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Analyse...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Lancer la prediction
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}