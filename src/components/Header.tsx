import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Stethoscope className="h-6 w-6" />
            HealthCare AI
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/predict" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/predict') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Symptom Checker
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="medical" 
              asChild
              className="hidden md:inline-flex"
            >
              <Link to="/predict">Start Diagnosis</Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;