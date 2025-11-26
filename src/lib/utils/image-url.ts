/**
 * Converts Google Drive share URLs to direct image URLs
 * Handles various Google Drive URL formats
 */
export function convertToDirectImageUrl(url: string): string {
  if (!url) return url;

  // Check if it's a Google Drive URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  
  if (driveMatch) {
    const fileId = driveMatch[1];
    // Convert to direct image URL - use thumbnail format for better compatibility
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  // If it's already a direct Google Drive URL, return as is
  if (url.includes('drive.google.com/thumbnail') || url.includes('lh3.googleusercontent.com')) {
    return url;
  }

  // Return original URL if not a Google Drive link
  return url;
}

/**
 * Validates if a URL is a valid image URL or Google Drive link
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check for Google Drive URLs
  if (url.includes('drive.google.com')) return true;
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some(ext => url.toLowerCase().includes(ext));
}
