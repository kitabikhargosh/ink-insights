import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Lorena D Parker",
      role: "Entrepreneur",
      rating: 5,
      comment: "Tristique montes fames vitae imperdiet nisl aenean eget sed congue. In amet adipiscing dictum luctus nascetur eros magna magna. Ac fusce eleifend orci tellus cursbltur amet odio porta nibh.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ed E Logan",
      role: "Entrepreneur",
      rating: 5,
      comment: "Tristique montes fames vitae imperdiet nisl aenean eget sed congue. In amet adipiscing dictum luctus nascetur eros magna magna. Ac fusce eleifend orci tellus cursbltur amet odio porta nibh.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Luis L Lorenz",
      role: "Businessman",
      rating: 5,
      comment: "Tristique montes fames vitae imperdiet nisl aenean eget sed congue. In amet adipiscing dictum luctus nascetur eros magna magna. Ac fusce eleifend orci tellus cursbltur amet odio porta nibh.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-book-primary/20 mb-4" />
                
                {/* Comment */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {testimonial.comment}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-book-text">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;