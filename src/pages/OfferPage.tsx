import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResults, SearchResultState } from "@/components/SearchResults";
import { ArrowLeft, Calendar, MapPin, Eye, TrendingUp, Package, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Offer {
  id: number;
  filters: {
    platform: string;
    size: string;
    location: string;
    category: string;
    avg_views: number;
    er: number;
  };
  total: number;
  metadata: any;
  created_at: string;
  updated_at: string;
  packages: Package[];
  free_package_used: boolean;
  packages_total: number;
}

interface Package {
  id: number;
  offer_id: number;
  email: string;
  type: string;
  platform: string;
  limit: number;
  advanced_data: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

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

const OfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResultState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingInfluencers, setIsLoadingInfluencers] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const fetchOffer = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`https://workflow.influencersss.com/webhook/offer?id=${id}`);

        if (response.ok) {
          const data = await response.json();
          setOffer(data);

          // Fetch sample influencers using the same API as search
          setIsLoadingInfluencers(true);
          const influencersResponse = await fetch('https://workflow.influencersss.com/webhook/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              platform: data.filters.platform,
              size: data.filters.size,
              location: data.filters.location,
              category: data.filters.category,
              avg_views: data.filters.avg_views,
              er: data.filters.er
            })
          });

          if (influencersResponse.ok) {
            const influencersData = await influencersResponse.json();
            setSearchResult({
              id: influencersData.id,
              accounts: influencersData.accounts || [],
              total: influencersData.total || 0,
              platform: influencersData.platform || data.filters.platform
            });
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to load offer details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching offer:', error);
        toast({
          title: "Error",
          description: "An error occurred while loading the offer",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsLoadingInfluencers(false);
      }
    };

    fetchOffer();
  }, [id, toast]);

  const handleFreePackageRequest = async () => {
    if (!email || !isValidEmail(email) || !id) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionState('idle');

    try {
      const response = await fetch('https://workflow.influencersss.com/webhook/trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          offer_id: parseInt(id)
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionState('success');
        // Refresh offer data to update free_package_used status
        window.location.reload();
      } else {
        setSubmissionState('error');
        setErrorMessage(data.error || 'An error occurred while processing your request');
      }
    } catch (error) {
      console.error('Free package request error:', error);
      setSubmissionState('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePurchase = (packageType: string, count: number, price: number) => {
    // TODO: Implement Stripe integration
    toast({
      title: "Purchase",
      description: `Purchasing ${packageType} package with ${count} influencers for $${price}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPackageTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'free': 'Free Trial',
      'professional': 'Professional',
      'starter': 'Starter',
      'enterprise': 'Enterprise',
      'custom': 'Custom'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'sent': 'default',
      'pending': 'secondary',
      'completed': 'default',
      'failed': 'destructive'
    };
    return (
      <Badge variant={variants[status] as any || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Offer not found</h1>
          <p className="text-muted-foreground">The offer you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="hero">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const needsMorePackages = offer.total > offer.packages_total;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <h1 className="text-3xl font-bold">
            <span className="text-primary">influencer</span>
            <span className="text-white text-2xl">$$$</span>
            <span className="text-primary">.com</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 space-y-8">
        {/* Offer Details */}
        <Card className="p-6 bg-gradient-card border-primary/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Offer #{offer.id}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Created {formatDate(offer.created_at)}</span>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Platform</div>
                <Badge className="capitalize">{offer.filters.platform}</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Size</div>
                <Badge className="capitalize">{offer.filters.size}</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{offer.filters.location}</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Category</div>
                <span className="text-sm font-medium">{offer.filters.category}</span>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Avg Views</div>
                <div className="flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="text-sm font-medium">{offer.filters.avg_views.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-sm font-medium">{offer.filters.er}%</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{offer.total.toLocaleString()}</div>
              <div className="text-muted-foreground">Total matching influencers found</div>
            </div>
          </div>
        </Card>
          {/* Sample Influencers */}
          <div className="space-y-6">
              <SearchResults
                  result={searchResult}
                  isLoading={isLoadingInfluencers}
              />
          </div>

        {/* Previous Packages */}
        {offer.packages.length > 0 && (
          <Card className="p-6 bg-gradient-card border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Your Packages</h3>
                <Badge variant="secondary">{offer.packages.length} packages</Badge>
              </div>

              <div className="space-y-4">
                {offer.packages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{getPackageTypeLabel(pkg.type)}</span>
                        {getStatusBadge(pkg.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {pkg.limit} influencers • {formatDate(pkg.created_at)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Sent to: {pkg.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="capitalize">{pkg.platform}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
};

export default OfferPage;
