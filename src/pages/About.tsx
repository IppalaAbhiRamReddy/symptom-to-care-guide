import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Brain, Shield, Code, Mail, Heart } from "lucide-react";
import Header from "@/components/Header";
const About = () => {
  const highlights = ["250+ Symptoms", "200+ Diseases", "150+ Doctor Specializations", "Medicine Suggestions", "Local Execution — 100% Secure, No Data Collection"];
  const technologies = ["Python 3.11+", "Streamlit", "Rule-based symptom-to-disease mapping", "Static data dictionaries and mapping logic"];
  return <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-primary" />
              About Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering Health Through AI
            </p>
          </div>

          <div className="space-y-8">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Integrated Healthcare Ecosystem</strong> is a smart AI-based front-end application built with React to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    🔍 Predict diseases based on <strong>250+ symptoms</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    👨‍⚕️ Recommend relevant <strong>doctors</strong> (from 150+ specializations)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    💊 Suggest commonly prescribed <strong>medicines</strong> for the diagnosed condition
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* What We Cover */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  What We Cover
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {highlights.map((highlight, index) => <Badge key={index} variant="secondary" className="text-sm p-3 justify-start">
                      ✅ {highlight}
                    </Badge>)}
                </div>
              </CardContent>
            </Card>

            {/* Key Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-primary" />
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    No database or backend — works entirely on your system
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    Easy symptom search with intuitive selection
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    Lightweight and efficient UI with quick prediction
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    Ideal for basic diagnostic guidance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Technologies */}
            

            {/* Team */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Developed by <strong>Final Year CSE (AIML)</strong> students<br />
                  Special thanks to faculty mentors for guidance and support.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold mb-3">📧 Contact Emails:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <a href="mailto:22BQ1A4261@vvit.net" className="text-primary hover:underline">22BQ1A4261@vvit.net</a>
                    <a href="mailto:22BQ1A42B3@vvit.net" className="text-primary hover:underline">22BQ1A42B3@vvit.net</a>
                    <a href="mailto:22BQ1A42B7@vvit.net" className="text-primary hover:underline">22BQ1A42B7@vvit.net</a>
                    <a href="mailto:22BQ1A42B8@vvit.net" className="text-primary hover:underline">22BQ1A42B8@vvit.net</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-gradient-medical text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed mb-4">
                  To simplify access to health guidance using accessible and intelligent interfaces that assist people in the earliest steps of their healthcare journey.
                </p>
                <blockquote className="text-lg font-semibold text-center">
                  "Prevent. Predict. Personalize."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default About;