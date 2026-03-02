import React, { useState, useEffect, useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import hamburger from '../assets/hamburger.svg'
import profimage from "../assets/mainprof.svg"
import { Search } from 'lucide-react';
import '../css/Navbar.css'
import '../css/Signup.css'
import { UserContext } from '../context/UserContext';

export default function Navbar() {

    const { user, loginUser, logoutUser, handleGoogleSuccess } = useContext(UserContext)

    const [menuOpen, setMenuOpen] = useState(false);
    const [showLoginCard, setShowLoginCard] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Login states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLoginCard = () => setShowLoginCard(!showLoginCard);

    // Toggle User Menu (Dropdown)
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogin = async () => {
        const userdata = { email, password };
        await loginUser(userdata);
        setShowLoginCard(false);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
        setMenuOpen(false);
    };

    // Close menu when clicking outside (simple implementation)
    useEffect(() => {
        const closeMenu = (e) => {
            if (menuOpen && !e.target.closest('.user-menu-container')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [menuOpen]);

    return (
        <div className='relative font-outfit z-50'>
            {/* Floating Glassmorphic Navbar */}
            <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1400px] z-50 transition-all duration-300 rounded-full
            ${isScrolled
                    ? 'bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift py-2'
                    : 'bg-white/50 backdrop-blur-md border border-white/20 shadow-sm py-3'
                }
        `}>
                <div className='px-6 md:px-8 flex items-center justify-between h-14'>

                    {/* 1. Logo Section */}
                    <div className='flex-none cursor-pointer group'>
                        <NavLink to="/">
                            <p className='text-blue text-2xl font-bold tracking-tighter drop-shadow-sm group-hover:scale-105 transition-transform'>
                                SkyStay<span className='text-pink drop-shadow-[0_0_8px_rgba(255,56,92,0.6)]'>.</span>
                            </p>
                        </NavLink>
                    </div>

                    {/* 2. Glass Search Pill */}
                    {location.pathname === '/' && (
                        <div className='hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 hover:-translate-y-1 transition-transform'>
                            <div className='flex items-center bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full shadow-sm hover:shadow-md transition-shadow py-1.5 px-2 divide-x divide-gray-200'>
                                <div className='px-4 text-sm font-medium text-gray-800 cursor-pointer hover:text-blue transition-colors'>Anywhere</div>
                                <div className='px-4 text-sm font-medium text-gray-800 cursor-pointer hover:text-blue transition-colors'>Any week</div>
                                <div className='px-4 text-sm text-gray-500 flex items-center cursor-pointer hover:text-black transition-colors'>
                                    Add guests
                                    <div className='bg-pink-blue-gradient p-2 rounded-full text-white ml-3 shadow-glow-pink hover:scale-110 transition-transform'>
                                        <Search size={14} strokeWidth={3} className="drop-shadow-md" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Right User Section */}
                    <div className='flex items-center justify-end gap-x-2'>
                        <NavLink to="/listing" className='text-sm font-medium text-gray-700 hover:text-black hover:bg-black/5 px-4 py-2 rounded-full transition-all hidden md:block'>
                            SkyStay your home
                        </NavLink>

                        {/* User Menu Button */}
                        <div className='relative user-menu-container'>
                            <div
                                onClick={toggleMenu}
                                className='flex items-center gap-x-3 bg-white/60 border border-gray-200/50 rounded-full p-1.5 pl-4 hover:shadow-md hover:bg-white transition-all cursor-pointer'
                            >
                                <img src={hamburger} className='h-4 w-4 opacity-70' alt="menu" />
                                <div className='h-8 w-8 bg-gradient-to-br from-blue to-pink rounded-full overflow-hidden p-[1px] shadow-sm'>
                                    {user?.prof_img ? (
                                        <img src={user.prof_img} className='h-full w-full object-cover rounded-full border border-white' alt="profile" />
                                    ) : (
                                        <img src={profimage} className='h-full w-full object-cover rounded-full border border-white bg-white' alt="profile" />
                                    )}
                                </div>
                            </div>

                            {/* Dropdown Menu (Glass) */}
                            {menuOpen && (
                                <div className='absolute right-0 top-14 w-[240px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-floating border border-white/50 py-2 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-4 duration-200'>
                                    {user ? (
                                        <>
                                            <div className='px-4 py-3 border-b border-gray-100/50'>
                                                <p className='font-semibold text-sm truncate bg-clip-text text-transparent bg-pink-blue-gradient'>Hi, {user.first_name || 'User'}</p>
                                            </div>
                                            <NavLink to="/dashboard" className='px-4 py-2 hover:bg-black/5 text-sm font-medium transition-colors'>Dashboard</NavLink>
                                            <NavLink to="/properties" className='px-4 py-2 hover:bg-black/5 text-sm font-medium transition-colors'>My Properties</NavLink>
                                            <div className='border-t border-gray-100/50 my-1'></div>
                                            <NavLink to="/account" className='px-4 py-2 hover:bg-black/5 text-sm transition-colors'>Account</NavLink>
                                            <div onClick={handleLogout} className='px-4 py-2 hover:bg-pink/10 text-sm cursor-pointer text-pink font-medium transition-colors'>Logout</div>
                                        </>
                                    ) : (
                                        <>
                                            <div onClick={toggleLoginCard} className='px-4 py-3 hover:bg-black/5 text-sm font-bold cursor-pointer transition-colors'>Log in</div>
                                            <NavLink to="/signup" className='px-4 py-2 hover:bg-black/5 text-sm cursor-pointer transition-colors'>Sign up</NavLink>
                                            <div className='border-t border-gray-100/50 my-1'></div>
                                            <NavLink to="/listing" className='px-4 py-2 hover:bg-black/5 text-sm transition-colors'>SkyStay your home</NavLink>
                                            <NavLink to="/contactus" className='px-4 py-2 hover:bg-black/5 text-sm transition-colors'>Help Center</NavLink>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginCard && (
                <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm'>
                    <div className='bg-white/95 backdrop-blur-xl rounded-3xl shadow-floating border border-white/20 w-full max-w-[450px] mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300'>
                        <div className='flex items-center justify-between p-5 border-b border-gray-100/50'>
                            <div className='w-8'></div>
                            <h3 className='font-bold text-lg'>Welcome Back</h3>
                            <button onClick={toggleLoginCard} className='p-2 hover:bg-black/5 rounded-full transition-colors'>
                                <span className='text-xl opacity-60'>&times;</span>
                            </button>
                        </div>

                        <div className='p-8'>
                            <div className='space-y-4'>
                                <input
                                    className='w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                                    type='email'
                                    placeholder='Email address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className='w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className='flex items-center gap-2 pt-1'>
                                    <input
                                        type='checkbox'
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className='rounded border-gray-300 text-blue focus:ring-blue'
                                    />
                                    <label className='text-sm text-gray-600'>Remember me</label>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className='w-full bg-pink-blue-gradient text-white font-bold py-4 rounded-xl hover:shadow-glow-blue hover:-translate-y-1 transition-all duration-300 mt-2'
                                >
                                    Continue
                                </button>
                            </div>

                            <div className='relative my-8'>
                                <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-gray-200/60'></div></div>
                                <div className='relative flex justify-center'><span className='bg-white px-4 text-xs font-medium text-gray-500 uppercase tracking-widest'>or</span></div>
                            </div>

                            <div className='w-full hover:-translate-y-1 transition-transform duration-300 rounded-xl overflow-hidden shadow-sm'>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => console.log('Login Failed')}
                                    useOneTap
                                    containerProps={{ style: { width: '100%' } }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
