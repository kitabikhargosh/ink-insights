import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BookReview {
  id: string;
  reviewer_name: string;
  review_title: string;
  review_content: string;
  rating: number;
  review_date: string;
  is_featured: boolean;
  book_id: string | null;
}

interface Book {
  id: string;
  title: string;
  author: string;
  image_url: string | null;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reviewsResult, booksResult] = await Promise.all([
        supabase.from('book_reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('books').select('id, title, author, image_url')
      ]);

      if (reviewsResult.error) throw reviewsResult.error;
      if (booksResult.error) throw booksResult.error;

      setReviews(reviewsResult.data || []);
      setBooks(booksResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getBookInfo = (bookId: string | null) => {
    if (!bookId) return null;
    return books.find(book => book.id === bookId);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading reviews...</div>
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">Book Reviews</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover honest and detailed reviews of the latest books across all genres. 
              Find your next great read with our expert recommendations.
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {reviews.map((review) => {
                const bookInfo = getBookInfo(review.book_id);
                return (
                  <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      {bookInfo && (
                        <div className="flex items-center space-x-3 mb-4">
                          {bookInfo.image_url && (
                            <img
                              src={bookInfo.image_url}
                              alt={bookInfo.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-book-text">{bookInfo.title}</h4>
                            <p className="text-sm text-muted-foreground">by {bookInfo.author}</p>
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-lg font-semibold text-book-text mb-2">{review.review_title}</h3>
                      
                      <div className="flex items-center space-x-1 mb-3">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground ml-2">({review.rating}/5)</span>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {review.review_content}
                      </p>

                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>by {review.reviewer_name}</span>
                        <span>{new Date(review.review_date).toLocaleDateString()}</span>
                      </div>

                      {review.is_featured && (
                        <div className="mt-3">
                          <span className="bg-book-primary text-white px-2 py-1 rounded-full text-xs">
                            Featured Review
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No reviews available at the moment.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;