import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    
    const totalProducts = allProducts.length;
    const totalSales = allProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);
    const todaysSales = 0; // Simulated - can be enhanced later
    const bestSeller = allProducts.length > 0 
      ? allProducts.reduce((max, p) => p.sales > max.sales ? p : max, allProducts[0])
      : null;
    
    return NextResponse.json({
      totalProducts,
      totalSales,
      todaysSales,
      bestSeller: bestSeller?.name || 'N/A',
    });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}