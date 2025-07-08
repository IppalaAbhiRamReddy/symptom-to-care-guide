// Naive Bayes Classifier for Disease Prediction
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
}

export class NaiveBayesClassifier {
  private trainingData: TrainingData[] = [];
  private diseases: Set<string> = new Set();
  private symptoms: Set<string> = new Set();
  private diseaseCount: Map<string, number> = new Map();
  private symptomDiseaseCount: Map<string, Map<string, number>> = new Map();
  private totalSamples: number = 0;

  constructor(trainingData: TrainingData[]) {
    this.trainingData = trainingData;
    this.train();
  }

  private train(): void {
    this.totalSamples = this.trainingData.length;
    
    // Count disease occurrences
    this.trainingData.forEach(data => {
      this.diseases.add(data.disease);
      this.diseaseCount.set(data.disease, (this.diseaseCount.get(data.disease) || 0) + 1);
      
      data.symptoms.forEach(symptom => {
        this.symptoms.add(symptom);
        
        if (!this.symptomDiseaseCount.has(symptom)) {
          this.symptomDiseaseCount.set(symptom, new Map());
        }
        
        const diseaseMap = this.symptomDiseaseCount.get(symptom)!;
        diseaseMap.set(data.disease, (diseaseMap.get(data.disease) || 0) + 1);
      });
    });
  }

  predict(inputSymptoms: string[]): PredictionResult {
    let bestDisease = "";
    let maxProbability = -Infinity;
    
    this.diseases.forEach(disease => {
      // Calculate P(disease)
      const diseaseProbability = Math.log((this.diseaseCount.get(disease) || 0) / this.totalSamples);
      
      // Calculate P(symptoms|disease)
      let symptomsProbability = 0;
      
      inputSymptoms.forEach(symptom => {
        if (this.symptoms.has(symptom)) {
          const symptomDiseaseMap = this.symptomDiseaseCount.get(symptom);
          const symptomGivenDisease = symptomDiseaseMap?.get(disease) || 0;
          const totalDiseaseOccurrences = this.diseaseCount.get(disease) || 1;
          
          // Laplace smoothing
          const probability = (symptomGivenDisease + 1) / (totalDiseaseOccurrences + this.symptoms.size);
          symptomsProbability += Math.log(probability);
        }
      });
      
      const totalProbability = diseaseProbability + symptomsProbability;
      
      if (totalProbability > maxProbability) {
        maxProbability = totalProbability;
        bestDisease = disease;
      }
    });
    
    // Convert log probability to confidence percentage
    const confidence = Math.min(95, Math.max(60, Math.round(Math.exp(maxProbability) * 100)));
    
    return this.getDetailedPrediction(bestDisease, confidence);
  }

  private getDetailedPrediction(disease: string, confidence: number): PredictionResult {
    const diseaseInfo = this.getDiseaseInfo(disease);
    
    return {
      disease,
      confidence,
      doctor: diseaseInfo.doctor,
      medicines: diseaseInfo.medicines
    };
  }

  private getDiseaseInfo(disease: string): { doctor: { type: string; description: string }, medicines: string[] } {
    const diseaseDatabase: Record<string, { doctor: { type: string; description: string }, medicines: string[] }> = {
      "Common Cold": {
        doctor: { type: "General Practitioner", description: "A primary care physician who can diagnose and treat common illnesses like colds and flu." },
        medicines: ["Paracetamol", "Vitamin C", "Decongestants", "Rest and fluids"]
      },
      "Influenza": {
        doctor: { type: "General Practitioner", description: "A primary care physician for flu diagnosis and treatment." },
        medicines: ["Oseltamivir", "Paracetamol", "Ibuprofen", "Rest and fluids"]
      },
      "Migraine": {
        doctor: { type: "Neurologist", description: "A specialist in nervous system disorders including headaches and migraines." },
        medicines: ["Sumatriptan", "Ibuprofen", "Ergotamine", "Rest in dark room"]
      },
      "Hypertension": {
        doctor: { type: "Cardiologist", description: "A heart specialist who treats blood pressure and cardiovascular conditions." },
        medicines: ["ACE inhibitors", "Beta blockers", "Diuretics", "Lifestyle changes"]
      },
      "Diabetes Type 2": {
        doctor: { type: "Endocrinologist", description: "A specialist in hormonal disorders including diabetes." },
        medicines: ["Metformin", "Insulin", "Glipizide", "Diet management"]
      },
      "Asthma": {
        doctor: { type: "Pulmonologist", description: "A lung specialist who treats breathing disorders." },
        medicines: ["Inhaled corticosteroids", "Bronchodilators", "Albuterol", "Preventive medications"]
      },
      "Gastritis": {
        doctor: { type: "Gastroenterologist", description: "A specialist in digestive system disorders." },
        medicines: ["Proton pump inhibitors", "Antacids", "H2 blockers", "Dietary changes"]
      },
      "Anxiety Disorder": {
        doctor: { type: "Psychiatrist", description: "A mental health specialist who treats anxiety and mood disorders." },
        medicines: ["SSRIs", "Benzodiazepines", "Therapy", "Relaxation techniques"]
      },
      "Pneumonia": {
        doctor: { type: "Pulmonologist", description: "A lung specialist for serious respiratory infections." },
        medicines: ["Antibiotics", "Cough suppressants", "Pain relievers", "Oxygen therapy"]
      },
      "Urinary Tract Infection": {
        doctor: { type: "Urologist", description: "A specialist in urinary system disorders." },
        medicines: ["Antibiotics", "Cranberry supplements", "Pain relievers", "Increased fluid intake"]
      }
    };

    return diseaseDatabase[disease] || {
      doctor: { type: "General Practitioner", description: "A primary care physician for general health assessment." },
      medicines: ["Symptomatic treatment", "Rest", "Healthy lifestyle", "Follow-up consultation"]
    };
  }
}