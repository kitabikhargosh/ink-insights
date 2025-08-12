import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
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

const AuthorSpotlight = () => {
  const [spotlightAuthor, setSpotlightAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpotlightAuthor();
  }, []);

  const fetchSpotlightAuthor = async () => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('is_spotlight', true)
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSpotlightAuthor(data);
    } catch (error) {
      console.error('Error fetching spotlight author:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-book-warm">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading author spotlight...</div>
        </div>
      </section>
    );
  }

  if (!spotlightAuthor) {
    return null;
  }

  return (
    <section className="py-16 bg-book-warm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Author Info */}
          <div>
            <p className="text-book-primary font-medium mb-2">Author Spotlight</p>
            <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-6">
              {spotlightAuthor.name}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {spotlightAuthor.bio || "Discover the amazing works of this talented author."}
            </p>

            {spotlightAuthor.known_for && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-book-text mb-2">Known For</h3>
                <p className="text-muted-foreground">{spotlightAuthor.known_for}</p>
              </div>
            )}

            {spotlightAuthor.top_books && spotlightAuthor.top_books.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-book-text mb-4">
                  Top Books by {spotlightAuthor.name}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {spotlightAuthor.top_books.slice(0, 3).map((book, index) => (
                    <div key={index} className="p-3 bg-white/50 rounded-lg">
                      <p className="text-book-text font-medium">{book}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Published Books: {spotlightAuthor.books_published}
              </p>
            </div>

            <Button 
              variant="outline" 
              className="border-book-primary text-book-primary hover:bg-book-primary hover:text-white"
            >
              View All Works
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Author Image */}
          <div className="relative">
            <div className="relative">
              <img
                src={spotlightAuthor.image_url || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face"}
                alt={spotlightAuthor.name}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Signature Overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4">
                <div className="text-book-primary font-script text-2xl">
                  {spotlightAuthor.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;