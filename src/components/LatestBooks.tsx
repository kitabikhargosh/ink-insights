import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import BookCard from './BookCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import book1 from '../assets/book1.jpg';

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  image_url: string;
  category: string;
  description: string;
}

const LatestBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('books')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setBooks(data || []);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Fallback to static data if database fails
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-book-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-book-primary font-medium mb-2">New Arrival</p>
          <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-4">
            Our Latest Books
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our newest collection of books with fresh stories, amazing authors, 
            and captivating narratives that will keep you turning pages.
          </p>
        </div>

        {/* Books Carousel */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading latest books...</p>
          </div>
        ) : books.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {books.map((book) => (
                <CarouselItem key={book.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <BookCard 
                    title={book.title}
                    author={book.author}
                    rating={book.rating}
                    image={book.image_url || book1}
                    badge={book.category || 'Book'}
                    description={book.description}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No books available yet. Add some books to get started!</p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default LatestBooks;