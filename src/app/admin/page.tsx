"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSidebar from '@/components/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Package, DollarSign, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    todaysSales: 0,
    bestSeller: 'N/A',
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const fetchData = async () => {
    try {
      const [statsRes, productsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/products?sort=newest'),
      ]);
      
      const statsData = await statsRes.json();
      const productsData = await productsRes.json();
      
      setStats(statsData);
      // Get the 8 most recent products sorted by creation date
      const sortedProducts = productsData
        .sort((a: Product, b: Product) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 8);
      
      setRecentProducts(sortedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds to catch new products
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-base text-gray-600">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {/* Total Products */}
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Total Products</p>
                      <p className="text-4xl font-bold">{loading ? '...' : stats.totalProducts}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Package className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Total Sales */}
              <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Total Sales</p>
                      <p className="text-4xl font-bold">₹{loading ? '...' : stats.totalSales.toLocaleString()}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <DollarSign className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Today's Sales */}
              <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Today's Sales</p>
                      <p className="text-4xl font-bold">₹{loading ? '...' : stats.todaysSales}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Best Seller */}
              <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-2">Best Seller</p>
                      <p className="text-lg font-bold line-clamp-2">{loading ? '...' : stats.bestSeller.split(' ').slice(0, 4).join(' ')}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Star className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Products */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Products</h2>
                <Link href="/admin/products" className="text-base text-orange-600 hover:text-orange-700 font-medium hover:underline transition-all">
                  View All →
                </Link>
              </div>

              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Image</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Title</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Category</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Price</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Sales</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Created</th>
                        <th className="text-left py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="py-4 px-6"><div className="w-14 h-14 bg-gray-200 rounded-lg"></div></td>
                            <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                            <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                            <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                            <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                            <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                            <td className="py-4 px-6"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                          </tr>
                        ))
                      ) : recentProducts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-lg font-medium">No products yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add your first product to get started!</p>
                          </td>
                        </tr>
                      ) : (
                        recentProducts.map((product) => {
                          const badges = parseBadges(product.badges);
                          return (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="py-4 px-6">
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shadow-sm flex-shrink-0 group">
                                  <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-semibold text-gray-900 line-clamp-2 max-w-xs text-base hover:text-orange-600 transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{product.slug}</p>
                              </td>
                              <td className="py-4 px-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                  {product.category}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-bold text-gray-900 text-base">₹{product.price}</p>
                                <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>
                              </td>
                              <td className="py-4 px-6">
                                <span className="text-base font-semibold text-gray-700">{product.sales}</span>
                              </td>
                              <td className="py-4 px-6">
                                <span className="text-sm text-gray-600 whitespace-nowrap font-medium">{formatDate(product.createdAt)}</span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-wrap gap-1.5">
                                  {badges.length > 0 ? (
                                    badges.map((badge, i) => (
                                      <Badge 
                                        key={i}
                                        className={`${
                                          badge === 'New' ? 'bg-purple-500 hover:bg-purple-600' : 
                                          badge === 'Bestseller' ? 'bg-orange-500 hover:bg-orange-600' : 
                                          badge === 'Hot' ? 'bg-red-500 hover:bg-red-600' :
                                          badge === 'Limited' ? 'bg-blue-500 hover:bg-blue-600' :
                                          'bg-yellow-500 hover:bg-yellow-600'
                                        } text-white border-0 text-xs font-semibold px-2.5 py-1 shadow-sm transition-all duration-200`}
                                      >
                                        {badge}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-xs text-gray-400">-</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}