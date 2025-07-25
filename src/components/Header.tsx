import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src={logo} 
                alt="BookReviews Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-book-text">Kitabi Khargosh</h1>
              <p className="text-xs text-muted-foreground">Best Author and Book Reviews</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search books, authors, reviews..." 
                className="pl-10 bg-book-warm border-border"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-book-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 pb-4">
          <a href="/" className="text-book-text hover:text-book-primary transition-colors font-medium">
            Home
          </a>
          <a href="/reviews" className="text-book-text hover:text-book-primary transition-colors">
            Reviews
          </a>
          <a href="/authors" className="text-book-text hover:text-book-primary transition-colors">
            Authors
          </a>
          <a href="/collection" className="text-book-text hover:text-book-primary transition-colors">
            Collection
          </a>
          <a href="/blog" className="text-book-text hover:text-book-primary transition-colors">
            Blog
          </a>
          <a href="/categories" className="text-book-text hover:text-book-primary transition-colors">
            Book Categories
          </a>
          <a href="/about" className="text-book-text hover:text-book-primary transition-colors">
            About Us
          </a>
          <a href="/contact" className="text-book-text hover:text-book-primary transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <div className="flex mb-4">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="bg-book-warm border-border"
              />
            </div>
            <a href="/" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Home
            </a>
            <a href="/reviews" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Reviews
            </a>
            <a href="/authors" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Authors
            </a>
            <a href="/collection" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Collection
            </a>
            <a href="/blog" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Blog
            </a>
            <a href="/categories" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Book Categories
            </a>
            <a href="/about" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              About Us
            </a>
            <a href="/contact" className="block py-2 text-book-text hover:text-book-primary transition-colors">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;