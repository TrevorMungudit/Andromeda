import { supabase } from './supabaseClient';
import { BlogPost } from '../types';
import { BLOG_POSTS as MOCK_POSTS } from './mockData';

export const fetchPosts = async (): Promise<BlogPost[]> => {
  try {
    // Attempt to fetch from Supabase 'posts' table
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error (using mock data):', error.message);
      return MOCK_POSTS;
    }

    if (!data || data.length === 0) {
      console.info('No data in Supabase, using mock data.');
      return MOCK_POSTS;
    }

    // Map Supabase columns to BlogPost interface
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