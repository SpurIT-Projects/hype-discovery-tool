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
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Database?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stop wasting time on manual research. Get access to verified influencer contacts instantly.
        </p>
      </div>
      
      <div className="space-y-16">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index} 
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
            >
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              
              {/* Content Section */}
              <div className={`flex-1 text-center ${isEven ? 'lg:text-left' : 'lg:text-right'} space-y-4`}>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};