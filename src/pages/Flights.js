import React from 'react';
import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';

export default function Flights() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit p-6 relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-12 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue/10">
          <svg className="w-10 h-10 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h1 className="text-5xl font-sentientmedium tracking-tight mb-4">
          <span className="bg-blue-gradient bg-clip-text text-transparent">Flights</span> Coming Soon
        </h1>
        <p className="text-lg text-gray-600 font-light mb-8 max-w-lg mx-auto">
          We're working hard to bring you the best flight booking experience. Soon, you'll be able to book your entire journey with SkyStay.
        </p>
        <NavLink to="/">
          <Button variant="promo" className="px-8 py-6 rounded-full text-lg shadow-glow-blue hover:-translate-y-1 transition-transform">
            Return Home
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
