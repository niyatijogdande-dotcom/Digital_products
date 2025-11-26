import { db } from '@/db';
import { categories } from '@/db/schema';

async function main() {
    const sampleCategories = [
        {
            name: 'Reels Bundle',
            slug: 'reels-bundle',
            description: 'Professional Instagram Reels templates',
            color: 'from-orange-500 to-red-500',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'YouTube Thumbnails',
            slug: 'youtube-thumbnails',
            description: 'Eye-catching thumbnail designs',
            color: 'from-purple-500 to-pink-500',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Notion Templates',
            slug: 'notion-templates',
            description: 'Productivity templates for Notion',
            color: 'from-blue-500 to-cyan-500',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'E-books',
            slug: 'e-books',
            description: 'Digital books and guides',
            color: 'from-green-500 to-emerald-500',
            createdAt: new Date().toISOString(),
        },
        {
            name: 'Graphics Bundle',
            slug: 'graphics-bundle',
            description: 'Complete graphics packages',
            color: 'from-yellow-500 to-orange-500',
            createdAt: new Date().toISOString(),
        }
    ];

    await db.insert(categories).values(sampleCategories);
    
    console.log('✅ Categories seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});