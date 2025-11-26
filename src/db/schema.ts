import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Products table
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  originalPrice: integer('original_price').notNull(),
  imageUrl: text('image_url').notNull(),
  downloadUrl: text('download_url').notNull(),
  sales: integer('sales').notNull().default(0),
  status: text('status').notNull().default('active'),
  badges: text('badges', { mode: 'json' }),
  screenshotUrls: text('screenshot_urls', { mode: 'json' }),
  videoUrls: text('video_urls', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

// Categories table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  color: text('color').notNull(),
  createdAt: text('created_at').notNull(),
});

// Banners table
export const banners = sqliteTable('banners', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  ctaText: text('cta_text').notNull(),
  ctaLink: text('cta_link').notNull(),
  placement: text('placement').notNull(),
  priority: integer('priority').notNull(),
  status: text('status').notNull().default('active'),
  color: text('color').notNull(),
  createdAt: text('created_at').notNull(),
});