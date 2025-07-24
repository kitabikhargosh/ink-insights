import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-book-text to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Get A FREE Ebook By Joining Our Mailing List Today!
                </h2>
                <p className="text-white/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white border-0 text-book-text h-12"
                  />
                </div>
                <Button 
                  size="lg"
                  className="bg-book-primary hover:bg-book-primary/90 text-white px-8 h-12"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;