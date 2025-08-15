import { Card } from "@/components/ui/card";
import { Search, Filter, Download, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Filter,
    title: "Set Your Filters",
    description: "Choose platform, location, category, and engagement metrics to find your perfect influencers"
  },
  {
    icon: Search,
    title: "Search Database",
    description: "Our AI-powered search scans through 100,000+ verified influencer profiles instantly"
  },
  {
    icon: Download,
    title: "Get Contacts",
    description: "Download verified email addresses and contact information for your selected influencers"
  },
  {
    icon: MessageCircle,
    title: "Start Collaborating",
    description: "Reach out directly to influencers and begin building profitable partnerships"
  }
];

export const HowItWorks = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get started with influencer marketing in just 4 simple steps
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="p-6 bg-gradient-card border-primary/20 shadow-card text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};