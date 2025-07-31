import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TrialSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email адрес",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Успешно!",
        description: "Пробный пакет будет отправлен на ваш email в течение 5 минут",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-gradient-card border-primary/20 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Готово!</h3>
          <p className="text-muted-foreground">
            Пробный пакет из 5 инфлюэнсеров отправлен на {email}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-card border-primary/20">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
          <Gift className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Бесплатный пробный пакет</h3>
          <p className="text-muted-foreground">
            Получите 5 инфлюэнсеров бесплатно, чтобы оценить качество нашей базы
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4 text-primary" />
              Email адрес
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-primary/30 text-center"
              required
            />
          </div>
          
          <Button type="submit" variant="hero" className="w-full">
            Получить бесплатный пакет
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Никакого спама. Только качественные данные инфлюэнсеров.
        </p>
      </div>
    </Card>
  );
};