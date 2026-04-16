"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, ChevronUp, CheckCircle2, Database, Users, Calendar, FileText } from "lucide-react"

const variables = [
  { name: "Diabetes_binary", type: "Cible", description: "Variable cible - 0: pas de diabete, 1: diabete/prediabete" },
  { name: "HighBP", type: "Binary", description: "Pression arterielle elevee (0/1)" },
  { name: "HighChol", type: "Binary", description: "Cholesterol eleve (0/1)" },
  { name: "CholCheck", type: "Binary", description: "Verification du cholesterol dans les 5 dernieres annees" },
  { name: "BMI", type: "Numerique", description: "Indice de masse corporelle" },
  { name: "Smoker", type: "Binary", description: "A fume au moins 100 cigarettes dans sa vie" },
  { name: "Stroke", type: "Binary", description: "Antecedent d'AVC (accident vasculaire cerebral)" },
  { name: "HeartDiseaseorAttack", type: "Binary", description: "Maladie coronarienne ou infarctus du myocarde" },
  { name: "PhysActivity", type: "Binary", description: "Activite physique dans les 30 derniers jours" },
  { name: "Fruits", type: "Binary", description: "Consomme des fruits au moins 1 fois par jour" },
  { name: "Veggies", type: "Binary", description: "Consomme des legumes au moins 1 fois par jour" },
  { name: "HvyAlcoholConsump", type: "Binary", description: "Forte consommation d'alcool" },
  { name: "AnyHealthcare", type: "Binary", description: "Possede une couverture sante" },
  { name: "NoDocbcCost", type: "Binary", description: "N'a pas pu consulter un medecin a cause du cout" },
  { name: "GenHlth", type: "Ordinal", description: "Etat de sante general: 1=excellent a 5=mauvais" },
  { name: "MentHlth", type: "Numerique", description: "Jours de mauvaise sante mentale (sur 30 jours)" },
  { name: "PhysHlth", type: "Numerique", description: "Jours de mauvaise sante physique (sur 30 jours)" },
  { name: "DiffWalk", type: "Binary", description: "Difficulte a marcher ou monter les escaliers" },
  { name: "Sex", type: "Binary", description: "Sexe: 0=Femme, 1=Homme" },
  { name: "Age", type: "Ordinal", description: "Categorie d'age par tranche de 5 ans" },
  { name: "Education", type: "Ordinal", description: "Niveau d'education" },
  { name: "Income", type: "Ordinal", description: "Niveau de revenu annuel" },
]

export function DatasetInfo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAll, setShowAll] = useState(false)
  
  const filtered = variables.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const displayed = showAll ? filtered : filtered.slice(0, 8)

  return (
    <section id="dataset" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-medium tracking-wide uppercase mb-3">
            Donnees
          </span>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Dataset BRFSS du CDC
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Behavioral Risk Factor Surveillance System - Le systeme de surveillance 
            par enquete sur la sante du Centers for Disease Control.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          <Card className="border-border bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-foreground">253,680</div>
                  <div className="text-sm text-muted-foreground">Observations</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-foreground">22</div>
                  <div className="text-sm text-muted-foreground">Variables</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-foreground">CDC</div>
                  <div className="text-sm text-muted-foreground">Source officielle</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-foreground">2015</div>
                  <div className="text-sm text-muted-foreground">Annee collecte</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Variables Table */}
        <Card className="border-border mb-16 bg-white">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border">
            <CardTitle className="text-lg font-semibold">Variables du dataset</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une variable..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="font-semibold">Variable</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayed.map((v, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell className="font-mono text-sm text-primary font-medium">{v.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={v.type === "Cible" ? "default" : "outline"} 
                        className={v.type === "Cible" ? "bg-primary" : ""}
                      >
                        {v.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{v.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length > 8 && (
              <div className="flex justify-center mt-6 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
                  {showAll ? (
                    <>Voir moins <ChevronUp className="w-4 h-4 ml-1" /></>
                  ) : (
                    <>Voir les {filtered.length - 8} autres variables <ChevronDown className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Methodology */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border bg-white">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold">Pretraitement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Normalisation StandardScaler
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Reequilibrage SMOTE
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Feature engineering avance
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border bg-white">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold">Validation</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Cross-validation 5-fold
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Test set 20% holdout
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Hyperparameter tuning GridSearch
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border bg-white">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg font-semibold">Explicabilite</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  SHAP values interpretation
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Feature importance ranking
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  Courbes ROC/PR analysis
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
