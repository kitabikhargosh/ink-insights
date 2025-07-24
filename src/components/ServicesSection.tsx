import { MessageSquare } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const ServicesSection = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Book Club",
      description: "Join our vibrant community of book lovers and discover amazing stories together.",
      bgColor: "bg-book-primary"
    }
  ];

  return (
    <section className="py-16 bg-book-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-book-primary font-medium mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-4">
            Making Something Inspirational.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
            luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex justify-center">
          <div className="max-w-md">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-lg transition-all duration-300 ${
                  service.bgColor ? service.bgColor + ' text-white' : 'bg-white'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 ${
                    service.bgColor 
                      ? 'bg-white/20' 
                      : 'bg-book-primary/10'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      service.bgColor ? 'text-white' : 'text-book-primary'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    service.bgColor ? 'text-white' : 'text-book-text'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm ${
                    service.bgColor ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;