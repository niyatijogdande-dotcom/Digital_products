import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { desc, asc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    let query = db.select().from(products);
    
    // Filter by category
    if (category && category !== 'all') {
      query = query.where(eq(products.category, category)) as any;
    }
    
    let allProducts = await query;
    
    // Transform snake_case to camelCase for frontend
    const transformedProducts = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      imageUrl: p.imageUrl,
      downloadUrl: p.downloadUrl,
      sales: p.sales,
      status: p.status,
      badges: p.badges,
      screenshotUrls: p.screenshotUrls,
      videoUrls: p.videoUrls,
      createdAt: p.createdAt,
    }));
    
    // Sort products
    if (sort === 'newest') {
      transformedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'price-asc') {
      transformedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      transformedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'bestsellers') {
      transformedProducts.sort((a, b) => b.sales - a.sales);
    }
    
    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.category || !body.price || !body.originalPrice || !body.imageUrl || !body.downloadUrl) {
      return NextResponse.json({ 
        error: "Name, description, category, price, originalPrice, imageUrl, and downloadUrl are required" 
      }, { status: 400 });
    }
    
    // Auto-generate slug from name
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const newProduct = await db.insert(products).values({
      name: body.name.trim(),
      slug: slug,
      description: body.description.trim(),
      category: body.category.trim(),
      price: body.price,
      originalPrice: body.originalPrice,
      imageUrl: body.imageUrl.trim(),
      downloadUrl: body.downloadUrl.trim(),
      sales: body.sales || 0,
      status: body.status || 'active',
      badges: body.badges || null,
      screenshotUrls: body.screenshotUrls || null,
      videoUrls: body.videoUrls || null,
      createdAt: new Date().toISOString(),
    }).returning();
    
    // Transform to frontend format
    const product = newProduct[0];
    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      downloadUrl: product.downloadUrl,
      sales: product.sales,
      status: product.status,
      badges: product.badges,
      screenshotUrls: product.screenshotUrls,
      videoUrls: product.videoUrls,
      createdAt: product.createdAt,
    }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}