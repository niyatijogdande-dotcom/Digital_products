import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { banners } from '@/db/schema';

export async function GET() {
  try {
    const allBanners = await db.select().from(banners);
    
    // Transform to frontend format
    const transformedBanners = allBanners.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      ctaText: b.ctaText,
      ctaLink: b.ctaLink,
      placement: b.placement,
      priority: b.priority,
      status: b.status,
      color: b.color,
      createdAt: b.createdAt,
    }));
    
    return NextResponse.json(transformedBanners);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.subtitle || !body.ctaText || !body.ctaLink || !body.placement || body.priority === undefined || !body.color) {
      return NextResponse.json({ 
        error: "Title, subtitle, ctaText, ctaLink, placement, priority, and color are required" 
      }, { status: 400 });
    }
    
    const newBanner = await db.insert(banners).values({
      title: body.title.trim(),
      subtitle: body.subtitle.trim(),
      ctaText: body.ctaText.trim(),
      ctaLink: body.ctaLink.trim(),
      placement: body.placement.trim(),
      priority: body.priority,
      status: body.status || 'active',
      color: body.color.trim(),
      createdAt: new Date().toISOString(),
    }).returning();
    
    const banner = newBanner[0];
    
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
    }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}