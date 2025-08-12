import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  genre: string | null;
  rating: number;
  price: number | null;
  affiliate_link: string | null;
  is_featured: boolean;
}

interface BookGenre {
  id: string;
  name: string;
  color: string;
  is_active: boolean;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<BookGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksResult, genresResult] = await Promise.all([
        supabase.from('books').select('*').order('created_at', { ascending: false }),
        supabase.from('book_genres').select('*').eq('is_active', true).order('display_order')
      ]);

      if (booksResult.error) throw booksResult.error;
      if (genresResult.error) throw genresResult.error;

      setBooks(booksResult.data || []);
      setGenres(genresResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = selectedGenre === 'all' 
    ? books 
    : books.filter(book => book.genre?.toLowerCase() === selectedGenre.toLowerCase());

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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading books...</div>
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
            <h1 className="text-4xl font-bold text-book-text mb-4">Our Book Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of books across different genres. Find your next great read!
            </p>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedGenre === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedGenre('all')}
              className="mb-2"
            >
              All Books
            </Button>
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.name ? 'default' : 'outline'}
                onClick={() => setSelectedGenre(genre.name)}
                className="mb-2"
                style={{
                  backgroundColor: selectedGenre === genre.name ? genre.color : 'transparent',
                  borderColor: genre.color,
                  color: selectedGenre === genre.name ? 'white' : genre.color
                }}
              >
                {genre.name}
              </Button>
            ))}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      {book.image_url ? (
                        <img
                          src={book.image_url}
                          alt={book.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-book-warm rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">No Image</span>
                        </div>
                      )}
                      
                      {book.is_featured && (
                        <Badge className="absolute top-2 right-2 bg-book-primary">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-book-text mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-2">by {book.author}</p>
                    
                    {book.genre && (
                      <Badge variant="outline" className="mb-3">
                        {book.genre}
                      </Badge>
                    )}

                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(book.rating)}
                      <span className="text-sm text-muted-foreground ml-2">({book.rating}/5)</span>
                    </div>

                    {book.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {book.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      {book.price && (
                        <span className="text-lg font-bold text-book-primary">
                          ${book.price}
                        </span>
                      )}
                      
                      {book.affiliate_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(book.affiliate_link!, '_blank')}
                        >
                          Buy Now
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              {selectedGenre === 'all' 
                ? 'No books available at the moment.' 
                : `No books found in the ${selectedGenre} genre.`}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Books;