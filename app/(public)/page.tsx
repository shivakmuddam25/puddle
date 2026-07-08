// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  School,
  Brain,
  BarChart3,
  BookOpen,
  ShieldCheck,
  Users,
  Trophy
} from 'lucide-react';

export default function HomePage() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [offerActive, setOfferActive] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      
      if (now > endOfMonth) {
        setOfferActive(false);
        return;
      }
      
      const diff = endOfMonth.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      setOfferActive(true);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section – School Focus */}
      <section className="relative overflow-hidden bg-gradient-to-br from-olive-50 via-emerald-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                {/* Limited Time Offer Banner 
				{offerActive && (
				  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 text-gray-800 px-4 py-3 rounded-lg shadow-md">
					<div className="flex items-center justify-between flex-wrap gap-2">
					  <div className="flex items-center gap-2">
						<Sparkles className="h-5 w-5 text-amber-600" />
						<span className="font-bold text-amber-800">Limited Time Offer!</span>
					  </div>
					  <div className="flex gap-2 text-sm">
						<div className="bg-amber-100 rounded px-2 py-1 text-amber-800 font-mono">
						  <span className="font-bold">{timeLeft.days}</span>d
						</div>
						<div className="bg-amber-100 rounded px-2 py-1 text-amber-800 font-mono">
						  <span className="font-bold">{timeLeft.hours}</span>h
						</div>
						<div className="bg-amber-100 rounded px-2 py-1 text-amber-800 font-mono">
						  <span className="font-bold">{timeLeft.minutes}</span>m
						</div>
						<div className="bg-amber-100 rounded px-2 py-1 text-amber-800 font-mono">
						  <span className="font-bold">{timeLeft.seconds}</span>s
						</div>
					  </div>
					</div>
					<p className="text-sm text-amber-700 mt-2">15% off for the first 100 enrollments! 🎉</p>
				  </div>
				)}
				*/}
				
				{/* Cartoon‑themed Limited Time Offer */}
				{offerActive && (
				  <div className="relative bg-gradient-to-r from-amber-200 to-yellow-200 border-4 border-dashed border-amber-400 rounded-2xl p-4 shadow-lg transform transition-all hover:scale-[1.02]">
					<div className="absolute -top-3 -right-3">
					  <div className="animate-bounce">
						<Sparkles className="h-8 w-8 text-yellow-600 drop-shadow-lg" />
					  </div>
					</div>
					<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
					  <div className="flex items-center gap-2">
						<div className="bg-white rounded-full p-2 shadow-md animate-pulse">
						  <Sparkles className="h-6 w-6 text-amber-500" />
						</div>
						<div>
						  <p className="text-lg font-bold text-amber-800">🎉 FLASH SALE!</p>
						  <p className="text-sm text-amber-700">15% off – only for the first 100 enrollments</p>
						</div>
					  </div>
					  <div className="flex items-center gap-2 text-2xl font-mono font-bold text-amber-800">
						<div className="bg-white rounded-xl px-3 py-2 shadow-md animate-bounce">
						  {timeLeft.days}<span className="text-sm">d</span>
						</div>
						<span>:</span>
						<div className="bg-white rounded-xl px-3 py-2 shadow-md animate-bounce animation-delay-100">
						  {timeLeft.hours}<span className="text-sm">h</span>
						</div>
						<span>:</span>
						<div className="bg-white rounded-xl px-3 py-2 shadow-md animate-bounce animation-delay-200">
						  {timeLeft.minutes}<span className="text-sm">m</span>
						</div>
						<span>:</span>
						<div className="bg-white rounded-xl px-3 py-2 shadow-md animate-bounce animation-delay-300">
						  {timeLeft.seconds}<span className="text-sm">s</span>
						</div>
					  </div>
					</div>
					<div className="absolute -bottom-2 -left-2">
					  <div className="animate-wiggle">
						<span className="text-3xl">🏃‍♂️</span>
					  </div>
					</div>
				  </div>
				)}

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-olive-100 to-emerald-100 px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-olive-600" />
                  <span className="text-sm font-medium text-olive-700">
                    India’s Most Trusted School Learning Platform
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Master Your <span className="text-olive-600">School Curriculum</span>
                </h1>
                
                <p className="text-xl text-gray-600">
                  Personalised learning for CBSE, ICSE, and State Boards. 
                  From Grade 6 to 12 – we make every concept clear.
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-olive-100 rounded-lg mb-2">
                      <School className="h-5 w-5 text-olive-600" />
                    </div>
                    <div className="font-medium text-gray-900">CBSE</div>
                    <div className="text-xs text-gray-600">Central Board</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-emerald-100 rounded-lg mb-2">
                      <School className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="font-medium text-gray-900">ICSE</div>
                    <div className="text-xs text-gray-600">Indian Certificate</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-olive-100">
                    <div className="inline-flex p-2 bg-amber-100 rounded-lg mb-2">
                      <School className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="font-medium text-gray-900">State Boards</div>
                    <div className="text-xs text-gray-600">All major states</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link href="/register" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium bg-gradient-to-r from-olive-500 to-emerald-500 text-white hover:from-olive-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link href="#demo" className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-lg font-medium border-2 border-olive-500 text-olive-600 hover:bg-olive-50 transition-all">
                    Watch Demo
                  </Link>
                </div>
              </div>
              
              {/* Right Column – School Highlights (unchanged) */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-olive-100">
                  <div className="bg-gradient-to-r from-olive-50 to-emerald-50 p-4 border-b border-olive-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-olive-100 rounded-lg">
                        <Brain className="h-5 w-5 text-olive-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Adaptive Learning</h3>
                        <p className="text-sm text-olive-600">Personalized to your pace</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">AI‑driven recommendations tailor study plans to your strengths and weaknesses, ensuring efficient preparation.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-emerald-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Real‑Time Analytics</h3>
                        <p className="text-sm text-emerald-600">Track progress instantly</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">Detailed performance reports help you identify gaps and measure improvement across subjects and tests.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <BookOpen className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Rich Content Library</h3>
                        <p className="text-sm text-amber-600">8,000+ lessons & 30,000+ questions</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">Expert‑created video lessons, practice problems, and mock tests for every topic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us – School‑focused features (unchanged) */}
      <section className="py-20 bg-gradient-to-b from-olive-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Students <span className="text-olive-600">Love Puddle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to help school students excel in their exams and build strong foundations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-white" />,
                title: "Concept Clarity",
                description: "Short, engaging videos break down complex topics into easy‑to‑understand concepts.",
                gradient: "from-olive-500 to-emerald-500"
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Expert Teachers",
                description: "Learn from experienced educators who have taught thousands of successful students.",
                gradient: "from-emerald-500 to-teal-500"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-white" />,
                title: "Performance Insights",
                description: "Get detailed analysis of strengths and areas that need improvement.",
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: <BookOpen className="h-8 w-8 text-white" />,
                title: "Practice Questions",
                description: "Access thousands of chapter‑wise questions and full‑length mock tests.",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-white" />,
                title: "Parental Dashboard",
                description: "Parents can monitor progress, set goals, and stay informed.",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <Trophy className="h-8 w-8 text-white" />,
                title: "Achievement Rewards",
                description: "Earn certificates and badges as you master each chapter.",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-olive-200 transition-all">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}