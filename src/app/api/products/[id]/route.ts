import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "ID or slug is required" }, { status: 400 });
    }
    
    // Check if id is purely numeric (ID lookup) or contains non-numeric characters (slug lookup)
    const isNumericId = /^\d+$/.test(id);
    
    let product;
    
    if (isNumericId) {
      const result = await db.select().from(products).where(eq(products.id, parseInt(id)));
      product = result[0];
    } else {
      // It's a slug
      const result = await db.select().from(products).where(eq(products.slug, id));
      product = result[0];
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Transform to frontend format
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
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Valid numeric ID is required for updates" }, { status: 400 });
    }
    
    const body = await request.json();
    
    // Build updates object
    const updates: any = {};
    
    if (body.name) updates.name = body.name;
    if (body.description) updates.description = body.description;
    if (body.category) updates.category = body.category;
    if (body.price !== undefined) updates.price = body.price;
    if (body.originalPrice !== undefined) updates.originalPrice = body.originalPrice;
    if (body.imageUrl) updates.imageUrl = body.imageUrl;
    if (body.downloadUrl) updates.downloadUrl = body.downloadUrl;
    if (body.sales !== undefined) updates.sales = body.sales;
    if (body.status) updates.status = body.status;
    if (body.screenshotUrls !== undefined) updates.screenshotUrls = body.screenshotUrls;
    if (body.videoUrls !== undefined) updates.videoUrls = body.videoUrls;
    
    const updatedProduct = await db.update(products)
      .set(updates)
      .where(eq(products.id, parseInt(id)))
      .returning();
    
    if (!updatedProduct || updatedProduct.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const product = updatedProduct[0];
    
    // Transform to frontend format
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
    });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Valid numeric ID is required for deletion" }, { status: 400 });
    }
    
    await db.delete(products).where(eq(products.id, parseInt(id)));
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}