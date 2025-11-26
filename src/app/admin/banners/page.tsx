"use client";

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
<div className="p-4">
  {/* your banner UI content here */}
</div>

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Banner } from '@/lib/data-store';

const gradientOptions = [
  { label: 'Orange → Red → Purple', value: 'from-orange-500 via-red-500 to-purple-600' },
  { label: 'Orange → Pink', value: 'from-orange-500 to-pink-500' },
  { label: 'Purple → Pink', value: 'from-purple-500 to-pink-500' },
  { label: 'Blue → Cyan', value: 'from-blue-500 to-cyan-500' },
  { label: 'Green → Emerald', value: 'from-green-500 to-emerald-500' },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState<string | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    placement: 'hero' as 'hero' | 'dashboard',
    priority: '1',
    status: 'active' as 'active' | 'inactive',
    color: 'from-orange-500 via-red-500 to-purple-600',
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      const data = await response.json();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priority: Number(formData.priority),
        }),
      });
      
      if (response.ok) {
        await fetchBanners();
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding banner:', error);
    }
  };

  const handleEditBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    try {
      const response = await fetch(`/api/banners/${editingBanner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priority: Number(formData.priority),
        }),
      });
      
      if (response.ok) {
        await fetchBanners();
        setIsEditModalOpen(false);
        setEditingBanner(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  const handleDeleteBanner = async () => {
    if (!deleteBannerId) return;

    try {
      const response = await fetch(`/api/banners/${deleteBannerId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchBanners();
        setDeleteBannerId(null);
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      placement: banner.placement,
      priority: banner.priority.toString(),
      status: banner.status,
      color: banner.color,
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      placement: 'hero',
      priority: '1',
      status: 'active',
      color: 'from-orange-500 via-red-500 to-purple-600',
    });
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Banners</h1>
              <p className="text-gray-600">Manage homepage and dashboard banners</p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-hidden p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                  <DialogTitle>Add New Banner</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBanner} className="flex flex-col max-h-[calc(90vh-80px)]">
                  <div className="overflow-y-auto px-6 space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Banner title"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Banner subtitle"
                      required
                    />
                  </div>

                  <div>
                    <Label>CTA Text</Label>
                    <Input
                      value={formData.ctaText}
                      onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                      placeholder="e.g., Download"
                      required
                    />
                  </div>

                  <div>
                    <Label>CTA Link</Label>
                    <Input
                      value={formData.ctaLink}
                      onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                      placeholder="/products/..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Placement</Label>
                      <Select value={formData.placement} onValueChange={(value: 'hero' | 'dashboard') => setFormData({ ...formData, placement: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero</SelectItem>
                          <SelectItem value="dashboard">Dashboard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Priority</Label>
                      <Input
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Gradient Color</Label>
                    <div className="space-y-2 mt-2">
                      {gradientOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: option.value })}
                          className={`w-full p-3 rounded-lg bg-gradient-to-r ${option.value} text-white text-sm font-medium transition-all ${
                            formData.color === option.value ? 'ring-4 ring-gray-900 scale-105' : 'hover:scale-105'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>

                  <div className="flex gap-3 px-6 py-4 border-t bg-gray-50 mt-auto">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500">
                      Add Banner
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Banners Grid */}
          {loading ? (
            <div className="grid gap-6">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </Card>
              ))}
            </div>
          ) : banners.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No banners yet</h3>
              <p className="text-gray-500">Create your first banner to get started</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {banners.map((banner) => (
                <Card 
                  key={banner.id} 
                  className={`p-8 bg-gradient-to-r ${banner.color} text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                      onClick={() => openEditModal(banner)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                      onClick={() => setDeleteBannerId(banner.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="max-w-3xl">
                    <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
                    <p className="text-2xl text-white/90 mb-6">{banner.subtitle}</p>
                    
                    <Button 
                      variant="secondary" 
                      className="bg-white text-orange-600 hover:bg-gray-100 font-semibold mb-6"
                    >
                      {banner.ctaText}
                    </Button>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">Placement:</span>
                        <Badge className="bg-white/20 text-white border-0 capitalize">
                          {banner.placement}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">Priority:</span>
                        <Badge className="bg-white/20 text-white border-0">
                          {banner.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            banner.status === 'active' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-500 text-white'
                          } border-0 capitalize`}
                        >
                          {banner.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-0">
              <DialogHeader className="px-6 pt-6 pb-4">
                <DialogTitle>Edit Banner</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditBanner} className="flex flex-col max-h-[calc(90vh-80px)]">
                <div className="overflow-y-auto px-6 space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>CTA Text</Label>
                  <Input
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label>CTA Link</Label>
                  <Input
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Placement</Label>
                    <Select value={formData.placement} onValueChange={(value: 'hero' | 'dashboard') => setFormData({ ...formData, placement: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hero">Hero</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <Input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Gradient Color</Label>
                  <div className="space-y-2 mt-2">
                    {gradientOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: option.value })}
                        className={`w-full p-3 rounded-lg bg-gradient-to-r ${option.value} text-white text-sm font-medium transition-all ${
                          formData.color === option.value ? 'ring-4 ring-gray-900 scale-105' : 'hover:scale-105'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                </div>

                <div className="flex gap-3 px-6 py-4 border-t bg-gray-50 mt-auto">
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500">
                    Update Banner
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <AlertDialog open={!!deleteBannerId} onOpenChange={() => setDeleteBannerId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the banner.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteBanner} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </ProtectedRoute>
  );
}
