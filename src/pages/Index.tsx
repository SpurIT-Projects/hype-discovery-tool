import { useState, useEffect } from "react";
import { InfluencerFilters, FilterState } from "@/components/InfluencerFilters";
import { PricingPackages } from "@/components/PricingPackages";
import { TrialSection } from "@/components/TrialSection";
import { ContactForm } from "@/components/ContactForm";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    influencerSize: "micro",
    audienceLocation: "us",
    avgReelsViews: [10000],
    category: "lifestyle",
    postPrice: [500]
  });
  
  const [maxInfluencers, setMaxInfluencers] = useState(8542);
  const [showContactForm, setShowContactForm] = useState(false);

  // Simulate fetching available influencers count based on filters
  useEffect(() => {
    const simulateApiCall = () => {
      const baseCount = 8542;
      const variation = Math.floor(Math.random() * 3000);
      setMaxInfluencers(baseCount + variation);
    };
    
    const timeoutId = setTimeout(simulateApiCall, 500);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handlePurchase = (packageType: string, count: number, price: number) => {
    if (packageType === "contact") {
      setShowContactForm(true);
      return;
    }
    
    // Here you would integrate with payment system
    console.log(`Purchasing ${packageType} package: ${count} influencers for $${price}`);
    // Redirect to payment or show payment modal
  };

  const stats = [
    { icon: Users, label: "Active Influencers", value: "100,000+" },
    { icon: Globe, label: "Countries", value: "50+" },
    { icon: TrendingUp, label: "Average ER", value: "4.2%" },
    { icon: Zap, label: "Daily Updates", value: "100+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 mb-16">
          <Badge className="bg-gradient-primary text-white px-4 py-2">
            Premium Influencer Database
          </Badge>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Find Perfect
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Influencers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get access to a verified database of influencers who can promote your products through promotional or native posts and video reviews on their social networks, with detailed analytics and up-to-date contact information
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Customize Your Search</h2>
            <p className="text-muted-foreground">
              Found <span className="text-primary font-semibold">{maxInfluencers.toLocaleString()}</span> influencers matching your criteria
            </p>
          </div>
          
          <InfluencerFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Pricing Section */}
        <div className="space-y-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Package</h2>
            <p className="text-muted-foreground">
              All packages include verified contacts and current analytics
            </p>
          </div>
          
          {showContactForm ? (
            <ContactForm onClose={() => setShowContactForm(false)} />
          ) : (
            <PricingPackages 
              maxInfluencers={maxInfluencers} 
              onPurchase={handlePurchase}
            />
          )}
        </div>

        {/* Trial Section */}
        {!showContactForm && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Try for Free</h2>
              <p className="text-muted-foreground">
                Evaluate the quality of our database before making a purchase
              </p>
            </div>
            
            <TrialSection />
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>© 2024 Influencer Database. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <a href="mailto:contact@influencerdb.com" className="text-muted-foreground hover:text-primary transition-colors">
                contact@influencerdb.com
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="tel:+1-555-0123" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
