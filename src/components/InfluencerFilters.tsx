import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MapPin, Users, Eye, Search, DollarSign } from "lucide-react";

export interface FilterState {
  influencerSize: string;
  audienceLocation: string;
  avgReelsViews: number[];
  category: string;
  postPrice: number[];
}

interface InfluencerFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const InfluencerFilters = ({ filters, onFiltersChange }: InfluencerFiltersProps) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/20 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Influencer Size */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Users className="w-4 h-4 text-primary" />
            Размер влияния
          </Label>
          <Select value={filters.influencerSize} onValueChange={(value) => updateFilter('influencerSize', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Выберите размер" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nano">Nano (1K-10K)</SelectItem>
              <SelectItem value="micro">Micro (10K-50K)</SelectItem>
              <SelectItem value="mid">Mid (50K-500K)</SelectItem>
              <SelectItem value="macro">Macro (500K-1M)</SelectItem>
              <SelectItem value="mega">Mega (1M+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audience Location */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            Локация аудитории
          </Label>
          <Select value={filters.audienceLocation} onValueChange={(value) => updateFilter('audienceLocation', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Выберите страну" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">США</SelectItem>
              <SelectItem value="uk">Великобритания</SelectItem>
              <SelectItem value="ru">Россия</SelectItem>
              <SelectItem value="de">Германия</SelectItem>
              <SelectItem value="fr">Франция</SelectItem>
              <SelectItem value="ca">Канада</SelectItem>
              <SelectItem value="au">Австралия</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Search className="w-4 h-4 text-primary" />
            Категория
          </Label>
          <Input
            placeholder="Введите категорию..."
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="bg-background/50 border-primary/30"
          />
        </div>

        {/* Avg Reels Views */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Eye className="w-4 h-4 text-primary" />
            Просмотры Reels (90 дней)
          </Label>
          <div className="px-3">
            <Slider
              value={filters.avgReelsViews}
              onValueChange={(value) => updateFilter('avgReelsViews', value)}
              max={1000000}
              min={1000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{filters.avgReelsViews[0].toLocaleString()}</span>
              <span>{filters.avgReelsViews[1]?.toLocaleString() || '1M+'}</span>
            </div>
          </div>
        </div>

        {/* Post Price */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <DollarSign className="w-4 h-4 text-primary" />
            Цена за пост ($)
          </Label>
          <div className="px-3">
            <Slider
              value={filters.postPrice}
              onValueChange={(value) => updateFilter('postPrice', value)}
              max={10000}
              min={50}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${filters.postPrice[0]}</span>
              <span>${filters.postPrice[1] || '10K+'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};