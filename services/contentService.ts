import { NEON_API_URL } from './supabaseClient.ts';
import { BlogPost } from '../types.ts';
import { BLOG_POSTS as MOCK_POSTS } from './mockData.ts';

export const fetchPosts = async (): Promise<BlogPost[]> => {
  try {
    // Fetch from Neon REST API
    // We use standard PostgREST syntax which Neon's API often supports for compatibility
    const response = await fetch(`${NEON_API_URL}/posts?select=*&order=created_at.desc`);

    if (!response.ok) {
      console.warn('Neon DB fetch error (using mock data). Status:', response.status);
      return MOCK_POSTS;
    }

    const data = await response.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.info('No data in Neon DB, using mock data.');
      return MOCK_POSTS;
    }

    // Map DB columns to BlogPost interface
    return data.map((item: any) => ({
      id: item.id?.toString() || crypto.randomUUID(),
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content || '',
      author: item.author || 'Andromeda Team',
      date: item.created_at ? new Date(item.created_at).toLocaleDateString() : new Date().toLocaleDateString(),
      category: item.category || 'General',
      imageUrl: item.image_url || 'https://picsum.photos/id/292/800/600',
      readTime: item.read_time || '5 min read'
    }));
  } catch (err) {
    console.error('Unexpected error fetching posts:', err);
    return MOCK_POSTS;
  }
};