import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../services/contentService';
import { ViewState, BlogPost } from '../types';
import { ArrowRight, Check, PlayCircle, Loader2 } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 pt-16 pb-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Master your health with</span>{' '}
                <span className="block text-emerald-600 xl:inline">science-backed nutrition</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join thousands of health-conscious individuals and professionals learning the truth about food, metabolism, and wellness. No fads, just facts.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => onNavigate('library')}
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-emerald-600 text-base font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-10"
                  >
                    Start Learning
                  </button>
                  <button
                    className="flex items-center justify-center w-full rounded-md border border-transparent px-5 py-3 bg-emerald-100 text-base font-medium text-emerald-700 hover:bg-emerald-200 focus:outline-none sm:px-10"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
                 <img
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/id/429/800/600"
                    alt="Healthy food bowl"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Andromeda?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
              We bridge the gap between complex nutritional science and daily dietary choices.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Evidence-Based Content
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                Every article, video, and guide is reviewed by certified nutritionists and backed by peer-reviewed research.
              </p>

              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                      <Check className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Curated Learning Paths</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Whether you're vegan, keto, or just eating clean, we have structured guides for you.
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                      <Check className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Interactive Tools</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Use our calorie calculators and meal planners to put theory into practice.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <img
                className="relative mx-auto rounded-lg shadow-lg"
                width={490}
                src="https://picsum.photos/id/365/490/490"
                alt="Nutrition planning"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles */}
      <div className="bg-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Latest from the Lab
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Fresh insights on nutrition, health, and wellness.
            </p>
          </div>
          
          {isLoading ? (
             <div className="flex justify-center mt-12">
               <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
             </div>
          ) : (
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {latestPosts.map((post) => (
                <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-600">
                        {post.category}
                      </p>
                      <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                        <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{post.author}</span>
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                          {post.author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.date}>{post.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <button
               onClick={() => onNavigate('library')}
               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
            >
              View All Articles <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-emerald-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Want nutritional tips?
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-emerald-100">
              Sign up for our weekly newsletter to get the latest research delivered to your inbox.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email-address" type="email" autoComplete="email" required className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md" placeholder="Enter your email" />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-700 focus:ring-white">
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};