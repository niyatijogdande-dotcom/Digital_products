"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle, Star, Play } from 'lucide-react';
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

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

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

  // Helper function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string | null => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  };

  // Helper function to check if URL is a video
  const isDirectVideo = (url: string): boolean => {
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  };

  // Helper function to truncate product name safely
  const truncateName = (name: string | undefined, maxWords: number): string => {
    if (!name) return 'Product';
    const words = name.split(' ');
    return words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...' 
      : name;
  };

  // Safe discount calculation
  const calculateDiscount = (price: number, originalPrice: number): number | null => {
    if (!originalPrice || !price || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  useEffect(() => {
    if (params.slug) {
      setLoading(true);
      // Fetch product details
      fetch(`/api/products/${params.slug}`)
        .then(res => {
          if (!res.ok) throw new Error('Product not found');
          return res.json();
        })
        .then(data => {
          console.log('Product data:', data); // Debug log
          setProduct(data);
          setSelectedImage(data.imageUrl || '');
          // Fetch related products from same category
          return fetch(`/api/products?category=${data.category}`);
        })
        .then(res => res.json())
        .then(data => {
          setRelatedProducts(data.filter((p: Product) => p.slug !== params.slug).slice(0, 4));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
          toast.error('Failed to load product');
        });
    }
  }, [params.slug]);

  const handleDownload = () => {
    if (product?.downloadUrl) {
      // Open download URL in new tab
      window.open(product.downloadUrl, '_blank', 'noopener,noreferrer');
      toast.success('Download started! Check your downloads folder.');
    } else {
      toast.error('Download link not available');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/dashboard">
            <Button>Browse All Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const badges = parseBadges(product.badges);
  const screenshots = parseUrls(product.screenshotUrls);
  const videos = parseUrls(product.videoUrls);
  
  // Combine main image with screenshots for gallery
  const allImages = [product.imageUrl, ...screenshots].filter(Boolean);
  
  // Calculate discount safely
  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/dashboard" className="hover:text-gray-900">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{truncateName(product.name, 5)}</span>
        </div>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Left: Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 hover:scale-[1.02] transition-transform duration-500">
              {selectedImage ? (
                <Image
                  src={convertToDirectImageUrl(selectedImage)}
                  alt={product.name || 'Product'}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>No image available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedImage === img 
                        ? 'ring-4 ring-orange-500 ring-offset-2' 
                        : 'ring-2 ring-gray-200 hover:ring-gray-300'
                    }`}
                  >
                    <Image
                      src={convertToDirectImageUrl(img)}
                      alt={`${product.name} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Video Section */}
            {videos.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Play className="w-5 h-5 text-orange-600" />
                  Product Videos
                </h3>
                <div className="grid gap-4">
                  {videos.map((videoUrl, index) => {
                    const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
                    const isVideo = isDirectVideo(videoUrl);

                    return (
                      <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                        {youtubeEmbedUrl ? (
                          <iframe
                            src={youtubeEmbedUrl}
                            title={`${product.name} video ${index + 1}`}
                            className="w-full aspect-video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : isVideo ? (
                          <video
                            src={videoUrl}
                            controls
                            className="w-full aspect-video bg-black"
                            preload="metadata"
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center hover:from-orange-600 hover:to-pink-600 transition-colors"
                          >
                            <Play className="w-6 h-6 mx-auto mb-2" />
                            <p className="font-semibold">View Video {index + 1}</p>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {badges.map((badge, i) => (
                  <Badge 
                    key={i}
                    className={`${
                      badge === 'New' ? 'bg-purple-500 animate-pulse' : 
                      badge === 'Bestseller' ? 'bg-orange-500 animate-bounce-slow' : 
                      'bg-yellow-500 animate-pulse-slow'
                    } text-white border-0 text-sm px-3 py-1`}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name || 'Product Name'}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-600 ml-2">
                  ({product.sales || 0} sales)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-4xl md:text-5xl font-bold text-orange-600">
                ₹{product.price || 0}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl md:text-2xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  {discountPercent !== null && (
                    <Badge className="bg-green-500 text-white">
                      {discountPercent}% OFF
                    </Badge>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-blue-600">📝</span>
                  Product Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </Card>
            )}

            {/* Instant Download Badge */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Instant Download</h3>
                  <p className="text-sm text-green-700">No watermark • Lifetime access • Commercial license</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <Button 
              size="lg" 
              onClick={handleDownload}
              disabled={!product.downloadUrl}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 btn-shine disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Now
            </Button>

            {/* What's Included */}
            <Card className="p-6 bg-orange-50 border-orange-200">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-orange-600">📦</span>
                What's Included
              </h3>
              <ul className="space-y-3">
                {[
                  'High Quality Digital Files',
                  'All Editable Files',
                  'Commercial License Included',
                  'Lifetime Updates',
                  '24/7 Support',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedBadges = parseBadges(relatedProduct.badges);
                const relatedDiscount = calculateDiscount(relatedProduct.price, relatedProduct.originalPrice);
                return (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={convertToDirectImageUrl(relatedProduct.imageUrl)}
                          alt={relatedProduct.name || 'Product'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {relatedBadges.map((badge, i) => (
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
                        {relatedDiscount && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500 text-white">
                              {relatedDiscount}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {truncateName(relatedProduct.name, 8)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-orange-600">₹{relatedProduct.price}</span>
                          {relatedProduct.originalPrice > relatedProduct.price && (
                            <span className="text-sm text-gray-400 line-through">₹{relatedProduct.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{relatedProduct.sales || 0} sales</p>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}