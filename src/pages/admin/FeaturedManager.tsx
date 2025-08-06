import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';

interface FeaturedContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  badge_text: string | null;
  is_active: boolean;
  created_at: string;
}

const FeaturedManager = () => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<FeaturedContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    cta_text: 'Find on Shop',
    cta_link: '/shop',
    badge_text: 'Special Edition',
    is_active: true
  });

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeaturedItems(data || []);
    } catch (error) {
      console.error('Error fetching featured content:', error);
      toast({
        title: "Error",
        description: "Failed to load featured content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('featured_content')
          .update(formData)
          .eq('id', editingItem.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Featured content updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('featured_content')
          .insert([formData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Featured content created successfully",
        });
      }
      
      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      fetchFeaturedContent();
    } catch (error) {
      console.error('Error saving featured content:', error);
      toast({
        title: "Error",
        description: "Failed to save featured content",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: FeaturedContent) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      image_url: item.image_url || '',
      cta_text: item.cta_text || 'Find on Shop',
      cta_link: item.cta_link || '/shop',
      badge_text: item.badge_text || 'Special Edition',
      is_active: item.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this featured content?')) return;
    
    try {
      const { error } = await supabase
        .from('featured_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Featured content deleted successfully",
      });
      fetchFeaturedContent();
    } catch (error) {
      console.error('Error deleting featured content:', error);
      toast({
        title: "Error",
        description: "Failed to delete featured content",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image_url: '',
      cta_text: 'Find on Shop',
      cta_link: '/shop',
      badge_text: 'Special Edition',
      is_active: true
    });
  };

  const handleNewClick = () => {
    setEditingItem(null);
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
            <h1 className="text-3xl font-bold text-book-text">Featured Books Manager</h1>
            <p className="text-muted-foreground">Manage featured books and their display</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewClick}>
                <Plus className="h-4 w-4 mr-2" />
                Add Featured Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Featured Book' : 'Add New Featured Book'}
                </DialogTitle>
                <DialogDescription>
                  Create or edit featured book content that appears on the homepage
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
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cta_text">Button Text</Label>
                    <Input
                      id="cta_text"
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta_link">Affiliate/Shop Link</Label>
                    <Input
                      id="cta_link"
                      value={formData.cta_link}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="badge_text">Badge Text</Label>
                  <Input
                    id="badge_text"
                    value={formData.badge_text}
                    onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active (Show on website)</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {featuredItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {item.title}
                    {item.is_active && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{item.subtitle}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Badge:</strong> {item.badge_text}</p>
                      <p><strong>Button:</strong> {item.cta_text}</p>
                      <p><strong>Link:</strong> {item.cta_link}</p>
                    </div>
                  </div>
                  {item.image_url && (
                    <div className="flex justify-center">
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-32 h-40 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {featuredItems.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No featured books yet</p>
                <Button onClick={handleNewClick}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Featured Book
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeaturedManager;