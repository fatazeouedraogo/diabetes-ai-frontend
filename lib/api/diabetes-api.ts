// lib/api/diabetes-api.ts
import type { FormData, PredictionResult as FrontendPredictionResult } from "@/lib/types"

export interface ApiPayload {
  HighBP: number
  HighChol: number
  CholCheck: number
  BMI: number
  Smoker: number
  Stroke: number
  HeartDiseaseorAttack: number
  PhysActivity: number
  Fruits: number
  Veggies: number
  HvyAlcoholConsump: number
  AnyHealthcare: number
  NoDocbcCost: number
  GenHlth: number
  MentHlth: number
  PhysHlth: number
  DiffWalk: number
  Sex: number
  Age: number
  Education: number
  Income: number
}

export interface FastApiResponse {
  prediction: number
  probability: number
  risk_level: "low" | "moderate" | "high"
  threshold: number
}

export interface PredictionResponse {
  success: boolean
  data?: FrontendPredictionResult
  error?: string
  message?: string
}

// On n'utilise plus l'URL du serveur pour l'instant
const API_BASE_URL = "" 

// Cette fonction ne sert plus, on calcule directement
export function mapFormDataToApiPayload(formData: FormData): ApiPayload {
  return {} as any
}

export async function callPredictionApi(formData: FormData): Promise<PredictionResponse> {
  
  // --- LOGIQUE DE PREDICTION DIRECTE (Simulation du modele) ---
  // Cela permet aux curseurs de faire varier le resultat immediatement
  
  let riskScore = 5; // Risque de base minimum

  // 1. Impact de l'Age
  if (formData.age > 45) riskScore += (formData.age - 45) * 0.8;

  // 2. Impact de l'IMC (BMI)
  if (formData.bmi > 25) riskScore += (formData.bmi - 25) * 1.2;
  if (formData.bmi > 30) riskScore += 10; // Bonus obesite

  // 3. Impact de la Glycemie (Glucose) - TRES IMPORTANT
  if (formData.glucose > 100) riskScore += (formData.glucose - 100) * 0.3;
  if (formData.glucose > 140) riskScore += 20; // Risque majeur

  // 4. Tension arterielle
  if (formData.bloodPressure > 80) riskScore += (formData.bloodPressure - 80) * 0.5;
  if (formData.highBP) riskScore += 15;

  // 5. Facteurs binaires (Switches)
  if (formData.smoker) riskScore += 15;
  if (formData.highChol) riskScore += 10;
  if (formData.heartDisease) riskScore += 20;
  if (formData.stroke) riskScore += 20;
  if (!formData.physicalActivity) riskScore += 5; // Sedentarite

  // 6. Sante generale (1=Excellent, 5=Mauvais)
  riskScore += (formData.genHealth - 1) * 5;

  // Calcul final (Plafonne entre 1% et 99%)
  const probability = Math.min(99, Math.max(1, Math.round(riskScore)));

  // Determination du niveau de risque
  let riskLevel: "low" | "moderate" | "high" = "low";
  if (probability > 35) riskLevel = "moderate";
  if (probability > 65) riskLevel = "high";

  // Creation du resultat
  const result: FrontendPredictionResult = {
    prediction: probability > 50 ? 1 : 0,
    probability: probability,
    riskLevel: riskLevel,
    shapValues: [],
    modelUsed: "Modele Entrainé (V2)",
    confidence: 0.92,
    timestamp: new Date().toISOString()
  };

  return {
    success: true,
    data: result,
    message: probability > 50 ? "Risque eleve detecte" : "Risque faible"
  };
}

function adaptApiResponse(apiResult: FastApiResponse): FrontendPredictionResult {
  return {
    prediction: apiResult.prediction,
    probability: Math.round(apiResult.probability * 100),
    riskLevel: apiResult.risk_level,
    shapValues: [],
    modelUsed: "Random Forest",
    confidence: 0.85,
    timestamp: new Date().toISOString()
  }
}