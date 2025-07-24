import BookCard from './BookCard';
import { Button } from './ui/button';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';

const LatestBooks = () => {
  const books = [
    {
      title: "Creative Life",
      author: "John Smith",
      price: "$39.99",
      originalPrice: "$49.99",
      rating: 5,
      image: book1,
      badge: "New",
      onSale: true
    },
    {
      title: "Bulle & Pelle",
      author: "Marie Johnson",
      price: "$24.99",
      rating: 4,
      image: book2
    },
    {
      title: "Enemy - Jake Gyllenhaal",
      author: "David Wilson",
      price: "$32.99",
      rating: 5,
      image: book3,
      badge: "Bestseller"
    },
    {
      title: "Peter and the Wolf",
      author: "Classic Tales",
      price: "$19.99",
      originalPrice: "$29.99",
      rating: 4,
      image: book4,
      onSale: true
    }
  ];

  return (
    <section className="py-16 bg-book-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-book-primary font-medium mb-2">New Arrival</p>
          <h2 className="text-3xl md:text-4xl font-bold text-book-text mb-4">
            Our Latest Books
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
            luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-book-primary"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;