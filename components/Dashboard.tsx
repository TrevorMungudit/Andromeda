import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  Plus, Search, FileText, TrendingUp, Users, Clock, Eye, Sparkles, Loader2, Database, Wifi, WifiOff 
} from 'lucide-react';
import { DASHBOARD_STATS, CHART_DATA } from '../services/mockData';
import { fetchPosts } from '../services/contentService';
import { generateBlogOutline } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { AiGenerationState, BlogPost } from '../types';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'ai-assistant'>('overview');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [aiState, setAiState] = useState<AiGenerationState>({
    isLoading: false,
    content: null,
    error: null
  });
  const [aiTopic, setAiTopic] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      // Lightweight check to see if we can connect to the posts table
      const { error } = await supabase.from('posts').select('count', { count: 'exact', head: true });
      if (error) {
        setDbStatus('error');
      } else {
        setDbStatus('connected');
      }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPosts(true);
      const data = await fetchPosts();
      setPosts(data);
      setIsLoadingPosts(false);
    };
    loadPosts();
  }, []);

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) return;
    
    setAiState({ isLoading: true, content: null, error: null });
    try {
      const result = await generateBlogOutline(aiTopic);
      setAiState({ isLoading: false, content: result, error: null });
    } catch (err) {
      setAiState({ 
        isLoading: false, 
        content: null, 
        error: "Failed to generate content. Please ensure API Key is valid." 
      });
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                   {stat.label.includes('User') && <Users className="h-6 w-6 text-emerald-600" />}
                   {stat.label.includes('Duration') && <Clock className="h-6 w-6 text-emerald-600" />}
                   {stat.label.includes('Subscribers') && <TrendingUp className="h-6 w-6 text-emerald-600" />}
                   {stat.label.includes('Views') && <Eye className="h-6 w-6 text-emerald-600" />}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className={`bg-gray-50 px-5 py-3 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-semibold">{stat.change}</span> from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Engagement</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="users" stroke="#64748b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Content Categories</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Basics', value: 45 },
                { name: 'Diets', value: 32 },
                { name: 'Wellness', value: 28 },
                { name: 'Recipes', value: 19 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f0fdf4'}} />
                <Bar dataKey="value" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const PostsTab = () => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">All Content</h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="Search posts..."
          />
        </div>
      </div>
      
      {isLoadingPosts ? (
        <div className="p-8 flex justify-center text-gray-500">
          <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-emerald-600 truncate">{post.title}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="truncate">{post.author}</span>
                        <span className="mx-1">&middot;</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Published
                    </div>
                    <div className="mt-1 text-xs text-gray-500">{post.date}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const AiAssistantTab = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Andromeda AI Assistant
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate content outlines, analyze nutritional trends, and draft posts efficiently.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic or Keyword</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="topic"
                id="topic"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="e.g. Benefits of Mediterranean Diet"
              />
              <button
                onClick={handleAiGenerate}
                disabled={aiState.isLoading || !aiTopic}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiState.isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  'Generate Outline'
                )}
              </button>
            </div>
          </div>

          {aiState.error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{aiState.error}</div>
                </div>
              </div>
            </div>
          )}

          {aiState.content && (
            <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Generated Output</h3>
              <div className="prose prose-sm prose-emerald max-w-none text-gray-800 whitespace-pre-wrap font-mono bg-white p-4 rounded border border-gray-200">
                {aiState.content}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                  Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            {dbStatus === 'checking' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <Loader2 className="animate-spin -ml-0.5 mr-1 h-3 w-3" />
                Checking DB
              </span>
            )}
            {dbStatus === 'connected' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Wifi className="-ml-0.5 mr-1 h-3 w-3" />
                DB Connected
              </span>
            )}
            {dbStatus === 'error' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800" title="Using local mock data because Supabase table 'posts' was not found or is inaccessible.">
                <WifiOff className="-ml-0.5 mr-1 h-3 w-3" />
                Using Mock Data
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            Welcome back, Sarah
          </p>
        </div>
        
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`${activeTab === 'posts' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Content Management
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`${activeTab === 'ai-assistant' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Assistant
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'posts' && <PostsTab />}
        {activeTab === 'ai-assistant' && <AiAssistantTab />}
      </div>
    </div>
  );
};