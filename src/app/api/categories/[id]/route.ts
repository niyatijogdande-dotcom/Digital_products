import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
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
    
    const result = await db.select().from(categories).where(eq(categories.id, parseInt(id)));
    const category = result[0];
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    // Transform to frontend format
    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      createdAt: category.createdAt,
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
    
    if (body.name) updates.name = body.name;
    if (body.slug) updates.slug = body.slug;
    if (body.description) updates.description = body.description;
    if (body.color) updates.color = body.color;
    
    const updatedCategory = await db.update(categories)
      .set(updates)
      .where(eq(categories.id, parseInt(id)))
      .returning();
    
    if (!updatedCategory || updatedCategory.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    const category = updatedCategory[0];
    
    // Transform to frontend format
    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      createdAt: category.createdAt,
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
    
    await db.delete(categories).where(eq(categories.id, parseInt(id)));
    
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}