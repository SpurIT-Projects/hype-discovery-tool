import { useState } from "react";
import { InfluencerFilters, FilterState } from "@/components/InfluencerFilters";
import {SearchResults, SearchResultState} from "@/components/SearchResults";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    platform: "",
    size: "micro",
    location: "",
    category: "",
    avg_views: [2500],
    er: [0.8]
  });


  const [searchResult, setSearchResult] = useState<SearchResultState>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchResult(null);
    try {
      const response = await fetch('https://workflow.influencersss.com/webhook/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: filters.platform,
          size: filters.size,
          location: filters.location,
          category: filters.category,
          avg_views: filters.avg_views[0],
          er: filters.er[0]
        })
      });

      if (response.ok) {
        const data = await response.json();
          setSearchResult({
              id: data.id || null,
              accounts: data.accounts || [],
              total: data.total || 0,
              platform: data.platform || ""
          })
      } else {
        console.error('Search failed:', response.statusText);
        // Fallback to showing empty results
          setSearchResult({
              id: null,
              accounts: [],
              total: 0,
              platform: ""
          })
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to showing empty results
        setSearchResult({
            id: null,
            accounts: [],
            total: 0,
            platform: ""
        })
    } finally {
      setIsSearching(false);
    }
  };

  const stats = [
    { icon: Users, label: "Active Influencers", value: "100,000+" },
    { icon: Globe, label: "Countries", value: "50+" },
    { icon: TrendingUp, label: "Response Rate", value: "87%" },
    { icon: Zap, label: "Daily Updates", value: "100+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Logo */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="text-left">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">influencer</span>
            <span className="text-white text-2xl">$$$</span>
            <span className="text-primary">.com</span>
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-4 pb-8">
        <div className="text-center space-y-8 mb-16">

          <Badge className="bg-gradient-primary text-white px-4 py-2">
            Premium Influencer Database
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Find Perfect
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Influencers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get access to a verified database of influencers who can <span className="lg:whitespace-nowrap"><strong className="text-white">promote your products</strong> through <strong className="text-white">promotional</strong> or <strong className="text-white">native posts</strong> and <strong className="text-white">video reviews</strong></span> on their social networks, with detailed analytics and up-to-date contact information
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="space-y-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Customize Your Search</h2>
            <p className="text-muted-foreground">
              Use filters below to find the perfect influencers for your campaign
            </p>
          </div>

          <InfluencerFilters
            filters={filters}
            onFiltersChange={(filters) => {
                setFilters(filters);
                setSearchResult(null);
            }}
            onSearch={handleSearch}
          />
        </div>

        {/* Search Results */}
        {(searchResult || isSearching) && (
          <div className="space-y-8 mb-16">
            <SearchResults
              result={searchResult}
              isLoading={isSearching}
            />
          </div>
        )}

        {/* Additional Content Sections - Hide HowItWorks when search results are shown */}
        <div className="space-y-16">
          {(!searchResult && !isSearching)  && <HowItWorks />}
          <Benefits />
          <Testimonials />
          <FAQ />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>© 2025 Influencer Database. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <a href="mailto:contact@influencersss.com" className="text-muted-foreground hover:text-primary transition-colors">
                contact@influencersss.com
              </a>
          {/*    <span className="text-muted-foreground">|</span>
              <a href="tel:+1-555-0123" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 012-3456
              </a>*/}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
