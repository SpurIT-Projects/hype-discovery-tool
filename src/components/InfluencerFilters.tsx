import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Eye, Search, DollarSign, Share2, Instagram, Youtube, Music, Tv, Twitter, Camera } from "lucide-react";

export interface FilterState {
  socialPlatform: string;
  influencerSize: string;
  audienceLocation: string;
  avgReelsViews: number[];
  category: string;
  customCategory: string;
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
              <SelectItem value="twitch">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4" />
                  Twitch
                </div>
              </SelectItem>
              <SelectItem value="twitter">
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  X (Twitter)
                </div>
              </SelectItem>
              <SelectItem value="snapchat">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Snapchat
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
              <SelectItem value="af">🇦🇫 Afghanistan</SelectItem>
              <SelectItem value="al">🇦🇱 Albania</SelectItem>
              <SelectItem value="dz">🇩🇿 Algeria</SelectItem>
              <SelectItem value="ad">🇦🇩 Andorra</SelectItem>
              <SelectItem value="ao">🇦🇴 Angola</SelectItem>
              <SelectItem value="ag">🇦🇬 Antigua and Barbuda</SelectItem>
              <SelectItem value="ar">🇦🇷 Argentina</SelectItem>
              <SelectItem value="am">🇦🇲 Armenia</SelectItem>
              <SelectItem value="at">🇦🇹 Austria</SelectItem>
              <SelectItem value="az">🇦🇿 Azerbaijan</SelectItem>
              <SelectItem value="bs">🇧🇸 Bahamas</SelectItem>
              <SelectItem value="bh">🇧🇭 Bahrain</SelectItem>
              <SelectItem value="bd">🇧🇩 Bangladesh</SelectItem>
              <SelectItem value="bb">🇧🇧 Barbados</SelectItem>
              <SelectItem value="by">🇧🇾 Belarus</SelectItem>
              <SelectItem value="be">🇧🇪 Belgium</SelectItem>
              <SelectItem value="bz">🇧🇿 Belize</SelectItem>
              <SelectItem value="bj">🇧🇯 Benin</SelectItem>
              <SelectItem value="bt">🇧🇹 Bhutan</SelectItem>
              <SelectItem value="bo">🇧🇴 Bolivia</SelectItem>
              <SelectItem value="ba">🇧🇦 Bosnia and Herzegovina</SelectItem>
              <SelectItem value="bw">🇧🇼 Botswana</SelectItem>
              <SelectItem value="bg">🇧🇬 Bulgaria</SelectItem>
              <SelectItem value="bf">🇧🇫 Burkina Faso</SelectItem>
              <SelectItem value="bi">🇧🇮 Burundi</SelectItem>
              <SelectItem value="cv">🇨🇻 Cabo Verde</SelectItem>
              <SelectItem value="kh">🇰🇭 Cambodia</SelectItem>
              <SelectItem value="cm">🇨🇲 Cameroon</SelectItem>
              <SelectItem value="cf">🇨🇫 Central African Republic</SelectItem>
              <SelectItem value="td">🇹🇩 Chad</SelectItem>
              <SelectItem value="cl">🇨🇱 Chile</SelectItem>
              <SelectItem value="cn">🇨🇳 China</SelectItem>
              <SelectItem value="co">🇨🇴 Colombia</SelectItem>
              <SelectItem value="km">🇰🇲 Comoros</SelectItem>
              <SelectItem value="cg">🇨🇬 Congo</SelectItem>
              <SelectItem value="cd">🇨🇩 Congo (Democratic Republic)</SelectItem>
              <SelectItem value="cr">🇨🇷 Costa Rica</SelectItem>
              <SelectItem value="ci">🇨🇮 Côte d'Ivoire</SelectItem>
              <SelectItem value="hr">🇭🇷 Croatia</SelectItem>
              <SelectItem value="cu">🇨🇺 Cuba</SelectItem>
              <SelectItem value="cy">🇨🇾 Cyprus</SelectItem>
              <SelectItem value="cz">🇨🇿 Czech Republic</SelectItem>
              <SelectItem value="dk">🇩🇰 Denmark</SelectItem>
              <SelectItem value="dj">🇩🇯 Djibouti</SelectItem>
              <SelectItem value="dm">🇩🇲 Dominica</SelectItem>
              <SelectItem value="do">🇩🇴 Dominican Republic</SelectItem>
              <SelectItem value="ec">🇪🇨 Ecuador</SelectItem>
              <SelectItem value="eg">🇪🇬 Egypt</SelectItem>
              <SelectItem value="sv">🇸🇻 El Salvador</SelectItem>
              <SelectItem value="gq">🇬🇶 Equatorial Guinea</SelectItem>
              <SelectItem value="er">🇪🇷 Eritrea</SelectItem>
              <SelectItem value="ee">🇪🇪 Estonia</SelectItem>
              <SelectItem value="sz">🇸🇿 Eswatini</SelectItem>
              <SelectItem value="et">🇪🇹 Ethiopia</SelectItem>
              <SelectItem value="fj">🇫🇯 Fiji</SelectItem>
              <SelectItem value="fi">🇫🇮 Finland</SelectItem>
              <SelectItem value="ga">🇬🇦 Gabon</SelectItem>
              <SelectItem value="gm">🇬🇲 Gambia</SelectItem>
              <SelectItem value="ge">🇬🇪 Georgia</SelectItem>
              <SelectItem value="gh">🇬🇭 Ghana</SelectItem>
              <SelectItem value="gr">🇬🇷 Greece</SelectItem>
              <SelectItem value="gd">🇬🇩 Grenada</SelectItem>
              <SelectItem value="gt">🇬🇹 Guatemala</SelectItem>
              <SelectItem value="gn">🇬🇳 Guinea</SelectItem>
              <SelectItem value="gw">🇬🇼 Guinea-Bissau</SelectItem>
              <SelectItem value="gy">🇬🇾 Guyana</SelectItem>
              <SelectItem value="ht">🇭🇹 Haiti</SelectItem>
              <SelectItem value="hn">🇭🇳 Honduras</SelectItem>
              <SelectItem value="hk">🇭🇰 Hong Kong</SelectItem>
              <SelectItem value="hu">🇭🇺 Hungary</SelectItem>
              <SelectItem value="is">🇮🇸 Iceland</SelectItem>
              <SelectItem value="in">🇮🇳 India</SelectItem>
              <SelectItem value="id">🇮🇩 Indonesia</SelectItem>
              <SelectItem value="ir">🇮🇷 Iran</SelectItem>
              <SelectItem value="iq">🇮🇶 Iraq</SelectItem>
              <SelectItem value="ie">🇮🇪 Ireland</SelectItem>
              <SelectItem value="il">🇮🇱 Israel</SelectItem>
              <SelectItem value="it">🇮🇹 Italy</SelectItem>
              <SelectItem value="jm">🇯🇲 Jamaica</SelectItem>
              <SelectItem value="jp">🇯🇵 Japan</SelectItem>
              <SelectItem value="jo">🇯🇴 Jordan</SelectItem>
              <SelectItem value="kz">🇰🇿 Kazakhstan</SelectItem>
              <SelectItem value="ke">🇰🇪 Kenya</SelectItem>
              <SelectItem value="ki">🇰🇮 Kiribati</SelectItem>
              <SelectItem value="kp">🇰🇵 Korea (North)</SelectItem>
              <SelectItem value="kr">🇰🇷 Korea (South)</SelectItem>
              <SelectItem value="kw">🇰🇼 Kuwait</SelectItem>
              <SelectItem value="kg">🇰🇬 Kyrgyzstan</SelectItem>
              <SelectItem value="la">🇱🇦 Laos</SelectItem>
              <SelectItem value="lv">🇱🇻 Latvia</SelectItem>
              <SelectItem value="lb">🇱🇧 Lebanon</SelectItem>
              <SelectItem value="ls">🇱🇸 Lesotho</SelectItem>
              <SelectItem value="lr">🇱🇷 Liberia</SelectItem>
              <SelectItem value="ly">🇱🇾 Libya</SelectItem>
              <SelectItem value="li">🇱🇮 Liechtenstein</SelectItem>
              <SelectItem value="lt">🇱🇹 Lithuania</SelectItem>
              <SelectItem value="lu">🇱🇺 Luxembourg</SelectItem>
              <SelectItem value="mk">🇲🇰 North Macedonia</SelectItem>
              <SelectItem value="mg">🇲🇬 Madagascar</SelectItem>
              <SelectItem value="mw">🇲🇼 Malawi</SelectItem>
              <SelectItem value="my">🇲🇾 Malaysia</SelectItem>
              <SelectItem value="mv">🇲🇻 Maldives</SelectItem>
              <SelectItem value="ml">🇲🇱 Mali</SelectItem>
              <SelectItem value="mt">🇲🇹 Malta</SelectItem>
              <SelectItem value="mh">🇲🇭 Marshall Islands</SelectItem>
              <SelectItem value="mr">🇲🇷 Mauritania</SelectItem>
              <SelectItem value="mu">🇲🇺 Mauritius</SelectItem>
              <SelectItem value="mx">🇲🇽 Mexico</SelectItem>
              <SelectItem value="fm">🇫🇲 Micronesia</SelectItem>
              <SelectItem value="md">🇲🇩 Moldova</SelectItem>
              <SelectItem value="mc">🇲🇨 Monaco</SelectItem>
              <SelectItem value="mn">🇲🇳 Mongolia</SelectItem>
              <SelectItem value="me">🇲🇪 Montenegro</SelectItem>
              <SelectItem value="ma">🇲🇦 Morocco</SelectItem>
              <SelectItem value="mz">🇲🇿 Mozambique</SelectItem>
              <SelectItem value="mm">🇲🇲 Myanmar</SelectItem>
              <SelectItem value="na">🇳🇦 Namibia</SelectItem>
              <SelectItem value="nr">🇳🇷 Nauru</SelectItem>
              <SelectItem value="np">🇳🇵 Nepal</SelectItem>
              <SelectItem value="nl">🇳🇱 Netherlands</SelectItem>
              <SelectItem value="nz">🇳🇿 New Zealand</SelectItem>
              <SelectItem value="ni">🇳🇮 Nicaragua</SelectItem>
              <SelectItem value="ne">🇳🇪 Niger</SelectItem>
              <SelectItem value="ng">🇳🇬 Nigeria</SelectItem>
              <SelectItem value="no">🇳🇴 Norway</SelectItem>
              <SelectItem value="om">🇴🇲 Oman</SelectItem>
              <SelectItem value="pk">🇵🇰 Pakistan</SelectItem>
              <SelectItem value="pw">🇵🇼 Palau</SelectItem>
              <SelectItem value="pa">🇵🇦 Panama</SelectItem>
              <SelectItem value="pg">🇵🇬 Papua New Guinea</SelectItem>
              <SelectItem value="py">🇵🇾 Paraguay</SelectItem>
              <SelectItem value="pe">🇵🇪 Peru</SelectItem>
              <SelectItem value="ph">🇵🇭 Philippines</SelectItem>
              <SelectItem value="pl">🇵🇱 Poland</SelectItem>
              <SelectItem value="pt">🇵🇹 Portugal</SelectItem>
              <SelectItem value="qa">🇶🇦 Qatar</SelectItem>
              <SelectItem value="ro">🇷🇴 Romania</SelectItem>
              <SelectItem value="ru">🇷🇺 Russia</SelectItem>
              <SelectItem value="rw">🇷🇼 Rwanda</SelectItem>
              <SelectItem value="kn">🇰🇳 Saint Kitts and Nevis</SelectItem>
              <SelectItem value="lc">🇱🇨 Saint Lucia</SelectItem>
              <SelectItem value="vc">🇻🇨 Saint Vincent and the Grenadines</SelectItem>
              <SelectItem value="ws">🇼🇸 Samoa</SelectItem>
              <SelectItem value="sm">🇸🇲 San Marino</SelectItem>
              <SelectItem value="st">🇸🇹 São Tomé and Príncipe</SelectItem>
              <SelectItem value="sa">🇸🇦 Saudi Arabia</SelectItem>
              <SelectItem value="sn">🇸🇳 Senegal</SelectItem>
              <SelectItem value="rs">🇷🇸 Serbia</SelectItem>
              <SelectItem value="sc">🇸🇨 Seychelles</SelectItem>
              <SelectItem value="sl">🇸🇱 Sierra Leone</SelectItem>
              <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
              <SelectItem value="sk">🇸🇰 Slovakia</SelectItem>
              <SelectItem value="si">🇸🇮 Slovenia</SelectItem>
              <SelectItem value="sb">🇸🇧 Solomon Islands</SelectItem>
              <SelectItem value="so">🇸🇴 Somalia</SelectItem>
              <SelectItem value="za">🇿🇦 South Africa</SelectItem>
              <SelectItem value="ss">🇸🇸 South Sudan</SelectItem>
              <SelectItem value="es">🇪🇸 Spain</SelectItem>
              <SelectItem value="lk">🇱🇰 Sri Lanka</SelectItem>
              <SelectItem value="sd">🇸🇩 Sudan</SelectItem>
              <SelectItem value="sr">🇸🇷 Suriname</SelectItem>
              <SelectItem value="se">🇸🇪 Sweden</SelectItem>
              <SelectItem value="ch">🇨🇭 Switzerland</SelectItem>
              <SelectItem value="sy">🇸🇾 Syria</SelectItem>
              <SelectItem value="tw">🇹🇼 Taiwan</SelectItem>
              <SelectItem value="tj">🇹🇯 Tajikistan</SelectItem>
              <SelectItem value="tz">🇹🇿 Tanzania</SelectItem>
              <SelectItem value="th">🇹🇭 Thailand</SelectItem>
              <SelectItem value="tl">🇹🇱 Timor-Leste</SelectItem>
              <SelectItem value="tg">🇹🇬 Togo</SelectItem>
              <SelectItem value="to">🇹🇴 Tonga</SelectItem>
              <SelectItem value="tt">🇹🇹 Trinidad and Tobago</SelectItem>
              <SelectItem value="tn">🇹🇳 Tunisia</SelectItem>
              <SelectItem value="tr">🇹🇷 Turkey</SelectItem>
              <SelectItem value="tm">🇹🇲 Turkmenistan</SelectItem>
              <SelectItem value="tv">🇹🇻 Tuvalu</SelectItem>
              <SelectItem value="ug">🇺🇬 Uganda</SelectItem>
              <SelectItem value="ua">🇺🇦 Ukraine</SelectItem>
              <SelectItem value="ae">🇦🇪 United Arab Emirates</SelectItem>
              <SelectItem value="uy">🇺🇾 Uruguay</SelectItem>
              <SelectItem value="uz">🇺🇿 Uzbekistan</SelectItem>
              <SelectItem value="vu">🇻🇺 Vanuatu</SelectItem>
              <SelectItem value="va">🇻🇦 Vatican City</SelectItem>
              <SelectItem value="ve">🇻🇪 Venezuela</SelectItem>
              <SelectItem value="vn">🇻🇳 Vietnam</SelectItem>
              <SelectItem value="ye">🇾🇪 Yemen</SelectItem>
              <SelectItem value="zm">🇿🇲 Zambia</SelectItem>
              <SelectItem value="zw">🇿🇼 Zimbabwe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-3 relative">
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
        </div>

        {/* Avg Reels Views */}
        <div className="space-y-3">
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
        <div className="space-y-3">
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
        
        {/* Custom Category Input - только когда custom выбран */}
        {filters.category === "custom" && (
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-foreground font-medium">
              <Search className="w-4 h-4 text-primary" />
              Custom Category
            </Label>
            <Input
              placeholder="Enter custom category..."
              value={filters.customCategory}
              onChange={(e) => updateFilter('customCategory', e.target.value)}
              className="bg-background/50 border-primary/30"
            />
          </div>
        )}
      </div>
    </Card>
  );
};