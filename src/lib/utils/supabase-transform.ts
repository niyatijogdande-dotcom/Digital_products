// Transform Supabase data (snake_case) to frontend format (camelCase)

export interface SupabaseProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  old_price: number;
  image_url: string;
  download_url: string;
  sales: number;
  status: string;
  screenshot_urls?: string[] | null;
  video_urls?: string[] | null;
  created_at: string;
}

export interface FrontendProduct {
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
  screatedAt: string;
  screenshotUrls?: string[] | null;
  videoUrls?: string[] | null;
}

export function transformProduct(supabaseProduct: any): FrontendProduct {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.title,
    slug: supabaseProduct.slug,
    description: supabaseProduct.description,
    category: supabaseProduct.category,
    price: supabaseProduct.price,
    originalPrice: supabaseProduct.old_price,
    imageUrl: supabaseProduct.image_url,
    downloadUrl: supabaseProduct.download_url,
    sales: supabaseProduct.sales,
    status: supabaseProduct.status,
    badges: null, // Badges will be derived from status or other fields
    createdAt: supabaseProduct.created_at,
    screenshotUrls: supabaseProduct.screenshot_urls,
    videoUrls: supabaseProduct.video_urls,
  };
}

export interface SupabaseCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  created_at: string;
}

export interface FrontendCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
}

export function transformCategory(supabaseCategory: any): FrontendCategory {
  return {
    id: supabaseCategory.id,
    name: supabaseCategory.name,
    slug: supabaseCategory.slug,
    description: supabaseCategory.description,
    color: supabaseCategory.color,
    createdAt: supabaseCategory.created_at,
  };
}

export interface SupabaseBanner {
  id: number;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  placement: string;
  priority: number;
  status: string;
  color: string;
  created_at: string;
}

export interface FrontendBanner {
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

export function transformBanner(supabaseBanner: any): FrontendBanner {
  return {
    id: supabaseBanner.id,
    title: supabaseBanner.title,
    subtitle: supabaseBanner.subtitle,
    ctaText: supabaseBanner.cta_text,
    ctaLink: supabaseBanner.cta_link,
    placement: supabaseBanner.placement,
    priority: supabaseBanner.priority,
    status: supabaseBanner.status,
    color: supabaseBanner.color,
    createdAt: supabaseBanner.created_at,
  };
}
