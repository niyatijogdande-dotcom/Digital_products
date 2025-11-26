import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { banners } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Valid ID is required" }, { status: 400 });
    }
    
    const result = await db.select().from(banners).where(eq(banners.id, parseInt(id)));
    const banner = result[0];
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    // Transform to frontend format
    return NextResponse.json({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      placement: banner.placement,
      priority: banner.priority,
      status: banner.status,
      color: banner.color,
      createdAt: banner.createdAt,
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Valid ID is required" }, { status: 400 });
    }
    
    const body = await request.json();
    
    // Build updates object
    const updates: any = {};
    
    if (body.title) updates.title = body.title;
    if (body.subtitle) updates.subtitle = body.subtitle;
    if (body.ctaText) updates.ctaText = body.ctaText;
    if (body.ctaLink) updates.ctaLink = body.ctaLink;
    if (body.placement) updates.placement = body.placement;
    if (body.priority !== undefined) updates.priority = body.priority;
    if (body.status) updates.status = body.status;
    if (body.color) updates.color = body.color;
    
    const updatedBanner = await db.update(banners)
      .set(updates)
      .where(eq(banners.id, parseInt(id)))
      .returning();
    
    if (!updatedBanner || updatedBanner.length === 0) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    const banner = updatedBanner[0];
    
    // Transform to frontend format
    return NextResponse.json({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      placement: banner.placement,
      priority: banner.priority,
      status: banner.status,
      color: banner.color,
      createdAt: banner.createdAt,
    });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "Valid ID is required" }, { status: 400 });
    }
    
    await db.delete(banners).where(eq(banners.id, parseInt(id)));
    
    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}