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
import { MapPin, Users, Eye, Search, Zap, Share2 } from "lucide-react";
import {SiInstagram, SiTiktok, SiTwitch, SiX, SiYoutube} from "@icons-pack/react-simple-icons";

export interface FilterState {
  platform: string;
  size: string;
  location: string;
  category: string;
  avg_views: number[];
  er: number[];
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
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCategoryInputChange = (value: string) => {
    updateFilter('category', value);
    if (value.length > 0) {
      setCategoryOpen(true);
    }
    setSearchCategory(value || "");
  };

  const handleCategorySelect = (category: string) => {
    updateFilter('category', category);
    setCategoryOpen(false);
    setSearchCategory("")
  };


  return (
    <Card className="p-6 bg-gradient-card border-primary/20 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Social Platform */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-foreground font-medium">
            <Share2 className="w-4 h-4 text-primary" />
            Social Platform
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={filters.platform} onValueChange={(value) => updateFilter('platform', value)}>
            <SelectTrigger className="bg-background/50 border-primary/30">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">
                <div className="flex items-center gap-2">
                  <SiInstagram className="w-4 h-4" />
                  Instagram
                </div>
              </SelectItem>
              <SelectItem value="youtube">
                <div className="flex items-center gap-2">
                  <SiYoutube className="w-4 h-4" />
                  YouTube
                </div>
              </SelectItem>
              <SelectItem value="tiktok">
                <div className="flex items-center gap-2">
                  <SiTiktok className="w-4 h-4" />
                  TikTok
                </div>
              </SelectItem>
              <SelectItem value="twitter">
                <div className="flex items-center gap-2">
                  <SiX className="w-4 h-4" />
                  Twitter
                </div>
              </SelectItem>
              <SelectItem value="twitch">
                <div className="flex items-center gap-2">
                  <SiTwitch className="w-4 h-4" />
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
          <Select value={filters.size} onValueChange={(value) => updateFilter('size', value)}>
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
                {filters.location
                  ? countries.find((country) => country.value === filters.location)?.label
                  : "Select country..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
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
                          updateFilter('location', currentValue === filters.location ? "" : currentValue);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.location === country.value ? "opacity-100" : "opacity-0"
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
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter your niche or category..."
              value={filters.category}
              onClick={() => setCategoryOpen(true)}
              onChange={(e) => handleCategoryInputChange(e.target.value)}
              className="bg-background/50 border-primary/30"
            />
            <Popover open={categoryOpen} onOpenChange={(value) => {
                setCategoryOpen(value);
                setSearchCategory("")
            }}>
              <PopoverTrigger asChild>
                <div className="absolute inset-0 pointer-events-none" />
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
                <Command>
                  <CommandInput placeholder="Search category..." value={searchCategory} hidden/>
                  <CommandList>
                      <CommandGroup>
                        {categories
                          .map((category) => (
                            <CommandItem
                              key={category}
                              value={category}
                              onSelect={() => handleCategorySelect(category)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.category === category ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {category}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
              value={filters.avg_views}
              onValueChange={(value) => updateFilter('avg_views', value)}
              max={10000}
              min={100}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>100</span>
              <span>From: {filters.avg_views[0]?.toLocaleString() || '100'}</span>
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
              value={filters.er}
              onValueChange={(value) => updateFilter('er', value)}
              max={2.0}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0.1%</span>
              <span>From: {filters.er[0]?.toFixed(1) || '0.1'}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={onSearch}
          disabled={!filters.platform || !filters.category}
          className="px-8 py-3 bg-gradient-primary text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4 mr-2" />
          Search Influencers
        </Button>
      </div>
    </Card>
  );
};
