import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you. 
              Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-book-text mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-book-text mb-2 block">Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-book-text mb-2 block">Email</label>
                    <Input type="email" placeholder="kitabikhargosh@gmail.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-book-text mb-2 block">Subject</label>
                    <Input placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-book-text mb-2 block">Message</label>
                    <Textarea placeholder="Tell us more..." className="h-32" />
                  </div>
                  <Button className="w-full bg-book-primary hover:bg-book-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-book-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-book-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-book-text">Email Us</h3>
                      <p className="text-muted-foreground">kitabikhargosh@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-book-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-book-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-book-text">Follow Us</h3>
                      <p className="text-muted-foreground">Stay updated with our latest book reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;