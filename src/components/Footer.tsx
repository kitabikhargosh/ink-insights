import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-book-text text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-book-primary to-book-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Kitabi Khargosh</h3>
                <p className="text-xs text-white/70">Best Author and Book Reviews</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto md:mx-0">
              Discover amazing books, read authentic reviews, and explore the world of literature with us.
            </p>
            <div className="flex justify-center md:justify-start space-x-2">
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
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blogs</a></li>
              <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="/authors" className="hover:text-white transition-colors">Authors</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/book-categories" className="hover:text-white transition-colors">Fiction</a></li>
              <li><a href="/book-categories" className="hover:text-white transition-colors">Non-Fiction</a></li>
              <li><a href="/book-categories" className="hover:text-white transition-colors">Mystery</a></li>
              <li><a href="/book-categories" className="hover:text-white transition-colors">Romance</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-white/70 text-sm">
            Copyright © 2025 | Developed by: Taniya Nanwani  
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;