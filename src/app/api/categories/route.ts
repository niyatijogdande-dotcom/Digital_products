import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    
    // Transform to frontend format
    const transformedCategories = allCategories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      color: c.color,
      createdAt: c.createdAt,
    }));
    
    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.color) {
      return NextResponse.json({ 
        error: "Name, description, and color are required" 
      }, { status: 400 });
    }
    
    // Auto-generate slug from name
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const newCategory = await db.insert(categories).values({
      name: body.name.trim(),
      slug: slug,
      description: body.description.trim(),
      color: body.color.trim(),
      createdAt: new Date().toISOString(),
    }).returning();
    
    const category = newCategory[0];
    
    // Transform to frontend format
    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      createdAt: category.createdAt,
    }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}