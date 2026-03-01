import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Button } from '../components/ui/button';
import signupbanner from '../assets/signupbanner.jpg';

export default function ResetPassword() {
  const { forgotPassword, resetPassword } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for email, 2 for verification code and new password

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = {
      email,
      verification_code: verificationCode,
      new_password: newPassword
    };
    await resetPassword(data);
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
            <h1 className="mb-4 text-4xl font-sentientmedium tracking-tight blur-none">Account Recovery</h1>
            <p className="text-lg font-light text-white/90">
              Regain access to your SkyStay Homes account.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="flex w-full items-center justify-center lg:w-1/2 p-6">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-soft-lift rounded-3xl p-10 animate-fade-in">

          {step === 1 && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-sentientmedium text-gray-900 tracking-tight">Forgot Password?</h2>
                <p className="mt-2 text-sm text-gray-600 font-light">
                  Enter your email address and we'll send you a verification code to reset your password.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-blue-gradient py-6 text-base font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.02]"
                >
                  Send Verification Code
                </Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-sentientmedium text-gray-900 tracking-tight">Reset Password</h2>
                <p className="mt-2 text-sm text-gray-600 font-light">
                  Please enter the verification code sent to <span className="font-semibold text-pink">{email}</span> and your new password.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                  <input
                    id="verificationCode"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light text-center tracking-widest text-lg outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20"
                    placeholder="0 0 0 0 0 0"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-light outline-none transition-all focus:border-blue focus:ring-2 focus:ring-blue/20"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-blue-gradient py-6 text-base font-semibold text-white shadow-glow-blue transition-transform hover:scale-[1.02]"
                >
                  Reset Password
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
