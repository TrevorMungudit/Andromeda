import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/contentService.ts';
import { ViewState, BlogPost } from '../types.ts';
import { ArrowRight, Check, PlayCircle, Loader2, ArrowUpRight, ShieldCheck, HeartPulse, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const TINY_CHART_DATA = [
  { val: 20 }, { val: 40 }, { val: 35 }, { val: 50 }, { val: 45 }, { val: 70 }, { val: 85 }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setLatestPosts(data.slice(0, 3));
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="bg-white px-4 md:px-12 pb-12">
      
      {/* Hero Section */}
      <div className="relative rounded-[3rem] bg-[#89A8B2] overflow-hidden min-h-[500px] flex items-center mb-12">
        {/* Overlay Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-90 mix-blend-overlay"
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#597E8D] to-transparent opacity-90"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 py-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm mb-6">
            <HeartPulse className="w-4 h-4 mr-2" />
            Science-backed Nutrition
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            Fueling life growth through <br/> nutritional well-being
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join a community of professionals and health enthusiasts. We provide the tools, research, and guidance you need to thrive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('library')}
              className="px-8 py-4 bg-white text-[#597E8D] rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Learning
            </button>
            <button className="px-8 py-4 bg-[#597E8D] border border-white/30 text-white rounded-full font-bold hover:bg-[#4A6A76] transition-colors flex items-center backdrop-blur-sm">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        
        {/* Card 1: Main Stat (Tall) */}
        <div className="col-span-1 md:col-span-3 bg-[#E3F2FD] rounded-[2.5rem] p-8 flex flex-col justify-between h-80 transition-transform hover:-translate-y-1">
          <div>
            <h3 className="text-5xl font-extrabold text-[#1565C0] mb-2">10x</h3>
            <p className="text-[#1E88E5] font-medium leading-snug">
              More effective than traditional diet programs
            </p>
          </div>
          <div className="bg-white/40 h-24 rounded-2xl backdrop-blur-sm relative overflow-hidden p-4">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={TINY_CHART_DATA}>
                 <Line type="monotone" dataKey="val" stroke="#1565C0" strokeWidth={3} dot={false} />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2: Returning Customers (Wide) */}
        <div className="col-span-1 md:col-span-5 bg-[#F0FDF4] rounded-[2.5rem] p-8 relative overflow-hidden transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="bg-emerald-100 p-2 rounded-full">
                    <Zap className="w-4 h-4 text-emerald-600" />
                 </div>
                 <span className="text-emerald-800 font-bold text-sm uppercase tracking-wider">Growth</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Returning Health Seekers</h3>
            </div>
            <div className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              +20,000
            </div>
          </div>
          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={TINY_CHART_DATA}>
                 <Line type="basis" dataKey="val" stroke="#10B981" strokeWidth={4} dot={false} />
                 <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
               </LineChart>
             </ResponsiveContainer>
          </div>
          <p className="text-emerald-600 text-sm mt-2">Consistent engagement across 40+ countries.</p>
        </div>

        {/* Card 3: Satisfaction (Square) */}
        <div className="col-span-1 md:col-span-4 bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
          <div className="relative">
             <div className="text-6xl font-black text-gray-900 mb-2">88%</div>
             <ShieldCheck className="w-8 h-8 text-emerald-500 absolute -top-2 -right-6" />
          </div>
          <p className="text-gray-500 font-medium">
            Of members see clinical improvement in their metabolic health within 3 months.
          </p>
        </div>

        {/* Card 4: Savings (Square) */}
        <div className="col-span-1 md:col-span-4 bg-[#FFF8E1] rounded-[2.5rem] p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
           <div>
             <h3 className="text-3xl font-bold text-amber-900">$614k</h3>
             <p className="text-amber-800/80 text-sm mt-1">Healthcare savings generated for our community members.</p>
           </div>
           <div className="flex -space-x-3 mt-4">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/id/${100+i}/100/100`} alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-800">+2k</div>
           </div>
        </div>

         {/* Card 5: Mobile App (Wide with Image) */}
         <div className="col-span-1 md:col-span-8 bg-[#EEF2FF] rounded-[2.5rem] p-8 md:p-0 flex flex-col md:flex-row items-center overflow-hidden transition-transform hover:-translate-y-1">
            <div className="p-8 md:p-12 md:w-1/2">
               <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
                 NEW FEATURE
               </div>
               <h3 className="text-3xl font-bold text-gray-900 mb-4">Expert access in your pocket</h3>
               <p className="text-gray-600 mb-6">
                 Connect with certified nutritionists directly through our platform. Get personalized advice anytime, anywhere.
               </p>
               <button onClick={() => onNavigate('work')} className="text-indigo-600 font-bold flex items-center hover:underline">
                 Learn about our specialists <ArrowRight className="w-4 h-4 ml-2" />
               </button>
            </div>
            <div className="md:w-1/2 h-full flex items-end justify-center bg-indigo-50">
               <img 
                 src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                 className="w-full h-full object-cover md:rounded-tl-[2.5rem]"
                 alt="Doctor"
               />
            </div>
         </div>
      </div>

      {/* Latest Content Preview */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-8 px-2">
           <div>
             <h2 className="text-3xl font-bold text-gray-900">Latest from the Lab</h2>
             <p className="text-gray-500 mt-2">Fresh insights and research summaries.</p>
           </div>
           <button onClick={() => onNavigate('library')} className="hidden md:flex items-center text-emerald-800 font-bold hover:text-emerald-600">
             View Library <ArrowUpRight className="w-4 h-4 ml-1" />
           </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-emerald-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div key={post.id} className="group cursor-pointer" onClick={() => onNavigate('library')}>
                <div className="rounded-[2rem] overflow-hidden mb-4 h-64 shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="px-2">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-md">{post.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Block */}
      <div className="bg-[#1F2937] rounded-[2.5rem] p-12 text-center md:text-left md:flex md:items-center md:justify-between">
         <div className="mb-8 md:mb-0 md:w-1/2">
           <h2 className="text-3xl font-bold text-white mb-4">Join 50k+ Health Enthusiasts</h2>
           <p className="text-gray-400 text-lg">Get weekly nutrition tips and myth-busting research directly in your inbox.</p>
         </div>
         <div className="md:w-5/12">
            <div className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 px-6 py-4 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500"
               />
               <button className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-400 transition-colors">
                 Subscribe
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};