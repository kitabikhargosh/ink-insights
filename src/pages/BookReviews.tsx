import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Star, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Book {
  id?: string;
  title: string;
  author: string;
  rating: number;
  image: string;
  badge?: string;
  description?: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const BookReviews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (location.state?.selectedBook) {
      setSelectedBook(location.state.selectedBook);
      // Mock reviews for the selected book
      setReviews([
        {
          id: '1',
          user: 'Sarah Johnson',
          rating: 5,
          comment: 'An absolutely captivating read! The author\'s storytelling is masterful and kept me engaged from start to finish.',
          date: '2024-01-15'
        },
        {
          id: '2',
          user: 'Mike Chen',
          rating: 4,
          comment: 'Great character development and plot. A few slow parts in the middle, but overall a solid book.',
          date: '2024-01-10'
        },
        {
          id: '3',
          user: 'Emma Rodriguez',
          rating: 5,
          comment: 'This book changed my perspective on life. Highly recommend to anyone looking for a meaningful read.',
          date: '2024-01-08'
        }
      ]);
    }
  }, [location.state]);

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

  if (!selectedBook) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold text-book-text mb-4">Book Reviews</h1>
              <p className="text-muted-foreground mb-8">
                Select a book from the Latest Books section to see its reviews.
              </p>
              <Button onClick={() => navigate('/')} className="bg-book-primary hover:bg-book-primary/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>

          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="relative">
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                {selectedBook.badge && (
                  <div className="absolute top-4 left-4 bg-book-primary text-white px-3 py-1 rounded text-sm font-medium">
                    {selectedBook.badge}
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-book-text mb-2">{selectedBook.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {selectedBook.author}</p>
              
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {renderStars(selectedBook.rating)}
                </div>
                <span className="text-muted-foreground">({selectedBook.rating}/5)</span>
              </div>
              
              {selectedBook.description && (
                <p className="text-muted-foreground text-lg mb-6">{selectedBook.description}</p>
              )}
              
              <div className="bg-book-warm p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-book-text mb-2">About this book</h3>
                <p className="text-muted-foreground">
                  This captivating novel explores themes of love, loss, and redemption through 
                  masterful storytelling and unforgettable characters. A must-read for anyone 
                  who appreciates literary excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-book-text mb-8">
              Reader Reviews ({reviews.length})
            </h2>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-book-text">{review.user}</h4>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookReviews;