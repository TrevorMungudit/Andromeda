export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl: string;
}

export type ViewState = 'landing' | 'library' | 'dashboard' | 'post-detail' | 'login' | 'about' | 'work';

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface AiGenerationState {
  isLoading: boolean;
  content: string | null;
  error: string | null;
}