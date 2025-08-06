import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Settings, Save, Mail, Phone, Globe, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  description: string | null;
}

interface SettingGroup {
  [key: string]: string;
}

const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<SettingGroup>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('setting_key', { ascending: true });

      if (error) throw error;
      
      setSettings(data || []);
      
      // Convert to form data object
      const formDataObj: SettingGroup = {};
      data?.forEach(setting => {
        formDataObj[setting.setting_key] = setting.setting_value || '';
      });
      setFormData(formDataObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'setting_key' });
        
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });
      
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save site settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const contactSettings = settings.filter(s => s.setting_key.startsWith('contact_'));
  const siteSettings = settings.filter(s => s.setting_key.startsWith('site_'));
  const socialSettings = settings.filter(s => s.setting_key.startsWith('social_'));
  const footerSettings = settings.filter(s => s.setting_key.startsWith('footer_'));

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
            <h1 className="text-3xl font-bold text-book-text">Site Settings</h1>
            <p className="text-muted-foreground">Manage your website's basic information and contact details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger value="footer" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Footer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Site Settings</CardTitle>
                  <CardDescription>Basic information about your website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {siteSettings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.setting_key}>
                        {setting.setting_key.replace('site_', '').replace('_', ' ').toUpperCase()}
                      </Label>
                      {setting.setting_key === 'site_description' ? (
                        <Textarea
                          id={setting.setting_key}
                          value={formData[setting.setting_key] || ''}
                          onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                          placeholder={setting.description || ''}
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={setting.setting_key}
                          value={formData[setting.setting_key] || ''}
                          onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                          placeholder={setting.description || ''}
                        />
                      )}
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How users can reach you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactSettings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.setting_key} className="flex items-center gap-2">
                        {setting.setting_key.includes('email') && <Mail className="h-4 w-4" />}
                        {setting.setting_key.includes('phone') && <Phone className="h-4 w-4" />}
                        {setting.setting_key.replace('contact_', '').replace('_', ' ').toUpperCase()}
                      </Label>
                      <Input
                        id={setting.setting_key}
                        type={setting.setting_type === 'email' ? 'email' : 'text'}
                        value={formData[setting.setting_key] || ''}
                        onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                        placeholder={setting.description || ''}
                      />
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>Your social media presence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialSettings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.setting_key}>
                        {setting.setting_key.replace('social_', '').toUpperCase()}
                      </Label>
                      <Input
                        id={setting.setting_key}
                        type="url"
                        value={formData[setting.setting_key] || ''}
                        onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                        placeholder={setting.description || `https://${setting.setting_key.replace('social_', '')}.com/yourprofile`}
                      />
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="footer">
              <Card>
                <CardHeader>
                  <CardTitle>Footer Settings</CardTitle>
                  <CardDescription>Content that appears in your website footer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {footerSettings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <Label htmlFor={setting.setting_key}>
                        {setting.setting_key.replace('footer_', '').replace('_', ' ').toUpperCase()}
                      </Label>
                      <Textarea
                        id={setting.setting_key}
                        value={formData[setting.setting_key] || ''}
                        onChange={(e) => handleInputChange(setting.setting_key, e.target.value)}
                        placeholder={setting.description || ''}
                        rows={2}
                      />
                      {setting.description && (
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={saving} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsManager;