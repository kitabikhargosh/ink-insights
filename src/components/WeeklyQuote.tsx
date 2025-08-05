import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { supabase } from '@/integrations/supabase/client';

interface QuoteData {
  id: string;
  text: string;
  author: string;
  is_active: boolean;
}

const WeeklyQuote = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveQuote = async () => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching quote:', error);
          return;
        }

        setQuote(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveQuote();
  }, []);

  if (loading) {
    return (
      <section className="py-8 bg-gradient-to-r from-book-primary to-book-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white">Loading quote...</div>
        </div>
      </section>
    );
  }

  if (!quote) {
    return (
      <section className="py-8 bg-gradient-to-r from-book-primary to-book-secondary text-white">
        <div className="container mx-auto px-4">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-8 text-center">
              <Quote className="h-12 w-12 text-white/80 mx-auto mb-4" />
              <blockquote className="text-xl md:text-2xl font-medium mb-4">
                "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
              </blockquote>
              <cite className="text-white/80">— Dr. Seuss</cite>
              <div className="mt-4">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Quote of the Week
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-r from-book-primary to-book-secondary text-white">
      <div className="container mx-auto px-4">
        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardContent className="p-8 text-center">
            <Quote className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl font-medium mb-4">
              "{quote.text}"
            </blockquote>
            <cite className="text-white/80">— {quote.author}</cite>
            <div className="mt-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Quote of the Week
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeeklyQuote;