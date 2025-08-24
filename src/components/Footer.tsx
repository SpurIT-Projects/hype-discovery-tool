const Footer = () => {
  return (
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };