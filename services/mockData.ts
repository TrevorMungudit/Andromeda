import { BlogPost, DashboardStat, User } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Dr. Sarah Miller',
  email: 'sarah@andromeda.health',
  role: 'admin',
  avatarUrl: 'https://picsum.photos/id/64/100/100'
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Macronutrients: A Complete Guide',
    excerpt: 'Learn the fundamentals of proteins, carbohydrates, and fats and how to balance them for optimal health.',
    author: 'Dr. Sarah Miller',
    date: 'Jan 5, 2026',
    category: 'Nutrition Basics',
    imageUrl: 'https://picsum.photos/id/292/800/600',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'The Science of Hydration',
    excerpt: 'Why water is crucial for metabolic function and how to calculate your daily hydration needs.',
    author: 'James Chen, RD',
    date: 'Jan 3, 2026',
    category: 'Wellness',
    imageUrl: 'https://picsum.photos/id/403/800/600',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Plant-Based Proteins: Myths vs. Facts',
    excerpt: 'Debunking common misconceptions about vegetarian and vegan protein sources.',
    author: 'Dr. Sarah Miller',
    date: 'Dec 28, 2025',
    category: 'Dietary Choices',
    imageUrl: 'https://picsum.photos/id/108/800/600',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Gut Health and Mental Well-being',
    excerpt: 'Exploring the gut-brain axis and how probiotics can influence your mood.',
    author: 'Elena Rodriguez',
    date: 'Dec 20, 2025',
    category: 'Advanced Nutrition',
    imageUrl: 'https://picsum.photos/id/225/800/600',
    readTime: '6 min read'
  }
];

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: 'Monthly Active Users', value: '8,420', change: '+12.5%', trend: 'up' },
  { label: 'Avg. Session Duration', value: '6m 12s', change: '+4.3%', trend: 'up' },
  { label: 'New Subscribers', value: '432', change: '+8.1%', trend: 'up' },
  { label: 'Content Views', value: '24.5k', change: '-2.4%', trend: 'down' }
];

export const CHART_DATA = [
  { name: 'Mon', views: 4000, users: 2400 },
  { name: 'Tue', views: 3000, users: 1398 },
  { name: 'Wed', views: 2000, users: 9800 },
  { name: 'Thu', views: 2780, users: 3908 },
  { name: 'Fri', views: 1890, users: 4800 },
  { name: 'Sat', views: 2390, users: 3800 },
  { name: 'Sun', views: 3490, users: 4300 },
];