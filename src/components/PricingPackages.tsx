import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Crown, Star, Users, Zap } from "lucide-react";

interface PricingPackagesProps {
  maxInfluencers: number;
  onPurchase: (packageType: string, count: number, price: number) => void;
}

export const PricingPackages = ({ maxInfluencers, onPurchase }: PricingPackagesProps) => {
  const [customCount, setCustomCount] = useState([600]);
  const [customInputValue, setCustomInputValue] = useState("600");

  const packages = [
    {
      id: "starter",
      name: "Starter",
      count: 30,
      price: 99,
      icon: Zap,
      description: "Perfect for first-time users",
      features: ["30 verified influencers", "Basic analytics", "Email support"]
    },
    {
      id: "professional",
      name: "Professional",
      count: 100,
      price: 199,
      icon: Star,
      description: "For serious campaigns",
      features: ["100 verified influencers", "Advanced analytics", "Priority support"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      count: 500,
      price: 299,
      icon: Crown,
      description: "Maximum efficiency",
      features: ["500 verified influencers", "Full analytics", "Personal manager"],
      recommended: true
    }
  ];

  const calculateCustomPrice = (count: number): number => {
    if (count >= 600 && count <= 1000) return count * 0.5;
    if (count >= 1001 && count <= 3000) return count * 0.4;
    if (count >= 3001 && count <= 10000) return count * 0.3;
    return 0;
  };

  const handleCustomCountChange = (value: number[]) => {
    setCustomCount(value);
    setCustomInputValue(value[0].toString());
  };

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value) || 600;
    if (numValue >= 600 && numValue <= Math.min(maxInfluencers, 10000)) {
      setCustomCount([numValue]);
      setCustomInputValue(value);
    }
  };

  const customPrice = calculateCustomPrice(customCount[0]);
  const isCustomAvailable = maxInfluencers > 500;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <Card 
              key={pkg.id}
              className={`relative p-6 transition-smooth hover:shadow-glow ${
                pkg.recommended 
                  ? 'bg-gradient-card border-2 border-primary shadow-glow' 
                  : 'bg-gradient-card border-primary/20'
              }`}
            >
              {pkg.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                  Recommended
                </Badge>
              )}
              
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">${pkg.price}</div>
                  <div className="text-sm text-muted-foreground">{pkg.count} influencers</div>
                </div>
                
                <ul className="space-y-2 text-sm">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={pkg.recommended ? "hero" : "premium"}
                  className="w-full"
                  onClick={() => onPurchase(pkg.id, pkg.count, pkg.price)}
                >
                  Buy Package
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Package */}
      {isCustomAvailable && (
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Custom Package</h3>
              <p className="text-muted-foreground">Choose the exact number of influencers</p>
            </div>

            {customCount[0] >= 10000 ? (
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-primary">Contact Us</div>
                <p className="text-muted-foreground">For orders over 10,000 influencers</p>
                <Button variant="hero" onClick={() => onPurchase("contact", customCount[0], 0)}>
                  Contact Us
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Number of Influencers
                  </Label>
                  
                  <div className="flex gap-4 items-center">
                    <div className="flex-1">
                      <Slider
                        value={customCount}
                        onValueChange={handleCustomCountChange}
                        min={600}
                        max={Math.min(maxInfluencers, 10000)}
                        step={50}
                        className="w-full"
                      />
                    </div>
                    <Input
                      value={customInputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-24 text-center"
                      min={600}
                      max={Math.min(maxInfluencers, 10000)}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>600</span>
                    <span>{Math.min(maxInfluencers, 10000).toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">${customPrice.toFixed(0)}</div>
                  <div className="text-sm text-muted-foreground">
                    ${(customPrice / customCount[0]).toFixed(2)} per influencer
                  </div>
                </div>

                <Button
                  variant="premium"
                  className="w-full"
                  onClick={() => onPurchase("custom", customCount[0], customPrice)}
                >
                  Buy Custom Package
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};