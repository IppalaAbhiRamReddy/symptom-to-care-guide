import { TrainingData } from '../utils/naiveBayesModel';

// Comprehensive training data for disease prediction
export const trainingData: TrainingData[] = [
  // Common Cold
  { symptoms: ["Fever", "Headache", "Cough", "Sore throat", "Runny nose", "Sneezing", "Fatigue"], disease: "Common Cold", confidence: 85 },
  { symptoms: ["Runny nose", "Sneezing", "Sore throat", "Cough", "Headache"], disease: "Common Cold", confidence: 80 },
  { symptoms: ["Fever", "Chills", "Muscle pain", "Sore throat", "Runny nose"], disease: "Common Cold", confidence: 75 },
  
  // Influenza
  { symptoms: ["Fever", "Chills", "Muscle pain", "Fatigue", "Headache", "Dry cough"], disease: "Influenza", confidence: 90 },
  { symptoms: ["High fever", "Body aches", "Fatigue", "Headache", "Dry cough", "Sore throat"], disease: "Influenza", confidence: 88 },
  { symptoms: ["Fever", "Muscle pain", "Joint pain", "Headache", "Cough", "Weakness"], disease: "Influenza", confidence: 85 },
  
  // Migraine
  { symptoms: ["Severe headache", "Light sensitivity", "Nausea", "Vomiting"], disease: "Migraine", confidence: 92 },
  { symptoms: ["Headache", "Blurred vision", "Light sensitivity", "Nausea"], disease: "Migraine", confidence: 88 },
  { symptoms: ["Throbbing headache", "Sensitivity to sounds", "Nausea", "Dizziness"], disease: "Migraine", confidence: 85 },
  
  // Hypertension
  { symptoms: ["Headache", "Dizziness", "Shortness of breath", "Chest pain"], disease: "Hypertension", confidence: 80 },
  { symptoms: ["Fatigue", "Confusion", "Vision problems", "Chest pain"], disease: "Hypertension", confidence: 75 },
  { symptoms: ["Nosebleeds", "Headache", "Difficulty breathing"], disease: "Hypertension", confidence: 70 },
  
  // Diabetes Type 2
  { symptoms: ["Excessive thirst", "Frequent urination", "Excessive hunger", "Weight loss"], disease: "Diabetes Type 2", confidence: 95 },
  { symptoms: ["Fatigue", "Blurred vision", "Slow healing", "Frequent infections"], disease: "Diabetes Type 2", confidence: 88 },
  { symptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Numbness in hands"], disease: "Diabetes Type 2", confidence: 90 },
  
  // Asthma
  { symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Cough"], disease: "Asthma", confidence: 92 },
  { symptoms: ["Difficulty breathing", "Wheezing", "Chest pain", "Cough at night"], disease: "Asthma", confidence: 90 },
  { symptoms: ["Breathlessness", "Chest congestion", "Cough", "Fatigue"], disease: "Asthma", confidence: 85 },
  
  // Gastritis
  { symptoms: ["Abdominal pain", "Nausea", "Vomiting", "Bloating", "Loss of appetite"], disease: "Gastritis", confidence: 88 },
  { symptoms: ["Stomach pain", "Heartburn", "Nausea", "Indigestion"], disease: "Gastritis", confidence: 85 },
  { symptoms: ["Upper abdominal pain", "Bloating", "Belching", "Nausea"], disease: "Gastritis", confidence: 82 },
  
  // Anxiety Disorder
  { symptoms: ["Anxiety", "Rapid heartbeat", "Sweating", "Tremors", "Difficulty concentrating"], disease: "Anxiety Disorder", confidence: 90 },
  { symptoms: ["Panic attacks", "Fear", "Restlessness", "Sleep disturbances"], disease: "Anxiety Disorder", confidence: 88 },
  { symptoms: ["Worry", "Muscle tension", "Fatigue", "Irritability"], disease: "Anxiety Disorder", confidence: 85 },
  
  // Pneumonia
  { symptoms: ["Fever", "Cough", "Shortness of breath", "Chest pain", "Fatigue"], disease: "Pneumonia", confidence: 92 },
  { symptoms: ["Productive cough", "Fever", "Chills", "Chest pain", "Difficulty breathing"], disease: "Pneumonia", confidence: 90 },
  { symptoms: ["High fever", "Wet cough", "Chest congestion", "Rapid breathing"], disease: "Pneumonia", confidence: 88 },
  
  // Urinary Tract Infection
  { symptoms: ["Painful urination", "Frequent urination", "Burning sensation", "Cloudy urine"], disease: "Urinary Tract Infection", confidence: 92 },
  { symptoms: ["Urinary urgency", "Pelvic pain", "Blood in urine", "Strong urine odor"], disease: "Urinary Tract Infection", confidence: 90 },
  { symptoms: ["Burning urination", "Frequent urination", "Lower abdominal pain"], disease: "Urinary Tract Infection", confidence: 88 },
  
  // Additional training data for better accuracy
  { symptoms: ["Muscle pain", "Joint pain", "Fatigue", "Low-grade fever"], disease: "Viral Infection", confidence: 78 },
  { symptoms: ["Skin rash", "Itching", "Redness", "Swelling"], disease: "Allergic Reaction", confidence: 85 },
  { symptoms: ["Back pain", "Muscle stiffness", "Limited mobility"], disease: "Muscle Strain", confidence: 80 },
  { symptoms: ["Dizziness", "Nausea", "Balance problems", "Hearing changes"], disease: "Inner Ear Infection", confidence: 82 },
  { symptoms: ["Dry skin", "Hair loss", "Fatigue", "Weight gain"], disease: "Hypothyroidism", confidence: 85 },
  { symptoms: ["Rapid heartbeat", "Weight loss", "Anxiety", "Heat intolerance"], disease: "Hyperthyroidism", confidence: 88 },
  { symptoms: ["Joint pain", "Morning stiffness", "Swelling", "Limited range of motion"], disease: "Arthritis", confidence: 85 },
  { symptoms: ["Abdominal pain", "Diarrhea", "Weight loss", "Fatigue"], disease: "Inflammatory Bowel Disease", confidence: 80 },
  { symptoms: ["Chest pain", "Shortness of breath", "Palpitations", "Sweating"], disease: "Heart Disease", confidence: 88 },
  { symptoms: ["Memory loss", "Confusion", "Difficulty concentrating", "Mood changes"], disease: "Dementia", confidence: 82 },
  
  // More specific symptom combinations
  { symptoms: ["Severe headache", "Fever", "Neck stiffness", "Light sensitivity"], disease: "Meningitis", confidence: 95 },
  { symptoms: ["Sudden severe headache", "Vision changes", "Speech problems"], disease: "Stroke", confidence: 92 },
  { symptoms: ["Persistent cough", "Weight loss", "Night sweats", "Fatigue"], disease: "Tuberculosis", confidence: 88 },
  { symptoms: ["Yellow skin", "Yellow eyes", "Dark urine", "Fatigue"], disease: "Hepatitis", confidence: 90 },
  { symptoms: ["Excessive bleeding", "Easy bruising", "Fatigue", "Pale skin"], disease: "Anemia", confidence: 85 },
  { symptoms: ["Chronic fatigue", "Muscle pain", "Sleep disturbances", "Memory problems"], disease: "Fibromyalgia", confidence: 80 },
  { symptoms: ["Mood swings", "Depression", "Fatigue", "Sleep changes"], disease: "Bipolar Disorder", confidence: 82 },
  { symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep problems"], disease: "Major Depression", confidence: 85 },
  { symptoms: ["Chronic pain", "Stiffness", "Fatigue", "Sleep problems"], disease: "Chronic Pain Syndrome", confidence: 78 },
  { symptoms: ["Frequent infections", "Fatigue", "Enlarged lymph nodes", "Weight loss"], disease: "Immunodeficiency", confidence: 80 }
];

// Validate training data
export const validateTrainingData = (): boolean => {
  const diseaseCount = new Map<string, number>();
  
  trainingData.forEach(data => {
    diseaseCount.set(data.disease, (diseaseCount.get(data.disease) || 0) + 1);
  });
  
  console.log(`Training data contains ${trainingData.length} samples`);
  console.log(`Number of unique diseases: ${diseaseCount.size}`);
  
  return trainingData.length > 0 && diseaseCount.size > 0;
};