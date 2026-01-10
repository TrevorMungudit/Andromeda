import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Plus, Search, FileText, TrendingUp, Users, Clock, Eye, Sparkles, Loader2, Wifi, WifiOff, MessageSquare
} from 'lucide-react';
import { DASHBOARD_STATS, CHART_DATA } from '../services/mockData.ts';
import { fetchPosts } from '../services/contentService.ts';
import { generateBlogOutline } from '../services/geminiService.ts';
import { NEON_API_URL } from '../services/supabaseClient.ts';
import { AiGenerationState, BlogPost } from '../types.ts';

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
      try {
        // Simple HEAD request to check availability
        const response = await fetch(`${NEON_API_URL}/posts?limit=1`, { method: 'HEAD' });
        if (response.ok) {
          setDbStatus('connected');
        } else {
          setDbStatus('error');
        }
      } catch (e) {
        setDbStatus('error');
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat, idx) => (
          <div key={stat.label} className={`rounded-[2rem] p-6 transition-shadow hover:shadow-md ${idx === 0 ? 'bg-[#E3F2FD]' : idx === 1 ? 'bg-[#F3E5F5]' : 'bg-[#FAFAFA] border border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
               <div className={`p-3 rounded-full ${idx === 0 ? 'bg-blue-100 text-blue-600' : idx === 1 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                  {stat.label.includes('User') && <Users className="h-5 w-5" />}
                  {stat.label.includes('Duration') && <Clock className="h-5 w-5" />}
                  {stat.label.includes('Subscribers') && <TrendingUp className="h-5 w-5" />}
                  {stat.label.includes('Views') && <Eye className="h-5 w-5" />}
               </div>
               <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                 {stat.change}
               </span>
            </div>
            <div>
               <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
               <div className="text-sm font-medium text-gray-500 mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">Engagement Overview</h3>
            <select className="bg-gray-50 border-none text-sm font-medium text-gray-500 rounded-lg px-3 py-2 cursor-pointer outline-none hover:bg-gray-100">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="users" stroke="#cbd5e1" strokeWidth={2} fillOpacity={0} fill="transparent" strokeDasharray="5 5"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-[#FFF8E1] rounded-[2.5rem] p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h3>
          <div className="space-y-6">
             {[
               { name: 'Basics', val: 45, color: 'bg-amber-400' },
               { name: 'Diets', val: 32, color: 'bg-amber-300' },
               { name: 'Wellness', val: 28, color: 'bg-amber-200' },
               { name: 'Recipes', val: 19, color: 'bg-amber-100' },
             ].map(item => (
               <div key={item.name}>
                 <div className="flex justify-between text-sm font-bold text-gray-700 mb-2">
                   <span>{item.name}</span>
                   <span>{item.val}%</span>
                 </div>
                 <div className="w-full bg-white/50 rounded-full h-3">
                   <div className={`${item.color} h-3 rounded-full`} style={{width: `${item.val}%`}}></div>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-8 py-3 bg-amber-900 text-white rounded-xl font-bold text-sm hover:bg-amber-800 transition-colors">
            View Analytics Report
          </button>
        </div>
      </div>
    </div>
  );

  const PostsTab = () => (
    <div className="bg-white border border-gray-100 shadow-sm rounded-[2.5rem] overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">Content Management</h3>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <button className="flex items-center px-4 py-2 bg-emerald-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-800 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New
          </button>
        </div>
      </div>
      
      {isLoadingPosts ? (
        <div className="p-12 flex justify-center text-gray-500">
          <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4 font-semibold">Article</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500">{post.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center">
                       <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-2">
                         {post.author.charAt(0)}
                       </div>
                       <span className="text-sm text-gray-700">{post.author}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-emerald-600 font-medium text-sm">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const AiAssistantTab = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[2.5rem] p-8 border border-indigo-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-white p-3 rounded-2xl shadow-sm">
             <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
            <p className="text-gray-500">Powered by Gemini 3 Flash</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-2 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
               <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full h-full px-6 py-4 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                placeholder="What topic should I outline today?"
              />
            </div>
            <button
              onClick={handleAiGenerate}
              disabled={aiState.isLoading || !aiTopic}
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-[1.5rem] hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {aiState.isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>Generate <Sparkles className="w-4 h-4 ml-2 text-purple-300" /></>
              )}
            </button>
        </div>

        {aiState.error && (
            <div className="rounded-2xl bg-red-50 p-6 border border-red-100 mb-6 flex items-start">
               <div className="text-red-500 mr-3 mt-1">⚠️</div>
               <div>
                  <h3 className="font-bold text-red-800">Generation Failed</h3>
                  <p className="text-red-600 text-sm mt-1">{aiState.error}</p>
               </div>
            </div>
        )}

        {aiState.content && (
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Result</h3>
                <button className="text-purple-600 text-sm font-bold hover:underline">Copy Text</button>
              </div>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-purple-900 prose-a:text-purple-600">
                <div dangerouslySetInnerHTML={{ __html: aiState.content.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
        )}
        
        {!aiState.content && !aiState.isLoading && (
           <div className="text-center py-12">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white mb-4 shadow-sm">
                 <MessageSquare className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Try asking for a "Weekly Meal Plan for Runners"</p>
           </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="px-4 md:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
           <div className="flex items-center mt-2 gap-3">
             <span className="text-gray-500 text-sm">Overview of your platform performance</span>
             {dbStatus === 'connected' ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                  <Wifi className="w-3 h-3 mr-1" /> Online (Neon)
                </span>
             ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                  <WifiOff className="w-3 h-3 mr-1" /> Mock Data
                </span>
             )}
           </div>
        </div>
        
        <div className="flex bg-[#F3F4F6] p-1.5 rounded-full mt-4 sm:mt-0">
            {['overview', 'posts', 'ai-assistant'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'ai-assistant' ? 'Ai assistant' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'posts' && <PostsTab />}
      {activeTab === 'ai-assistant' && <AiAssistantTab />}
    </div>
  );
};