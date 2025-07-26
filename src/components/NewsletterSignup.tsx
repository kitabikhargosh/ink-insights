import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const WEB3FORMS_ACCESS_KEY = "cfafefb4-3fa5-4f09-81f1-3500cf127342";

export default function NewsletterSignup() {
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Subscribing...");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    // Optionally, you can add a "subject" or "from_name" field for Web3Forms
    formData.append("subject", "New Newsletter Signup");
    formData.append("from_name", "Newsletter Signup");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Subscribed successfully! Check your inbox for your free ebook.");
      event.currentTarget.reset();
    } else {
      setResult(data.message || "Failed to subscribe. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-book-text to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Get A FREE Ebook By Joining Our Mailing List Today!
                </h2>
                <p className="text-white/80 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              {/* Form */}
              <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={onSubmit}
                autoComplete="off"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email to get the ebook"
                    className="bg-white border-0 text-book-text h-12"
                    required
                  />
                </div>
                <Button
                  size="lg"
                  className="bg-book-primary hover:bg-book-primary/90 text-white px-8 h-12"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
            {result && (
              <div
                className={`mt-4 font-medium ${
                  result.toLowerCase().includes("success") ? "text-green-300" : "text-red-300"
                }`}
              >
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}