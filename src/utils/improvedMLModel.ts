// Enhanced Medical Diagnosis ML Model
export interface TrainingData {
  symptoms: string[];
  disease: string;
  confidence: number;
}

export interface PredictionResult {
  disease: string;
  confidence: number;
  doctor: {
    type: string;
    description: string;
  };
  medicines: string[];
  probability_scores?: { [key: string]: number };
}

export class EnhancedMedicalDiagnosisModel {
  private trainingData: TrainingData[] = [];
  private diseaseSymptomMatrix: Map<string, Map<string, number>> = new Map();
  private symptomFrequency: Map<string, number> = new Map();
  private diseaseFrequency: Map<string, number> = new Map();
  private totalSamples: number = 0;
  private allSymptoms: Set<string> = new Set();
  private allDiseases: Set<string> = new Set();

  constructor(trainingData: TrainingData[]) {
    this.trainingData = trainingData;
    this.train();
  }

  private train(): void {
    this.totalSamples = this.trainingData.length;
    
    // Build comprehensive symptom and disease maps
    this.trainingData.forEach(data => {
      const disease = data.disease;
      this.allDiseases.add(disease);
      
      // Count disease frequency
      this.diseaseFrequency.set(disease, (this.diseaseFrequency.get(disease) || 0) + 1);
      
      // Initialize disease-symptom matrix
      if (!this.diseaseSymptomMatrix.has(disease)) {
        this.diseaseSymptomMatrix.set(disease, new Map());
      }
      
      const diseaseSymptoms = this.diseaseSymptomMatrix.get(disease)!;
      
      data.symptoms.forEach(symptom => {
        this.allSymptoms.add(symptom);
        
        // Count symptom frequency globally
        this.symptomFrequency.set(symptom, (this.symptomFrequency.get(symptom) || 0) + 1);
        
        // Count symptom frequency for this disease
        diseaseSymptoms.set(symptom, (diseaseSymptoms.get(symptom) || 0) + 1);
      });
    });
    
    console.log(`Model trained with ${this.totalSamples} samples, ${this.allDiseases.size} diseases, ${this.allSymptoms.size} symptoms`);
  }

  predict(inputSymptoms: string[]): PredictionResult {
    if (inputSymptoms.length === 0) {
      throw new Error("No symptoms provided");
    }

    const diseaseScores: Map<string, number> = new Map();
    const probabilityScores: { [key: string]: number } = {};

    // Calculate scores for each disease using improved algorithm
    this.allDiseases.forEach(disease => {
      const score = this.calculateDiseaseScore(disease, inputSymptoms);
      diseaseScores.set(disease, score);
      probabilityScores[disease] = Math.round(score * 100) / 100;
    });

    // Find the disease with highest score
    let bestDisease = "";
    let maxScore = -Infinity;
    
    diseaseScores.forEach((score, disease) => {
      if (score > maxScore) {
        maxScore = score;
        bestDisease = disease;
      }
    });

    // Convert score to confidence percentage
    const confidence = this.calculateConfidence(maxScore, inputSymptoms, bestDisease);
    
    return this.getDetailedPrediction(bestDisease, confidence, probabilityScores);
  }

  private calculateDiseaseScore(disease: string, inputSymptoms: string[]): number {
    const diseaseSymptoms = this.diseaseSymptomMatrix.get(disease);
    if (!diseaseSymptoms) return 0;

    const diseaseFreq = this.diseaseFrequency.get(disease) || 0;
    const diseasePrior = diseaseFreq / this.totalSamples;

    // Calculate symptom likelihood with improved weighting
    let symptomScore = 0;
    let matchedSymptoms = 0;

    inputSymptoms.forEach(symptom => {
      if (this.allSymptoms.has(symptom)) {
        const symptomInDisease = diseaseSymptoms.get(symptom) || 0;
        const totalSymptomOccurrences = this.symptomFrequency.get(symptom) || 1;
        
        // Calculate conditional probability with Laplace smoothing
        const conditionalProb = (symptomInDisease + 1) / (diseaseFreq + this.allSymptoms.size);
        
        // Calculate specificity (how specific this symptom is to this disease)
        const specificity = symptomInDisease / totalSymptomOccurrences;
        
        // Weight by both probability and specificity
        const weightedScore = conditionalProb * (1 + specificity);
        symptomScore += Math.log(weightedScore);
        
        if (symptomInDisease > 0) {
          matchedSymptoms++;
        }
      }
    });

    // Penalize for unmatched symptoms
    const matchRatio = matchedSymptoms / inputSymptoms.length;
    const finalScore = Math.log(diseasePrior) + symptomScore + Math.log(matchRatio + 0.1);

    return finalScore;
  }

  private calculateConfidence(score: number, inputSymptoms: string[], predictedDisease: string): number {
    // Get the disease-specific symptoms
    const diseaseSymptoms = this.diseaseSymptomMatrix.get(predictedDisease);
    if (!diseaseSymptoms) return 50;

    // Calculate how many input symptoms match this disease
    const matchedSymptoms = inputSymptoms.filter(symptom => 
      diseaseSymptoms.has(symptom) && (diseaseSymptoms.get(symptom) || 0) > 0
    ).length;

    // Base confidence on match ratio
    const matchRatio = matchedSymptoms / inputSymptoms.length;
    
    // Get disease frequency (more common diseases get slight boost)
    const diseaseFreq = this.diseaseFrequency.get(predictedDisease) || 0;
    const popularityBoost = Math.min(10, diseaseFreq / this.totalSamples * 100);
    
    // Calculate confidence
    let confidence = matchRatio * 70 + popularityBoost + 20;
    
    // Boost confidence for exact matches
    if (matchRatio === 1.0) {
      confidence += 10;
    }
    
    // Penalize for very few symptoms
    if (inputSymptoms.length < 2) {
      confidence *= 0.8;
    }

    // Ensure confidence is in reasonable range
    return Math.min(95, Math.max(45, Math.round(confidence)));
  }

