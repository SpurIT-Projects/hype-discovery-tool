import { Card } from "@/components/ui/card";
import { Shield, Clock, Target, TrendingUp, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Verified Contacts",
    description: "All email addresses are verified and up-to-date. No bounces or invalid contacts."
  },
  {
    icon: Clock,
    title: "Save 100+ Hours",
    description: "Stop manually searching for influencers. Get instant access to pre-researched contacts."
  },
  {
    icon: Target,
    title: "Precise Targeting",
    description: "Advanced filters help you find influencers that match your exact campaign requirements."
  },
  {
    icon: TrendingUp,
    title: "Real Analytics",
    description: "Current engagement rates, follower counts, and performance metrics updated daily."
  },
  {
    icon: Users,
    title: "Quality Over Quantity",
    description: "Hand-curated database of authentic influencers, not fake accounts or bots."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your influencer list immediately. No waiting, no delays, just results."
  }
];

export const Benefits = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Database?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stop wasting time on manual research. Get access to verified influencer contacts instantly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};