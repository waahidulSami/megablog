// src/pages/Recover.jsx
import React, { useState } from 'react';
import authService from '../../appwrite/auth';
import Button from '../Button';
function Recover() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRecover = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      await authService.resetPassword(email);
      setMessage('✨ Recovery email sent! Check your inbox.');
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to send recovery email. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

    <style>
      {
        `
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

        `
      }

    </style>
      {/* Animated Background */}
  {/* Animated background elements */}
   <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#4f39f679] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-[#4f39f65e] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-1"></div>
        <div className="absolute -top-8 -right-8 w-72 h-72  bg-[#4f39f659]  rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-2"></div>
      </div>

      <div className="flex flex-1 justify-center items-center min-h-screen py-5  m-2 relative z-10 ">


      
        
          {/* Main Card */}
              <div
          className="card-shadow login-form flex flex-col 
w-full max-w-md p-6 sm:p-8 md:p-10 
rounded-2xl sm:rounded-3xl relative"
        >
            {/* Header */}
            <div className="text-center mb-8">
 
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm">
                Enter your email address and we'll send you a recovery link
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRecover} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.955 8.955 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Submit Button */}
                   <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r  from-blue-600 to-[#4F39F6] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300
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
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Recovery Email'
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

export default Recover;