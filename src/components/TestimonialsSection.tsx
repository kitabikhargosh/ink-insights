import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { supabase } from '@/integrations/supabase/client';

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  rating: number | null;
  comment: string;
  avatar_url: string | null;
  is_featured: boolean;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-book-primary font-medium mb-2">Testimonial</p>
          <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-4">
            What They Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-book-primary/20 mb-4" />
                  
                  {/* Comment */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {testimonial.comment}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(testimonial.rating || 5)}
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar_url || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-book-text">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role || "Reader"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No testimonials available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;