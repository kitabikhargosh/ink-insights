import { Mail, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-book-text text-white">
      {/* Contact Info Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-book-primary rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Book Information?</p>
                <p className="text-white/70 text-sm">Please send us an email at support@bookreview.ltd</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-book-primary rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Need Help?</p>
                <p className="text-white/70 text-sm">Please call us at +6221-1000-1212</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-book-primary to-book-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">BookReviews</h3>
                <p className="text-xs text-white/70">Best Author and Book Reviews</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* About Author */}
          <div>
            <h4 className="text-white font-semibold mb-4">About Author</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/news" className="hover:text-white transition-colors">News & Article</a></li>
              <li><a href="/legal" className="hover:text-white transition-colors">Legal Notice</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/order-status" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="/return" className="hover:text-white transition-colors">Return a Product</a></li>
              <li><a href="/help" className="hover:text-white transition-colors">Help/FAQ</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Report Privacy</a></li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h4 className="text-white font-semibold mb-4">Terms</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/personal-info" className="hover:text-white transition-colors">Do Not Sell My Personal Info</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-white/70 text-sm">
            Copyright © 2025 | Lumen Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;