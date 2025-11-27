"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Download, TrendingUp, Sparkles, Search, LayoutDashboard, ShoppingBag, Grid3x3, LogOut, Menu, X } from 'lucide-react';
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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
}

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  placement: string;
  priority: number;
  status: string;
  color: string;
  createdAt: string;
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [liveSales, setLiveSales] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Read search query from URL params on mount
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

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

  // Live Sales Tracking - simulates real-time sales
  useEffect(() => {
    const interval = setInterval(() => {
      // Random sales between 1-5
      const randomSale = Math.floor(Math.random() * 5) + 1;
      setLiveSales(prev => prev + randomSale);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${selectedCategory}&sort=${sortBy}`)
      .then(res => res.json())
      .then(data => {
        // Use API sorting directly - don't override with client-side sort
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const [productsRes, categoriesRes, bannersRes] = await Promise.all([
        fetch('/api/products?sort=newest'),
        fetch('/api/categories'),
        fetch('/api/banners'),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const bannersData = await bannersRes.json();
      
      // Sort by newest first
      const sortedProducts = productsData.sort((a: Product, b: Product) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Filter active dashboard banners, sort by priority (lowest first), then by newest for tiebreakers
      const activeBanners = bannersData
        .filter((b: Banner) => b.status === 'active' && b.placement.toLowerCase() === 'dashboard')
        .sort((a: Banner, b: Banner) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          // If same priority, show newest first
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      
      setProducts(sortedProducts);
      setCategories(categoriesData);
      setBanners(activeBanners);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close sidebar on mobile after clicking
      setSidebarOpen(false);
    }
  };

  const handleDownload = (downloadUrl: string, productName: string) => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      toast.success(`Downloading: ${productName}`);
    } else {
      toast.error('Download link not available');
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fix array mutation issues by using spread operator
  const newArrivals = [...filteredProducts].slice(0, 3);
  const bestSellers = [...filteredProducts].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const totalProducts = filteredProducts.length;
  const availableDownloads = filteredProducts.filter(p => p.downloadUrl).length;
  const bestSellersCount = bestSellers.length;

  // Get the highest priority dashboard banner
  const dashboardBanner = banners[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          {/* Logo/Brand */}
          <div className="p-6 border-b border-white/10">
            <button onClick={() => scrollToSection('top')} className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">SKILCART</h2>
                <p className="text-xs text-gray-400">User Dashboard</p>
              </div>
            </button>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 lg:hidden text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => scrollToSection('top')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 hover:bg-orange-500/30 transition-all group"
            >
              <LayoutDashboard className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('all-products')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span className="text-gray-400 group-hover:text-white">Products</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('categories-section')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
            >
              <Grid3x3 className="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span className="text-gray-400 group-hover:text-white">Categories</span>
            </button>
          </nav>

          {/* Featured Products */}
          <div className="p-4 mt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Featured Products</h3>
            <div className="space-y-2">
              {products.slice(0, 4).map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.slug}`} 
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                    <Image
                      src={convertToDirectImageUrl(product.imageUrl)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{product.name.split(' ').slice(0, 3).join(' ')}</p>
                    <p className="text-xs text-orange-400">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all group">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
              <span className="text-gray-400 group-hover:text-red-400">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 left-6 lg:hidden z-30 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        {/* Main Content */}
        <div id="top" className="flex-1 lg:ml-64">
          {/* Welcome Banner - Dynamic from Admin */}
          {dashboardBanner ? (
            <section className={`relative overflow-hidden bg-gradient-to-br ${dashboardBanner.color} text-white`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
              
              {/* Floating Shapes */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium mb-6 animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Your Digital Products Dashboard
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                  {dashboardBanner.title}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  {dashboardBanner.subtitle}
                </p>
              </div>
              
              {/* Wave Divider */}
              <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f9fafb"/>
                </svg>
              </div>
            </section>
          ) : (
            // Fallback banner if no dashboard banner uploaded
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
              
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
              <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium mb-6 animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Your Digital Products Dashboard
                </Badge>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                  Welcome to Your <span className="text-yellow-300">Premium Bundle</span>
                </h1>
                <p className="text-lg text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Access all your digital products instantly. Download, use, and grow your business!
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f9fafb"/>
                </svg>
              </div>
            </section>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
            {/* Live Sales Tracking */}
            <Card className="p-6 mb-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 animate-pulse"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                    <span className="text-white/90 font-medium">Live Sales Tracking</span>
                  </div>
                  <p className="text-4xl font-bold">{liveSales} Sales Today</p>
                  <p className="text-white/80 mt-2">Real-time sales updates every 5 seconds</p>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-10 h-10 animate-bounce-slow" />
                </div>
              </div>
            </Card>

            {/* Stat Cards with Hover Effects */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-medium">Total Products</span>
                    <Package className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-4xl font-bold">{totalProducts}</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-medium">Available Downloads</span>
                    <Download className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-4xl font-bold">{availableDownloads}</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm font-medium">Best Sellers</span>
                    <TrendingUp className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-4xl font-bold">{bestSellersCount}</p>
                </div>
              </Card>
            </div>

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-3xl font-bold">New Arrivals</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {newArrivals.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <Image
                            src={convertToDirectImageUrl(product.imageUrl)}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-500 text-white border-0">New</Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {product.name.split(' ').slice(0, 8).join(' ')}...
                          </h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                          </div>
                          <p className="text-xs text-gray-500">{product.sales} sales</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Best Sellers */}
            {bestSellers.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <h2 className="text-3xl font-bold">Best Sellers</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((product) => {
                    const badges = parseBadges(product.badges);
                    return (
                      <Link key={product.id} href={`/products/${product.slug}`}>
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            <Image
                              src={convertToDirectImageUrl(product.imageUrl)}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              {badges.map((badge, i) => (
                                <Badge 
                                  key={i}
                                  className={`${
                                    badge === 'New' ? 'bg-purple-500' : 
                                    badge === 'Bestseller' ? 'bg-orange-500' : 
                                    'bg-yellow-500'
                                  } text-white border-0`}
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 space-y-3">
                            <h3 className="font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
                              {product.name.split(' ').slice(0, 6).join(' ')}...
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-orange-600">₹{product.price}</span>
                              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                            </div>
                            <p className="text-xs text-gray-500">{product.sales} sales</p>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* All Products */}
            <section id="all-products">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-3xl font-bold">All Products</h2>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="bestsellers">Best Sellers</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div id="categories-section" className="flex flex-wrap gap-2 mb-8">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-full transition-all duration-300 ${selectedCategory === 'all' ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105' : 'hover:scale-105'}`}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`rounded-full transition-all duration-300 ${selectedCategory === category.name ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105' : 'hover:scale-105'}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">Try a different search term or category</p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => {
                    const badges = parseBadges(product.badges);
                    return (
                      <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group card-hover">
                        <Link href={`/products/${product.slug}`}>
                          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <Image
                              src={convertToDirectImageUrl(product.imageUrl)}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              {badges.map((badge, i) => (
                                <Badge 
                                  key={i}
                                  className={`${
                                    badge === 'New' ? 'bg-purple-500 animate-pulse' : 
                                    badge === 'Bestseller' ? 'bg-orange-500 animate-bounce-slow' : 
                                    'bg-yellow-500 animate-pulse-slow'
                                  } text-white border-0`}
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Link>
                        <div className="p-4 space-y-3">
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {product.description && (
                            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                          )}
                          
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-orange-600">₹{product.price}</span>
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                          </div>
                          <p className="text-xs text-gray-500">{product.sales} sales</p>
                          
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleDownload(product.downloadUrl, product.name);
                            }}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white btn-shine"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Now
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
