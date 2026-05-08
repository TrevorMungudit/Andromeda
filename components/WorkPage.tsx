import React, { useRef } from 'react';
import { BookOpen, Activity, Globe, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WorkPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(".work-header-content", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Stats Animation
    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: ".stats-container",
            start: "top 85%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Initiatives Cards
    gsap.from(".initiative-card", {
        scrollTrigger: {
            trigger: ".initiatives-grid",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
      {/* Header */}
      <div className="relative bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://picsum.photos/id/60/1920/1080"
            alt="Work background"
          />
          <div className="absolute inset-0 bg-slate-900 mix-blend-multiply" />
        </div>
        <div className="work-header-content relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Work & Impact
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            See how Andromeda is changing the landscape of nutritional education through research, partnership, and technology.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-emerald-600">
        <div className="stats-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: 'Articles Published', value: '1,200+' },
              { label: 'Active Learners', value: '50k+' },
              { label: 'Partner Clinics', value: '120' },
              { label: 'Research Citations', value: '500+' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-emerald-100">{stat.label}</dt>
                <dd className="order-1 text-4xl font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas of Focus */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Initiatives</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We focus our efforts on three key pillars to maximize public health outcomes.
            </p>
          </div>

          <div className="initiatives-grid grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="initiative-card bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Public Education</h3>
              <p className="text-gray-600 mb-4">
                Breaking down complex papers into digestible guides, videos, and interactive courses for the general public.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Free comprehensive guides</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Daily myth-busting newsletters</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Kids nutrition programs</li>
              </ul>
            </div>

            <div className="initiative-card bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clinical Support</h3>
              <p className="text-gray-600 mb-4">
                Providing healthcare professionals with up-to-date resources and patient education handouts.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Practitioner portal</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Printable diet plans</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> CME accredited webinars</li>
              </ul>
            </div>

            <div className="initiative-card bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Research</h3>
              <p className="text-gray-600 mb-4">
                Collaborating with universities to fund and publish meta-analyses on emerging nutritional trends.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> University partnerships</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Data analysis grants</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500"/> Annual Nutrition Summit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};