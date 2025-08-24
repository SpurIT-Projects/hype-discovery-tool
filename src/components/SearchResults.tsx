import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import {SiInstagram, SiTiktok, SiTwitch, SiX, SiYoutube} from '@icons-pack/react-simple-icons';

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

export interface SearchResultState {
    id?: number | null;
    accounts: Influencer[];
    total: number;
    platform?: string;
}

interface SearchResultsProps {
  result?: SearchResultState | null;
  isLoading?: boolean;
  free_package_used?: boolean;
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <SiInstagram className="w-4 h-4" />;
    case "youtube":
      return <SiYoutube className="w-4 h-4" />;
    case "tiktok":
      return <SiTiktok className="w-4 h-4" />;
    case "twitter":
      return <SiX className="w-4 h-4" />;
    case "twitch":
      return <SiTwitch className="w-4 h-4" />;
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

export const SearchResults = ({ result = null, isLoading = false, free_package_used = false }: SearchResultsProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<"idle" | "success" | "error">("idle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { id, accounts, total, platform } = result || { id: null, accounts: [], total: 0, platform: "" };
    const results = accounts.slice(0, 5);
    const totalCount = total;


    const isValidEmail = (email: string): boolean => {
        // Простая, но рабочая регулярка для email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const handleFreePackageRequest = async (id: number, email: string) => {
    if (!email || !id) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionState("idle");
    setIsDialogOpen(true);
    setErrorMessage(null);

    try {
      const res = await fetch("https://workflow.influencersss.com/webhook/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email }),
      });

      const data: any = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        const msg = data?.error || `Request failed${res.status ? ` (${res.status})` : ""}`;
        setErrorMessage(msg);
        setSubmissionState("error");
        return;
      }

      setSubmissionState("success");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Network error";
      setErrorMessage(msg);
      setSubmissionState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetDialog = () => {
    setSubmissionState("idle");
    setIsDialogOpen(false);
    setEmail("");
    setErrorMessage(null);
  };

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
  if (totalCount < 300) {
    return (
      <div className="py-20">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Search Results</h2>
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Search Results</h2>
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
            <div>
              {/* Real influencer data - always visible */}
              {results.slice(0, 5).map((influencer, index) => (
                <div key={influencer.user_id} className={`py-4 ${index > 0 ? 'border-t border-primary/10 md:border-t-0' : ''}`}>
                  {/* Mobile Card Layout */}
                  <div className="md:hidden">
                    <div className="flex items-start gap-5">
                      <Avatar className="h-14 w-14 flex-shrink-0">
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
                        <div className="flex items-center justify-end gap-4 mt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Followers: </span>
                            <span className="font-medium">{formatNumber(influencer.profile.followers)}</span>
                          </div>
                            <div className="text-sm flex items-center">
                                <span className="text-muted-foreground">ER: </span>
                                <span className="ml-1 font-medium">
                                    <Badge variant="outline" className="text-s">
                                      {influencer.profile.engagement_percent.toFixed(1)}%
                                    </Badge>
                                </span>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-5">
                      <Avatar className="h-12 w-12">
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
                      <Badge variant="outline" className="text-sm">
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
                <div className="space-y-4 md:space-y-0">
                  {/* Reduce fake results on mobile - show only 3 instead of 5 */}
                  {Array.from({ length: window.innerWidth < 768 ? 3 : 5 }).map((_, index) => (
                    <div key={`fake-${index}`} className="py-3 md:py-4 border-t border-primary/10">
                      {/* Mobile Card Layout - Compressed */}
                      <div className="md:hidden">
                        <div className="flex items-start gap-5">
                          <Avatar className="h-14 w-14 flex-shrink-0">
                              <AvatarFallback className="bg-gray-800">•{index}•</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm">••••••••••••••••••</div>
                            <div className="text-xs text-muted-foreground">•••••••••</div>
                            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                              {getPlatformIcon(platform)}
                              <span className="capitalize text-sm">{platform}</span>
                            </div>
                              <div className="flex items-center justify-end gap-4 mt-2">
                                  <div className="text-sm">
                                      <span className="text-muted-foreground">Followers: </span>
                                      <span className="font-medium">•••••</span>
                                  </div>
                                  <div className="text-sm flex items-center">
                                      <span className="text-muted-foreground">ER: </span>
                                      <span className="ml-1 font-medium">
                                    <Badge variant="outline" className="text-s">
                                      •••••
                                    </Badge>
                                </span>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Grid Layout */}
                      <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center gap-5">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gray-800">•{index}•</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-foreground">••••••••••••••••••</div>
                            <div className="text-sm text-muted-foreground">•••••••••</div>
                          </div>
                        </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                              {getPlatformIcon(platform)}
                              <span className="capitalize">{platform}</span>
                          </div>
                        <div className="text-xl">•••••</div>
                        <div>
                          <Badge variant="outline" className="text-xl">•••</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simple overlay for blurred fake results */}
                <div className="absolute inset-0 -mx-4 -mb-4 bg-background/40 backdrop-blur-[9px] z-30 flex justify-center">
                  <div className="text-center space-y-12 max-w-md mx-4">
                    <div className="px-4 py-2 text-center">
                      <p className="text-base md:text-lg font-bold text-foreground">
                        Total <span className="text-primary">{totalCount.toLocaleString()}</span> influencers found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Unlock access to the complete database
                      </p>
                    </div>

                    {/* Try for Free section or Already Used message */}
                    {!free_package_used ? (
                      <div className="space-y-4">
                        <h4 className="text-xl md:text-2xl font-bold text-foreground">Try for Free</h4>
                        <p className="text-sm text-muted-foreground">
                          Get 5 sample contacts to evaluate our database
                        </p>
                         <div className="space-y-4">
                           <Input
                             type="email"
                             placeholder="Enter your email address"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             className="bg-background/90 border-primary/40 h-12 text-base"
                           />
                           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                             <DialogTrigger asChild>
                               <Button
                                 onClick={() =>  handleFreePackageRequest(id, email)}
                                 disabled={!email || !isValidEmail(email) || !id}
                                 className="w-full bg-gradient-primary text-white h-12 text-base font-semibold"
                               >
                                 Get Free Package
                               </Button>
                             </DialogTrigger>
                           <DialogContent className="sm:max-w-md">
                             {isSubmitting && (
                               <>
                                  <DialogHeader>
                                    <DialogTitle className="text-center">Processing Request...</DialogTitle>
                                    <DialogDescription className="text-center">
                                      Please wait while we process your request...
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="text-center space-y-4 py-4">
                                    <div className="w-16 h-16 mx-auto flex items-center justify-center">
                                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary"></div>
                                    </div>
                                  </div>
                               </>
                             )}

                             {submissionState === "success" && (
                               <>
                                  <DialogHeader>
                                    <DialogTitle className="text-center">Request Submitted!</DialogTitle>
                                  </DialogHeader>
                                  <div className="text-center space-y-4 py-4">
                                    <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                    <p className="text-foreground font-medium">
                                      Thank you for your interest in our service!
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                      We will send you a sample of 5 influencers to your email shortly to evaluate the quality of our database.
                                    </p>
                                    <Button onClick={resetDialog} className="mt-4">
                                      Close
                                    </Button>
                                  </div>
                               </>
                             )}

                             {submissionState === "error" && (
                               <>
                                  <DialogHeader>
                                    <DialogTitle className="text-center">Request Failed</DialogTitle>
                                  </DialogHeader>
                                  <div className="text-center space-y-4 py-4">
                                    <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                                      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        {errorMessage ?? "Please try again or contact our support team if the issue persists."}
                                    </p>
                                    <div className="flex gap-2 justify-center">
                                      <Button onClick={resetDialog}>
                                        Close
                                      </Button>
                                    </div>
                                  </div>
                               </>
                             )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-xl md:text-2xl font-bold text-foreground">Free Trial Used</h4>
                        <p className="text-sm text-muted-foreground">
                          You have already used your free trial package. Please choose from our paid packages below to access the complete database.
                        </p>
                        <Button 
                          className="w-full bg-gradient-primary text-white h-12 text-base font-semibold"
                          onClick={() => {
                            const pricingSection = document.getElementById('pricing-section');
                            if (pricingSection) {
                              pricingSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          View Paid Packages
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </Card>
      </div>


      {/* Pricing Section */}
        { id && (
            <div className="space-y-6" id="pricing-section">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Choose Your Package</h3>
                    <p className="text-muted-foreground">
                        Get access to influencers with verified contacts and current analytics
                    </p>
                </div>

                <div className="w-full mx-auto">
                    <stripe-pricing-table
                        pricing-table-id="prctbl_1Rw0ChGifA2aeWJ3MA1cFlun"
                        publishable-key="pk_test_51LdXkTGifA2aeWJ3CLmWlPiYusyyjUXvvmVpKFpwIjPWDzhUi1WDVs7wZncc1VA1smxKizBPb1mVw5FmByTqjrFb00cbdbnelP"
                        client-reference-id={id?.toString()}
                    >
                    </stripe-pricing-table>
                </div>
            </div>
        )}
    </div>
  );
};
