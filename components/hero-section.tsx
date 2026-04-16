import { ArrowRight, Activity, Database, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onStartClick: () => void
}

export function HeroSection({ onStartClick }: HeroProps) {
  return (
    <section id="hero" className="pt-16">
      {/* Hero dark section */}
      <div className="bg-[#0a0a0a] pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-8 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Powered by Machine Learning
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1] tracking-tight">
              Prediction du risque 
              <span className="text-primary"> de diabete</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
              Evaluez votre risque grace a notre modele entraine sur plus de 
              253 000 dossiers medicaux du CDC BRFSS avec une precision de 94%.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button size="lg" className="gap-2 px-8 h-12 text-base" onClick={onStartClick}>
                Evaluer mon risque
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-12 text-base border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
                onClick={() => document.getElementById("models")?.scrollIntoView({ behavior: "smooth" })}
              >
                Voir les modeles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards - overlapping */}
      <div className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="text-3xl font-semibold text-foreground mb-1">253K+</div>
            <div className="text-sm text-muted-foreground">Patients analyses</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="text-3xl font-semibold text-foreground mb-1">22</div>
            <div className="text-sm text-muted-foreground">Variables medicales</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="text-3xl font-semibold text-primary mb-1">94%</div>
            <div className="text-sm text-muted-foreground">Precision modele</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            <div className="text-3xl font-semibold text-foreground mb-1">4</div>
            <div className="text-sm text-muted-foreground">Modeles compares</div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-2">Modeles avances</h3>
            <p className="text-muted-foreground leading-relaxed">
              XGBoost, LightGBM, Random Forest - algorithmes de gradient boosting 
              optimises pour la precision diagnostique.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-2">Dataset CDC BRFSS</h3>
            <p className="text-muted-foreground leading-relaxed">
              Donnees officielles du Centers for Disease Control avec 22 indicateurs 
              de sante cliniquement valides.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg mb-2">Explicabilite SHAP</h3>
            <p className="text-muted-foreground leading-relaxed">
              Comprenez l&apos;impact de chaque facteur sur votre prediction 
              grace aux valeurs SHAP interpretables.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
