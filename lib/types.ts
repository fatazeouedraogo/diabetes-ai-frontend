// lib/api/diabetes-api.ts
import type { FormData, PredictionResult } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Mapping FormData -> Payload API BRFSS
function buildApiPayload(form: FormData): Record<string, number> {
  return {
    // Champs mappés depuis FormData
    Age: form.age,
    BMI: form.bmi,
    Smoker: form.smoker ? 1 : 0,
    Sex: form.sex === "male" ? 1 : 0,
    GenHlth: form.genHealth,
    HighBP: form.highBP ? 1 : 0,
    HighChol: form.highChol ? 1 : 0,
    Stroke: form.stroke ? 1 : 0,
    HeartDiseaseorAttack: form.heartDisease ? 1 : 0,
    DiffWalk: form.diffWalk ? 1 : 0,
    PhysActivity: form.physicalActivity ? 1 : 0,
    
    // Champs avec valeurs par défaut (à enrichir plus tard si tu ajoutes ces inputs)
    CholCheck: 1,
    Fruits: 1,
    Veggies: 1,
    HvyAlcoholConsump: form.heavyDrinker ? 1 : 0,
    AnyHealthcare: 1,
    NoDocbcCost: 0,
    MentHlth: 2,
    PhysHlth: 3,
    Education: 3,
    Income: 3
  }
}

export async function predictDiabetes(form: FormData): Promise<{
  success: boolean
  result?: PredictionResult
  error?: string
}> {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildApiPayload(form))
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.detail || `Erreur ${response.status}`)
    }

    const apiResult = await response.json()
    
    // Adapter la réponse API vers PredictionResult
    const result: PredictionResult = {
      prediction: apiResult.prediction,
      probability: Math.round(apiResult.probability * 100),
      riskLevel: apiResult.risk_level,
      shapValues: [], // À remplir quand tu auras SHAP dans l'API
      modelUsed: "Random Forest",
      confidence: 0.85,
      timestamp: new Date().toISOString()
    }

    return { success: true, result }
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    }
  }
}