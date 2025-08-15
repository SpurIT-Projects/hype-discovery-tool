import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MapPin, Users, Eye, Search, Zap, Share2, Instagram, Youtube, Music, Tv, Twitter } from "lucide-react";

export interface FilterState {
  socialPlatform: string;
  influencerSize: string;
  influencerLocation: string;
  category: string;
  avgViews: number[];
  engagementRate: number[];
}

interface InfluencerFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: () => void;
}

const countries = [
  { value: "us", label: "🇺🇸 United States" },
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "de", label: "🇩🇪 Germany" },
  { value: "fr", label: "🇫🇷 France" },
  { value: "br", label: "🇧🇷 Brazil" },
  { value: "ca", label: "🇨🇦 Canada" },
  { value: "au", label: "🇦🇺 Australia" },
  { value: "es", label: "🇪🇸 Spain" },
  { value: "it", label: "🇮🇹 Italy" },
  { value: "jp", label: "🇯🇵 Japan" },
  { value: "kr", label: "🇰🇷 South Korea" },
  { value: "in", label: "🇮🇳 India" },
  { value: "mx", label: "🇲🇽 Mexico" },
  { value: "nl", label: "🇳🇱 Netherlands" },
  { value: "se", label: "🇸🇪 Sweden" },
  { value: "no", label: "🇳🇴 Norway" },
  { value: "dk", label: "🇩🇰 Denmark" },
  { value: "fi", label: "🇫🇮 Finland" },
  { value: "ch", label: "🇨🇭 Switzerland" },
  { value: "at", label: "🇦🇹 Austria" },
];

const categories = [
  "Fashion",
  "Beauty", 
  "Lifestyle",
  "Fitness & Health",
  "Food & Cooking",
  "Travel",
  "Technology",
  "Gaming",
  "Music",
  "Art & Design",
  "Business",
  "Education",
  "Sports",
  "Entertainment",
  "Photography",
  "DIY & Crafts",
  "Parenting",
  "Pets & Animals",
  "Home & Decor",
  "Automotive"
];

export const InfluencerFilters = ({ filters, onFiltersChange, onSearch }: InfluencerFiltersProps) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryInputValue, setCategoryInputValue] = useState(filters.category);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCategoryInputChange = (value: string) => {
    setCategoryInputValue(value);
    updateFilter('category', value);
    setShowCategorySuggestions(value.length > 0);
  };

  const handleCategorySelect = (category: string) => {
    setCategoryInputValue(category);
    updateFilter('category', category);
    setShowCategorySuggestions(false);
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/20 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Social Platform */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Share2 className="w-4 h-4 text-primary" />
            Social Platform
          </Label>
          <Select value={filters.socialPlatform} onValueChange={(value) => updateFilter('socialPlatform', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </div>
              </SelectItem>
              <SelectItem value="youtube">
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube
                </div>
              </SelectItem>
              <SelectItem value="tiktok">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  TikTok
                </div>
              </SelectItem>
              <SelectItem value="twitter">
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </div>
              </SelectItem>
              <SelectItem value="twitch">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4" />
                  Twitch
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        {/* Influencer Location */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            Influencer Location
          </Label>
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={locationOpen}
                className="w-full justify-between bg-background/50 border-primary/30"
              >
                {filters.influencerLocation
                  ? countries.find((country) => country.value === filters.influencerLocation)?.label
                  : "Select country..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.value}
                        onSelect={(currentValue) => {
                          updateFilter('influencerLocation', currentValue === filters.influencerLocation ? "" : currentValue);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.influencerLocation === country.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {country.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Category */}
        <div className="space-y-3 relative">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Search className="w-4 h-4 text-primary" />
            Category
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter category..."
              value={categoryInputValue}
              onChange={(e) => handleCategoryInputChange(e.target.value)}
              onFocus={() => setShowCategorySuggestions(true)}
              className="bg-background/50 border-primary/30"
            />
            {showCategorySuggestions && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
                {categories
                  .filter(category => 
                    category.toLowerCase().includes(categoryInputValue.toLowerCase())
                  )
                  .map((category) => (
                    <div
                      key={category}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Avg Views (per post) */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Eye className="w-4 h-4 text-primary" />
            Avg Views (per post)
          </Label>
          <div className="px-3">
            <Slider
              value={filters.avgViews}
              onValueChange={(value) => updateFilter('avgViews', value)}
              max={10000}
              min={100}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>100</span>
              <span>From: {filters.avgViews[0]?.toLocaleString() || '100'}</span>
            </div>
          </div>
        </div>

        {/* Engagement Rate (%) */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Zap className="w-4 h-4 text-primary" />
            Engagement Rate (%)
          </Label>
          <div className="px-3">
            <Slider
              value={filters.engagementRate}
              onValueChange={(value) => updateFilter('engagementRate', value)}
              max={2.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0.1%</span>
              <span>From: {filters.engagementRate[0]?.toFixed(1) || '0.1'}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={onSearch} className="px-8 py-3 bg-gradient-primary text-white font-medium">
          <Search className="w-4 h-4 mr-2" />
          Search Influencers
        </Button>
      </div>
    </Card>
  );
};