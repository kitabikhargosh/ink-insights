import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';

const Shop = () => {
  const books = [
    {
      title: "The Great Adventure",
      author: "John Smith",
      price: 899,
      originalPrice: 1199,
      rating: 4.5,
      image: book1,
      onSale: true,
      badge: "Bestseller"
    },
    {
      title: "Mystery of the Ocean",
      author: "Jane Doe",
      price: 750,
      rating: 4.2,
      image: book2
    },
    {
      title: "Love in Paris",
      author: "Emily Johnson",
      price: 650,
      rating: 4.8,
      image: book3,
      badge: "Editor's Choice"
    },
    {
      title: "Space Odyssey",
      author: "Michael Brown",
      price: 950,
      originalPrice: 1299,
      rating: 4.6,
      image: book4,
      onSale: true
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">Book Shop</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our extensive collection of books. Find your next favorite read 
              with special offers and recommendations.
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="px-4 py-2 bg-book-primary text-white rounded-lg">All Books</button>
            <button className="px-4 py-2 bg-book-warm text-book-text rounded-lg">Fiction</button>
            <button className="px-4 py-2 bg-book-warm text-book-text rounded-lg">Non-Fiction</button>
            <button className="px-4 py-2 bg-book-warm text-book-text rounded-lg">Bestsellers</button>
            <button className="px-4 py-2 bg-book-warm text-book-text rounded-lg">On Sale</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {books.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;