import BookCard from './BookCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';

const LatestBooks = () => {
  const books = [
    {
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      rating: 5,
      image: book1,
      badge: "New Release",
      description: "A thrilling mystery in a retirement village"
    },
    {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      rating: 4,
      image: book2,
      badge: "Award Winner",
      description: "A beautiful story about artificial intelligence and love"
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 5,
      image: book3,
      badge: "Bestseller",
      description: "A magical novel about life's infinite possibilities"
    },
    {
      title: "Hamnet",
      author: "Maggie O'Farrell",
      rating: 4,
      image: book4,
      badge: "Critics' Choice",
      description: "A powerful reimagining of Shakespeare's family tragedy"
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
            Discover our newest collection of books with fresh stories, amazing authors, 
            and captivating narratives that will keep you turning pages.
          </p>
        </div>

        {/* Books Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {books.map((book, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                <BookCard {...book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        
      </div>
    </section>
  );
};

export default LatestBooks;