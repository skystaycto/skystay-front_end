import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Home.css' // Could remove or keep
import Comments from '../components/Comments';
import Ammenities from '../components/Ammenities';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../context/UserContext';
import { LikesContext } from '../context/LikesContext';

// Icons
import { Share, Heart, MapPin, Grid, Star, ShieldCheck, MessageCircle, Key, Award, Sparkles, ChevronLeft } from 'lucide-react';
import ReserveCard from '../components/Reservecard';

export default function Singleproperty() {

  const { property_id } = useParams();
  const { user } = useContext(UserContext)
  const { likes, addLike, deleteLike } = useContext(LikesContext)
  const [propertyData, setPropertyData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHeartPink, setIsHeartPink] = useState(false);
  const [isReserveCardVisible, setIsReserveCardVisible] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://skystayserver-n8xf.onrender.com/singleproperty/${property_id}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setPropertyData(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [property_id]);

  useEffect(() => {
    if (user && user.id && propertyData) {
      const liked = likes.some(like => like.user_id === user.id && like.property_id === propertyData.id);
      setIsHeartPink(liked);
    }
  }, [likes, user, propertyData]);

  useEffect(() => {
    const fetchComments = async () => {
      if (propertyData) {
        try {
          const response = await fetch(`/comments/${propertyData.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch comments');
          }
          const data = await response.json();
          setComments(data || []);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchComments();
  }, [propertyData]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-slate-50'>
        <div className='animate-float mb-6'>
          <div className='w-16 h-16 border-4 border-pink border-t-transparent rounded-full animate-spin'></div>
        </div>
        <p className='text-xl font-bold bg-clip-text text-transparent bg-pink-blue-gradient'>Preparing your stay...</p>
      </div>
    );
  }

  if (error) {
    return <div className='flex items-center justify-center text-xl min-h-[60vh] text-red-500'>Error: {error}</div>;
  }

  if (!propertyData) {
    return <div className='flex items-center justify-center text-xl min-h-[60vh]'>No property data available</div>;
  }

  const handleHeartClick = () => {
    if (isHeartPink) {
      deleteLike(user.id, propertyData.id);
    } else {
      addLike({ user_id: user.id, property_id: propertyData.id });
    }
    setIsHeartPink(!isHeartPink);
  };


  const toggleReserveCard = () => setIsReserveCardVisible(!isReserveCardVisible);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Link copied!'))
      .catch(err => toast.error('Failed to copy'));
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false, autoplay: true };

  return (
    <div className='bg-slate-50 min-h-screen pt-28 pb-32 font-outfit text-gray-800'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-8'>

        {/* Back Button (Mobile) */}
        <button className='md:hidden flex items-center gap-2 mb-6 text-gray-500 hover:text-black transition-colors'>
          <ChevronLeft size={20} /> Back
        </button>

        {/* Title Header */}
        <div className='mb-8 max-w-4xl'>
          <h1 className='text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight leading-tight'>{propertyData.title}</h1>
          <div className='flex flex-wrap justify-between items-center text-sm md:text-base gap-4'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-600 font-medium'>
              <span className='flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100'>
                <Star size={16} className="fill-gold text-gold" />
                <span className='text-gray-900 font-bold'>{Number(propertyData.overall_rating).toFixed(1)}</span>
              </span>
              <span>·</span>
              <span className='underline decoration-gray-300 hover:decoration-gray-900 transition-colors cursor-pointer'>{comments.length} reviews</span>
              <span>·</span>
              <span className='flex items-center gap-1'><MapPin size={16} /> {propertyData.city}, {propertyData.country}</span>
            </div>
            <div className='flex gap-3'>
              <button onClick={handleShareClick} className='flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md font-medium text-gray-700'>
                <Share size={16} /> <span className='hidden sm:inline'>Share</span>
              </button>
              <button onClick={handleHeartClick} className='flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md font-medium text-gray-700'>
                <Heart size={16} className={`transition-colors ${isHeartPink ? "fill-pink text-pink" : "text-gray-400"}`} /> <span className='hidden sm:inline'>{isHeartPink ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Image Gallery */}
        <div className='hidden md:block mb-16 relative'>
          <div className='grid grid-cols-4 grid-rows-2 gap-4 h-[500px] lg:h-[600px]'>
            <div className='col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group'>
              <img src={propertyData.images[0]} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out' alt="Main" />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors'></div>
            </div>
            {propertyData.images.slice(1, 5).map((img, i) => (
              <div key={i} className='col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group'>
                <img src={img} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' alt={`View ${i + 1}`} />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors'></div>
              </div>
            ))}
          </div>
          <button className='absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-gray-200 px-5 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 text-gray-900'>
            <Grid size={16} /> Show all photos
          </button>
        </div>

        {/* Mobile Slider */}
        <div className='md:hidden mb-8 -mx-6'>
          <Slider {...settings}>
            {propertyData.images.map((img, i) => (
              <div key={i} className='aspect-[4/3]'>
                <img src={img} className='w-full h-full object-cover' alt={`Slide ${i}`} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Content Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 relative'>

          {/* Left Column (Details) */}
          <div className='lg:col-span-7 xl:col-span-8'>
            <div className='pb-10 border-b border-gray-200'>
              <h2 className='text-2xl md:text-3xl font-bold mb-2 text-gray-900'>Entire {propertyData.property_type} hosted by SkyStay</h2>
              <p className='text-lg text-gray-500 font-medium'>
                {propertyData.total_bedrooms} bedrooms · {propertyData.total_beds} beds · {propertyData.total_bathrooms} baths
              </p>
            </div>

            {/* Features/Highlights */}
            <div className='py-10 border-b border-gray-200 space-y-8'>
              <div className='flex gap-6 items-start'>
                <div className='p-3 bg-blue/10 rounded-2xl shrink-0'>
                  <Award size={28} className="text-blue" />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>SkyStay Premium</h3>
                  <p className='text-gray-500 leading-relaxed'>This home is highly rated for location, cleanliness, and exceptional hospitality.</p>
                </div>
              </div>
              <div className='flex gap-6 items-start'>
                <div className='p-3 bg-pink/10 rounded-2xl shrink-0'>
                  <MapPin size={28} className="text-pink" />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>Spectacular Location</h3>
                  <p className='text-gray-500 leading-relaxed'>100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='py-10 border-b border-gray-200'>
              <h2 className='text-2xl font-bold mb-6 text-gray-900'>About this space</h2>
              <div className='prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue hover:prose-a:text-pink transition-colors' dangerouslySetInnerHTML={{ __html: propertyData.description }}></div>
            </div>

            {/* Amenities */}
            <div className='py-10 border-b border-gray-200'>
              <h2 className='text-2xl font-bold mb-8 text-gray-900'>What this place offers</h2>
              <Ammenities propertyData={propertyData} />
            </div>
          </div>

          {/* Right Column (Sticky Booking Card) */}
          <div className='lg:col-span-5 xl:col-span-4 relative hidden lg:block'>
            <div className='sticky top-32'>
              {/* Glassmorphic Panel */}
              <div className='bg-white/80 backdrop-blur-2xl border border-white/60 shadow-soft-lift rounded-[32px] p-8 relative overflow-hidden'>

                {/* Decorative Glows */}
                <div className='absolute top-[-50px] right-[-50px] w-40 h-40 bg-pink/10 rounded-full blur-3xl pointer-events-none'></div>
                <div className='absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue/10 rounded-full blur-3xl pointer-events-none'></div>

                <div className='relative z-10'>
                  <div className='flex justify-between items-end mb-8 '>
                    <div>
                      <span className='text-4xl font-extrabold text-gray-900'>${propertyData.price_per_night}</span>
                      <span className='text-gray-500 font-medium ml-1'>/ night</span>
                    </div>
                  </div>

                  {/* Placeholder for Date/Guest Picker to look realistic */}
                  <div className='bg-white rounded-2xl border border-gray-200 mb-6 overflow-hidden shadow-sm'>
                    <div className='flex border-b border-gray-200/60'>
                      <div className='w-1/2 p-4 border-r border-gray-200/60 hover:bg-gray-50 cursor-pointer transition-colors'>
                        <div className='text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1'>Check-in</div>
                        <div className='text-sm font-medium'>Add date</div>
                      </div>
                      <div className='w-1/2 p-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                        <div className='text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1'>Checkout</div>
                        <div className='text-sm font-medium'>Add date</div>
                      </div>
                    </div>
                    <div className='p-4 hover:bg-gray-50 cursor-pointer transition-colors'>
                      <div className='text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mb-1'>Guests</div>
                      <div className='text-sm font-medium'>1 guest</div>
                    </div>
                  </div>

                  {/* Vibrant Gradient Reserve Button */}
                  <button className='w-full bg-pink-blue-gradient text-white font-bold text-lg py-4 rounded-2xl shadow-glow-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group'>
                    <span className='relative z-10'>Reserve Now</span>
                    <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300'></div>
                  </button>

                  <div className='mt-6 text-center text-sm text-gray-500 font-medium'>
                    You won't be charged yet
                  </div>

                  {/* Pricing Breakdown */}
                  <div className='mt-8 space-y-4 text-gray-600 border-t border-gray-100 pt-6'>
                    <div className='flex justify-between'>
                      <span className='underline decoration-gray-300'>${propertyData.price_per_night} x 5 nights</span>
                      <span className='font-medium'>${propertyData.price_per_night * 5}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='underline decoration-gray-300'>Cleaning fee</span>
                      <span className='font-medium'>$60</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='underline decoration-gray-300'>Service fee</span>
                      <span className='font-medium'>$40</span>
                    </div>
                  </div>
                  <div className='mt-6 pt-6 border-t border-gray-200 flex justify-between font-extrabold text-xl text-gray-900'>
                    <span>Total</span>
                    <span>${(propertyData.price_per_night * 5) + 100}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='py-16 border-b border-gray-200'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
            <div className='flex items-center gap-3 text-3xl font-extrabold text-gray-900'>
              <Star size={32} className="fill-gold text-gold" />
              {Number(propertyData.overall_rating).toFixed(1)} <span className='text-gray-400 font-normal'>·</span> {comments.length} reviews
            </div>
          </div>

          {/* Rating Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-6 mb-12'>
            {[
              { label: 'Cleanliness', score: propertyData.clean_avgrating, icon: Sparkles },
              { label: 'Accuracy', score: propertyData.accuracy_avgrating, icon: ShieldCheck },
              { label: 'Check-in', score: propertyData.check_in_avgrating, icon: Key },
              { label: 'Communication', score: propertyData.communication_avgrating, icon: MessageCircle },
              { label: 'Location', score: propertyData.location_avgrating, icon: MapPin },
              { label: 'Value', score: propertyData.value_avgrating, icon: Award },
            ].map((item, i) => (
              <div key={i} className='lg:col-span-1 border-l-2 border-gray-200/60 pl-4 py-1'>
                <div className='text-gray-500 text-sm font-medium mb-1 flex items-center gap-2'>
                  <item.icon size={14} /> {item.label}
                </div>
                <div className='font-bold text-lg text-gray-900'>{Number(item.score).toFixed(1)}</div>
              </div>
            ))}
          </div>

          {/* Comments List */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {currentComments.map((comment, index) => (
              <div key={index} className='bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='w-14 h-14 bg-gradient-to-br from-blue to-pink rounded-full p-[2px] shadow-sm'>
                    <div className='w-full h-full bg-white rounded-full flex items-center justify-center text-xl font-bold bg-clip-text text-transparent bg-pink-blue-gradient'>
                      {comment.user_name ? comment.user_name[0] : 'U'}
                    </div>
                  </div>
                  <div>
                    <div className='font-bold text-gray-900 text-lg'>{comment.user_name || 'Guest'}</div>
                    <div className='text-sm text-gray-500 font-medium'>SkyStay Member</div>
                  </div>
                </div>
                <p className='text-gray-600 leading-relaxed text-base'>"{comment.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className='py-16'>
          <h2 className='text-3xl font-bold mb-8 text-gray-900'>Where you'll be</h2>
          <div className='rounded-[32px] overflow-hidden h-[500px] bg-gray-200 relative shadow-inner'>
            <iframe
              src={propertyData.g_mapslink}
              title='Property location map'
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className='mt-8 max-w-2xl'>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>{propertyData.city}, {propertyData.country}</h3>
            <p className='text-gray-600 text-lg leading-relaxed'>
              Immerse yourself in the local culture. This property is located in a vibrant neighborhood with easy access to premier attractions and dining.
            </p>
          </div>
        </div>

      </div>

      {/* Mobile Fixed Reserve Bar */}
      <div className='lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 px-6 z-50 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]'>
        <div>
          <div className='text-lg font-bold text-gray-900'>${propertyData.price_per_night}</div>
          <div className='text-xs text-gray-500 font-medium underline'>Nov 12 - 17</div>
        </div>
        <button onClick={toggleReserveCard} className='bg-pink-blue-gradient text-white px-8 py-3.5 rounded-xl font-bold shadow-glow-blue hover:scale-105 transition-transform'>
          Reserve
        </button>
      </div>
    </div>
  )
}
