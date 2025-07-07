import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Stethoscope, Pill, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/healthcare-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Disease Prediction",
      description: "Advanced machine learning algorithms analyze your symptoms to predict potential health conditions with high accuracy."
    },
    {
      icon: Stethoscope,
      title: "Doctor Recommendations",
      description: "Get matched with the right medical specialists based on your predicted condition and health needs."
    },
    {
      icon: Pill,
      title: "Medicine Suggestions", 
      description: "Receive evidence-based treatment recommendations and medication suggestions for your condition."
    },
    {
      icon: Users,
      title: "250+ Symptoms Database",
      description: "Comprehensive symptom database covering a wide range of medical conditions and health issues."
    }
  ];

  const benefits = [
    "No login required - completely private",
    "Instant AI-powered analysis",
    "200+ diseases in our database", 
    "Evidence-based recommendations",
    "Mobile-friendly interface"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your AI-Powered
                  <span className="bg-gradient-medical bg-clip-text text-transparent block">
                    Health Companion
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get instant health insights with our intelligent symptom checker. 
                  Predict diseases, find specialists, and discover treatment options - all powered by advanced AI.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/predict">
                    Start Health Check
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Free to use • No registration required • Instant results</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-medical rounded-3xl blur-3xl opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Healthcare Technology" 
                className="relative z-10 rounded-3xl shadow-medical w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Our Platform Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get comprehensive health insights using cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                gradient={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">
                  Why Choose Our Healthcare Platform?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Built with privacy, accuracy, and ease of use in mind. No complex registration - just immediate, reliable health insights.
                </p>
              </div>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-gradient-medical text-primary-foreground">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Ready to Start?</h3>
                    <p className="text-primary-foreground/80">
                      Begin your health assessment in seconds
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">250+</div>
                      <div className="text-sm text-primary-foreground/80">Symptoms</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">200+</div>
                      <div className="text-sm text-primary-foreground/80">Diseases</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">95%</div>
                      <div className="text-sm text-primary-foreground/80">Accuracy</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/predict">
                      Start Your Diagnosis
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
