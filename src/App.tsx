import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import BookReviews from "./pages/BookReviews";
import Authors from "./pages/Authors";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookCategories from "./pages/BookCategories";
import NotFound from "./pages/NotFound";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuotesManager from "./pages/admin/QuotesManager";
import HeroManager from "./pages/admin/HeroManager";
import FeaturedManager from "./pages/admin/FeaturedManager";
import BooksManager from "./pages/admin/BooksManager";
import AuthorsManager from "./pages/admin/AuthorsManager";
import ReviewsManager from "./pages/admin/ReviewsManager";
import SiteSettingsManager from "./pages/admin/SiteSettingsManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reviews" element={<BookReviews />} />
          <Route path="/book-reviews" element={<Reviews />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/book-categories" element={<BookCategories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/quotes" element={<QuotesManager />} />
          <Route path="/admin/hero" element={<HeroManager />} />
          <Route path="/admin/featured" element={<FeaturedManager />} />
          <Route path="/admin/books" element={<BooksManager />} />
          <Route path="/admin/authors" element={<AuthorsManager />} />
          <Route path="/admin/reviews" element={<ReviewsManager />} />
          <Route path="/admin/settings" element={<SiteSettingsManager />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
