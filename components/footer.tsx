"use client"

import { Activity, Github, Linkedin, ExternalLink } from "lucide-react"

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="bg-[#0a0a0a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xl text-white">DiabetesAI</span>
            </a>
            <p className="text-white/60 max-w-sm leading-relaxed mb-6">
              Application de Machine Learning pour la prediction du risque de diabete 
              basee sur le dataset CDC BRFSS avec 253 000 patients.
            </p>
            <div className="flex gap-3">
              {/* GitHub */}
              <a 
                href="https://github.com/fatazeouedraogo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/fataze-ouedraogo-aa0a99332/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection("hero")} 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("prediction")} 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Prediction
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("models")} 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Modeles ML
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("dataset")} 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Dataset
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ressources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Kaggle Dataset
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cdc.gov/brfss/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  CDC BRFSS
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://xgboost.readthedocs.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  XGBoost Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://shap.readthedocs.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  SHAP Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            2024 DiabetesAI - Projet Data Science / Machine Learning
          </p>
          <p className="text-sm text-white/40 text-center md:text-right">
            Application a but educatif. Consultez un professionnel de sante pour tout diagnostic.
          </p>
        </div>
      </div>
    </footer>
  )
}