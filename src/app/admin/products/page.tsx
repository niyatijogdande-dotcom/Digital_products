"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSidebar from '@/components/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Video, Search } from 'lucide-react';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { convertToDirectImageUrl } from '@/lib/utils/image-url';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  downloadUrl: string;
  sales: number;
  status: string;
  badges: string | string[] | null;
  createdAt: string;
  screenshotUrls?: string[] | null;
  videoUrls?: string[] | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    sales: '0',
    imageUrl: '',
    downloadUrl: '',
    status: 'active',
    badges: [] as string[],
    screenshotUrls: [''] as string[],
    videoUrls: [''] as string[],
  });

  // Helper function to parse badges
  const parseBadges = (badges: string | string[] | null): string[] => {
    if (!badges) return [];
    if (Array.isArray(badges)) return badges;
    try {
      const parsed = JSON.parse(badges);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  // Helper function to parse URLs
  const parseUrls = (urls: string[] | string | null): string[] => {
    if (!urls) return [];
    if (Array.isArray(urls)) return urls;
    try {
      const parsed = JSON.parse(urls);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products?sort=newest'),
        fetch('/api/categories'),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      
      // Sort by newest first
      const sorted = productsData.sort((a: Product, b: Product) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setProducts(sorted);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to fetch data');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.category || !formData.price || !formData.originalPrice || !formData.imageUrl || !formData.downloadUrl) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      // Filter out empty URLs
      const cleanScreenshots = formData.screenshotUrls.filter(url => url.trim() !== '');
      const cleanVideos = formData.videoUrls.filter(url => url.trim() !== '');
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          originalPrice: Number(formData.originalPrice),
          sales: Number(formData.sales),
          screenshotUrls: cleanScreenshots.length > 0 ? cleanScreenshots : null,
          videoUrls: cleanVideos.length > 0 ? cleanVideos : null,
        }),
      });
      
      if (response.ok) {
        await fetchData(); // Refresh product list
        setIsAddModalOpen(false);
        resetForm();
        toast.success('Product added successfully! It will appear in User Dashboard instantly.');
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      // Filter out empty URLs
      const cleanScreenshots = formData.screenshotUrls.filter(url => url.trim() !== '');
      const cleanVideos = formData.videoUrls.filter(url => url.trim() !== '');
      
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          originalPrice: Number(formData.originalPrice),
          sales: Number(formData.sales),
          screenshotUrls: cleanScreenshots.length > 0 ? cleanScreenshots : null,
          videoUrls: cleanVideos.length > 0 ? cleanVideos : null,
        }),
      });
      
      if (response.ok) {
        await fetchData();
        setIsEditModalOpen(false);
        setEditingProduct(null);
        resetForm();
        toast.success('Product updated successfully!');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    try {
      const response = await fetch(`/api/products/${deleteProductId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchData();
        setDeleteProductId(null);
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    const screenshots = parseUrls(product.screenshotUrls);
    const videos = parseUrls(product.videoUrls);
    
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      sales: product.sales.toString(),
      imageUrl: product.imageUrl,
      downloadUrl: product.downloadUrl,
      status: product.status,
      badges: parseBadges(product.badges),
      screenshotUrls: screenshots.length > 0 ? screenshots : [''],
      videoUrls: videos.length > 0 ? videos : [''],
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      originalPrice: '',
      sales: '0',
      imageUrl: '',
      downloadUrl: '',
      status: 'active',
      badges: [],
      screenshotUrls: [''],
      videoUrls: [''],
    });
  };

  const toggleBadge = (badge: string) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge],
    }));
  };

  // Screenshot URL handlers
  const addScreenshotUrl = () => {
    setFormData(prev => ({
      ...prev,
      screenshotUrls: [...prev.screenshotUrls, ''],
    }));
  };

  const removeScreenshotUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshotUrls: prev.screenshotUrls.filter((_, i) => i !== index),
    }));
  };

  const updateScreenshotUrl = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      screenshotUrls: prev.screenshotUrls.map((url, i) => i === index ? value : url),
    }));
  };

  // Video URL handlers
  const addVideoUrl = () => {
    setFormData(prev => ({
      ...prev,
      videoUrls: [...prev.videoUrls, ''],
    }));
  };

  const removeVideoUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videoUrls: prev.videoUrls.filter((_, i) => i !== index),
    }));
  };

  const updateVideoUrl = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      videoUrls: prev.videoUrls.map((url, i) => i === index ? value : url),
    }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Product Form Component (reusable for Add and Edit)
  const ProductForm = ({ onSubmit, submitText }: { onSubmit: (e: React.FormEvent) => void; submitText: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Product Name *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
          required
        />
      </div>
      
      <div>
        <Label>Category *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Price (₹) *</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="99"
            required
          />
        </div>
        <div>
          <Label>Original Price (₹) *</Label>
          <Input
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            placeholder="999"
            required
          />
        </div>
        <div>
          <Label>Sales *</Label>
          <Input
            type="number"
            value={formData.sales}
            onChange={(e) => setFormData({ ...formData, sales: e.target.value })}
            placeholder="0"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Number of sales (for bestsellers sorting)</p>
        </div>
      </div>

      <div>
        <Label>Main Image URL *</Label>
        <Input
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Main product thumbnail image</p>
      </div>

      {/* Screenshot URLs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Screenshot URLs (Optional)
          </Label>
          <Button type="button" size="sm" variant="outline" onClick={addScreenshotUrl}>
            <Plus className="w-4 h-4 mr-1" />
            Add Screenshot
          </Button>
        </div>
        <div className="space-y-2">
          {formData.screenshotUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateScreenshotUrl(index, e.target.value)}
                placeholder={`Screenshot URL ${index + 1}`}
              />
              {formData.screenshotUrls.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeScreenshotUrl(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Add multiple product screenshots for gallery view</p>
      </div>

      {/* Video URLs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            Video URLs (Optional)
          </Label>
          <Button type="button" size="sm" variant="outline" onClick={addVideoUrl}>
            <Plus className="w-4 h-4 mr-1" />
            Add Video
          </Button>
        </div>
        <div className="space-y-2">
          {formData.videoUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateVideoUrl(index, e.target.value)}
                placeholder={`Video URL ${index + 1} (YouTube, Google Drive, or direct link)`}
              />
              {formData.videoUrls.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeVideoUrl(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">YouTube, Google Drive, or direct video links</p>
      </div>

      <div>
        <Label>Download URL *</Label>
        <Input
          value={formData.downloadUrl}
          onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
          placeholder="https://example.com/download"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Enter the full URL where users can download the product</p>
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter product description"
          rows={3}
          required
        />
        <p className="text-xs text-gray-500 mt-1">This will be visible on User Dashboard and product detail page</p>
      </div>

      <div>
        <Label>Status</Label>
        <Select value={formData.status} onValueChange={(value: 'active' | 'draft') => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Badges</Label>
        <div className="flex gap-2 mt-2">
          {['New', 'Bestseller', '90% OFF'].map((badge) => (
            <Button
              key={badge}
              type="button"
              variant={formData.badges.includes(badge) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleBadge(badge)}
              className={formData.badges.includes(badge) ? 'bg-gradient-to-r from-orange-500 to-pink-500' : ''}
            >
              {badge}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          {submitText}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
              <p className="text-gray-600">Manage your digital products - changes appear instantly in User Dashboard</p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 btn-shine">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-4">
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto px-6 flex-1">
                  <ProductForm onSubmit={handleAddProduct} submitText="Add Product" />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Image</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Title</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Category</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sales</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b animate-pulse">
                        <td className="py-4 px-6"><div className="w-16 h-16 bg-gray-200 rounded"></div></td>
                        <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                        <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                        <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                        <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                        <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                        <td className="py-4 px-6"><div className="h-8 bg-gray-200 rounded w-24"></div></td>
                      </tr>
                    ))
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const badges = parseBadges(product.badges);
                      return (
                        <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={convertToDirectImageUrl(product.imageUrl)}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-medium text-gray-900 line-clamp-2 max-w-md">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">{product.slug}</p>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-700">{product.category}</span>
                          </td>
                          <td className="py-4 px-6">
                            <p className="font-semibold text-gray-900">₹{product.price}</p>
                            <p className="text-xs text-gray-500 line-through">₹{product.originalPrice}</p>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-700">{product.sales}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {badges.map((badge, i) => (
                                <Badge 
                                  key={i}
                                  className={`${
                                    badge === 'New' ? 'bg-purple-100 text-purple-700' : 
                                    badge === 'Bestseller' ? 'bg-orange-100 text-orange-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                  } border-0 text-xs`}
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                onClick={() => openEditModal(product)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setDeleteProductId(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="p-0 max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader className="px-6 pt-6 pb-4">
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto px-6 flex-1">
                <ProductForm onSubmit={handleEditProduct} submitText="Update Product" />
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation */}
          <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the product.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
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