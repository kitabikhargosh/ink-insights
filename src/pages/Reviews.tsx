import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';

const Reviews = () => {
  const reviewedBooks = [
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
            <h1 className="text-4xl font-bold text-book-text mb-4">Book Reviews</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover honest and detailed reviews of the latest books across all genres. 
              Find your next great read with our expert recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {reviewedBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;