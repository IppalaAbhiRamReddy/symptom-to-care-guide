import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, Brain, User, Activity, ChevronRight, Info, Stethoscope, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import { symptomsDatabase, symptoms } from "@/data/symptomsDatabase";
import { EnhancedMedicalDiagnosisModel, PredictionResult } from "@/utils/improvedMLModel";
import { trainingData, validateTrainingData } from "@/data/trainingData";

// Initialize Enhanced ML Model
let enhancedMLModel: EnhancedMedicalDiagnosisModel | null = null;

const PredictDisease = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelInitialized, setModelInitialized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Initialize the Enhanced ML Model
  useEffect(() => {
    const initializeModel = () => {
      try {
        if (validateTrainingData()) {
          enhancedMLModel = new EnhancedMedicalDiagnosisModel(trainingData);
          setModelInitialized(true);
          console.log("Enhanced Medical Diagnosis ML model initialized successfully");
        } else {
          console.error("Training data validation failed");
        }
      } catch (error) {
        console.error("Error initializing Enhanced ML model:", error);
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
        : prev.length < 4 ? [...prev, symptom] : prev
    );
  };

  const handlePredict = () => {
    if (!enhancedMLModel || !modelInitialized) {
      console.error("Enhanced ML model not initialized");
      return;
    }

    if (selectedSymptoms.length === 0) {
      return;
    }

    setIsLoading(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const result = enhancedMLModel!.predict(selectedSymptoms);
        setPrediction(result);
        console.log("Prediction made with confidence:", result.confidence);
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
    }, 1500);
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
                        {filteredSymptomsData.map((symptomData, index) => {
                          const isSelected = selectedSymptoms.includes(symptomData.name);
                          return (
                            <Tooltip key={`${symptomData.name}-${symptomData.category}-${index}`}>
                              <TooltipTrigger asChild>
                                <div
                                  onClick={() => handleSymptomToggle(symptomData.name)}
                                  className={`group p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg animate-fade-in ${
                                    isSelected
                                      ? 'bg-primary border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02] text-primary-foreground' 
                                      : 'bg-card hover:bg-accent border-border hover:border-primary/30 hover:scale-[1.01]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                          isSelected
                                            ? 'bg-primary-foreground shadow-sm' 
                                            : 'border-2 border-muted-foreground/30'
                                        }`} />
                                        <h3 className={`font-medium text-sm leading-tight ${
                                          isSelected
                                            ? 'text-primary-foreground font-semibold' 
                                            : 'text-foreground'
                                        }`}>
                                          {symptomData.name}
                                        </h3>
                                      </div>
                                      <p className={`text-xs mt-2 line-clamp-2 transition-colors duration-300 ${
                                        isSelected 
                                          ? 'text-primary-foreground/90' 
                                          : 'text-muted-foreground'
                                      }`}>
                                        {symptomData.description}
                                      </p>
                                    </div>
                                    <Info className={`h-4 w-4 ml-2 transition-all duration-300 ${
                                      isSelected
                                        ? 'text-primary-foreground opacity-90' 
                                        : 'opacity-60 group-hover:opacity-100'
                                    }`} />
                                  </div>
                                  <Badge 
                                    variant={isSelected ? "outline" : "secondary"}
                                    className={`mt-3 text-xs transition-all duration-300 ${
                                      isSelected 
                                        ? 'bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30' 
                                        : 'hover:bg-primary/10'
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
                          );
                        })}
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
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{selectedSymptoms.length}/4 max</Badge>
                            <Button variant="outline" size="sm" onClick={clearSelection}>
                              Clear All
                            </Button>
                          </div>
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
                          Loading Enhanced ML Model...
                        </>
                      ) : (
                        <>
                          <Brain className="h-5 w-5 mr-2" />
                          Analyze with Enhanced AI
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    {!modelInitialized && (
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-pulse w-2 h-2 bg-primary rounded-full"></div>
                          <div className="animate-pulse w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
                          <div className="animate-pulse w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Loading Enhanced Medical Diagnosis ML Model with advanced accuracy algorithms...
                        </p>
                      </div>
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
                            Based on your {selectedSymptoms.length} selected symptoms, our Enhanced Medical ML Model suggests this is the most likely condition.
                          </p>
                          
                          {/* Disease Information */}
                          {prediction.info && (
                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                About This Condition
                              </h4>
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                {prediction.info}
                              </p>
                            </div>
                          )}
                          
                          {/* Basic Treatments */}
                          {prediction.medicines && prediction.medicines.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Stethoscope className="h-4 w-4" />
                                Basic Treatment Options
                              </h4>
                              <div className="grid gap-2">
                                {prediction.medicines.map((medicine, index) => (
                                  <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                    <span className="text-sm text-foreground">{medicine}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Prevention Tips */}
                          {prediction.prevention && prediction.prevention.length > 0 && (
                            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Prevention Tips
                              </h4>
                              <div className="grid gap-2">
                                {prediction.prevention.map((tip, index) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-sm text-green-800 dark:text-green-200">{tip}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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