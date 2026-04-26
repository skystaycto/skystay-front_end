import React, { useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/Home.css'
import { NavLink } from 'react-router-dom';
import Propertycard from '../components/Propertycard';
import { BlogsContext } from '../context/BlogsContext';
import { PropertyContext } from '../context/PropertyContext';
import { Umbrella, Home as HomeIcon, Tent, TreePalm, Waves, Castle, Search, MapPin, CalendarDays, Users } from 'lucide-react';

export default function Home() {

  const { allblogs, getallblogs } = useContext(BlogsContext);
  const { allproperties, fetchProperties } = useContext(PropertyContext);

  useEffect(() => {
    fetchProperties();
    getallblogs();
    AOS.init({ duration: 800, once: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = [
    { name: 'Beachfront', icon: <Waves size={20} /> },
    { name: 'Cabins', icon: <Tent size={20} /> },
    { name: 'Trending', icon: <Umbrella size={20} /> },
    { name: 'Mansions', icon: <Castle size={20} /> },
    { name: 'Tropical', icon: <TreePalm size={20} /> },
    { name: 'Tiny homes', icon: <HomeIcon size={20} /> },
  ];

  const dummyProperties = [
    {
      id: "dummy-1",
      property_id: "dummy-1",
      title: "Luxury Beachfront Villa with Private Pool",
      city: "Malibu",
      country: "United States",
      property_type: "Villa",
      price_per_night: 850,
      overall_rating: "4.9",
      images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1512616238356-d7a8bf2ce0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    },
    {
      id: "dummy-2",
      property_id: "dummy-2",
      title: "Modern Glass Cabin in the Woods",
      city: "Aspen",
      country: "United States",
      property_type: "Cabin",
      price_per_night: 420,
      overall_rating: "4.95",
      images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1542314831-c6a4d14effb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    },
    {
      id: "dummy-3",
      property_id: "dummy-3",
      title: "Stunning Cliffside Retreat",
      city: "Santorini",
      country: "Greece",
      property_type: "House",
      price_per_night: 600,
      overall_rating: "4.8",
      images: ["https://images.unsplash.com/photo-1620027788484-914364273df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1555896645-12dd51e51b68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    },
    {
      id: "dummy-4",
      property_id: "dummy-4",
      title: "Tropical Treehouse with Jungle Views",
      city: "Bali",
      country: "Indonesia",
      property_type: "Treehouse",
      price_per_night: 250,
      overall_rating: "4.75",
      images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    },
    {
      id: "dummy-5",
      property_id: "dummy-5",
      title: "Historic Chateau Estate",
      city: "Bordeaux",
      country: "France",
      property_type: "Castle",
      price_per_night: 1200,
      overall_rating: "5.0",
      images: ["https://images.unsplash.com/photo-1575510684073-100d02b77a07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
    }
  ];

  return (
    <div className='bg-slate-50 min-h-screen'>
      <Helmet>
        <title>SkyStay.Homes | Premium Stays</title>
      </Helmet>

      {/* VIBRANT HERO SECTION */}
      <div className='relative pt-32 pb-24 px-6 md:px-8 overflow-hidden flex flex-col items-center text-center'>

        {/* Background Blob Effects */}
        <div className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue/10 rounded-full blur-[100px] pointer-events-none'></div>
        <div className='absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-pink/10 rounded-full blur-[100px] pointer-events-none'></div>

        <h1 className='text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 max-w-4xl z-10 leading-tight mb-6' data-aos="fade-up">
          Find exactly where you <br className='hidden md:block' />
          <span className='bg-clip-text text-transparent bg-pink-blue-gradient'>belong right now.</span>
        </h1>

        <p className='text-lg text-gray-500 mb-12 max-w-2xl z-10' data-aos="fade-up" data-aos-delay="100">
          Discover spectacular homes, exclusive cabins, and unique experiences picked just for you.
        </p>

        {/* Glassmorphic Search Bar */}
        <div className='w-full max-w-4xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 z-10' data-aos="fade-up" data-aos-delay="200">

          <div className='flex-1 flex items-center gap-3 px-6 py-4 md:py-3 cursor-pointer hover:bg-white/50 rounded-full transition-colors'>
            <MapPin className='text-blue' size={20} />
            <div className='text-left'>
              <p className='text-xs font-bold uppercase tracking-wider text-gray-900'>Location</p>
              <p className='text-sm text-gray-500'>Where are you going?</p>
            </div>
          </div>

          <div className='flex-1 flex items-center gap-3 px-6 py-4 md:py-3 cursor-pointer hover:bg-white/50 rounded-full transition-colors'>
            <CalendarDays className='text-pink' size={20} />
            <div className='text-left'>
              <p className='text-xs font-bold uppercase tracking-wider text-gray-900'>Dates</p>
              <p className='text-sm text-gray-500'>Add dates</p>
            </div>
          </div>

          <div className='flex-1 flex items-center justify-between gap-3 pl-6 pr-2 py-2 cursor-pointer hover:bg-white/50 rounded-full transition-colors'>
            <div className='flex items-center gap-3'>
              <Users className='text-gray-500' size={20} />
              <div className='text-left'>
                <p className='text-xs font-bold uppercase tracking-wider text-gray-900'>Who</p>
                <p className='text-sm text-gray-500'>Add guests</p>
              </div>
            </div>
            <button className='bg-pink-blue-gradient p-4 rounded-full text-white shadow-glow-blue hover:scale-105 transition-transform shrink-0'>
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-[1600px] mx-auto px-6 md:px-8 pb-20'>

        {/* Categories Pills */}
        <div className='flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar justify-start md:justify-center z-10 relative' data-aos="fade-up" data-aos-delay="300">
          {categories.map((cat, index) => (
            <div key={index} className='flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm cursor-pointer hover:border-blue hover:text-blue hover:shadow-md transition-all whitespace-nowrap text-gray-600 font-medium'>
              {cat.icon}
              <span className='text-sm'>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Listings Grid */}
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-12 mt-4'>
          {allproperties.length > 0 ? (
            allproperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={(idx % 5) * 100}>
                <Propertycard property={property} />
              </div>
            ))
          ) : (
            dummyProperties.map((property, idx) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={(idx % 5) * 100}>
                <Propertycard property={property} />
              </div>
            ))
          )}
        </section>

        {/* Blog Teaser Section */}
        {allblogs.length > 0 && (
          <section className='mt-24 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100' data-aos="fade-up">
            <div className='flex flex-col md:flex-row justify-between items-end mb-10'>
              <div className='max-w-xl'>
                <span className='text-pink font-bold text-sm tracking-widest uppercase mb-2 block'>Journal</span>
                <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>Travel inspiration for your next adventure</h2>
              </div>
              <NavLink to="/blog" className='mt-4 md:mt-0 px-6 py-3 rounded-full border border-gray-200 font-medium hover:border-gray-900 hover:bg-gray-50 transition-colors'>
                Read all articles
              </NavLink>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {allblogs.slice(0, 3).map((blog, idx) => (
                <NavLink to={`/singleblog/${blog.id}`} key={blog.id} className='group cursor-pointer' data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className='rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 mb-6 shadow-sm group-hover:shadow-md transition-shadow relative'>
                    <div className='absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10'></div>
                    <img src={blog.cover_image} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' alt={blog.title} />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 group-hover:text-blue transition-colors line-clamp-2'>{blog.title}</h3>
                  <p className='text-gray-500 mt-2 line-clamp-2 text-sm'>{blog.description?.replace(/<[^>]*>?/gm, '')}</p>
                </NavLink>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
