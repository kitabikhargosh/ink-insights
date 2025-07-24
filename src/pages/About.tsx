import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Wilson",
      role: "Founder & Chief Editor",
      description: "Passionate reader with 15+ years in literary journalism."
    },
    {
      name: "David Chen",
      role: "Senior Book Reviewer",
      description: "Specializes in contemporary fiction and emerging authors."
    },
    {
      name: "Maria Garcia",
      role: "Content Manager",
      description: "Curator of book recommendations and reading lists."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-book-text mb-4">About Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are passionate book lovers dedicated to sharing honest reviews, 
              author insights, and fostering a vibrant reading community.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-book-text mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                To connect readers with their next favorite book through honest reviews, 
                thoughtful recommendations, and a supportive community of book enthusiasts. 
                We believe every book has the power to transform, inspire, and entertain.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-book-text text-center mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-book-primary to-book-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-book-text mb-2">{member.name}</h3>
                    <p className="text-book-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;