import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import heroBackground from '../assets/hero-background.jpg';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  background_image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
}

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching hero content:', error);
          return;
        }

        setHeroContent(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-book-primary">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  const backgroundImage = heroContent?.background_image_url || heroBackground;
  const title = heroContent?.title || '100+ Books Read & Reviewed';
  const subtitle = heroContent?.subtitle || 'Book Reviewer';
  const description = heroContent?.description || 'Dive into honest, insightful reviews from a passionate reader who has explored over a hundred books.';
  const ctaText = heroContent?.cta_text || 'Read Reviews';

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Category Badge */}
          <div className="inline-flex items-center space-x-2 mb-4">
            <BookOpen className="h-4 w-4 text-book-primary" />
            <span className="text-book-primary text-sm font-medium uppercase tracking-wide">
              {subtitle}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            {description}
          </p>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-book-primary hover:bg-book-primary/90 text-white px-8 py-3 text-lg font-medium"
          >
            {ctaText}
          </Button>
        </div>
      </div>

      {/* Social Follow Button */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="transform rotate-90">
          <Button variant="ghost" className="text-white hover:text-book-primary">
            Follow Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;