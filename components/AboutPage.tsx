import React, { useRef } from 'react';
import { Users, Target, Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Text
    gsap.from(".about-hero-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Mission Cards
    gsap.from(".mission-card", {
      scrollTrigger: {
        trigger: ".mission-grid",
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Team
    gsap.from(".team-member", {
      scrollTrigger: {
        trigger: ".team-grid",
        start: "top 80%"
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <div className="bg-emerald-800 text-white py-20">
        <div className="about-hero-text max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            About Andromeda
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-emerald-100">
            We are on a mission to democratize nutritional science and empower everyone to live a healthier life through education and community.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mission-grid py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="mission-card p-6 bg-slate-50 rounded-xl shadow-sm">
              <div className="mx-auto h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide accessible, evidence-based nutrition education that bridges the gap between clinical science and daily habits.
              </p>
            </div>
            <div className="mission-card p-6 bg-slate-50 rounded-xl shadow-sm">
              <div className="mx-auto h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Integrity in research, inclusivity in community, and transparency in everything we teach and share.
              </p>
            </div>
            <div className="mission-card p-6 bg-slate-50 rounded-xl shadow-sm">
              <div className="mx-auto h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Community</h3>
              <p className="text-gray-600">
                A growing network of health enthusiasts, medical professionals, and researchers working together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Our Story
              </h2>
              <div className="prose prose-emerald text-gray-500">
                <p className="mb-4">
                  Andromeda began in 2024 as a small research project by a group of dietitians and data scientists who noticed a disturbing trend: misinformation about nutrition was spreading faster than facts.
                </p>
                <p className="mb-4">
                  We realized that while scientific journals held the truth, they weren't accessible to the general public. We set out to build a platform that translates complex metabolic research into actionable, everyday advice.
                </p>
                <p>
                  Today, Andromeda serves thousands of users worldwide, providing a sanctuary of truth in the noisy world of online health advice.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <img
                className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                src="https://picsum.photos/id/1015/600/400"
                alt="Team collaborating"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Preview */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">
            Meet the Experts
          </h2>
          <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Sarah Miller', role: 'Head of Research', img: 'https://picsum.photos/id/64/300/300' },
              { name: 'James Chen, RD', role: 'Lead Nutritionist', img: 'https://picsum.photos/id/91/300/300' },
              { name: 'Elena Rodriguez', role: 'Community Director', img: 'https://picsum.photos/id/338/300/300' },
              { name: 'Marcus Johnson', role: 'Technical Lead', img: 'https://picsum.photos/id/177/300/300' },
            ].map((member) => (
              <div key={member.name} className="team-member space-y-4">
                <img className="mx-auto h-40 w-40 rounded-full object-cover border-4 border-emerald-50" src={member.img} alt={member.name} />
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 text-sm font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};