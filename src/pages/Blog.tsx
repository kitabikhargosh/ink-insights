import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const Blog = () => {
  const blogPosts = [
    {
      title: "10 Must-Read Books This Summer",
      excerpt: "Discover the hottest books to add to your reading list this summer season.",
      date: "March 15, 2024",
      category: "Book Lists"
    },
    {
      title: "Interview with Bestselling Author Jane Doe",
      excerpt: "An exclusive conversation about her latest mystery novel and writing process.",
      date: "March 12, 2024",
      category: "Author Interviews"
    },
    {
      title: "The Rise of Digital Reading",
      excerpt: "How e-books and audiobooks are changing the way we consume literature.",
      date: "March 10, 2024",
      category: "Industry News"
    },
    {
      title: "Building the Perfect Home Library",
      excerpt: "Tips and tricks for organizing and curating your personal book collection.",
      date: "March 8, 2024",
      category: "Reading Tips"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">Our Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest book news, author interviews, reading tips, 
              and literary discussions from our passionate team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-book-primary/10 text-book-primary text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-book-text mb-3 group-hover:text-book-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;