import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import featuredBook from '../assets/featured-book.jpg';

interface FeaturedContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  badge_text: string | null;
}

const FeaturedBook = () => {
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const { data, error } = await supabase
          .from('featured_content')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching featured content:', error);
          return;
        }

        setFeaturedContent(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-book-text">Loading featured content...</div>
        </div>
      </section>
    );
  }

  if (!featuredContent) {
    return null;
  }

  const imageUrl = featuredContent.image_url || featuredBook;
  const title = featuredContent.title;
  const subtitle = featuredContent.subtitle || 'Featured';
  const description = featuredContent.description;
  const ctaText = featuredContent.cta_text || 'Find on Shop';
  const badgeText = featuredContent.badge_text || 'Special Edition';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-book-primary font-medium mb-2">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            
            <Button 
              className="bg-book-primary hover:bg-book-primary/90 text-white"
              size="lg"
            >
              {ctaText}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Featured Book Image */}
          <div className="relative">
            <div className="relative group">
              <img
                src={imageUrl}
                alt="Featured Book"
                className="w-full max-w-md mx-auto shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              {/* Special Badge */}
              <div className="absolute top-4 right-4 bg-book-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {badgeText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;