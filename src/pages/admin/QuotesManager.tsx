import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Quote } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface QuoteData {
  id: string;
  text: string;
  author: string;
  is_active: boolean;
  created_at: string;
}

const QuotesManager = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState<QuoteData | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    is_active: false,
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quotes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingQuote) {
        const { error } = await supabase
          .from('quotes')
          .update(formData)
          .eq('id', editingQuote.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Quote updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('quotes')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Quote created successfully",
        });
      }

      setFormData({ text: '', author: '', is_active: false });
      setShowForm(false);
      setEditingQuote(null);
      fetchQuotes();
    } catch (error) {
      console.error('Error saving quote:', error);
      toast({
        title: "Error",
        description: "Failed to save quote",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quote: QuoteData) => {
    setEditingQuote(quote);
    setFormData({
      text: quote.text,
      author: quote.author,
      is_active: quote.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;

    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Quote deleted successfully",
      });
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast({
        title: "Error",
        description: "Failed to delete quote",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      // First, deactivate all quotes if we're activating this one
      if (!currentStatus) {
        await supabase
          .from('quotes')
          .update({ is_active: false })
          .neq('id', id);
      }

      const { error } = await supabase
        .from('quotes')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: `Quote ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
      fetchQuotes();
    } catch (error) {
      console.error('Error toggling quote status:', error);
      toast({
        title: "Error",
        description: "Failed to update quote status",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-book-text">Quotes Manager</h1>
            <p className="text-muted-foreground">Manage daily quotes and inspirational content</p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingQuote(null);
              setFormData({ text: '', author: '', is_active: false });
            }}
            className="bg-book-primary hover:bg-book-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quote
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingQuote ? 'Edit Quote' : 'Add New Quote'}</CardTitle>
              <CardDescription>
                {editingQuote ? 'Update the quote details' : 'Create a new inspirational quote'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Quote Text</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter the quote text..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    placeholder="Quote author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Set as active quote</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={loading}>
                    {editingQuote ? 'Update Quote' : 'Create Quote'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingQuote(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-8">Loading quotes...</div>
          ) : quotes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Quote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No quotes found</h3>
                <p className="text-muted-foreground mb-4">Start by adding your first inspirational quote</p>
                <Button onClick={() => setShowForm(true)}>Add Quote</Button>
              </CardContent>
            </Card>
          ) : (
            quotes.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <Quote className="h-5 w-5 text-book-primary" />
                        {quote.is_active && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                      </div>
                      <blockquote className="text-lg font-medium italic mb-2">
                        "{quote.text}"
                      </blockquote>
                      <cite className="text-muted-foreground">— {quote.author}</cite>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(quote.id, quote.is_active)}
                      >
                        {quote.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(quote)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(quote.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuotesManager;