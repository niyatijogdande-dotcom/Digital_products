import { db } from '@/db';
import { products } from '@/db/schema';

async function main() {
    const sampleProducts = [
        {
            name: '2000+ Free Fire Gameplay Reels Bundle',
            slug: '2000-free-fire-gameplay-reels-bundle',
            category: 'Reels Bundle',
            price: 199,
            originalPrice: 1999,
            imageUrl: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800',
            downloadUrl: 'https://drive.google.com/sample1',
            sales: 1250,
            status: 'active',
            badges: JSON.stringify(['Bestseller', 'New']),
            description: 'Complete bundle of 2000+ professional Free Fire gameplay reels ready to post',
            screenshotUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=400',
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
            ]),
            videoUrls: JSON.stringify(['https://www.youtube.com/watch?v=dQw4w9WgXcQ']),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'YouTube Gaming Thumbnails Pack',
            slug: 'youtube-gaming-thumbnails-pack',
            category: 'YouTube Thumbnails',
            price: 149,
            originalPrice: 999,
            imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800',
            downloadUrl: 'https://drive.google.com/sample2',
            sales: 980,
            status: 'active',
            badges: JSON.stringify(['Bestseller']),
            description: '500+ gaming thumbnail templates for YouTube videos',
            screenshotUrls: JSON.stringify(['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400']),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Complete Notion Productivity Bundle',
            slug: 'complete-notion-productivity-bundle',
            category: 'Notion Templates',
            price: 99,
            originalPrice: 799,
            imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
            downloadUrl: 'https://drive.google.com/sample3',
            sales: 750,
            status: 'active',
            badges: JSON.stringify(['New']),
            description: '50+ Notion templates for productivity and organization',
            screenshotUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
                'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
            ]),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Social Media Growth E-book',
            slug: 'social-media-growth-e-book',
            category: 'E-books',
            price: 49,
            originalPrice: 299,
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
            downloadUrl: 'https://drive.google.com/sample4',
            sales: 450,
            status: 'active',
            badges: JSON.stringify([]),
            description: 'Complete guide to growing your social media presence in 2024',
            screenshotUrls: JSON.stringify(['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400']),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Instagram Reels Starter Pack',
            slug: 'instagram-reels-starter-pack',
            category: 'Reels Bundle',
            price: 79,
            originalPrice: 599,
            imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
            downloadUrl: 'https://drive.google.com/sample5',
            sales: 620,
            status: 'active',
            badges: JSON.stringify(['New']),
            description: '300+ Instagram Reels templates for content creators',
            screenshotUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
                'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400'
            ]),
            videoUrls: JSON.stringify(['https://www.youtube.com/watch?v=dQw4w9WgXcQ']),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Ultimate Graphics Bundle 2024',
            slug: 'ultimate-graphics-bundle-2024',
            category: 'Graphics Bundle',
            price: 299,
            originalPrice: 2999,
            imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
            downloadUrl: 'https://drive.google.com/sample6',
            sales: 880,
            status: 'active',
            badges: JSON.stringify(['Bestseller']),
            description: '10000+ graphics including logos, icons, and templates',
            screenshotUrls: JSON.stringify(['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400']),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'YouTube Success Blueprint',
            slug: 'youtube-success-blueprint',
            category: 'E-books',
            price: 59,
            originalPrice: 399,
            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
            downloadUrl: 'https://drive.google.com/sample7',
            sales: 340,
            status: 'active',
            badges: JSON.stringify([]),
            description: 'Step-by-step guide to YouTube monetization and growth',
            screenshotUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
                'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400'
            ]),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Premium Thumbnail Collection',
            slug: 'premium-thumbnail-collection',
            category: 'YouTube Thumbnails',
            price: 179,
            originalPrice: 1299,
            imageUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800',
            downloadUrl: 'https://drive.google.com/sample8',
            sales: 510,
            status: 'active',
            badges: JSON.stringify(['New']),
            description: '1000+ premium YouTube thumbnails across all niches',
            screenshotUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400',
                'https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?w=400',
                'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400'
            ]),
            videoUrls: JSON.stringify([]),
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(products).values(sampleProducts);
    
    console.log('✅ Products seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});