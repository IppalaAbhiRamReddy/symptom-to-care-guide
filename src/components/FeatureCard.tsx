import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, gradient = false }: FeatureCardProps) => {
  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${
      gradient ? 'bg-gradient-subtle border-accent/50' : ''
    }`}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-medical-light p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;