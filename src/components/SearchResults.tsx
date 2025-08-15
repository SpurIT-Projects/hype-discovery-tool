import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, Eye, Zap, Instagram, Youtube, Music, Twitter, Tv } from "lucide-react";

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  platform: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  location: string;
  category: string;
  verified: boolean;
}

interface SearchResultsProps {
  results: Influencer[];
  totalCount: number;
  isLoading?: boolean;
}

const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Emma Johnson",
    username: "@emmaj_lifestyle",
    avatar: "/placeholder.svg",
    platform: "instagram",
    followers: 245000,
    avgViews: 8500,
    engagementRate: 1.8,
    location: "United States",
    category: "Lifestyle",
    verified: true
  },
  {
    id: "2", 
    name: "Alex Chen",
    username: "@alexchen_tech",
    avatar: "/placeholder.svg",
    platform: "youtube",
    followers: 158000,
    avgViews: 12300,
    engagementRate: 2.1,
    location: "Canada",
    category: "Technology",
    verified: false
  },
  {
    id: "3",
    name: "Sofia Martinez",
    username: "@sofia_beauty",
    avatar: "/placeholder.svg", 
    platform: "tiktok",
    followers: 89000,
    avgViews: 6700,
    engagementRate: 1.5,
    location: "Spain",
    category: "Beauty",
    verified: true
  },
  {
    id: "4",
    name: "Mike Thompson",
    username: "@mikethompson_fit",
    avatar: "/placeholder.svg",
    platform: "instagram",
    followers: 321000,
    avgViews: 15400,
    engagementRate: 1.9,
    location: "United Kingdom",
    category: "Fitness",
    verified: true
  },
  {
    id: "5",
    name: "Lisa Wang",
    username: "@lisawang_food",
    avatar: "/placeholder.svg",
    platform: "youtube",
    followers: 194000,
    avgViews: 9800,
    engagementRate: 1.7,
    location: "Australia",
    category: "Food & Cooking",
    verified: false
  }
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="w-4 h-4" />;
    case "youtube": 
      return <Youtube className="w-4 h-4" />;
    case "tiktok":
      return <Music className="w-4 h-4" />;
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "twitch":
      return <Tv className="w-4 h-4" />;
    default:
      return null;
  }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const SearchResults = ({ results = mockInfluencers, totalCount = 11212, isLoading = false }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-card border-primary/20 shadow-card">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Searching influencers...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card border-primary/20 shadow-card">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Search Results</h3>
          <p className="text-muted-foreground">
            Showing first 5 influencers • {totalCount.toLocaleString()} total results found
          </p>
        </div>

        <div className="grid gap-4">
          {results.slice(0, 5).map((influencer) => (
            <Card key={influencer.id} className="p-4 bg-background/50 border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={influencer.avatar} alt={influencer.name} />
                  <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                    {influencer.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{influencer.username}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {getPlatformIcon(influencer.platform)}
                      <span className="capitalize">{influencer.platform}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{formatNumber(influencer.followers)} followers</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(influencer.avgViews)} avg views</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span>{influencer.engagementRate}% engagement</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{influencer.location}</span>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {influencer.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button variant="default" size="sm" className="bg-gradient-primary text-white">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-primary/20">
          <p className="text-muted-foreground mb-4">
            {(totalCount - 5).toLocaleString()} more influencers match your criteria
          </p>
          <Button variant="outline" className="px-6">
            View All Results
          </Button>
        </div>
      </div>
    </Card>
  );
};