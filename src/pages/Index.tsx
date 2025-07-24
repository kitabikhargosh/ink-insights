import Header from '../components/Header';
import Hero from '../components/Hero';
import LatestBooks from '../components/LatestBooks';
import StatsSection from '../components/StatsSection';
import FeaturedBook from '../components/FeaturedBook';
import ServicesSection from '../components/ServicesSection';
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
      <StatsSection />
      <FeaturedBook />
      <ServicesSection />
      <TestimonialsSection />
      <AuthorSpotlight />
      <WeeklyQuote />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
