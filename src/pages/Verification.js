import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { UserContext } from '../context/UserContext';
import signupbanner from '../assets/signupbanner.jpg';

export default function Verification() {
  const { verifyUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verification_code, setVerificationCode] = useState('');
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setFormData(location.state);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyUser({ email, verification_code });
      navigate('/');
    } catch (error) {
      console.error("Verification Error: ", error);
    }
  };

  const handleBack = () => {
    navigate('/signup', { state: formData });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-outfit">
      {/* Left side: Background Image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${signupbanner})` }}
      >
        <div className="flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="px-12 text-center text-white">
            <h1 className="mb-4 text-4xl font-sentientmedium tracking-tight blur-none">Verify Your Account</h1>
            <p className="text-lg font-light text-white/90">
              You are one step away from joining SkyStay Homes.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Verification Form */}
      <div className="flex w-full items-center justify-center lg:w-1/2 p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-10 animate-fade-in">
          <div className="mb-8">
            <Button variant='outline' onClick={handleBack} className="mb-4 text-gray-500 hover:text-black">
              &larr; Back to Signup
            </Button>
            <h2 className="text-3xl font-sentientmedium text-gray-900 tracking-tight">Enter Verification Code</h2>
            <p className="mt-2 text-sm text-gray-600 font-light">
              We've sent a verification code to <span className="font-semibold text-pink">{email || "your email"}</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="verification_code" className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
              <input
                id="verification_code"
                type="text"
                required
                className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light text-center tracking-widest text-lg outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20"
                placeholder="0 0 0 0 0 0"
                value={verification_code}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-blue-gradient py-6 text-base font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.02]"
            >
              Verify Account
            </Button>

            <p className='text-xs text-center text-gray-500 mt-4 leading-relaxed'>
              The code is active for 24 hours. <br />
              If you didn't receive it, please check your spam folder or return to verify your email address.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