  private getDetailedPrediction(disease: string, confidence: number, probabilityScores: { [key: string]: number }): PredictionResult {
    const diseaseInfo = this.getDiseaseInfo(disease);
    
    return {
      disease,
      confidence,
      doctor: diseaseInfo.doctor,
      medicines: diseaseInfo.medicines,
      probability_scores: probabilityScores
    };
  }

  private getDiseaseInfo(disease: string): { doctor: { type: string; description: string }, medicines: string[] } {
    const diseaseDatabase: Record<string, { doctor: { type: string; description: string }, medicines: string[] }> = {
      "Common Cold": {
        doctor: { type: "General Practitioner", description: "A primary care physician who can diagnose and treat common illnesses like colds and flu." },
        medicines: ["Paracetamol 500mg", "Vitamin C 1000mg", "Decongestant nasal spray", "Rest and increased fluid intake"]
      },
      "Influenza": {
        doctor: { type: "General Practitioner", description: "A primary care physician for flu diagnosis and antiviral treatment." },
        medicines: ["Oseltamivir (Tamiflu) 75mg", "Paracetamol 500mg", "Ibuprofen 400mg", "Complete bed rest"]
      },
      "Migraine": {
        doctor: { type: "Neurologist", description: "A specialist in nervous system disorders including chronic headaches and migraines." },
        medicines: ["Sumatriptan 50mg", "Ibuprofen 600mg", "Ergotamine tartrate", "Dark room rest therapy"]
      },
      "Hypertension": {
        doctor: { type: "Cardiologist", description: "A heart specialist who treats blood pressure and cardiovascular conditions." },
        medicines: ["ACE inhibitors (Lisinopril)", "Beta blockers (Metoprolol)", "Hydrochlorothiazide", "Lifestyle modifications"]
      },
      "Diabetes Type 2": {
        doctor: { type: "Endocrinologist", description: "A specialist in hormonal disorders and metabolic conditions including diabetes." },
        medicines: ["Metformin 500mg", "Insulin therapy", "Glipizide 5mg", "Strict diet management"]
      },
      "Asthma": {
        doctor: { type: "Pulmonologist", description: "A lung specialist who treats chronic respiratory conditions." },
        medicines: ["Inhaled corticosteroids", "Short-acting bronchodilators", "Albuterol inhaler", "Long-term controller medications"]
      },
      "Gastritis": {
        doctor: { type: "Gastroenterologist", description: "A specialist in digestive system disorders and stomach conditions." },
        medicines: ["Proton pump inhibitors (Omeprazole)", "Antacids (Mylanta)", "H2 receptor blockers", "Dietary modifications"]
      },
      "Anxiety Disorder": {
        doctor: { type: "Psychiatrist", description: "A mental health specialist who treats anxiety disorders and mood conditions." },
        medicines: ["SSRIs (Sertraline)", "Short-term Benzodiazepines", "Cognitive behavioral therapy", "Mindfulness techniques"]
      },
      "Pneumonia": {
        doctor: { type: "Pulmonologist", description: "A lung specialist for serious respiratory infections requiring specialized care." },
        medicines: ["Broad-spectrum antibiotics", "Cough suppressants", "Pain relief medication", "Oxygen therapy if needed"]
      },
      "Urinary Tract Infection": {
        doctor: { type: "Urologist", description: "A specialist in urinary system disorders and infections." },
        medicines: ["Nitrofurantoin 100mg", "Cranberry extract supplements", "Ibuprofen for pain", "Increased water intake"]
      },
      "Heart Disease": {
        doctor: { type: "Cardiologist", description: "A cardiac specialist for comprehensive heart health evaluation." },
        medicines: ["Beta blockers", "ACE inhibitors", "Statins", "Antiplatelet therapy"]
      },
      "Stroke": {
        doctor: { type: "Neurologist", description: "Emergency neurological specialist for immediate stroke assessment." },
        medicines: ["Thrombolytics (if acute)", "Anticoagulants", "Rehabilitation therapy", "Emergency care required"]
      },
      "Meningitis": {
        doctor: { type: "Emergency Medicine", description: "Immediate emergency care for suspected meningitis - this is a medical emergency." },
        medicines: ["IV antibiotics", "Corticosteroids", "Emergency hospitalization", "Immediate medical attention"]
      }
    };

    return diseaseDatabase[disease] || {
      doctor: { type: "General Practitioner", description: "A primary care physician for comprehensive health assessment and proper diagnosis." },
      medicines: ["Symptomatic treatment as appropriate", "Rest and monitoring", "Healthy lifestyle measures", "Follow-up consultation recommended"]
    };
  }

  // Method to get top N disease predictions
  getTopPredictions(inputSymptoms: string[], topN: number = 3): PredictionResult[] {
    if (inputSymptoms.length === 0) return [];

    const diseaseScores: Array<{ disease: string; score: number }> = [];

    this.allDiseases.forEach(disease => {
      const score = this.calculateDiseaseScore(disease, inputSymptoms);
      diseaseScores.push({ disease, score });
    });

    // Sort by score and take top N
    diseaseScores.sort((a, b) => b.score - a.score);
    
    return diseaseScores.slice(0, topN).map(({ disease, score }) => {
      const confidence = this.calculateConfidence(score, inputSymptoms, disease);
      return this.getDetailedPrediction(disease, confidence, {});
    });
  }
}