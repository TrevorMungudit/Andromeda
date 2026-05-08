import React, { useState, useEffect, useRef } from 'react';
import { fetchPosts } from '../services/contentService.ts';
import { ViewState, BlogPost } from '../types.ts';
import { ArrowRight, Check, PlayCircle, Loader2, ArrowUpRight, ShieldCheck, HeartPulse, Zap } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const TINY_CHART_DATA = [
  { val: 20 }, { val: 40 }, { val: 35 }, { val: 50 }, { val: 45 }, { val: 70 }, { val: 85 }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setLatestPosts(data.slice(0, 3));
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  useGSAP(() => {
    // Hero Animation
    gsap.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Bento Grid Animation
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });

    // Posts Animation
    if (!isLoading) {
      gsap.from(".post-card", {
        scrollTrigger: {
          trigger: ".posts-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }

    // Newsletter Animation
    gsap.from(".newsletter-section", {
      scrollTrigger: {
        trigger: ".newsletter-section",
        start: "top 90%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <div ref={containerRef} className="bg-white px-4 md:px-12 pb-12">
      
      {/* Hero Section */}
      <div className="relative rounded-[3rem] bg-[#89A8B2] overflow-hidden min-h-[500px] flex items-center mb-12 transform transition-transform">
        {/* Overlay Image Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-90 mix-blend-overlay"
            alt="Community"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#597E8D] to-transparent opacity-90"></div>
        </div>

        <div className="hero-content relative z-10 w-full max-w-4xl mx-auto text-center px-4 py-16">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm mb-6">
              <HeartPulse className="w-4 h-4 mr-2" />
              Science-backed Nutrition
            </div>
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
              className="px-8 py-4 bg-white text-[#597E8D] rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg hover:scale-105 active:scale-95 duration-200"
            >
              Start Learning
            </button>
            <button className="px-8 py-4 bg-[#597E8D] border border-white/30 text-white rounded-full font-bold hover:bg-[#4A6A76] transition-colors flex items-center backdrop-blur-sm hover:scale-105 active:scale-95 duration-200">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Stats Section */}
      <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        
        {/* Card 1: Main Stat (Tall) */}
        <div className="bento-card col-span-1 md:col-span-3 bg-[#E3F2FD] rounded-[2.5rem] p-8 flex flex-col justify-between h-80 transition-transform hover:-translate-y-1">
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
        <div className="bento-card col-span-1 md:col-span-5 bg-[#F0FDF4] rounded-[2.5rem] p-8 relative overflow-hidden transition-transform hover:-translate-y-1">
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
              +20%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-emerald-900">2.4k</div>
              <div className="text-emerald-700 text-sm font-medium">Monthly Active</div>
            </div>
             <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-emerald-900">98%</div>
              <div className="text-emerald-700 text-sm font-medium">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Card 3: Community (Square) */}
        <div className="bento-card col-span-1 md:col-span-4 bg-[#FFF8E1] rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1">
           <div className="mb-4 relative">
             <div className="flex -space-x-3">
               {[1, 2, 3].map(i => (
                 <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/id/${100+i}/50/50`} alt="User" />
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-400 flex items-center justify-center text-amber-900 font-bold text-xs">
                 +5k
               </div>
             </div>
           </div>
           <h3 className="text-2xl font-bold text-amber-900 mb-2">Join the Community</h3>
           <p className="text-amber-800/80 text-sm mb-4">Connect with like-minded individuals.</p>
           <button 
             onClick={() => onNavigate('login')}
             className="px-6 py-2 bg-amber-900 text-white rounded-xl text-sm font-bold w-full hover:bg-amber-800"
            >
             Join Now
           </button>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="mb-20">
        <div className="flex justify-between items-end mb-8 px-2">
          <div>
             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Latest from the Library</h2>
             <p className="text-gray-500 mt-2">Expert-curated content to guide your journey.</p>
          </div>
          <button 
            onClick={() => onNavigate('library')}
            className="hidden sm:flex items-center text-emerald-700 font-bold hover:text-emerald-800 group"
          >
            View all <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-[2rem] bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="posts-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div 
                key={post.id} 
                className="post-card group relative flex flex-col justify-end overflow-hidden rounded-[2.5rem] bg-gray-100 h-[28rem] cursor-pointer"
                onClick={() => onNavigate('library')}
              >
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="relative p-8 text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold mb-3 border border-white/10">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section bg-gray-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500 rounded-full filter blur-[100px]"></div>
           <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get the weekly digest
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join 50,000+ subscribers receiving the latest nutritional science, debunked myths, and practical guides directly to their inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <button className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/25">
              Subscribe Free
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
             <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> No spam, ever</span>
             <span className="flex items-center"><Check className="w-3 h-3 mr-1" /> Unsubscribe anytime</span>
          </div>
        </div>
      </div>

    </div>
  );
};