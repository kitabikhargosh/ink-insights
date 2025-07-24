import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  onSale?: boolean;
}

const BookCard = ({ title, author, price, originalPrice, rating, image, badge, onSale }: BookCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2 bg-book-primary text-white px-2 py-1 rounded text-xs font-medium">
              {badge}
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-book-text"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Actions */}
          <div className="absolute bottom-2 left-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" className="flex-1 bg-book-primary hover:bg-book-primary/90">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-book-text mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {author}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {renderStars(rating)}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-book-primary font-bold text-lg">
                ₹{price}
              </span>
              {originalPrice && (
                <span className="text-muted-foreground line-through text-sm">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {onSale && (
              <span className="text-xs text-book-primary font-medium">
                ON SALE
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;