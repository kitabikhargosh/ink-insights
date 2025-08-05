import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  background_image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
  created_at: string;
}

const HeroManager = () => {
  const [heroContents, setHeroContents] = useState<HeroContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    background_image_url: '',
    cta_text: 'Read Reviews',
    cta_link: '/reviews',
    is_active: false,
  });

  useEffect(() => {
    fetchHeroContents();
  }, []);

  const fetchHeroContents = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHeroContents(data || []);
    } catch (error) {
      console.error('Error fetching hero contents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hero contents",
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
      if (editingHero) {
        const { error } = await supabase
          .from('hero_content')
          .update(formData)
          .eq('id', editingHero.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Hero content updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('hero_content')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Hero content created successfully",
        });
      }

      setFormData({
        title: '',
        subtitle: '',
        description: '',
        background_image_url: '',
        cta_text: 'Read Reviews',
        cta_link: '/reviews',
        is_active: false,
      });
      setShowForm(false);
      setEditingHero(null);
      fetchHeroContents();
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "Error",
        description: "Failed to save hero content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hero: HeroContent) => {
    setEditingHero(hero);
    setFormData({
      title: hero.title,
      subtitle: hero.subtitle || '',
      description: hero.description || '',
      background_image_url: hero.background_image_url || '',
      cta_text: hero.cta_text || 'Read Reviews',
      cta_link: hero.cta_link || '/reviews',
      is_active: hero.is_active,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero content?')) return;

    try {
      const { error } = await supabase
        .from('hero_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Hero content deleted successfully",
      });
      fetchHeroContents();
    } catch (error) {
      console.error('Error deleting hero content:', error);
      toast({
        title: "Error",
        description: "Failed to delete hero content",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      // First, deactivate all hero contents if we're activating this one
      if (!currentStatus) {
        await supabase
          .from('hero_content')
          .update({ is_active: false })
          .neq('id', id);
      }

      const { error } = await supabase
        .from('hero_content')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: `Hero content ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
      fetchHeroContents();
    } catch (error) {
      console.error('Error toggling hero status:', error);
      toast({
        title: "Error",
        description: "Failed to update hero status",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-book-text">Hero Content Manager</h1>
            <p className="text-muted-foreground">Manage your homepage hero section content</p>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingHero(null);
              setFormData({
                title: '',
                subtitle: '',
                description: '',
                background_image_url: '',
                cta_text: 'Read Reviews',
                cta_link: '/reviews',
                is_active: false,
              });
            }}
            className="bg-book-primary hover:bg-book-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hero Content
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingHero ? 'Edit Hero Content' : 'Add New Hero Content'}</CardTitle>
              <CardDescription>
                {editingHero ? 'Update the hero section details' : 'Create new hero section content'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Hero title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      placeholder="Hero subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Hero description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background_image_url">Background Image URL</Label>
                  <Input
                    id="background_image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.background_image_url}
                    onChange={(e) => setFormData({ ...formData, background_image_url: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cta_text">CTA Button Text</Label>
                    <Input
                      id="cta_text"
                      placeholder="Read Reviews"
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta_link">CTA Button Link</Label>
                    <Input
                      id="cta_link"
                      placeholder="/reviews"
                      value={formData.cta_link}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Set as active hero content</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" disabled={loading}>
                    {editingHero ? 'Update Hero Content' : 'Create Hero Content'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingHero(null);
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
            <div className="text-center py-8">Loading hero contents...</div>
          ) : heroContents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hero content found</h3>
                <p className="text-muted-foreground mb-4">Start by adding your first hero section</p>
                <Button onClick={() => setShowForm(true)}>Add Hero Content</Button>
              </CardContent>
            </Card>
          ) : (
            heroContents.map((hero) => (
              <Card key={hero.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        {hero.is_active && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        )}
                        <Badge variant="outline">
                          {new Date(hero.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{hero.title}</h3>
                      {hero.subtitle && (
                        <p className="text-book-primary font-medium mb-2">{hero.subtitle}</p>
                      )}
                      {hero.description && (
                        <p className="text-muted-foreground mb-3">{hero.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {hero.cta_text && <span>CTA: {hero.cta_text}</span>}
                        {hero.cta_link && <span>Link: {hero.cta_link}</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(hero.id, hero.is_active)}
                      >
                        {hero.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(hero)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(hero.id)}
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

export default HeroManager;