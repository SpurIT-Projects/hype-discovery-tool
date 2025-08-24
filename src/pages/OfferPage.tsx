import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {Influencer, SearchResults} from "@/components/SearchResults";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  accounts: Influencer[];
  platform: string;
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

const OfferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingInfluencers, setIsLoadingInfluencers] = useState(false);


  useEffect(() => {
    const fetchOffer = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`https://workflow.influencersss.com/webhook/offer?id=${id}`);

        if (response.ok) {
          const data = await response.json();
          setOffer(data);
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

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 pb-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16 space-y-8">
        {/* Offer Details */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Offer #{offer.id}
                </h2>
                <p className="text-muted-foreground">Your search results are ready</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground bg-background/50 rounded-lg px-3 py-2 border">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Created {formatDate(offer.created_at)}</span>
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Platform</div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 capitalize font-medium">
                  {offer.filters.platform}
                </Badge>
              </div>
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Size</div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 capitalize font-medium">
                  {offer.filters.size}
                </Badge>
              </div>
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{offer.filters.location}</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</div>
                <span className="text-sm font-semibold text-foreground">{offer.filters.category}</span>
              </div>
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Views</div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{offer.filters.avg_views.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-xl p-4 border border-primary/10 space-y-3 hover:bg-background/70 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Engagement Rate</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{offer.filters.er}%</span>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <div className="space-y-2">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  {offer.total.toLocaleString()}
                </div>
                <div className="text-lg font-medium text-muted-foreground">
                  Total matching influencers found
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
          {/* Sample Influencers */}
          <div className="space-y-6">
              <SearchResults
                  result={{
                      id: offer.id,
                      accounts: offer.accounts,
                      total: offer.total,
                      platform: offer.platform
                  }}
                  isLoading={isLoadingInfluencers}
                  free_package_used={offer.free_package_used}
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

      <Footer />
    </div>
  );
};

export default OfferPage;
