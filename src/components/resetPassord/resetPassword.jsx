import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import authService from '../../appwrite/auth';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      setIsSuccess(false);
      return false;
    }
    if (password.length < 8) {
      setMessage('❌ Password must be at least 8 characters long.');
      setIsSuccess(false);
      return false;
    }
    return true;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage('');

    try {
      await authService.updatePassword(userId, secret, password);
      setMessage('✅ Password successfully reset!');
      setIsSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('❌ Failed to reset password.');
      setIsSuccess(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .card-shadow {
            box-shadow: 0 32px 64px rgba(31, 41, 55, 0.12),
              0 16px 32px rgba(31, 41, 55, 0.08),
              0 8px 16px rgba(31, 41, 55, 0.04),
              0 0 0 1px rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
          }
          
          .login-form {
            animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          @keyframes slideInUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-pulse-delayed-1 {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            animation-delay: 1s;
          }

          .animate-pulse-delayed-2 {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            animation-delay: 2s;
          }
        `}
      </style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#4f39f679] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-[#4f39f65e] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-1"></div>
        <div className="absolute -top-8 -right-8 w-72 h-72 bg-[#4f39f659] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-2"></div>
      </div>

      <div className="flex flex-1 justify-center items-center min-h-screen py-5 m-2 relative z-10">
        {/* Main Card */}
        <div className="card-shadow login-form flex flex-col w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Reset Password
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your new password to complete the reset process
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleReset} className="space-y-6">
            {/* New Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="New password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Confirm new password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-[#4F39F6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300
               hover:from-blue-600 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
              <span className="flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.371 0 0 5.372 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Reset Password'
                )}
              </span>
            </button>
          </form>

          {/* Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl border-l-4 transform transition-all duration-300 animate-fade-in ${
              isSuccess 
                ? 'bg-green-50 border-green-500 text-green-700' 
                : 'bg-red-50 border-red-500 text-red-700'
            }`}>
              <div className="flex items-center">
                {isSuccess ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{message}</span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Remember your password?{' '}
              <a href="/login" className="text-[#4F39F6] hover:text-purple-600 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}