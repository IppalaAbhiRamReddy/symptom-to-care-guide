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
  info?: string;
  prevention?: string[];
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
      info: diseaseInfo.info,
      prevention: diseaseInfo.prevention,
      probability_scores: probabilityScores
    };
  }

  private getDiseaseInfo(disease: string): { doctor: { type: string; description: string }, medicines: string[], info: string, prevention: string[] } {
    const diseaseDatabase: Record<string, { doctor: { type: string; description: string }, medicines: string[], info: string, prevention: string[] }> = {
      "Common Cold": {
        doctor: { type: "General Practitioner", description: "A primary care physician who can diagnose and treat common illnesses like colds and flu." },
        medicines: ["Paracetamol 500mg", "Vitamin C 1000mg", "Decongestant nasal spray", "Rest and increased fluid intake"],
        info: "The common cold is a viral infection of the upper respiratory tract. It's highly contagious and typically lasts 7-10 days. Most adults get 2-3 colds per year.",
        prevention: ["Wash hands frequently", "Avoid close contact with sick people", "Don't touch face with unwashed hands", "Get adequate sleep", "Maintain good nutrition"]
      },
      "Influenza": {
        doctor: { type: "General Practitioner", description: "A primary care physician for flu diagnosis and antiviral treatment." },
        medicines: ["Oseltamivir (Tamiflu) 75mg", "Paracetamol 500mg", "Ibuprofen 400mg", "Complete bed rest"],
        info: "Influenza is a viral infection that attacks the respiratory system. It's more severe than a common cold and can lead to serious complications, especially in high-risk groups.",
        prevention: ["Annual flu vaccination", "Frequent handwashing", "Avoid crowded places during flu season", "Cover coughs and sneezes", "Stay home when sick"]
      },
      "Migraine": {
        doctor: { type: "Neurologist", description: "A specialist in nervous system disorders including chronic headaches and migraines." },
        medicines: ["Sumatriptan 50mg", "Ibuprofen 600mg", "Ergotamine tartrate", "Dark room rest therapy"],
        info: "Migraines are severe, recurring headaches often accompanied by nausea, vomiting, and sensitivity to light and sound. They can last from hours to days and significantly impact quality of life.",
        prevention: ["Identify and avoid triggers", "Maintain regular sleep schedule", "Stay hydrated", "Manage stress", "Regular exercise", "Limit caffeine and alcohol"]
      },
      "Hypertension": {
        doctor: { type: "Cardiologist", description: "A heart specialist who treats blood pressure and cardiovascular conditions." },
        medicines: ["ACE inhibitors (Lisinopril)", "Beta blockers (Metoprolol)", "Hydrochlorothiazide", "Lifestyle modifications"],
        info: "Hypertension (high blood pressure) is often called the 'silent killer' because it usually has no symptoms but can lead to heart disease, stroke, and kidney problems if untreated.",
        prevention: ["Maintain healthy weight", "Regular physical activity", "Limit sodium intake", "Limit alcohol consumption", "Don't smoke", "Manage stress", "Regular blood pressure monitoring"]
      },
      "Diabetes Type 2": {
        doctor: { type: "Endocrinologist", description: "A specialist in hormonal disorders and metabolic conditions including diabetes." },
        medicines: ["Metformin 500mg", "Insulin therapy", "Glipizide 5mg", "Strict diet management"],
        info: "Type 2 diabetes occurs when the body becomes resistant to insulin or doesn't produce enough insulin. It's a chronic condition that affects how the body processes blood sugar (glucose).",
        prevention: ["Maintain healthy weight", "Regular physical activity", "Healthy diet low in refined sugars", "Regular health screenings", "Don't smoke", "Limit alcohol", "Manage stress levels"]
      },
      "Asthma": {
        doctor: { type: "Pulmonologist", description: "A lung specialist who treats chronic respiratory conditions." },
        medicines: ["Inhaled corticosteroids", "Short-acting bronchodilators", "Albuterol inhaler", "Long-term controller medications"],
        info: "Asthma is a chronic respiratory condition where airways become inflamed, narrow, and produce extra mucus, making breathing difficult. It affects people of all ages and can be life-threatening if severe.",
        prevention: ["Identify and avoid triggers", "Take controller medications as prescribed", "Monitor air quality", "Get vaccinated against flu and pneumonia", "Maintain healthy weight", "Regular exercise as tolerated"]
      },
      "Gastritis": {
        doctor: { type: "Gastroenterologist", description: "A specialist in digestive system disorders and stomach conditions." },
        medicines: ["Proton pump inhibitors (Omeprazole)", "Antacids (Mylanta)", "H2 receptor blockers", "Dietary modifications"],
        info: "Gastritis is inflammation of the stomach lining that can be acute or chronic. It's often caused by H. pylori bacteria, certain medications, or excessive alcohol consumption.",
        prevention: ["Avoid excessive alcohol", "Don't overuse NSAIDs", "Manage stress", "Eat regular meals", "Avoid spicy and acidic foods", "Don't smoke", "Practice good hygiene"]
      },
      "Anxiety Disorder": {
        doctor: { type: "Psychiatrist", description: "A mental health specialist who treats anxiety disorders and mood conditions." },
        medicines: ["SSRIs (Sertraline)", "Short-term Benzodiazepines", "Cognitive behavioral therapy", "Mindfulness techniques"],
        info: "Anxiety disorders involve excessive fear, worry, and related behavioral disturbances. They're among the most common mental health conditions and can significantly impact daily functioning.",
        prevention: ["Regular exercise", "Adequate sleep", "Stress management techniques", "Limit caffeine and alcohol", "Social support", "Mindfulness practice", "Professional counseling when needed"]
      },
      "Pneumonia": {
        doctor: { type: "Pulmonologist", description: "A lung specialist for serious respiratory infections requiring specialized care." },
        medicines: ["Broad-spectrum antibiotics", "Cough suppressants", "Pain relief medication", "Oxygen therapy if needed"],
        info: "Pneumonia is an infection that inflames air sacs in one or both lungs, which may fill with fluid. It can be life-threatening, especially for infants, elderly, and those with compromised immune systems.",
        prevention: ["Get vaccinated (pneumococcal and flu)", "Wash hands frequently", "Don't smoke", "Maintain good health", "Avoid close contact with sick people", "Cover coughs and sneezes"]
      },
      "Urinary Tract Infection": {
        doctor: { type: "Urologist", description: "A specialist in urinary system disorders and infections." },
        medicines: ["Nitrofurantoin 100mg", "Cranberry extract supplements", "Ibuprofen for pain", "Increased water intake"],
        info: "UTIs occur when bacteria enter the urinary tract through the urethra and multiply in the bladder. Women are at higher risk due to their shorter urethra. Most UTIs are easily treatable with antibiotics.",
        prevention: ["Drink plenty of water", "Urinate after sexual activity", "Wipe from front to back", "Avoid holding urine", "Wear breathable underwear", "Avoid harsh feminine products", "Take showers instead of baths"]
      },
      "Heart Disease": {
        doctor: { type: "Cardiologist", description: "A cardiac specialist for comprehensive heart health evaluation." },
        medicines: ["Beta blockers", "ACE inhibitors", "Statins", "Antiplatelet therapy"],
        info: "Heart disease refers to several types of heart conditions, including coronary artery disease, heart rhythm problems, and heart defects. It's the leading cause of death globally.",
        prevention: ["Healthy diet low in saturated fat", "Regular exercise", "Don't smoke", "Limit alcohol", "Maintain healthy weight", "Manage stress", "Control blood pressure and cholesterol", "Regular check-ups"]
      },
      "Stroke": {
        doctor: { type: "Neurologist", description: "Emergency neurological specialist for immediate stroke assessment." },
        medicines: ["Thrombolytics (if acute)", "Anticoagulants", "Rehabilitation therapy", "Emergency care required"],
        info: "A stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die in minutes. IMMEDIATE MEDICAL ATTENTION IS CRITICAL.",
        prevention: ["Control blood pressure", "Don't smoke", "Manage diabetes", "Lower cholesterol", "Maintain healthy weight", "Exercise regularly", "Limit alcohol", "Prevent atrial fibrillation"]
      },
      "Meningitis": {
        doctor: { type: "Emergency Medicine", description: "Immediate emergency care for suspected meningitis - this is a medical emergency." },
        medicines: ["IV antibiotics", "Corticosteroids", "Emergency hospitalization", "Immediate medical attention"],
        info: "Meningitis is inflammation of the protective membranes covering the brain and spinal cord. It can be life-threatening and requires IMMEDIATE EMERGENCY MEDICAL TREATMENT. Time is critical.",
        prevention: ["Get vaccinated (meningococcal, pneumococcal, Hib)", "Avoid close contact with infected individuals", "Practice good hygiene", "Don't share personal items", "Boost immune system", "Avoid crowded places during outbreaks"]
      }
    };

    return diseaseDatabase[disease] || {
      doctor: { type: "General Practitioner", description: "A primary care physician for comprehensive health assessment and proper diagnosis." },
      medicines: ["Symptomatic treatment as appropriate", "Rest and monitoring", "Healthy lifestyle measures", "Follow-up consultation recommended"],
      info: "This condition requires professional medical evaluation for proper diagnosis and treatment. Symptoms can be associated with multiple conditions.",
      prevention: ["Maintain healthy lifestyle", "Regular medical check-ups", "Follow medical advice", "Monitor symptoms", "Practice good hygiene", "Stay informed about health conditions"]
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