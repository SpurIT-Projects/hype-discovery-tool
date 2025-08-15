import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Instagram, Youtube, Music, Twitter, Tv } from "lucide-react";

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
  onTrialRequest?: (packageType: string, count: number, price: number) => void;
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

export const SearchResults = ({ results = mockInfluencers, totalCount = 11212, isLoading = false, onTrialRequest }: SearchResultsProps) => {
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
    <div className="space-y-8">
      {/* Search Results Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Search Results</h3>
          <p className="text-muted-foreground">
            Showing first 5 influencers • {totalCount.toLocaleString()} total results found
          </p>
        </div>

        <Card className="bg-gradient-card border-primary/20 shadow-card relative overflow-hidden">
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Engagement Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Real influencer data - first 5 rows */}
                {results.slice(0, 5).map((influencer) => (
                  <TableRow key={influencer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={influencer.avatar} alt={influencer.name} />
                          <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{influencer.name}</div>
                          <div className="text-sm text-muted-foreground">{influencer.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(influencer.platform)}
                        <span className="capitalize">{influencer.platform}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span>{formatNumber(influencer.followers)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {influencer.engagementRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Blurred additional results - shown vertically below real data */}
                {totalCount > 5 && (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={`mock-${index}`} className="relative">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>••</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">•••••••••</div>
                              <div className="text-sm text-muted-foreground">@•••••••••</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-muted rounded"></div>
                            <span>•••••••••</span>
                          </div>
                        </TableCell>
                        <TableCell>•••••••</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">•••</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Absolute positioned overlay that covers entire card */}
          {totalCount > 5 && (
            <div className="absolute inset-0 bg-background/30 backdrop-blur-sm z-30 flex items-center justify-center" style={{top: '240px'}}>
              <div className="text-center space-y-2">
                <p className="font-semibold text-foreground">
                  +{(totalCount - 5).toLocaleString()} more influencers
                </p>
                <p className="text-sm text-muted-foreground">
                  Purchase a package to see all results
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Trial Section */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Try for Free</h3>
        <p className="text-muted-foreground">
          Get a sample of these 5 influencer contacts to evaluate our database quality
        </p>
        <Button 
          onClick={() => onTrialRequest?.("trial", 10, 0)}
          className="bg-gradient-primary text-white"
        >
          Get Free Trial Package (5 Contacts)
        </Button>
      </div>

      {/* Pricing Section */}
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Choose Your Package</h3>
          <p className="text-muted-foreground">
            Get full access to all {totalCount.toLocaleString()} influencers with verified contacts and current analytics
          </p>
        </div>
        
        <div className="w-full max-w-6xl mx-auto">
          <stripe-pricing-table 
            pricing-table-id="prctbl_1Rw0ChGifA2aeWJ3MA1cFlun"
            publishable-key="pk_test_51LdXkTGifA2aeWJ3CLmWlPiYusyyjUXvvmVpKFpwIjPWDzhUi1WDVs7wZncc1VA1smxKizBPb1mVw5FmByTqjrFb00cbdbnelP">
          </stripe-pricing-table>
        </div>
      </div>
    </div>
  );
};