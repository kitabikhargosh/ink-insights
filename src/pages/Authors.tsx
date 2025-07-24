import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const Authors = () => {
  const authors = [
    {
      name: "John Smith",
      genre: "Adventure Fiction",
      books: "15 Books",
      description: "Renowned for his thrilling adventure novels that take readers on incredible journeys."
    },
    {
      name: "Jane Doe",
      genre: "Mystery & Thriller",
      books: "12 Books",
      description: "Master of suspense with a talent for creating intricate plot twists."
    },
    {
      name: "Emily Johnson",
      genre: "Romance",
      books: "20 Books",
      description: "Bestselling romance author known for heartwarming love stories."
    },
    {
      name: "Michael Brown",
      genre: "Science Fiction",
      books: "8 Books",
      description: "Visionary sci-fi writer exploring the possibilities of future worlds."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">Featured Authors</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the talented authors behind your favorite books. Discover their works, 
              backgrounds, and upcoming releases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {authors.map((author, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-book-primary to-book-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{author.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-book-text mb-2">{author.name}</h3>
                  <p className="text-book-primary font-medium mb-2">{author.genre}</p>
                  <p className="text-sm text-muted-foreground mb-3">{author.books}</p>
                  <p className="text-sm text-muted-foreground">{author.description}</p>
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

export default Authors;