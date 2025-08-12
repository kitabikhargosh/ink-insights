import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const [siteName, setSiteName] = useState('Kitabi Khargosh');
  const [siteTagline, setSiteTagline] = useState('Best Author and Book Reviews');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key, setting_value')
        .in('setting_key', ['site_name', 'site_tagline', 'contact_email', 'contact_phone']);

      if (error) throw error;

      data?.forEach((setting) => {
        if (setting.setting_key === 'site_name' && setting.setting_value) {
          setSiteName(setting.setting_value);
        }
        if (setting.setting_key === 'site_tagline' && setting.setting_value) {
          setSiteTagline(setting.setting_value);
        }
        if (setting.setting_key === 'contact_email' && setting.setting_value) {
          setContactEmail(setting.setting_value);
        }
        if (setting.setting_key === 'contact_phone' && setting.setting_value) {
          setContactPhone(setting.setting_value);
        }
      });
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };
  return (
    <footer className="bg-book-text text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center md:justify-items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-book-primary to-book-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{siteName}</h3>
                <p className="text-xs text-white/70">{siteTagline}</p>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto md:mx-0">
              Discover amazing books, read authentic reviews, and explore the world of literature with us.
            </p>
            <div className="flex justify-center md:justify-start space-x-2">
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-book-primary hover:bg-book-primary/90">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* About Author */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blogs</a></li>
              <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="/authors" className="hover:text-white transition-colors">Authors</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {contactEmail && (
                <li>
                  <span>Email: </span>
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactPhone && (
                <li>
                  <span>Phone: </span>
                  <a href={`tel:${contactPhone}`} className="hover:text-white transition-colors">
                    {contactPhone}
                  </a>
                </li>
              )}
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-white/70 text-sm">
            Copyright © 2025 | Developed by: Taniya Nanwani  
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;