import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import featuredBook from '../assets/featured-book.jpg';

const FeaturedBook = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-book-primary font-medium mb-2">Featured</p>
            <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-6">
              Weekly Best Seller.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
              luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            
            <Button 
              className="bg-book-primary hover:bg-book-primary/90 text-white"
              size="lg"
            >
              Find on Shop
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Featured Book Image */}
          <div className="relative">
            <div className="relative group">
              <img
                src={featuredBook}
                alt="Featured Book"
                className="w-full max-w-md mx-auto shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              {/* Special Badge */}
              <div className="absolute top-4 right-4 bg-book-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Special Edition
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;