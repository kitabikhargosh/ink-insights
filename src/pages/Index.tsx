import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestBooks from '../components/LatestBooks';
import FeaturedBook from '../components/FeaturedBook';

import TestimonialsSection from '../components/TestimonialsSection';
import AuthorSpotlight from '../components/AuthorSpotlight';
import WeeklyQuote from '../components/WeeklyQuote';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <LatestBooks />
      <WeeklyQuote />
      <NewsletterSignup />
      <FeaturedBook />
      <TestimonialsSection />
      <AuthorSpotlight />
      
      <Footer />
    </div>
  );
};

export default Index;
