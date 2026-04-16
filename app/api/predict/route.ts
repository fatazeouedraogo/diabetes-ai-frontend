import { NextRequest, NextResponse } from "next/server"
import type { PredictionRequest, PredictionResponse, PredictionResult, ShapValue, PatientData } from "@/lib/types"

// ============================================================
// INTEGRATION POINT POUR TON MODELE ML
// ============================================================
// 
// Pour integrer ton vrai modele, tu as plusieurs options:
//
// OPTION 1: API Python externe (Flask/FastAPI)
// - Deploy ton modele Python sur un serveur (Render, Railway, etc.)
// - Appelle l'API depuis cette route
//
// OPTION 2: ONNX Runtime (recommande pour production)
// - Exporte ton modele en format ONNX depuis Python
// - Utilise onnxruntime-node pour faire l'inference ici
//
// OPTION 3: TensorFlow.js
// - Convertis ton modele en format TF.js
// - Charge et execute le modele directement en JS
//
// Exemple d'integration avec une API Python externe:
// 
// async function callPythonModel(data: PatientData): Promise<PredictionResult> {
//   const response = await fetch(process.env.ML_API_URL + '/predict', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//   return response.json()
// }
// ============================================================

// Simulation du modele XGBoost - A REMPLACER par ton vrai modele
function simulateXGBoostPrediction(data: Partial<PatientData>): PredictionResult {
  // Coefficients simplifies bases sur les feature importances typiques de XGBoost
  // pour la prediction du diabete (a remplacer par ton vrai modele)
  
  const weights = {
    bmi: 0.15,
    glucose: 0.25,
    age: 0.12,
    highBP: 0.10,
    highChol: 0.08,
    genHealth: 0.10,
    physicalActivity: -0.08,
    heartDisease: 0.07,
    smoker: 0.05,
  }
  
  let logit = -2.5 // intercept
  
  // BMI contribution
  if (data.bmi) {
    const bmiNormalized = (data.bmi - 25) / 10
    logit += weights.bmi * bmiNormalized * 3
  }
  
  // Glucose/GenHealth contribution
  if (data.glucose) {
    const glucoseNormalized = (data.glucose - 100) / 50
    logit += weights.glucose * glucoseNormalized * 2
  }
  
  // Age contribution
  if (data.age) {
    const ageNormalized = (data.age - 45) / 20
    logit += weights.age * ageNormalized * 2
  }
  
  // Binary features
  if (data.highBP) logit += weights.highBP * data.highBP * 2
  if (data.highChol) logit += weights.highChol * data.highChol * 2
  if (data.heartDisease) logit += weights.heartDisease * data.heartDisease * 2
  if (data.smoker) logit += weights.smoker * data.smoker * 1.5
  if (data.physicalActivity) logit += weights.physicalActivity * data.physicalActivity * 2
  
  // GenHealth contribution (1=excellent to 5=poor)
  if (data.genHealth) {
    logit += weights.genHealth * (data.genHealth - 3) * 0.5
  }
  
  // Sigmoid function
  const probability = Math.round((1 / (1 + Math.exp(-logit))) * 100)
  
  // Determine risk level
  let riskLevel: "low" | "moderate" | "high"
  if (probability < 30) riskLevel = "low"
  else if (probability < 60) riskLevel = "moderate"
  else riskLevel = "high"
  
  // Generate SHAP-like values (simplified)
  const shapValues: ShapValue[] = generateShapValues(data, probability)
  
  return {
    probability,
    riskLevel,
    prediction: probability >= 50 ? 1 : 0,
    shapValues,
    modelUsed: "XGBoost (Simulated)",
    confidence: 0.85 + Math.random() * 0.1,
    timestamp: new Date().toISOString(),
  }
}

function generateShapValues(data: Partial<PatientData>, probability: number): ShapValue[] {
  const values: ShapValue[] = []
  
  // BMI
  if (data.bmi !== undefined) {
    const impact = data.bmi > 30 ? (data.bmi - 25) * 1.5 : (data.bmi - 25) * 0.5
    values.push({
      feature: "bmi",
      featureLabel: "IMC",
      value: data.bmi,
      impact: Math.round(impact),
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // Glucose
  if (data.glucose !== undefined) {
    const impact = (data.glucose - 100) * 0.2
    values.push({
      feature: "glucose",
      featureLabel: "Glucose",
      value: data.glucose,
      impact: Math.round(impact),
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // Age
  if (data.age !== undefined) {
    const impact = (data.age - 40) * 0.3
    values.push({
      feature: "age",
      featureLabel: "Age",
      value: data.age,
      impact: Math.round(impact),
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // High BP
  if (data.highBP !== undefined) {
    const impact = data.highBP ? 12 : -5
    values.push({
      feature: "highBP",
      featureLabel: "Hypertension",
      value: data.highBP,
      impact,
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // Physical Activity
  if (data.physicalActivity !== undefined) {
    const impact = data.physicalActivity ? -10 : 8
    values.push({
      feature: "physicalActivity",
      featureLabel: "Activite physique",
      value: data.physicalActivity,
      impact,
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // Smoker
  if (data.smoker !== undefined) {
    const impact = data.smoker ? 8 : -3
    values.push({
      feature: "smoker",
      featureLabel: "Tabagisme",
      value: data.smoker,
      impact,
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // High Cholesterol
  if (data.highChol !== undefined) {
    const impact = data.highChol ? 10 : -4
    values.push({
      feature: "highChol",
      featureLabel: "Cholesterol eleve",
      value: data.highChol,
      impact,
      direction: impact > 0 ? "risk" : "protective"
    })
  }
  
  // Sort by absolute impact
  return values.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
}

export async function POST(request: NextRequest): Promise<NextResponse<PredictionResponse>> {
  try {
    const body: PredictionRequest = await request.json()
    
    if (!body.patientData) {
      return NextResponse.json({
        success: false,
        error: "Patient data is required"
      }, { status: 400 })
    }
    
    // ============================================================
    // ICI TU REMPLACES PAR L'APPEL A TON VRAI MODELE
    // ============================================================
    // 
    // Exemple avec une API Python:
    // const result = await callPythonModel(body.patientData)
    //
    // Exemple avec ONNX:
    // const result = await runOnnxModel(body.patientData)
    // ============================================================
    
    const result = simulateXGBoostPrediction(body.patientData)
    
    return NextResponse.json({
      success: true,
      result
    })
    
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 })
  }
}

// Health check endpoint
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "healthy",
    model: "XGBoost (Simulated)",
    version: "1.0.0",
    message: "Remplace simulateXGBoostPrediction() par ton vrai modele"
  })
}
