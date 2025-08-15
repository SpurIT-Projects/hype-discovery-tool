import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Instagram, Youtube, Music, Twitter, Tv } from "lucide-react";

interface Influencer {
  user_id: string;
  profile: {
    full_name: string;
    username: string;
    picture: string;
    followers: number;
    engagement_percent: number;
  };
}

interface SearchResultsProps {
  results: Influencer[];
  totalCount: number;
  platform?: string;
  isLoading?: boolean;
  onTrialRequest?: (packageType: string, count: number, price: number) => void;
}

const mockInfluencers: Influencer[] = [];

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

export const SearchResults = ({ results = [], totalCount = 0, platform = "", isLoading = false, onTrialRequest }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="py-20">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <p className="text-muted-foreground text-lg">Searching influencers...</p>
        </div>
      </div>
    );
  }

  // Show "no results" message when totalCount is 0
  if (totalCount === 0) {
    return (
      <div className="py-20">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Search Results</h3>
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">No influencers found</p>
            <p>Try adjusting your search parameters to find more results</p>
          </div>
        </div>
      </div>
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
                  <TableRow key={influencer.user_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={influencer.profile.picture} alt={influencer.profile.full_name} />
                          <AvatarFallback>{influencer.profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{influencer.profile.full_name}</div>
                          <div className="text-sm text-muted-foreground">{influencer.profile.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(platform)}
                        <span className="capitalize">{platform}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span>{formatNumber(influencer.profile.followers)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {influencer.profile.engagement_percent.toFixed(1)}%
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
                              <div className="text-sm text-muted-foreground">•••••••••</div>
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
            <div className="absolute inset-0 bg-background/30 backdrop-blur-sm z-30 flex items-center justify-center" style={{top: '200px'}}>
              <div className="text-center space-y-3 max-w-sm mx-auto px-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">
                    +{(totalCount - 5).toLocaleString()} more influencers
                  </p>
                </div>
                
                {/* Try for Free section */}
                <div className="space-y-2 pt-2 border-t border-primary/20">
                  <h4 className="text-base font-bold text-foreground">Try for Free</h4>
                  <p className="text-xs text-muted-foreground">
                    Get 5 sample contacts to evaluate our database
                  </p>
                  <div className="space-y-2">
                    <Input 
                      type="email" 
                      placeholder="Enter email"
                      className="bg-background/80 backdrop-blur-sm border-primary/30 h-8 text-sm"
                    />
                    <Button 
                      onClick={() => onTrialRequest?.("trial", 10, 0)}
                      className="w-full bg-gradient-primary text-white h-8 text-sm"
                    >
                      Get Free Trial (5 Contacts)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
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