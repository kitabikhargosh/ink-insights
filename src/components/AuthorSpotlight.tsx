import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const AuthorSpotlight = () => {
  const authorBooks = [
    {
      title: "The Atlas of Lost Cities",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
    },
    {
      title: "Midnight in the Garden of Memory",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop"
    },
    {
      title: "The Last Library",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-book-warm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Author Info */}
          <div>
            <p className="text-book-primary font-medium mb-2">Author of the Month</p>
            <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-6">
              Elena Rodriguez
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Award-winning novelist Elena Rodriguez masterfully weaves together magical realism and contemporary 
              literary fiction. With three international bestsellers and a Booker Prize nomination, she explores 
              themes of memory, identity, and the spaces between cultures. Her latest work has been praised as 
              "a stunning achievement in modern literature."
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-book-text mb-4">
                Books by Elena Rodriguez
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {authorBooks.map((book, index) => (
                  <div key={index} className="group cursor-pointer">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="border-book-primary text-book-primary hover:bg-book-primary hover:text-white"
            >
              View All Works
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Author Image */}
          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=600&fit=crop&crop=face"
                alt="Elena Rodriguez"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Signature Overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4">
                <div className="text-book-primary font-script text-2xl">
                  Elena Rodriguez
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;