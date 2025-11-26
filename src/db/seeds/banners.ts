import { db } from '@/db';
import { banners } from '@/db/schema';

async function main() {
    const sampleBanners = [
        {
            title: 'LIMITED TIME: 90% OFF ALL BUNDLES!',
            subtitle: 'Get instant access to 2000+ premium digital products',
            ctaText: 'Get Instant Access',
            ctaLink: '/dashboard',
            placement: 'hero',
            priority: 1,
            status: 'active',
            color: 'from-orange-500 via-red-500 to-purple-600',
            createdAt: new Date().toISOString(),
        },
        {
            title: 'NEW ARRIVALS - Fresh Content Weekly',
            subtitle: 'Discover the latest digital products added to our collection',
            ctaText: 'Browse New Products',
            ctaLink: '/dashboard?sort=newest',
            placement: 'dashboard',
            priority: 1,
            status: 'active',
            color: 'from-blue-500 via-purple-500 to-pink-500',
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(banners).values(sampleBanners);
    
    console.log('✅ Banners seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});