import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {/* Influencer Size */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Users className="w-4 h-4 text-primary" />
            Influencer Size
          </Label>
          <Select value={filters.influencerSize} onValueChange={(value) => updateFilter('influencerSize', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select size" />
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
            Audience Location
          </Label>
          <Select value={filters.audienceLocation} onValueChange={(value) => updateFilter('audienceLocation', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {/* Top 7 most demanded countries */}
              <SelectItem value="us">🇺🇸 United States</SelectItem>
              <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="de">🇩🇪 Germany</SelectItem>
              <SelectItem value="fr">🇫🇷 France</SelectItem>
              <SelectItem value="br">🇧🇷 Brazil</SelectItem>
              <SelectItem value="ca">🇨🇦 Canada</SelectItem>
              <SelectItem value="au">🇦🇺 Australia</SelectItem>
              
              <div className="px-2 py-1">
                <Separator />
              </div>
              
              {/* All countries in alphabetical order */}
              <SelectItem value="ar">🇦🇷 Argentina</SelectItem>
              <SelectItem value="at">🇦🇹 Austria</SelectItem>
              <SelectItem value="be">🇧🇪 Belgium</SelectItem>
              <SelectItem value="bg">🇧🇬 Bulgaria</SelectItem>
              <SelectItem value="cl">🇨🇱 Chile</SelectItem>
              <SelectItem value="cn">🇨🇳 China</SelectItem>
              <SelectItem value="co">🇨🇴 Colombia</SelectItem>
              <SelectItem value="hr">🇭🇷 Croatia</SelectItem>
              <SelectItem value="cz">🇨🇿 Czech Republic</SelectItem>
              <SelectItem value="dk">🇩🇰 Denmark</SelectItem>
              <SelectItem value="ee">🇪🇪 Estonia</SelectItem>
              <SelectItem value="fi">🇫🇮 Finland</SelectItem>
              <SelectItem value="gr">🇬🇷 Greece</SelectItem>
              <SelectItem value="hk">🇭🇰 Hong Kong</SelectItem>
              <SelectItem value="hu">🇭🇺 Hungary</SelectItem>
              <SelectItem value="is">🇮🇸 Iceland</SelectItem>
              <SelectItem value="in">🇮🇳 India</SelectItem>
              <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
              <SelectItem value="ie">🇮🇪 Ireland</SelectItem>
              <SelectItem value="il">🇮🇱 Israel</SelectItem>
              <SelectItem value="it">🇮🇹 Italy</SelectItem>
              <SelectItem value="jp">🇯🇵 Japan</SelectItem>
              <SelectItem value="kr">🇰🇷 South Korea</SelectItem>
              <SelectItem value="lv">🇱🇻 Latvia</SelectItem>
              <SelectItem value="lt">🇱🇹 Lithuania</SelectItem>
              <SelectItem value="lu">🇱🇺 Luxembourg</SelectItem>
              <SelectItem value="my">🇲🇾 Malaysia</SelectItem>
              <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
              <SelectItem value="nl">🇳🇱 Netherlands</SelectItem>
              <SelectItem value="nz">🇳🇿 New Zealand</SelectItem>
              <SelectItem value="no">🇳🇴 Norway</SelectItem>
              <SelectItem value="pe">🇵🇪 Peru</SelectItem>
              <SelectItem value="ph">🇵🇭 Philippines</SelectItem>
              <SelectItem value="pl">🇵🇱 Poland</SelectItem>
              <SelectItem value="pt">🇵🇹 Portugal</SelectItem>
              <SelectItem value="ro">🇷🇴 Romania</SelectItem>
              <SelectItem value="ru">🇷🇺 Russia</SelectItem>
              <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
              <SelectItem value="sk">🇸🇰 Slovakia</SelectItem>
              <SelectItem value="si">🇸🇮 Slovenia</SelectItem>
              <SelectItem value="za">🇿🇦 South Africa</SelectItem>
              <SelectItem value="es">🇪🇸 Spain</SelectItem>
              <SelectItem value="se">🇸🇪 Sweden</SelectItem>
              <SelectItem value="ch">🇨🇭 Switzerland</SelectItem>
              <SelectItem value="th">🇹🇭 Thailand</SelectItem>
              <SelectItem value="tr">🇹🇷 Turkey</SelectItem>
              <SelectItem value="ua">🇺🇦 Ukraine</SelectItem>
              <SelectItem value="ae">🇦🇪 United Arab Emirates</SelectItem>
              <SelectItem value="uy">🇺🇾 Uruguay</SelectItem>
              <SelectItem value="vn">🇻🇳 Vietnam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-3 self-start">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Search className="w-4 h-4 text-primary" />
            Category
          </Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {/* Top 20 most popular categories */}
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="fitness">Fitness & Health</SelectItem>
              <SelectItem value="food">Food & Cooking</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="art">Art & Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="diy">DIY & Crafts</SelectItem>
              <SelectItem value="parenting">Parenting</SelectItem>
              <SelectItem value="pets">Pets & Animals</SelectItem>
              <SelectItem value="home">Home & Decor</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              
              <div className="px-2 py-1">
                <Separator />
              </div>
              
              <SelectItem value="custom">Other (Custom)</SelectItem>
            </SelectContent>
          </Select>
          
          {filters.category === "custom" && (
            <Input
              placeholder="Enter custom category..."
              value={filters.category === "custom" ? "" : filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="bg-background/50 border-primary/30 mt-2"
            />
          )}
        </div>

        {/* Avg Reels Views */}
        <div className="space-y-3 self-start">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Eye className="w-4 h-4 text-primary" />
            Reels Views (90 days)
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
              <span>1K</span>
              <span>{filters.avgReelsViews[0]?.toLocaleString() || '1K'}</span>
            </div>
          </div>
        </div>

        {/* Post Price */}
        <div className="space-y-3 self-start">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <DollarSign className="w-4 h-4 text-primary" />
            Post Price ($)
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
              <span>$50</span>
              <span>${filters.postPrice[0] || '50'}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};