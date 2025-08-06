import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  genre: string | null;
  affiliate_link: string | null;
  price: number | null;
  isbn: string | null;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

interface Genre {
  id: string;
  name: string;
  description: string | null;
  color: string;
  display_order: number;
  is_active: boolean;
}

const BooksManager = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image_url: '',
    category: '',
    genre: '',
    affiliate_link: '',
    price: '',
    isbn: '',
    rating: 5,
    is_featured: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksResult, genresResult] = await Promise.all([
        supabase.from('books').select('*').order('created_at', { ascending: false }),
        supabase.from('book_genres').select('*').order('display_order', { ascending: true })
      ]);

      if (booksResult.error) throw booksResult.error;
      if (genresResult.error) throw genresResult.error;

      setBooks(booksResult.data || []);
      setGenres(genresResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load books and genres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bookData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        rating: formData.rating
      };

      if (editingBook) {
        const { error } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', editingBook.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Book updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('books')
          .insert([bookData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Book created successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingBook(null);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving book:', error);
      toast({
        title: "Error",
        description: "Failed to save book",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description || '',
      image_url: book.image_url || '',
      category: book.category || '',
      genre: book.genre || '',
      affiliate_link: book.affiliate_link || '',
      price: book.price?.toString() || '',
      isbn: book.isbn || '',
      rating: book.rating,
      is_featured: book.is_featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      image_url: '',
      category: '',
      genre: '',
      affiliate_link: '',
      price: '',
      isbn: '',
      rating: 5,
      is_featured: false
    });
  };

  const handleNewClick = () => {
    setEditingBook(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredBooks = selectedGenre === 'all' 
    ? books 
    : books.filter(book => book.genre === selectedGenre);

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
            <h1 className="text-3xl font-bold text-book-text">Books Manager</h1>
            <p className="text-muted-foreground">Manage your book collection by genre</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewClick}>
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  {editingBook ? 'Edit Book' : 'Add New Book'}
                </DialogTitle>
                <DialogDescription>
                  Create or edit book information with genre categorization
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.id} value={genre.name}>
                            {genre.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Bestseller, New Release"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image_url">Book Cover Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/book-cover.jpg"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="affiliate_link">Affiliate/Purchase Link</Label>
                  <Input
                    id="affiliate_link"
                    type="url"
                    value={formData.affiliate_link}
                    onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                    placeholder="https://affiliate-link.com"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured Book</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingBook ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={selectedGenre} onValueChange={setSelectedGenre}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All Books</TabsTrigger>
            {genres.map((genre) => (
              <TabsTrigger key={genre.id} value={genre.name}>
                {genre.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedGenre} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <Card key={book.id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                      <CardDescription>by {book.author}</CardDescription>
                      <div className="flex gap-2 mt-2">
                        {book.genre && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {book.genre}
                          </span>
                        )}
                        {book.is_featured && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(book.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {book.image_url && (
                        <img 
                          src={book.image_url} 
                          alt={book.title}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      )}
                      {book.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {book.description}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Rating: {book.rating}/5</div>
                        {book.price && <div>Price: ${book.price}</div>}
                        {book.isbn && <div>ISBN: {book.isbn}</div>}
                        {book.affiliate_link && (
                          <div className="col-span-2">
                            <a 
                              href={book.affiliate_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Purchase Link
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredBooks.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No books in {selectedGenre === 'all' ? 'any genre' : selectedGenre} yet
                    </p>
                    <Button onClick={handleNewClick}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Book
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default BooksManager;