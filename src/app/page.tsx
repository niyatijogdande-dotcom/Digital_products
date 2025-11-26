"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Zap, Clock, Headphones, Star, Download, CheckCircle, TrendingUp, Search } from 'lucide-react';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'bestsellers'>('all');
  const router = useRouter();

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

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/banners').then(res => res.json())
    ])
      .then(([productsData, bannersData]) => {
        // Ensure productsData is an array
        const productsList = Array.isArray(productsData) ? productsData : [];
        const bannersList = Array.isArray(bannersData) ? bannersData : [];
        
        setProducts(productsList);
        // Filter active hero banners, sort by priority (lowest first), then by newest for tiebreakers
        const activeBanners = bannersList
          .filter((b: Banner) => b.status === 'active' && b.placement.toLowerCase() === 'hero')
          .sort((a: Banner, b: Banner) => {
            if (a.priority !== b.priority) {
              return a.priority - b.priority;
            }
            // If same priority, show newest first
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        setBanners(activeBanners);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setProducts([]);
        setBanners([]);
        setLoading(false);
      });
  }, []);

  // Ensure products is always an array before filtering
  const safeProducts = Array.isArray(products) ? products : [];

  // Filter products based on search query
  const filteredBySearch = safeProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply active filter (New, Bestsellers, or All)
  let displayedProducts = filteredBySearch;
  
  if (activeFilter === 'new') {
    // Sort by most recent (createdAt descending)
    displayedProducts = [...filteredBySearch].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 12);
  } else if (activeFilter === 'bestsellers') {
    // Sort by highest sales
    displayedProducts = [...filteredBySearch].sort((a, b) => b.sales - a.sales).slice(0, 12);
  }

  const newArrivals = [...safeProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  const bestSellers = [...safeProducts]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

  // Get the highest priority banner (lowest number = highest priority)
  const heroBanner = banners[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Dynamic from Admin */}
      {heroBanner ? (
        <section className={`relative overflow-hidden bg-gradient-to-br ${heroBanner.color} text-white`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            {/* Limited Time Badge */}
            <div className="flex justify-center mb-8">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Limited Time Offer - 90% OFF
              </Badge>
            </div>

            {/* Hero Content */}
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {heroBanner.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                {heroBanner.subtitle}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Zap, label: 'Instant Access' },
                { icon: Clock, label: 'Lifetime Updates' },
                { icon: Headphones, label: '24/7 Support' },
                { icon: Star, label: 'Premium Quality' },
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <feature.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{feature.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={heroBanner.ctaLink}>
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-xl">
                  <Download className="w-5 h-5 mr-2" />
                  {heroBanner.ctaText}
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold">
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>5000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No Watermark</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Commercial License</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>
      ) : (
        // Fallback hero if no banner uploaded
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="flex justify-center mb-8">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Limited Time Offer - 90% OFF
              </Badge>
            </div>

            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                2000+ PREMIUM DIGITAL PRODUCTS
                <br />
                <span className="text-yellow-300">ALL-IN-ONE MEGA BUNDLE</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                Get instant access to premium Reels bundles, YouTube thumbnails,
                Notion templates, E-books, and much more from GoDigiStore!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Zap, label: 'Instant Access' },
                { icon: Clock, label: 'Lifetime Updates' },
                { icon: Headphones, label: '24/7 Support' },
                { icon: Star, label: 'Premium Quality' },
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                  <feature.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{feature.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-xl">
                  <Download className="w-5 h-5 mr-2" />
                  Get Instant Access
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full font-semibold">
                  Browse Products
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span>5000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No Watermark</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Commercial License</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Mega Bundle?</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Get access to thousands of premium digital products at an unbeatable price
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Premium Quality',
                description: 'All products are professionally designed and ready to use. No watermarks, full commercial license included.',
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: Clock,
                title: 'Instant Access',
                description: 'Download immediately after purchase. No waiting, no delays. Get started with your projects right away.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: TrendingUp,
                title: 'Lifetime Updates',
                description: 'Get free updates for life. New products added regularly to keep your bundle fresh and valuable.',
                color: 'from-blue-500 to-cyan-500',
              },
            ].map((item, i) => (
              <Card key={i} className="p-8 hover:shadow-xl transition-all duration-300 border-0">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse All Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">All Products</span>
              </h2>
              <p className="text-gray-600">Discover our complete collection of digital products</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </form>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  className={`rounded-full ${activeFilter === 'all' ? 'bg-gradient-to-r from-orange-500 to-pink-500' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Products
                </Button>
                <Button 
                  variant={activeFilter === 'new' ? 'default' : 'ghost'} 
                  className={`rounded-full ${activeFilter === 'new' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}`}
                  onClick={() => setActiveFilter('new')}
                >
                  New
                </Button>
                <Button 
                  variant={activeFilter === 'bestsellers' ? 'default' : 'ghost'} 
                  className={`rounded-full ${activeFilter === 'bestsellers' ? 'bg-gradient-to-r from-orange-500 to-red-500' : ''}`}
                  onClick={() => setActiveFilter('bestsellers')}
                >
                  Bestsellers
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.slice(0, 8).map((product) => {
                const badges = parseBadges(product.badges);
                return (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl}
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
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}