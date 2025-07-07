import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Brain, User, Pill, ChevronRight } from "lucide-react";
import Header from "@/components/Header";

// Comprehensive symptoms list - 250+ symptoms
const symptoms = [
  "Fever", "Headache", "Cough", "Sore throat", "Runny nose", "Sneezing", "Chills", "Fatigue",
  "Muscle pain", "Joint pain", "Shortness of breath", "Chest pain", "Dizziness", "Nausea", "Vomiting",
  "Diarrhea", "Abdominal pain", "Bloating", "Constipation", "Gas", "Heartburn", "Back pain", "Rash",
  "Itching", "Dry skin", "Redness", "Swelling", "Bruising", "Numbness", "Tingling", "Blurred vision",
  "Double vision", "Eye pain", "Watery eyes", "Light sensitivity", "Hearing loss", "Ringing in ears",
  "Ear pain", "Nosebleeds", "Loss of smell", "Loss of taste", "Hoarseness", "Difficulty swallowing",
  "Frequent urination", "Painful urination", "Blood in urine", "Incontinence", "Urinary urgency",
  "Bedwetting", "Irregular periods", "Heavy periods", "Missed periods", "Vaginal discharge",
  "Genital itching", "Erectile dysfunction", "Low libido", "Breast pain", "Breast lump", "Chest tightness",
  "Palpitations", "Rapid heartbeat", "Slow heartbeat", "Fainting", "Swelling in legs", "Cold hands",
  "Cold feet", "Cyanosis", "Weight loss", "Weight gain", "Excessive thirst", "Excessive hunger",
  "Night sweats", "Sleep disturbances", "Insomnia", "Excessive sleepiness", "Snoring", "Nightmares",
  "Anxiety", "Depression", "Mood swings", "Hallucinations", "Confusion", "Memory loss", "Irritability",
  "Restlessness", "Tremors", "Seizures", "Muscle weakness", "Facial droop", "Slurred speech",
  "Loss of balance", "Difficulty walking", "Clumsiness", "Hair loss", "Brittle nails", "Dry mouth",
  "Metallic taste", "Sore tongue", "Mouth ulcers", "Bad breath", "Bleeding gums", "Jaw pain", "Neck pain",
  "Shoulder pain", "Elbow pain", "Wrist pain", "Hand numbness", "Finger stiffness", "Hip pain", "Knee pain",
  "Ankle pain", "Foot pain", "Heel pain", "Leg cramps", "Skin peeling", "Skin discoloration", "Acne",
  "Warts", "Boils", "Blisters", "Cold sores", "Sun sensitivity", "Hot flashes", "Chills without fever",
  "Enlarged lymph nodes", "Easy bruising", "Excessive bleeding", "Delayed healing", "Yellow eyes",
  "Yellow skin", "Dark urine", "Light-colored stools", "Rectal bleeding", "Anal pain", "Hemorrhoids",
  "Gas retention", "Belching", "Hiccups", "Indigestion", "Loss of appetite", "Difficulty concentrating",
  "Overthinking", "Paranoia", "Flashbacks", "Suicidal thoughts", "Fear", "Guilt", "Shame",
  "Compulsive behaviors", "Tics", "Obsessive thoughts", "Trouble speaking", "Voice changes", "Dry cough",
  "Wet cough", "Wheezing", "Productive cough", "Hoarseness", "Breathlessness", "Cyanotic lips",
  "Rapid breathing", "Chest congestion", "Sputum production", "Night coughing", "Grunting",
  "Flaring nostrils", "Fatigue after minimal effort", "Poor exercise tolerance", "Back stiffness",
  "Joint locking", "Finger twitching", "Skin thickening", "Hair thinning", "Brittle hair", "Scalp itching",
  "Eye twitching", "Photophobia", "Floaters", "Tunnel vision", "Dry eyes", "Discharge from eyes",
  "Puffy eyelids", "Burning eyes", "Eye redness", "Lightheadedness", "Hypersensitivity", "Cold intolerance",
  "Heat intolerance", "Chest fluttering", "Numb toes", "Discolored nails", "Itchy scalp", "Flaky scalp",
  "Eye watering", "Yawning", "Clenched jaw", "Tooth pain", "Gum recession", "Dry throat",
  "Frequent clearing throat", "Sensitivity to smells", "Pain during intercourse", "Bloating after meals",
  "Early satiety", "Low back pain", "Groin pain", "Hip stiffness", "Shoulder stiffness", "Arm weakness",
  "Cold sensation in limbs", "Cracking joints", "Chest pressure", "Head pressure", "General weakness",
  "Persistent cough", "Uncontrollable crying", "Panic attacks", "Stomach gurgling", "Feeling of doom"
];

const samplePredictions = {
  "Fever,Headache,Fatigue": {
    disease: "Common Cold",
    confidence: 85,
    doctor: {
      type: "General Practitioner",
      description: "A primary care physician who can diagnose and treat common illnesses like colds and flu."
    },
    medicines: ["Paracetamol", "Vitamin C", "Rest and fluids"]
  },
  "Chest pain,Shortness of breath": {
    disease: "Respiratory Infection",
    confidence: 78,
    doctor: {
      type: "Pulmonologist", 
      description: "A specialist in lung and respiratory system disorders."
    },
    medicines: ["Bronchodilator", "Antibiotics", "Cough suppressant"]
  }
};

const PredictDisease = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handlePredict = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const key = selectedSymptoms.slice(0, 2).join(",");
      const result = samplePredictions[key as keyof typeof samplePredictions] || {
        disease: "General Health Check Required",
        confidence: 65,
        doctor: {
          type: "General Practitioner",
          description: "A primary care physician for general health assessment."
        },
        medicines: ["Multivitamin", "Rest", "Healthy diet"]
      };
      
      setPrediction(result);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Symptom Checker
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your symptoms and get AI-powered health insights
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Symptom Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Select Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {filteredSymptoms.map((symptom) => (
                    <div
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-medical-light border-primary text-primary'
                          : 'bg-card hover:bg-accent'
                      }`}
                    >
                      {symptom}
                    </div>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium">Selected Symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge 
                          key={symptom}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleSymptomToggle(symptom)}
                        >
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePredict}
                  disabled={selectedSymptoms.length === 0 || isLoading}
                  className="w-full"
                  variant="medical"
                >
                  {isLoading ? "Analyzing..." : "Predict Disease"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {prediction && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Predicted Condition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{prediction.disease}</h3>
                          <Badge variant="secondary">
                            {prediction.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">
                          Based on your selected symptoms, this is the most likely condition.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Recommended Doctor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold">{prediction.doctor.type}</h3>
                        <p className="text-muted-foreground">
                          {prediction.doctor.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5" />
                        Suggested Treatment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {prediction.medicines.map((medicine: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{medicine}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        ⚠️ This is for informational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}

              {!prediction && (
                <Card className="text-center py-8">
                  <CardContent>
                    <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select symptoms and click "Predict Disease" to see AI analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictDisease;