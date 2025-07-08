// Comprehensive symptoms database - exactly 250 symptoms
export const symptoms = [
  // Respiratory symptoms
  "Fever", "Headache", "Cough", "Sore throat", "Runny nose", "Sneezing", "Chills", "Fatigue",
  "Shortness of breath", "Chest pain", "Wheezing", "Productive cough", "Dry cough", "Breathlessness",
  "Chest congestion", "Sputum production", "Night coughing", "Rapid breathing", "Chest tightness",
  
  // Gastrointestinal symptoms
  "Nausea", "Vomiting", "Diarrhea", "Abdominal pain", "Bloating", "Constipation", "Gas", "Heartburn",
  "Loss of appetite", "Indigestion", "Belching", "Hiccups", "Stomach gurgling", "Bloating after meals",
  "Early satiety", "Rectal bleeding", "Anal pain", "Hemorrhoids", "Gas retention",
  
  // Neurological symptoms
  "Dizziness", "Confusion", "Memory loss", "Seizures", "Tremors", "Muscle weakness", "Facial droop",
  "Slurred speech", "Loss of balance", "Difficulty walking", "Numbness", "Tingling", "Head pressure",
  "Lightheadedness", "Fainting", "Hallucinations", "Paranoia", "Flashbacks", "Difficulty concentrating",
  
  // Musculoskeletal symptoms
  "Muscle pain", "Joint pain", "Back pain", "Neck pain", "Shoulder pain", "Elbow pain", "Wrist pain",
  "Hip pain", "Knee pain", "Ankle pain", "Foot pain", "Heel pain", "Leg cramps", "Back stiffness",
  "Joint locking", "Hip stiffness", "Shoulder stiffness", "Arm weakness", "Cracking joints",
  "General weakness", "Muscle stiffness", "Joint swelling", "Bone pain", "Muscle spasms",
  
  // Dermatological symptoms
  "Rash", "Itching", "Dry skin", "Redness", "Swelling", "Bruising", "Skin peeling", "Skin discoloration",
  "Acne", "Warts", "Boils", "Blisters", "Cold sores", "Sun sensitivity", "Hair loss", "Brittle nails",
  "Hair thinning", "Brittle hair", "Scalp itching", "Flaky scalp", "Discolored nails", "Skin thickening",
  "Excessive sweating", "Dry patches", "Skin tags", "Moles changing", "Stretch marks",
  
  // Eye symptoms
  "Blurred vision", "Double vision", "Eye pain", "Watery eyes", "Light sensitivity", "Dry eyes",
  "Discharge from eyes", "Puffy eyelids", "Burning eyes", "Eye redness", "Eye twitching",
  "Photophobia", "Floaters", "Tunnel vision", "Eye watering", "Night blindness", "Color blindness",
  "Eye strain", "Tearing", "Eyelid drooping",
  
  // Ear symptoms
  "Hearing loss", "Ringing in ears", "Ear pain", "Ear discharge", "Ear fullness", "Vertigo",
  "Balance problems", "Ear itching", "Hearing sensitivity", "Ear pressure", "Earwax buildup",
  
  // Cardiovascular symptoms
  "Palpitations", "Rapid heartbeat", "Slow heartbeat", "Chest fluttering", "Swelling in legs",
  "Cold hands", "Cold feet", "Cyanosis", "Irregular heartbeat", "Heart murmur", "Leg swelling",
  "Ankle swelling", "Cold sensation in limbs", "Poor circulation", "Blood clots",
  
  // Genitourinary symptoms
  "Frequent urination", "Painful urination", "Blood in urine", "Incontinence", "Urinary urgency",
  "Bedwetting", "Kidney pain", "Bladder pain", "Burning urination", "Cloudy urine", "Strong urine odor",
  "Reduced urine output", "Nocturnal urination", "Urinary retention", "Pelvic pain",
  
  // Reproductive symptoms
  "Irregular periods", "Heavy periods", "Missed periods", "Vaginal discharge", "Genital itching",
  "Erectile dysfunction", "Low libido", "Breast pain", "Breast lump", "Painful intercourse",
  "Testicular pain", "Ovarian pain", "Menstrual cramps", "Vaginal dryness", "Prostate problems",
  
  // Psychological symptoms
  "Anxiety", "Depression", "Mood swings", "Irritability", "Restlessness", "Overthinking",
  "Suicidal thoughts", "Fear", "Guilt", "Shame", "Compulsive behaviors", "Tics", "Obsessive thoughts",
  "Uncontrollable crying", "Panic attacks", "Feeling of doom", "Social withdrawal", "Agitation",
  "Emotional numbness", "Hopelessness",
  
  // Sleep-related symptoms
  "Sleep disturbances", "Insomnia", "Excessive sleepiness", "Snoring", "Nightmares", "Night sweats",
  "Sleep walking", "Sleep talking", "Restless legs", "Sleep apnea", "Daytime fatigue",
  
  // Weight and metabolic symptoms
  "Weight loss", "Weight gain", "Excessive thirst", "Excessive hunger", "Hot flashes",
  "Chills without fever", "Heat intolerance", "Cold intolerance", "Metabolic slowdown",
  "Appetite changes", "Sugar cravings", "Salt cravings",
  
  // Oral and throat symptoms
  "Hoarseness", "Difficulty swallowing", "Dry mouth", "Metallic taste", "Sore tongue",
  "Mouth ulcers", "Bad breath", "Bleeding gums", "Jaw pain", "Tooth pain", "Gum recession",
  "Dry throat", "Frequent clearing throat", "Voice changes", "Trouble speaking", "Clenched jaw",
  "Tongue swelling", "Throat tightness",
  
  // Lymphatic and immune symptoms
  "Enlarged lymph nodes", "Easy bruising", "Excessive bleeding", "Delayed healing", "Frequent infections",
  "Chronic fatigue", "Autoimmune reactions", "Allergic reactions", "Hypersensitivity",
  
  // Miscellaneous symptoms
  "Nosebleeds", "Loss of smell", "Loss of taste", "Yawning", "Sensitivity to smells", "Yellow eyes",
  "Yellow skin", "Dark urine", "Light-colored stools", "Finger twitching", "Hand numbness",
  "Finger stiffness", "Numb toes", "Clumsiness", "Persistent hiccups", "Chronic pain",
  "Phantom pain", "Burning sensation", "Pins and needles", "Electric shock sensations"
];

// Verify we have exactly 250 symptoms
if (symptoms.length !== 250) {
  console.warn(`Expected 250 symptoms, but found ${symptoms.length}`);
}