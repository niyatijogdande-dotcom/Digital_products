// In-memory data store
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  downloadUrl: string;
  sales: number;
  status: 'active' | 'draft';
  badges: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  placement: 'hero' | 'dashboard';
  priority: number;
  status: 'active' | 'inactive';
  color: string;
}

// Initial seeded data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Reels Bundle',
    slug: 'reels-bundle',
    description: 'Instagram and social media reels templates',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: '2',
    name: 'YouTube Thumbnails',
    slug: 'youtube-thumbnails',
    description: 'Eye-catching YouTube thumbnail templates',
    color: 'from-orange-400 to-yellow-500',
  },
  {
    id: '3',
    name: 'Notion Templates',
    slug: 'notion-templates',
    description: 'Productivity templates for Notion',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: '4',
    name: 'E-books',
    slug: 'e-books',
    description: 'Digital books and guides',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: '5',
    name: 'Business Templates',
    slug: 'business-templates',
    description: 'Professional business documents and templates',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: '6',
    name: 'Bundle',
    slug: 'bundle',
    description: 'Complete bundles with multiple products',
    color: 'from-blue-500 to-cyan-500',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Unlock 2000+ ready-to-use digital tools for business growth, content creation, marketing, design, editing, and more. Boost productivity and create like a pro—instantly!',
    slug: 'mega-bundle-2000-tools',
    description: 'One mega bundle with 2000+ tools for business, content, marketing, design...',
    category: 'Bundle',
    price: 299,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 100,
    status: 'active',
    badges: ['New', '90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: '1000+ Doraemon Reels Bundle',
    slug: 'doraemon-reels-bundle',
    description: 'Viral Doraemon Instagram & YouTube Reels - 1000+ Reels + BGM & Sound',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 1250,
    status: 'active',
    badges: ['New', 'Bestseller', '90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: '1000+ AI Superhero Interview Video clips Pack',
    slug: 'ai-superhero-interview-pack',
    description: 'Viral AI-generated superhero interview clips for social media',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 980,
    status: 'active',
    badges: ['New', 'Bestseller', '90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: '2000+ PUBG Gameplay Reels Bundle',
    slug: 'pubg-gameplay-reels',
    description: 'Epic PUBG gameplay moments for content creators',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 1450,
    status: 'active',
    badges: ['Bestseller', '90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: '2000+ Free Fire Gameplay Reels Bundle',
    slug: 'free-fire-gameplay-reels',
    description: 'Viral Free Fire gameplay clips for content creators',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 1320,
    status: 'active',
    badges: ['Bestseller', '90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: '1800+ Call of Duty Gameplay Reels Bundle',
    slug: 'call-of-duty-reels',
    description: 'Premium Call of Duty gameplay reels',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 890,
    status: 'active',
    badges: ['90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: '2000+ Minecraft Gameplay Reels Bundle',
    slug: 'minecraft-gameplay-reels',
    description: 'Creative Minecraft builds and gameplay moments',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 750,
    status: 'active',
    badges: ['90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: '2000+ Clash of Clans Gameplay Reels Bundle',
    slug: 'clash-of-clans-reels',
    description: 'Epic Clash of Clans battles and strategies',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 620,
    status: 'active',
    badges: ['90% OFF'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: '1000+ Tom & Jerry Reels Bundle',
    slug: 'tom-jerry-reels',
    description: 'Funny Tom & Jerry moments for viral content',
    category: 'Reels Bundle',
    price: 99,
    originalPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
    downloadUrl: '#',
    sales: 540,
    status: 'active',
    badges: ['90% OFF'],
    createdAt: new Date().toISOString(),
  },
];

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Nisarg Jogdande',
    subtitle: '200+Bundle',
    ctaText: 'Download',
    ctaLink: '/products/mega-bundle-2000-tools',
    placement: 'hero',
    priority: 1,
    status: 'active',
    color: 'from-orange-500 via-red-500 to-pink-500',
  },
];

// Helper functions for CRUD operations
export const dataStore = {
  products,
  categories,
  banners,
};
