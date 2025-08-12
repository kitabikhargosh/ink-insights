import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface Author {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  books_published: number;
  known_for: string | null;
  top_books: string[] | null;
  is_spotlight: boolean;
}

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuthors(data || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading authors...</div>
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
            <h1 className="text-4xl font-bold text-book-text mb-4">Featured Authors</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the talented authors behind your favorite books. Discover their works, 
              backgrounds, and upcoming releases.
            </p>
          </div>

          {authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {authors.map((author) => (
                <Card key={author.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                        {author.image_url ? (
                          <img
                            src={author.image_url}
                            alt={author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-book-primary to-book-secondary flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">{author.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-book-text mb-2">{author.name}</h3>
                      
                      {author.known_for && (
                        <p className="text-book-primary font-medium mb-2">{author.known_for}</p>
                      )}
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {author.books_published} Books Published
                      </p>
                      
                      {author.bio && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {author.bio}
                        </p>
                      )}

                      {author.top_books && author.top_books.length > 0 && (
                        <div className="w-full">
                          <h4 className="text-sm font-semibold text-book-text mb-2">Top Books:</h4>
                          <div className="space-y-1">
                            {author.top_books.slice(0, 3).map((book, index) => (
                              <p key={index} className="text-xs text-muted-foreground bg-book-warm px-2 py-1 rounded">
                                {book}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {author.is_spotlight && (
                        <div className="mt-3">
                          <span className="bg-book-primary text-white px-2 py-1 rounded-full text-xs">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No authors available at the moment.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Authors;