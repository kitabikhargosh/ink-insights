-- Create hero content table
CREATE TABLE public.hero_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  description text,
  background_image_url text,
  cta_text text DEFAULT 'Read Reviews',
  cta_link text DEFAULT '/reviews',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create featured content table
CREATE TABLE public.featured_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  description text,
  image_url text,
  cta_text text DEFAULT 'Find on Shop',
  cta_link text DEFAULT '/shop',
  badge_text text DEFAULT 'Special Edition',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value text,
  setting_type text DEFAULT 'text',
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create book reviews table
CREATE TABLE public.book_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id uuid REFERENCES public.books(id) ON DELETE CASCADE,
  reviewer_name text NOT NULL,
  review_title text NOT NULL,
  review_content text NOT NULL,
  rating numeric(2,1) DEFAULT 0,
  review_date date DEFAULT CURRENT_DATE,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create admin users table
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'admin',
  is_active boolean DEFAULT true,
  last_login timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for content tables
CREATE POLICY "Hero content is publicly readable" ON public.hero_content FOR SELECT USING (true);
CREATE POLICY "Featured content is publicly readable" ON public.featured_content FOR SELECT USING (true);
CREATE POLICY "Site settings are publicly readable" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Book reviews are publicly readable" ON public.book_reviews FOR SELECT USING (true);

-- Admin policies for content management
CREATE POLICY "Authenticated users can manage hero content" ON public.hero_content FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage featured content" ON public.featured_content FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage site settings" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage book reviews" ON public.book_reviews FOR ALL USING (true);
CREATE POLICY "Authenticated users can manage admin users" ON public.admin_users FOR ALL USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_featured_content_updated_at BEFORE UPDATE ON public.featured_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_book_reviews_updated_at BEFORE UPDATE ON public.book_reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data
INSERT INTO public.hero_content (title, subtitle, description, background_image_url, is_active) VALUES
('100+ Books Read & Reviewed', 'Book Reviewer', 'Discover amazing stories, insightful analyses, and honest reviews of books across all genres. From bestsellers to hidden gems, find your next great read here.', '/src/assets/hero-background.jpg', true);

INSERT INTO public.featured_content (title, subtitle, description, image_url, is_active) VALUES
('Weekly Bestseller: The Seven Moons of Maali Almeida', 'Featured', 'Winner of the 2022 Booker Prize, this extraordinary novel follows a war photographer who must solve his own murder from the afterlife. A brilliant blend of magical realism, dark humor, and profound insight into humanity''s capacity for both cruelty and compassion.', '/src/assets/featured-book.jpg', true);

INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Book Reviews', 'text', 'Website name'),
('newsletter_title', 'Stay Updated', 'text', 'Newsletter section title'),
('newsletter_description', 'Get the latest book reviews and recommendations delivered to your inbox.', 'text', 'Newsletter description'),
('footer_description', 'Discover your next favorite book through our comprehensive reviews and recommendations.', 'text', 'Footer description');

-- Insert sample book reviews
INSERT INTO public.book_reviews (book_id, reviewer_name, review_title, review_content, rating, is_featured) 
SELECT id, 'Sarah Johnson', 'A Masterpiece of Modern Literature', 'This book completely transformed my understanding of contemporary fiction. The author''s ability to weave complex themes with relatable characters is truly remarkable.', 4.8, true
FROM public.books LIMIT 1;

INSERT INTO public.book_reviews (book_id, reviewer_name, review_title, review_content, rating) 
SELECT id, 'Michael Chen', 'Thought-Provoking and Engaging', 'An excellent read that challenges conventional thinking while maintaining an engaging narrative throughout.', 4.5
FROM public.books LIMIT 1 OFFSET 1;