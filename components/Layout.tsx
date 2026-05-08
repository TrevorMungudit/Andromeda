import React, { useState, useRef } from 'react';
import { Menu, X, Leaf, LogOut, ArrowRight } from 'lucide-react';
import { User, ViewState } from '../types.ts';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate Nav Items on mount
    const tl = gsap.timeline();
    tl.from(".nav-logo", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(".nav-link", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4")
    .from(".nav-auth", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3");

  }, { scope: navRef });

  // Simple page transition effect when view changes
  useGSAP(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    }
  }, [currentView]);

  const NavLink = ({ view, label }: { view: ViewState, label: string }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`nav-link text-sm font-bold tracking-tight transition-colors ${
        currentView === view 
          ? 'text-emerald-700' 
          : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Navigation */}
      <nav ref={navRef} className="w-full bg-white z-50 border-b border-transparent">
        <div className="max-w-[1440px] mx-auto px-6 py-6 md:px-10 relative">
          <div className="flex justify-between items-center h-12">
            
            {/* Left: Logo */}
            <div 
              className="nav-logo flex items-center gap-2 cursor-pointer z-10"
              onClick={() => onNavigate('landing')}
            >
              <div className="bg-emerald-900 p-2 rounded-xl text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Andromeda</span>
            </div>

            {/* Center: Links (Absolute positioned to ensure true centering) */}
            {currentView !== 'dashboard' && (
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center space-x-10">
                <NavLink view="landing" label="Home" />
                <NavLink view="about" label="About us" />
                <NavLink view="library" label="Library" />
                <NavLink view="work" label="Our Work" />
              </div>
            )}
            
            {/* Right: Auth / User Profile */}
            <div className="nav-auth hidden md:flex items-center z-10">
              {user ? (
                <div 
                  onClick={() => user.role === 'admin' && onNavigate('dashboard')}
                  className="flex items-center gap-3 bg-[#F3F4F6] pl-1 pr-3 py-1 rounded-full border border-gray-100 shadow-sm transition-shadow hover:shadow-md cursor-pointer group"
                  title={user.role === 'admin' ? "Go to Dashboard" : "User Profile"}
                >
                  <img 
                    className="h-9 w-9 rounded-full object-cover border-2 border-white" 
                    src={user.avatarUrl} 
                    alt={user.name} 
                  />
                  <span className="text-sm font-bold text-gray-700">{user.name}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onLogout();
                    }}
                    className="text-gray-400 group-hover:text-red-500 transition-colors ml-1"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-emerald-900 hover:bg-emerald-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Log In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="nav-auth flex items-center md:hidden z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 bg-gray-50 rounded-2xl p-6 space-y-4 animate-in slide-in-from-top-4 fade-in absolute left-4 right-4 top-16 shadow-xl border border-gray-100 z-50">
              <div className="flex flex-col space-y-4 items-center">
                <NavLink view="landing" label="Home" />
                <NavLink view="about" label="About us" />
                <NavLink view="library" label="Library" />
                <NavLink view="work" label="Our Work" />
                {user?.role === 'admin' && (
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-sm font-bold tracking-tight transition-colors ${
                      currentView === 'dashboard'
                        ? 'text-emerald-700' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Dashboard
                  </button>
                )}
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-center">
                {user ? (
                   <button onClick={onLogout} className="text-red-500 font-bold text-sm flex items-center">
                     <LogOut className="w-4 h-4 mr-2" /> Log out
                   </button>
                ) : (
                   <button onClick={onLogin} className="text-emerald-800 font-bold text-sm">Log in</button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content Area */}
      <main ref={mainRef} className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto">
        {children}
      </main>

      {/* Minimal Footer */}
      {currentView !== 'dashboard' && currentView !== 'login' && (
        <footer className="w-full border-t border-gray-100 bg-white">
           <div className="max-w-[1440px] mx-auto px-6 py-8 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2026 Andromeda Health.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-600">Privacy</a>
                <a href="#" className="hover:text-gray-600">Terms</a>
                <a href="#" className="hover:text-gray-600">Twitter</a>
              </div>
           </div>
        </footer>
      )}
    </div>
  );
};