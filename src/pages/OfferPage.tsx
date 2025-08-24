import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {Influencer, SearchResults} from "@/components/SearchResults";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar, MapPin, Eye, TrendingUp, Package } from "lucide-react";
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

      <div className="container mx-auto px-4 pb-16 space-y-8">
        {/* Offer Details */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-primary/20 backdrop-blur-sm shadow-card">
          <div className="relative p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Back Button */}
            <div className="absolute top-2 md:top-3 left-2 md:left-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                size="sm"
                className="text-white hover:bg-white/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
            </div>

            {/* Header */}
            <div className="text-center space-y-3 pt-4">
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Offer #{offer.id}
              </h2>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Created {formatDate(offer.created_at)}</span>
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Platform</div>
                <Badge className="bg-gradient-primary text-white capitalize font-medium border-0">
                  {offer.filters.platform}
                </Badge>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Size</div>
                <Badge className="bg-gradient-primary text-white capitalize font-medium border-0">
                  {offer.filters.size}
                </Badge>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground truncate">{offer.filters.location}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foregroun truncate">{offer.filters.category}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Views</div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{"> " + offer.filters.avg_views.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Engagement Rate</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{"> "+offer.filters.er}%</span>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {offer.total.toLocaleString()}
                </div>
                <div className="text-base md:text-lg font-medium text-muted-foreground">
                  Total matching influencers found
                </div>
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

        {/* Recent Packages */}
        {offer.packages.length > 0 && (
          <Card className="bg-gradient-card border-primary/20 rounded-2xl">
            <div className="p-4 md:p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Recent Packages</h3>
                <Badge variant="secondary">{offer.packages.length} packages</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Platform</th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Total</th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offer.packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-background/10">
                        <td className="py-4 px-4">
                          <span className="font-medium text-foreground">{getPackageTypeLabel(pkg.type)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className="capitalize">{pkg.platform}</Badge>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="text-foreground">{pkg.limit}</span>
                        </td>
                        <td className="text-right py-4 px-4">
                          {getStatusBadge(pkg.status)}
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="text-foreground text-nowrap">{formatDate(pkg.created_at)}</span>
                        </td>
                      </tr>
                    ))}
                    <tr key={0} className="border-t border-primary/20">
                        <td className="py-4 px-4"></td>
                        <td className="py-4 px-4"></td>
                        <td className="text-right py-4 px-4">
                            <span className="font-semibold text-foreground">{ offer.packages_total }</span>
                        </td>
                        <td className="text-right py-4 px-4"></td>
                        <td className="text-right py-4 px-4"></td>
                    </tr>
                  </tbody>
                </table>
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
