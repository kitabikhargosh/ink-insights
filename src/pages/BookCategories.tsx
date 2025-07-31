import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ExternalLink } from 'lucide-react';

const BookCategories = () => {
  const categories = [
    {
      name: "Fiction",
      description: "Immerse yourself in captivating stories and imaginative worlds",
      books: [
        { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", rating: 4.8 },
        { title: "Where the Crawdads Sing", author: "Delia Owens", rating: 4.6 },
        { title: "The Silent Patient", author: "Alex Michaelides", rating: 4.5 },
      ]
    },
    {
      name: "Non-Fiction",
      description: "Expand your knowledge with real stories and factual insights",
      books: [
        { title: "Educated", author: "Tara Westover", rating: 4.9 },
        { title: "Becoming", author: "Michelle Obama", rating: 4.7 },
        { title: "Sapiens", author: "Yuval Noah Harari", rating: 4.6 },
      ]
    },
    {
      name: "Mystery & Thriller",
      description: "Keep yourself on the edge with suspenseful plots",
      books: [
        { title: "Gone Girl", author: "Gillian Flynn", rating: 4.4 },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", rating: 4.3 },
        { title: "Big Little Lies", author: "Liane Moriarty", rating: 4.5 },
      ]
    },
    {
      name: "Romance",
      description: "Fall in love with heartwarming and passionate stories",
      books: [
        { title: "It Ends with Us", author: "Colleen Hoover", rating: 4.6 },
        { title: "The Hating Game", author: "Sally Thorne", rating: 4.4 },
        { title: "Beach Read", author: "Emily Henry", rating: 4.5 },
      ]
    },
    {
      name: "Science Fiction",
      description: "Explore futuristic worlds and technological possibilities",
      books: [
        { title: "Dune", author: "Frank Herbert", rating: 4.7 },
        { title: "The Martian", author: "Andy Weir", rating: 4.6 },
        { title: "Klara and the Sun", author: "Kazuo Ishiguro", rating: 4.3 },
      ]
    },
    {
      name: "Self-Help",
      description: "Transform your life with practical guidance and inspiration",
      books: [
        { title: "Atomic Habits", author: "James Clear", rating: 4.8 },
        { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", rating: 4.5 },
        { title: "Mindset", author: "Carol S. Dweck", rating: 4.4 },
      ]
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < fullStars 
                ? 'text-yellow-400' 
                : i === fullStars && hasHalfStar 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-16 bg-book-warm">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-book-text mb-4">
              Book Categories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover your next favorite read from our carefully curated categories
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-book-text mb-2">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  
                  {/* Featured Books */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-book-text">Featured Books:</h3>
                    {category.books.map((book, bookIndex) => (
                      <div key={bookIndex} className="flex justify-between items-start p-3 bg-white rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium text-book-text line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {book.author}
                          </p>
                          {renderStars(book.rating)}
                        </div>
                        <Button size="sm" className="ml-4 bg-book-primary hover:bg-book-primary/90">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Buy
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-book-primary hover:bg-book-primary/90">
                    Explore {category.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookCategories;