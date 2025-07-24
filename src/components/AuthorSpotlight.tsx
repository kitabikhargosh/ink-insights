import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const AuthorSpotlight = () => {
  const authorBooks = [
    {
      title: "The Awakened Day",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
    },
    {
      title: "Breaking",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop"
    },
    {
      title: "Rose Walking",
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
              Thomas Dietrich
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Consectetur ut sit fames consectetur massa molque ut bibendum velit ultrices. Per 
              eu laoreet sit et pharetra nostra senectus consequat adipiscing solicitudin. Mollis 
              ante sit nulla molestie aptent. Lectus pharetra sapien et macenas placita.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-book-text mb-4">
                Book by Thomas Dietrich
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
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&crop=face"
                alt="Thomas Dietrich"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              {/* Signature Overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4">
                <div className="text-book-primary font-script text-2xl">
                  Thomas Dietrich
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