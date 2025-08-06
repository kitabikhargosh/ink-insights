-- Update books table to support genres
ALTER TABLE public.books 
ADD COLUMN genre text,
ADD COLUMN affiliate_link text,
ADD COLUMN price numeric(10,2),
ADD COLUMN isbn text;

-- Update authors table with additional fields
ALTER TABLE public.authors 
ADD COLUMN books_published integer DEFAULT 0,
ADD COLUMN known_for text,
ADD COLUMN top_books text[];

-- Create book_genres table for better organization
CREATE TABLE public.book_genres (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  color text DEFAULT '#22c55e',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on book_genres
ALTER TABLE public.book_genres ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for book_genres
CREATE POLICY "Book genres are publicly readable" 
ON public.book_genres 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage book genres" 
ON public.book_genres 
FOR ALL 
USING (true);

-- Insert default genres
INSERT INTO public.book_genres (name, description, display_order) VALUES
('Science Fiction', 'Books exploring futuristic concepts and technologies', 1),
('Fiction', 'Literary fiction and general narrative works', 2),
('Non-Fiction', 'Factual books including biographies, history, and reference', 3),
('Thriller/Mystery', 'Suspenseful books with mystery and thriller elements', 4),
('Romance', 'Love stories and romantic literature', 5),
('Self-Help', 'Personal development and self-improvement books', 6);

-- Add trigger for book_genres timestamps
CREATE TRIGGER update_book_genres_updated_at
BEFORE UPDATE ON public.book_genres
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update site_settings with contact information
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('contact_email', 'info@bookstore.com', 'email', 'Main contact email address'),
('contact_phone', '+1-555-0123', 'text', 'Main contact phone number'),
('site_title', 'Book Reviews & More', 'text', 'Website title'),
('site_description', 'Your trusted source for book reviews and recommendations', 'text', 'Website description'),
('social_facebook', '', 'url', 'Facebook page URL'),
('social_twitter', '', 'url', 'Twitter profile URL'),
('social_instagram', '', 'url', 'Instagram profile URL'),
('footer_copyright', '2024 Book Reviews & More. All rights reserved.', 'text', 'Footer copyright text')
ON CONFLICT (setting_key) DO NOTHING;