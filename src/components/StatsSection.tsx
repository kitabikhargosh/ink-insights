import { Book, Users, Trophy, Calendar } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Book,
      number: "1,000 +",
      label: "Published Books",
      description: "Quality literature collection"
    },
    {
      icon: Users,
      number: "200 K+",
      label: "World Wide Reader",
      description: "Active global community"
    },
    {
      icon: Trophy,
      number: "15 +",
      label: "Award Wins",
      description: "Literary recognition"
    },
    {
      icon: Calendar,
      number: "15 +",
      label: "Years Surveying",
      description: "Experience in book industry"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-book-warm to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-book-primary" />
                </div>
                <h3 className="text-3xl font-bold text-book-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-book-primary font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;