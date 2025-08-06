import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';

interface Author {
  id: string;
  name: string;
  bio: string | null;
  image_url: string | null;
  books_published: number;
  known_for: string | null;
  top_books: string[] | null;
  is_spotlight: boolean;
  created_at: string;
}

const AuthorsManager = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    image_url: '',
    books_published: 0,
    known_for: '',
    top_books: '',
    is_spotlight: false
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuthors(data || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
      toast({
        title: "Error",
        description: "Failed to load authors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authorData = {
        ...formData,
        top_books: formData.top_books ? formData.top_books.split(',').map(book => book.trim()).filter(book => book) : null
      };

      if (editingAuthor) {
        const { error } = await supabase
          .from('authors')
          .update(authorData)
          .eq('id', editingAuthor.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Author updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('authors')
          .insert([authorData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Author created successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingAuthor(null);
      resetForm();
      fetchAuthors();
    } catch (error) {
      console.error('Error saving author:', error);
      toast({
        title: "Error",
        description: "Failed to save author",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      bio: author.bio || '',
      image_url: author.image_url || '',
      books_published: author.books_published,
      known_for: author.known_for || '',
      top_books: author.top_books ? author.top_books.join(', ') : '',
      is_spotlight: author.is_spotlight
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    
    try {
      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Author deleted successfully",
      });
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
      toast({
        title: "Error",
        description: "Failed to delete author",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      image_url: '',
      books_published: 0,
      known_for: '',
      top_books: '',
      is_spotlight: false
    });
  };

  const handleNewClick = () => {
    setEditingAuthor(null);
    resetForm();
    setIsDialogOpen(true);
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
            <h1 className="text-3xl font-bold text-book-text">Authors Manager</h1>
            <p className="text-muted-foreground">Manage author profiles and information</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewClick}>
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingAuthor ? 'Edit Author' : 'Add New Author'}
                </DialogTitle>
                <DialogDescription>
                  Create or edit author profile information
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Author Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="books_published">Books Published</Label>
                    <Input
                      id="books_published"
                      type="number"
                      min="0"
                      value={formData.books_published}
                      onChange={(e) => setFormData({ ...formData, books_published: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    placeholder="Author's biography and background..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="known_for">Known For</Label>
                  <Input
                    id="known_for"
                    value={formData.known_for}
                    onChange={(e) => setFormData({ ...formData, known_for: e.target.value })}
                    placeholder="e.g., Best-selling thriller novels, Fantasy series..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="top_books">Top Books (comma-separated)</Label>
                  <Textarea
                    id="top_books"
                    value={formData.top_books}
                    onChange={(e) => setFormData({ ...formData, top_books: e.target.value })}
                    rows={2}
                    placeholder="Book Title 1, Book Title 2, Book Title 3..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image_url">Author Photo URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/author-photo.jpg"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_spotlight"
                    checked={formData.is_spotlight}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_spotlight: checked })}
                  />
                  <Label htmlFor="is_spotlight">Spotlight Author (Featured on homepage)</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingAuthor ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Card key={author.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight flex items-center gap-2">
                    {author.name}
                    {author.is_spotlight && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Spotlight
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {author.books_published} books published
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(author)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(author.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {author.image_url ? (
                    <img 
                      src={author.image_url} 
                      alt={author.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {author.known_for && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Known For:</p>
                      <p className="text-sm">{author.known_for}</p>
                    </div>
                  )}
                  
                  {author.bio && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Biography:</p>
                      <p className="text-sm line-clamp-3">{author.bio}</p>
                    </div>
                  )}
                  
                  {author.top_books && author.top_books.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Top Books:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {author.top_books.map((book, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {book}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {authors.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No authors yet</p>
                <Button onClick={handleNewClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Author
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuthorsManager;