import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, Brain, User, Activity, ChevronRight, Info, Stethoscope, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import { symptomsDatabase, symptoms } from "@/data/symptomsDatabase";
import { NaiveBayesClassifier, PredictionResult } from "@/utils/naiveBayesModel";
import { trainingData, validateTrainingData } from "@/data/trainingData";

// Initialize Naive Bayes classifier
let naiveBayesModel: NaiveBayesClassifier | null = null;

const PredictDisease = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelInitialized, setModelInitialized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Initialize the Naive Bayes model
  useEffect(() => {
    const initializeModel = () => {
      try {
        if (validateTrainingData()) {
          naiveBayesModel = new NaiveBayesClassifier(trainingData);
          setModelInitialized(true);
          console.log("Enhanced Naive Bayes model initialized successfully");
        } else {
          console.error("Training data validation failed");
        }
      } catch (error) {
        console.error("Error initializing Naive Bayes model:", error);
      }
    };

    initializeModel();
  }, []);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(symptomsDatabase.map(s => s.category)))];

  // Filter symptoms based on search term and category
  const filteredSymptomsData = symptomsDatabase.filter(symptomData => {
    const matchesSearch = symptomData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptomData.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || symptomData.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handlePredict = () => {
    if (!naiveBayesModel || !modelInitialized) {
      console.error("Enhanced Naive Bayes model not initialized");
      return;
    }

    if (selectedSymptoms.length === 0) {
      return;
    }

    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const result = naiveBayesModel!.predict(selectedSymptoms);
        setPrediction(result);
      } catch (error) {
        console.error("Error making prediction:", error);
        // Fallback prediction
        setPrediction({
          disease: "Unable to diagnose",
          confidence: 50,
          doctor: {
            type: "General Practitioner",
            description: "Please consult a healthcare professional for proper diagnosis."
          },
          medicines: ["Consult doctor", "Monitor symptoms", "Rest"]
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-5xl font-bold text-foreground">
                  AI Symptom Checker
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Advanced machine learning analysis of your symptoms to provide intelligent health insights. 
                Select from our comprehensive database of {symptomsDatabase.length}+ symptoms.
              </p>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Brain className="h-4 w-4" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span>{symptomsDatabase.length}+ Symptoms</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Personalized Results</span>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Symptom Selection - Spans 2 columns */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Search className="h-6 w-6" />
                        Select Your Symptoms
                      </CardTitle>
                      {selectedSymptoms.length > 0 && (
                        <Button variant="outline" size="sm" onClick={clearSelection}>
                          Clear All
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search and Filter */}
                    <div className="space-y-4">
                      <Input
                        placeholder="Search symptoms or descriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-lg"
                      />
                      
                      {/* Category Filter */}
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="text-xs"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Symptoms Grid */}
                    <div className="max-h-96 overflow-y-auto">
                      <div className="grid gap-3 md:grid-cols-2">
                        {filteredSymptomsData.map((symptomData) => (
                          <Tooltip key={symptomData.name}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handleSymptomToggle(symptomData.name)}
                                className={`group p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                  selectedSymptoms.includes(symptomData.name)
                                    ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]'
                                    : 'bg-card hover:bg-accent border-border hover:border-primary/50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-sm leading-tight">
                                      {symptomData.name}
                                    </h3>
                                    <p className={`text-xs mt-1 line-clamp-2 ${
                                      selectedSymptoms.includes(symptomData.name) 
                                        ? 'text-primary-foreground/80' 
                                        : 'text-muted-foreground'
                                    }`}>
                                      {symptomData.description}
                                    </p>
                                  </div>
                                  <Info className="h-4 w-4 ml-2 opacity-60 group-hover:opacity-100" />
                                </div>
                                <Badge 
                                  variant="secondary" 
                                  className={`mt-2 text-xs ${
                                    selectedSymptoms.includes(symptomData.name) 
                                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                                      : ''
                                  }`}
                                >
                                  {symptomData.category}
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-sm">
                              <div className="space-y-2">
                                <h4 className="font-semibold">{symptomData.name}</h4>
                                <p className="text-sm">{symptomData.description}</p>
                                <Badge variant="outline" className="text-xs">
                                  Category: {symptomData.category}
                                </Badge>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                      
                      {filteredSymptomsData.length === 0 && (
                        <div className="text-center py-8">
                          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No symptoms found matching your search.</p>
                        </div>
                      )}
                    </div>

                    {/* Selected Symptoms */}
                    {selectedSymptoms.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">Selected Symptoms ({selectedSymptoms.length})</h3>
                          <Badge variant="outline">{selectedSymptoms.length}/20 max</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedSymptoms.map((symptom) => (
                            <Badge 
                              key={symptom}
                              variant="secondary"
                              className="cursor-pointer px-3 py-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              onClick={() => handleSymptomToggle(symptom)}
                            >
                              {symptom} ×
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Predict Button */}
                    <Button
                      onClick={handlePredict}
                      disabled={selectedSymptoms.length === 0 || isLoading || !modelInitialized}
                      className="w-full py-6 text-lg font-semibold"
                      variant="medical"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Brain className="h-5 w-5 mr-2 animate-pulse" />
                          Analyzing with Enhanced AI...
                        </>
                      ) : !modelInitialized ? (
                        <>
                          <Brain className="h-5 w-5 mr-2" />
                          Loading AI Model...
                        </>
                      ) : (
                        <>
                          <Brain className="h-5 w-5 mr-2" />
                          Predict Condition
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {!modelInitialized && (
                      <p className="text-sm text-muted-foreground text-center">
                        Initializing enhanced AI prediction model with improved accuracy...
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Results - Spans 1 column */}
              <div className="space-y-6">
                {prediction ? (
                  <>
                    {/* Prediction Result */}
                    <Card className="relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <Brain className="h-6 w-6" />
                          AI Analysis Result
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-foreground mb-2">
                                {prediction.disease}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-sm">
                                  {prediction.confidence}% confidence
                                </Badge>
                                {prediction.confidence >= 85 && (
                                  <Badge variant="default" className="text-xs">
                                    High Confidence
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">
                            Based on your {selectedSymptoms.length} selected symptoms, our enhanced AI model suggests this is the most likely condition.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Doctor Recommendation */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <User className="h-6 w-6" />
                          Recommended Specialist
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-primary">
                            {prediction.doctor.type}
                          </h3>
                          <p className="text-muted-foreground">
                            {prediction.doctor.description}
                          </p>
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <AlertCircle className="h-4 w-4" />
                              Next Steps
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Schedule an appointment for proper medical evaluation and personalized treatment plan.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Disclaimer */}
                    <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div className="space-y-2">
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                              Important Medical Disclaimer
                            </h4>
                            <p className="text-sm text-orange-800 dark:text-orange-200">
                              This AI analysis is for informational purposes only and should not replace professional medical advice. 
                              Always consult with qualified healthcare professionals for proper diagnosis and treatment.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                          <Brain className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Ready for AI Analysis</h3>
                          <p className="text-muted-foreground">
                            Select your symptoms from the comprehensive database to receive an AI-powered health analysis.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="font-medium">Enhanced Accuracy</div>
                            <div className="text-muted-foreground">Improved ML model</div>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <div className="font-medium">Detailed Analysis</div>
                            <div className="text-muted-foreground">Comprehensive results</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PredictDisease;