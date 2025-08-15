import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
          <div className="p-4">
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 pb-4 border-b border-primary/20 font-medium text-sm text-muted-foreground">
              <div>Influencer</div>
              <div>Platform</div>
              <div>Followers</div>
              <div>Engagement Rate</div>
            </div>

            {/* Results Grid */}
            <div className="space-y-4 md:space-y-0">
              {/* Real influencer data - always visible */}
              {results.slice(0, 5).map((influencer, index) => (
                <div key={influencer.user_id} className={`py-4 ${index > 0 ? 'border-t border-primary/10 md:border-t-0' : ''}`}>
                  {/* Mobile Card Layout */}
                  <div className="md:hidden">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={influencer.profile.picture} alt={influencer.profile.full_name} />
                        <AvatarFallback>{influencer.profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{influencer.profile.full_name}</div>
                        <div className="text-sm text-muted-foreground truncate">{influencer.profile.username}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {getPlatformIcon(platform)}
                          <span className="capitalize text-sm">{platform}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Followers: </span>
                            <span className="font-medium">{formatNumber(influencer.profile.followers)}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Engagement Rate</div>
                            <Badge variant="outline" className="text-xs">
                              {influencer.profile.engagement_percent.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={influencer.profile.picture} alt={influencer.profile.full_name} />
                        <AvatarFallback>{influencer.profile.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground truncate">{influencer.profile.full_name}</div>
                        <div className="text-sm text-muted-foreground truncate">{influencer.profile.username}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(platform)}
                      <span className="capitalize">{platform}</span>
                    </div>
                    <div>
                      <span>{formatNumber(influencer.profile.followers)}</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {influencer.profile.engagement_percent.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fake results under blur - only show if we have more than 5 total results */}
            {totalCount > 5 && (
              <div className="relative">
                {/* Simple banner showing total count from API - positioned at the junction */}
                <div className="bg-primary/10 border-t border-primary/20 px-4 py-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total found: <span className="text-primary font-bold text-base">{totalCount.toLocaleString()}</span> influencers
                  </p>
                </div>

                <div className="space-y-4 md:space-y-0">
                  {/* Reduce fake results on mobile - show only 2 instead of 5 */}
                  {Array.from({ length: window.innerWidth < 768 ? 2 : 3 }).map((_, index) => (
                    <div key={`fake-${index}`} className="py-3 md:py-4 border-t border-primary/10">
                      {/* Mobile Card Layout - Compressed */}
                      <div className="md:hidden">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 flex-shrink-0">
                            <AvatarFallback>••</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm">•••••••••</div>
                            <div className="text-xs text-muted-foreground">•••••••••</div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-muted rounded"></div>
                                <span className="text-xs">•••••</span>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs px-1 py-0">•••</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Grid Layout */}
                      <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>••</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-foreground">•••••••••</div>
                            <div className="text-sm text-muted-foreground">•••••••••</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-muted rounded"></div>
                          <span>•••••••••</span>
                        </div>
                        <div>•••••••</div>
                        <div>
                          <Badge variant="outline" className="text-xs">•••</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Simple overlay for blurred fake results */}
                <div className="absolute inset-0 -mx-4 -mb-4 bg-background/40 backdrop-blur-md z-30 flex items-center justify-center min-h-[280px] md:min-h-[350px]">
                  <div className="text-center space-y-6 max-w-md mx-auto px-6">
                    <div className="space-y-2">
                      <p className="text-base md:text-lg font-bold text-foreground">
                        {totalCount.toLocaleString()} influencers found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Unlock access to the complete database
                      </p>
                    </div>
                    
                    {/* Try for Free section - Large and centered */}
                    <div className="space-y-4">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground">Try for Free</h4>
                      <p className="text-sm text-muted-foreground">
                        Get 5 sample contacts to evaluate our database
                      </p>
                      <div className="space-y-4">
                        <Input 
                          type="email" 
                          placeholder="Enter your email address"
                          className="bg-background/90 border-primary/40 h-12 text-base"
                        />
                        <Button 
                          onClick={() => onTrialRequest?.("trial", 10, 0)}
                          className="w-full bg-gradient-primary text-white h-12 text-base font-semibold"
                        >
                          Get Free Trial (5 Contacts)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
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