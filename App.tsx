import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { User, ViewState, BlogPost } from './types';
import { fetchPosts } from './services/contentService';
import { FileText } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Navigate to login page
  const handleLoginClick = () => {
    setCurrentView('login');
  };

  // Process successful login
  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const ContentLibrary = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      };
      loadData();
    }, []);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Content Library</h1>
          <p className="mt-4 text-xl text-gray-500">Explore our complete database of nutritional guides.</p>
        </div>
        
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
      </div>
    );
  };

  return (
    <Layout
      user={user}
      currentView={currentView}
      onNavigate={setCurrentView}
      onLogin={handleLoginClick}
      onLogout={handleLogout}
    >
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      
      {currentView === 'library' && <ContentLibrary />}
      
      {currentView === 'about' && <AboutPage />}
      
      {currentView === 'work' && <WorkPage />}
      
      {currentView === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} />}
      
      {currentView === 'dashboard' && (
        user?.role === 'admin' ? (
          <Dashboard />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
             <h2 className="text-2xl font-bold text-gray-900">Access Restricted</h2>
             <p className="mt-2 text-gray-600">Please log in as an administrator to view this dashboard.</p>
             <button 
               onClick={handleLoginClick}
               className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
             >
               Login as Admin
             </button>
          </div>
        )
      )}
    </Layout>
  );
};

export default App;