import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Quote, Users, Star } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface DashboardStats {
  totalBooks: number;
  totalAuthors: number;
  totalQuotes: number;
  totalReviews: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalAuthors: 0,
    totalQuotes: 0,
    totalReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [booksResult, authorsResult, quotesResult, reviewsResult] = await Promise.all([
        supabase.from('books').select('id', { count: 'exact' }),
        supabase.from('authors').select('id', { count: 'exact' }),
        supabase.from('quotes').select('id', { count: 'exact' }),
        supabase.from('book_reviews').select('id', { count: 'exact' }),
      ]);

      setStats({
        totalBooks: booksResult.count || 0,
        totalAuthors: authorsResult.count || 0,
        totalQuotes: quotesResult.count || 0,
        totalReviews: reviewsResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      description: 'Books in the collection',
      icon: Book,
      color: 'text-blue-600',
    },
    {
      title: 'Total Authors',
      value: stats.totalAuthors,
      description: 'Authors featured',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Total Quotes',
      value: stats.totalQuotes,
      description: 'Quotes available',
      icon: Quote,
      color: 'text-purple-600',
    },
    {
      title: 'Book Reviews',
      value: stats.totalReviews,
      description: 'Published reviews',
      icon: Star,
      color: 'text-orange-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-book-text">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin panel</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your content efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <Book className="h-8 w-8 text-book-primary mb-2" />
                  <h3 className="font-semibold">Add Book</h3>
                  <p className="text-sm text-muted-foreground">Add a new book to collection</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <Quote className="h-8 w-8 text-book-primary mb-2" />
                  <h3 className="font-semibold">Add Quote</h3>
                  <p className="text-sm text-muted-foreground">Create a new quote</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates to your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">System initialized successfully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Database tables created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Admin panel ready</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;