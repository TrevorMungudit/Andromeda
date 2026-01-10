import React, { useState } from 'react';
import { Menu, X, Leaf, User as UserIcon, LogOut } from 'lucide-react';
import { User, ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  onLogin: () => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onNavigate, 
  currentView,
  onLogin,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ view, label }: { view: ViewState, label: string }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        currentView === view 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center cursor-pointer"
                onClick={() => onNavigate('landing')}
              >
                <Leaf className="h-8 w-8 text-emerald-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">Andromeda</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                <NavLink view="landing" label="Home" />
                <NavLink view="library" label="Content Library" />
                <NavLink view="work" label="Our Work" />
                <NavLink view="about" label="About Us" />
                {user?.role === 'admin' && (
                  <NavLink view="dashboard" label="Admin Dashboard" />
                )}
              </div>
            </div>
            
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img className="h-8 w-8 rounded-full bg-emerald-100" src={user.avatarUrl} alt={user.name} />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Log In
                </button>
              )}
            </div>

            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <NavLink view="landing" label="Home" />
              <NavLink view="library" label="Content Library" />
              <NavLink view="work" label="Our Work" />
              <NavLink view="about" label="About Us" />
              {user?.role === 'admin' && (
                <NavLink view="dashboard" label="Dashboard" />
              )}
            </div>
            <div className="pt-4 pb-4 border-t border-gray-200 px-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {currentView !== 'dashboard' && currentView !== 'login' && (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-emerald-400" />
                  <span className="text-lg font-bold">Andromeda</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Empowering your health journey with science-backed nutritional education.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => onNavigate('library')} className="text-base text-gray-300 hover:text-white">Content Library</button></li>
                  <li><button onClick={() => onNavigate('work')} className="text-base text-gray-300 hover:text-white">Our Work</button></li>
                  <li><button onClick={() => onNavigate('about')} className="text-base text-gray-300 hover:text-white">Experts</button></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><button onClick={() => onNavigate('about')} className="text-base text-gray-300 hover:text-white">About Us</button></li>
                  <li><button onClick={() => onNavigate('library')} className="text-base text-gray-300 hover:text-white">Blog</button></li>
                  <li><button onClick={() => onNavigate('work')} className="text-base text-gray-300 hover:text-white">Careers</button></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
              &copy; 2026 Andromeda Health. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};