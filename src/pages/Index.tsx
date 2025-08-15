import { useState, useEffect } from "react";
import { InfluencerFilters, FilterState } from "@/components/InfluencerFilters";
import { SearchResults } from "@/components/SearchResults";
import { TrialSection } from "@/components/TrialSection";
import { ContactForm } from "@/components/ContactForm";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, Zap } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    socialPlatform: "",
    influencerSize: "micro",
    influencerLocation: "us",
    category: "",
    avgViews: [100],
    engagementRate: [0.1]
  });
  
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Map short country codes to full names for API
  const countryNameMap: Record<string, string> = {
    us: "United States",
    uk: "United Kingdom",
    de: "Germany",
    fr: "France",
    br: "Brazil",
    ca: "Canada",
    au: "Australia",
    es: "Spain",
    it: "Italy",
    jp: "Japan",
    kr: "South Korea",
    in: "India",
    mx: "Mexico",
    nl: "Netherlands",
    se: "Sweden",
    no: "Norway",
    dk: "Denmark",
    fi: "Finland",
    ch: "Switzerland",
    at: "Austria",
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await fetch('https://workflow.influencersss.com/webhook/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: filters.socialPlatform,
          size: filters.influencerSize,
          location: countryNameMap[filters.influencerLocation] || filters.influencerLocation,
          category: filters.category,
          avg_views: filters.avgViews[0],
          er: filters.engagementRate[0]
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.accounts || []);
        setTotalCount(data.total || 0);
        setShowSearchResults(true);
      } else {
        console.error('Search failed:', response.statusText);
        // Fallback to showing empty results
        setSearchResults([]);
        setTotalCount(0);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to showing empty results
      setSearchResults([]);
      setTotalCount(0);
      setShowSearchResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePurchase = (packageType: string, count: number, price: number) => {
    if (packageType === "contact") {
      setShowContactForm(true);
      return;
    }
    
    // Here you would integrate with payment system
    console.log(`Purchasing ${packageType} package: ${count} influencers for $${price}`);
    // Redirect to payment or show payment modal
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
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Search Results */}
        {(showSearchResults || isSearching) && (
          <div className="space-y-8 mb-16">
            <SearchResults 
              results={searchResults}
              totalCount={totalCount}
              isLoading={isSearching}
              onTrialRequest={(packageType, count, price) => {
                if (packageType === "trial") {
                  setShowContactForm(true);
                }
              }}
            />
          </div>
        )}

        {/* Only show contact form when explicitly requested */}
        {showContactForm && !showSearchResults && !isSearching && (
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Try for Free</h2>
              <p className="text-muted-foreground">
                Evaluate the quality of our database before making a purchase
              </p>
            </div>
            
            <ContactForm onClose={() => setShowContactForm(false)} />
          </div>
        )}

        {/* Additional Content Sections */}
        <div className="space-y-16">
          <HowItWorks />
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
              <p>© 2024 Influencer Database. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <a href="mailto:contact@influencersss.com" className="text-muted-foreground hover:text-primary transition-colors">
                contact@influencersss.com
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="tel:+1-555-0123" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
