import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export function PriceCard({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  ctaText,
}: PriceCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-200 hover:shadow-lg",
      isPopular ? "price-card-highlight border-primary/50 shadow-md" : ""
    )}>
      <CardHeader>
        {/* {isPopular && (
          <div className="py-1 px-3 text-xs font-semibold bg-primary text-white rounded-full mb-2 w-fit">
            Most Popular
          </div>
        )} */}
        <CardTitle>{title}</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-sm text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription className="pt-1.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={cn(
            "w-full", 
            isPopular ? "" : "bg-secondary text-primary hover:bg-secondary/80"
          )}
          variant={isPopular ? "default" : "outline"}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
