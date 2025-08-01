import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestBooks from '../components/LatestBooks';
import FeaturedBook from '../components/FeaturedBook';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AuthorSpotlight from '../components/AuthorSpotlight';
import WeeklyQuote from '../components/WeeklyQuote';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';
import { BookForm } from '../components/admin/BookForm';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LatestBooks />
      <WeeklyQuote />
      <NewsletterSignup />
      <FeaturedBook />
      <ServicesSection />
      <TestimonialsSection />
      <AuthorSpotlight />
      
      {/* Admin Book Form - Add this temporarily for testing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BookForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
