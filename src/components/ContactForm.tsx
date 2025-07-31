import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, User, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  onClose: () => void;
}

export const ContactForm = ({ onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We will contact you within 24 hours",
      });
      onClose();
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="p-8 bg-gradient-card border-primary/20 max-w-2xl mx-auto">
      <div className="text-center space-y-4 mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Contact Us</h3>
          <p className="text-muted-foreground">
            For large orders we will offer personalized terms
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-background/50 border-primary/30"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-background/50 border-primary/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Phone (optional)
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="bg-background/50 border-primary/30"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your needs..."
            value={formData.message}
            onChange={handleChange}
            className="bg-background/50 border-primary/30"
            required
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="hero" className="flex-1">
            Send Message
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};