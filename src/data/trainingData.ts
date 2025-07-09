import { TrainingData } from '../utils/naiveBayesModel';

// Comprehensive training data for disease prediction with enhanced accuracy
export const trainingData: TrainingData[] = [
  // Common Cold (Enhanced with more variations)
  { symptoms: ["Fever", "Headache", "Cough", "Sore throat", "Runny nose", "Sneezing", "Fatigue"], disease: "Common Cold", confidence: 85 },
  { symptoms: ["Runny nose", "Sneezing", "Sore throat", "Cough", "Headache"], disease: "Common Cold", confidence: 80 },
  { symptoms: ["Fever", "Chills", "Muscle pain", "Sore throat", "Runny nose"], disease: "Common Cold", confidence: 75 },
  { symptoms: ["Nasal congestion", "Post-nasal drip", "Sore throat", "Low-grade fever"], disease: "Common Cold", confidence: 78 },
  { symptoms: ["Dry cough", "Throat clearing", "Runny nose", "Mild headache"], disease: "Common Cold", confidence: 72 },
  
  // Influenza (Enhanced)
  { symptoms: ["Fever", "Chills", "Muscle pain", "Fatigue", "Headache", "Dry cough"], disease: "Influenza", confidence: 90 },
  { symptoms: ["Fever high", "Body aches", "Fatigue", "Headache", "Dry cough", "Sore throat"], disease: "Influenza", confidence: 88 },
  { symptoms: ["Fever", "Muscle pain", "Joint pain", "Headache", "Cough", "Weakness"], disease: "Influenza", confidence: 85 },
  { symptoms: ["Sudden onset fever", "Severe headache", "Muscle pain", "Extreme fatigue"], disease: "Influenza", confidence: 92 },
  { symptoms: ["High fever", "Chills", "Body aches", "Loss of appetite", "Weakness"], disease: "Influenza", confidence: 87 },
  
  // Migraine (Enhanced)
  { symptoms: ["Severe headache", "Light sensitivity", "Nausea", "Vomiting"], disease: "Migraine", confidence: 92 },
  { symptoms: ["Headache", "Blurred vision", "Light sensitivity", "Nausea"], disease: "Migraine", confidence: 88 },
  { symptoms: ["Throbbing headache", "Hearing sensitivity", "Nausea", "Dizziness"], disease: "Migraine", confidence: 85 },
  { symptoms: ["Cluster headache", "Eye pain", "Tearing", "Photophobia"], disease: "Migraine", confidence: 90 },
  { symptoms: ["Tension headache", "Head pressure", "Neck pain", "Light sensitivity"], disease: "Migraine", confidence: 82 },
  
  // Hypertension (Enhanced)
  { symptoms: ["Headache", "Dizziness", "Shortness of breath", "Chest pain"], disease: "Hypertension", confidence: 80 },
  { symptoms: ["Fatigue", "Confusion", "Vision problems", "Chest pain"], disease: "Hypertension", confidence: 75 },
  { symptoms: ["High blood pressure", "Headache", "Difficulty breathing"], disease: "Hypertension", confidence: 88 },
  { symptoms: ["Morning headaches", "Nosebleeds", "Dizziness", "Chest pressure"], disease: "Hypertension", confidence: 83 },
  { symptoms: ["Severe headache", "Vision problems", "Chest pain", "Anxiety"], disease: "Hypertension", confidence: 85 },
  
  // Diabetes Type 2 (Enhanced)
  { symptoms: ["Excessive thirst", "Frequent urination", "Excessive hunger", "Weight loss"], disease: "Diabetes Type 2", confidence: 95 },
  { symptoms: ["Fatigue", "Blurred vision", "Slow healing", "Frequent infections"], disease: "Diabetes Type 2", confidence: 88 },
  { symptoms: ["Excessive thirst", "Frequent urination", "Fatigue", "Numbness in hands"], disease: "Diabetes Type 2", confidence: 90 },
  { symptoms: ["Increased appetite", "Excessive thirst", "Nocturnal urination", "Weight loss"], disease: "Diabetes Type 2", confidence: 93 },
  { symptoms: ["Poor wound healing", "Recurrent infections", "Fatigue", "Tingling"], disease: "Diabetes Type 2", confidence: 86 },
  
  // Asthma (Enhanced)
  { symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Cough"], disease: "Asthma", confidence: 92 },
  { symptoms: ["Difficulty breathing", "Wheezing", "Chest pain", "Night coughing"], disease: "Asthma", confidence: 90 },
  { symptoms: ["Breathlessness", "Chest congestion", "Cough", "Fatigue"], disease: "Asthma", confidence: 85 },
  { symptoms: ["Exercise intolerance", "Wheezing", "Chronic cough", "Chest tightness"], disease: "Asthma", confidence: 88 },
  { symptoms: ["Rapid breathing", "Chest rattling", "Cough", "Anxiety"], disease: "Asthma", confidence: 84 },
  
  // Gastritis (Enhanced)
  { symptoms: ["Abdominal pain", "Nausea", "Vomiting", "Bloating", "Loss of appetite"], disease: "Gastritis", confidence: 88 },
  { symptoms: ["Stomach pain", "Heartburn", "Nausea", "Indigestion"], disease: "Gastritis", confidence: 85 },
  { symptoms: ["Upper abdominal pain", "Bloating", "Belching", "Nausea"], disease: "Gastritis", confidence: 82 },
  { symptoms: ["Stomach burning", "Acid reflux", "Loss of appetite", "Early satiety"], disease: "Gastritis", confidence: 86 },
  { symptoms: ["Stomach tenderness", "Bloating after meals", "Nausea", "Metallic taste"], disease: "Gastritis", confidence: 80 },
  
  // Anxiety Disorder (Enhanced)
  { symptoms: ["Anxiety", "Rapid heartbeat", "Excessive sweating", "Tremors", "Difficulty concentrating"], disease: "Anxiety Disorder", confidence: 90 },
  { symptoms: ["Panic attacks", "Fear", "Restlessness", "Sleep disturbances"], disease: "Anxiety Disorder", confidence: 88 },
  { symptoms: ["Worry", "Muscle tension", "Fatigue", "Irritability"], disease: "Anxiety Disorder", confidence: 85 },
  { symptoms: ["Palpitations", "Shortness of breath", "Dizziness", "Fear"], disease: "Anxiety Disorder", confidence: 87 },
  { symptoms: ["Chest fluttering", "Hyperventilation", "Sweating", "Tremors"], disease: "Anxiety Disorder", confidence: 84 },
  
  // Pneumonia (Enhanced)
  { symptoms: ["Fever", "Cough", "Shortness of breath", "Chest pain", "Fatigue"], disease: "Pneumonia", confidence: 92 },
  { symptoms: ["Productive cough", "Fever", "Chills", "Chest pain", "Difficulty breathing"], disease: "Pneumonia", confidence: 90 },
  { symptoms: ["Fever high", "Productive cough", "Chest congestion", "Rapid breathing"], disease: "Pneumonia", confidence: 88 },
  { symptoms: ["Bloody cough", "Chest pain", "High fever", "Shortness of breath"], disease: "Pneumonia", confidence: 94 },
  { symptoms: ["Pleuritic pain", "Productive cough", "Fever", "Malaise"], disease: "Pneumonia", confidence: 86 },
  
  // Urinary Tract Infection (Enhanced)
  { symptoms: ["Painful urination", "Frequent urination", "Burning urination", "Cloudy urine"], disease: "Urinary Tract Infection", confidence: 92 },
  { symptoms: ["Urinary urgency", "Pelvic pain", "Blood in urine", "Strong urine odor"], disease: "Urinary Tract Infection", confidence: 90 },
  { symptoms: ["Burning urination", "Frequent urination", "Lower abdominal pain"], disease: "Urinary Tract Infection", confidence: 88 },
  { symptoms: ["Kidney pain", "Fever", "Painful urination", "Nausea"], disease: "Urinary Tract Infection", confidence: 89 },
  { symptoms: ["Bladder pain", "Urinary urgency", "Burning sensation", "Incomplete emptying"], disease: "Urinary Tract Infection", confidence: 85 },
  
  // Additional diseases with comprehensive symptom patterns
  { symptoms: ["Muscle pain", "Joint pain", "Fatigue", "Low-grade fever"], disease: "Viral Infection", confidence: 78 },
  { symptoms: ["Skin rash", "Itching", "Redness", "Swelling"], disease: "Allergic Reaction", confidence: 85 },
  { symptoms: ["Hives", "Itching", "Swelling", "Difficulty breathing"], disease: "Allergic Reaction", confidence: 92 },
  
  { symptoms: ["Back pain", "Muscle stiffness", "Limited mobility"], disease: "Muscle Strain", confidence: 80 },
  { symptoms: ["Acute back pain", "Muscle spasms", "Difficulty walking"], disease: "Muscle Strain", confidence: 83 },
  
  { symptoms: ["Dizziness", "Nausea", "Balance problems", "Hearing changes"], disease: "Inner Ear Infection", confidence: 82 },
  { symptoms: ["Vertigo", "Ear pain", "Hearing loss", "Ear discharge"], disease: "Inner Ear Infection", confidence: 88 },
  
  { symptoms: ["Dry skin", "Hair loss", "Fatigue", "Weight gain"], disease: "Hypothyroidism", confidence: 85 },
  { symptoms: ["Cold intolerance", "Constipation", "Memory problems", "Hair thinning"], disease: "Hypothyroidism", confidence: 87 },
  
  { symptoms: ["Rapid heartbeat", "Weight loss", "Anxiety", "Heat intolerance"], disease: "Hyperthyroidism", confidence: 88 },
  { symptoms: ["Excessive sweating", "Tremors", "Insomnia", "Hot flashes"], disease: "Hyperthyroidism", confidence: 90 },
  
  { symptoms: ["Joint pain", "Morning stiffness", "Swelling", "Range of motion loss"], disease: "Arthritis", confidence: 85 },
  { symptoms: ["Arthritis pain", "Joint swelling", "Stiffness", "Cracking joints"], disease: "Arthritis", confidence: 88 },
  
  { symptoms: ["Abdominal pain", "Diarrhea", "Weight loss", "Fatigue"], disease: "Inflammatory Bowel Disease", confidence: 80 },
  { symptoms: ["Bloody stools", "Cramping", "Chronic diarrhea", "Weight loss"], disease: "Inflammatory Bowel Disease", confidence: 85 },
  
  { symptoms: ["Chest pain", "Shortness of breath", "Palpitations", "Excessive sweating"], disease: "Heart Disease", confidence: 88 },
  { symptoms: ["Chest pressure", "Left arm pain", "Nausea", "Sweating"], disease: "Heart Disease", confidence: 92 },
  
  { symptoms: ["Memory loss", "Confusion", "Difficulty concentrating", "Mood changes"], disease: "Dementia", confidence: 82 },
  { symptoms: ["Cognitive impairment", "Disorientation", "Personality changes", "Language problems"], disease: "Dementia", confidence: 85 },
  
  // Critical conditions
  { symptoms: ["Severe headache", "Fever", "Neck stiffness", "Light sensitivity"], disease: "Meningitis", confidence: 95 },
  { symptoms: ["Sudden severe headache", "Vision changes", "Speech problems"], disease: "Stroke", confidence: 92 },
  { symptoms: ["Facial droop", "Slurred speech", "Weakness", "Confusion"], disease: "Stroke", confidence: 94 },
  
  { symptoms: ["Persistent cough", "Weight loss", "Night sweats", "Fatigue"], disease: "Tuberculosis", confidence: 88 },
  { symptoms: ["Bloody cough", "Chest pain", "Loss of appetite", "Fever"], disease: "Tuberculosis", confidence: 90 },
  
  { symptoms: ["Jaundice", "Yellow skin", "Dark urine", "Fatigue"], disease: "Hepatitis", confidence: 90 },
  { symptoms: ["Liver pain", "Nausea", "Loss of appetite", "Abdominal swelling"], disease: "Hepatitis", confidence: 85 },
  
  { symptoms: ["Excessive bleeding", "Easy bruising", "Fatigue", "Pale skin"], disease: "Anemia", confidence: 85 },
  { symptoms: ["Shortness of breath", "Weakness", "Cold hands", "Brittle nails"], disease: "Anemia", confidence: 82 },
  
  { symptoms: ["Chronic fatigue", "Muscle pain", "Sleep disturbances", "Memory problems"], disease: "Fibromyalgia", confidence: 80 },
  { symptoms: ["Widespread pain", "Tender points", "Sleep problems", "Cognitive problems"], disease: "Fibromyalgia", confidence: 83 },
  
  { symptoms: ["Mood swings", "Depression", "Fatigue", "Sleep changes"], disease: "Bipolar Disorder", confidence: 82 },
  { symptoms: ["Manic episodes", "Depression", "Sleep disturbances", "Concentration problems"], disease: "Bipolar Disorder", confidence: 85 },
  
  { symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep problems"], disease: "Major Depression", confidence: 85 },
  { symptoms: ["Hopelessness", "Appetite changes", "Concentration problems", "Low energy"], disease: "Major Depression", confidence: 87 },
  
  { symptoms: ["Chronic pain", "Stiffness", "Fatigue", "Sleep problems"], disease: "Chronic Pain Syndrome", confidence: 78 },
  { symptoms: ["Frequent infections", "Fatigue", "Enlarged lymph nodes", "Weight loss"], disease: "Immunodeficiency", confidence: 80 },
  
  // Additional specific conditions
  { symptoms: ["Kidney stones", "Severe pain", "Blood in urine", "Nausea"], disease: "Kidney Stone Disease", confidence: 90 },
  { symptoms: ["Gallbladder pain", "Nausea", "Vomiting", "Right upper abdominal pain"], disease: "Gallbladder Disease", confidence: 88 },
  { symptoms: ["Testicular pain", "Scrotal swelling", "Fever", "Nausea"], disease: "Testicular Torsion", confidence: 92 },
  { symptoms: ["Heavy menstrual bleeding", "Pelvic pain", "Painful periods"], disease: "Endometriosis", confidence: 85 },
  { symptoms: ["Prostate problems", "Frequent urination", "Weak urine stream"], disease: "Benign Prostatic Hyperplasia", confidence: 83 },
  
  // Respiratory conditions
  { symptoms: ["Chronic cough", "Shortness of breath", "Wheezing", "Chest tightness"], disease: "Chronic Obstructive Pulmonary Disease", confidence: 88 },
  { symptoms: ["Dry cough", "Shortness of breath", "Chest pain", "Weight loss"], disease: "Pulmonary Fibrosis", confidence: 85 },
  
  // Neurological conditions
  { symptoms: ["Seizures", "Loss of consciousness", "Confusion", "Memory loss"], disease: "Epilepsy", confidence: 90 },
  { symptoms: ["Tremors", "Muscle stiffness", "Balance problems", "Slow movement"], disease: "Parkinson's Disease", confidence: 88 },
  { symptoms: ["Muscle weakness", "Fatigue", "Difficulty walking", "Speech problems"], disease: "Multiple Sclerosis", confidence: 85 },
  
  // Eye conditions
  { symptoms: ["Eye pain", "Blurred vision", "Light sensitivity", "Headache"], disease: "Glaucoma", confidence: 87 },
  { symptoms: ["Blurred vision", "Eye floaters", "Night blindness", "Difficulty seeing"], disease: "Cataracts", confidence: 85 },
  
  // Skin conditions
  { symptoms: ["Eczema", "Itching", "Red patches", "Dry skin"], disease: "Atopic Dermatitis", confidence: 88 },
  { symptoms: ["Psoriasis", "Scaly patches", "Itching", "Joint pain"], disease: "Psoriatic Arthritis", confidence: 85 }
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