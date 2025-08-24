import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "This database saved us months of research. We found 50+ perfect influencers for our tech product launch in just one day."
  },
  {
    name: "Mike Chen",
    company: "Fashion Forward",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "The contact quality is amazing. 95% response rate from influencers we contacted through this platform."
  },
  {
    name: "Lisa Rodriguez",
    company: "Fitness Pro",
    avatar: "/placeholder.svg",
    rating: 5,
    text: "Finally, a database that actually works! Real contacts, real engagement rates, real results for our campaigns."
  }
];

export const Testimonials = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of successful marketers who trust our influencer database
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6 bg-gradient-card border-primary/20 shadow-card rounded-2xl">
            <div className="space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
