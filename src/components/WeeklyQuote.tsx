import { Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WeeklyQuote = () => {
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
};

export default WeeklyQuote;