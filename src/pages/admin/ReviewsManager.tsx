import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Star, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';

interface BookReview {
  id: string;
  reviewer_name: string;
  review_title: string;
  review_content: string;
  book_id: string | null;
  rating: number;
  review_date: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
}

const ReviewsManager = () => {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<BookReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    reviewer_name: '',
    review_title: '',
    review_content: '',
    book_id: '',
    rating: 5,
    review_date: new Date().toISOString().split('T')[0],
    is_featured: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reviewsResult, booksResult] = await Promise.all([
        supabase.from('book_reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('books').select('id, title, author').order('title', { ascending: true })
      ]);

      if (reviewsResult.error) throw reviewsResult.error;
      if (booksResult.error) throw booksResult.error;

      setReviews(reviewsResult.data || []);
      setBooks(booksResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews and books",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reviewData = {
        ...formData,
        book_id: formData.book_id || null,
        rating: parseFloat(formData.rating.toString())
      };

      if (editingReview) {
        const { error } = await supabase
          .from('book_reviews')
          .update(reviewData)
          .eq('id', editingReview.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('book_reviews')
          .insert([reviewData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Review created successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingReview(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving review:', error);
      toast({
        title: "Error",
        description: "Failed to save review",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: BookReview) => {
    setEditingReview(review);
    setFormData({
      reviewer_name: review.reviewer_name,
      review_title: review.review_title,
      review_content: review.review_content,
      book_id: review.book_id || '',
      rating: review.rating,
      review_date: review.review_date,
      is_featured: review.is_featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const { error } = await supabase
        .from('book_reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      reviewer_name: '',
      review_title: '',
      review_content: '',
      book_id: '',
      rating: 5,
      review_date: new Date().toISOString().split('T')[0],
      is_featured: false
    });
  };

  const handleNewClick = () => {
    setEditingReview(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getBookTitle = (bookId: string | null) => {
    if (!bookId) return 'General Review';
    const book = books.find(b => b.id === bookId);
    return book ? `${book.title} by ${book.author}` : 'Unknown Book';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-book-text">Book Reviews Manager</h1>
            <p className="text-muted-foreground">Manage book reviews and ratings</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewClick}>
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingReview ? 'Edit Review' : 'Add New Review'}
                </DialogTitle>
                <DialogDescription>
                  Create or edit a book review
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reviewer_name">Reviewer Name *</Label>
                    <Input
                      id="reviewer_name"
                      value={formData.reviewer_name}
                      onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review_date">Review Date</Label>
                    <Input
                      id="review_date"
                      type="date"
                      value={formData.review_date}
                      onChange={(e) => setFormData({ ...formData, review_date: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review_title">Review Title *</Label>
                  <Input
                    id="review_title"
                    value={formData.review_title}
                    onChange={(e) => setFormData({ ...formData, review_title: e.target.value })}
                    required
                    placeholder="A captivating title for your review"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book_id">Book (Optional)</Label>
                  <select
                    id="book_id"
                    value={formData.book_id}
                    onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="">General Review (No specific book)</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} by {book.author}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="review_content">Review Content *</Label>
                  <Textarea
                    id="review_content"
                    value={formData.review_content}
                    onChange={(e) => setFormData({ ...formData, review_content: e.target.value })}
                    rows={6}
                    required
                    placeholder="Write your detailed review here..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-20"
                    />
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured Review (Show on homepage)</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingReview ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight flex items-center gap-2">
                    {review.review_title}
                    {review.is_featured && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    by {review.reviewer_name} • {new Date(review.review_date).toLocaleDateString()}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-muted-foreground">({review.rating}/5)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(review)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    {getBookTitle(review.book_id)}
                  </div>
                  <p className="text-sm leading-relaxed line-clamp-3">
                    {review.review_content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {reviews.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No book reviews yet</p>
                <Button onClick={handleNewClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Review
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewsManager;