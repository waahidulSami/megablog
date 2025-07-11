import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../index";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
       authService.account.createOAuth2Session(
        "google",
        "https://megablog-z23q.vercel.app/",
        "https://megablog-z23q.vercel.app/fail"
      );
    } catch (error) {
      console.error("Failed login:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setGithubLoading(true);
    setError("");
    try {
       authService.account.createOAuth2Session(
        "github",
        "https://megablog-z23q.vercel.app/",
        "https://megablog-z23q.vercel.app/fail"
      );
    } catch (error) {
      console.error(error);
      setError("GitHub login failed. Please try again.");
    } finally {
      setGithubLoading(false);
    }
  };

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setIsSuccess(true);
          setMessage("Login successful! Redirecting...");
          dispatch(authLogin(userData));
          
          // Add a small delay to show success message
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-50 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

        * {
          font-family: "Inter", sans-serif;
        }

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
          0% {
            transform: translateY(60px) scale(0.9) rotateX(-10deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        .floating-label {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left top;
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #6b7280;
          font-size: 1rem;
          pointer-events: none;
        }

        .input-container:focus-within .floating-label,
        .input-container input:not(:placeholder-shown) + .floating-label {
          transform: translateY(-22px) scale(0.8);
          color: #3b82f6;
          font-weight: 500;
        }

        .form-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          height: 3.5rem;
          border-radius: 0.75rem;
          border: 2px solid #e5e7eb;
          background: white;
          padding: 1rem 1rem 0.5rem 1rem;
          font-size: 1rem;
          color: #1f2937;
        }

        .form-input::placeholder {
          color: transparent;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }

        .btn-primary {
          background: linear-gradient(135deg, #4f39f679 0%, #4F39F6 50%, #4F39F6 100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 4rem;
          border-radius: 0.75rem;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:not(:disabled):hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
        }

        .social-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background: white;
          cursor: pointer;
          text-decoration: none;
        }

        .social-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .social-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          opacity: 0;
          transition: opacity 0.3s;
        }

        .social-btn:not(:disabled):hover::before {
          opacity: 1;
        }

        .social-btn:not(:disabled):hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1)
            infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
          }
          40%,
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        .input-glow {
          position: relative;
        }

        .input-glow::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          padding: 2px;
          background: linear-gradient(
            45deg,
            #3b82f6,
            #8b5cf6,
            #06b6d4,
            #3b82f6
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .input-container:focus-within .input-glow::before {
          opacity: 1;
        }

        .custom-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          transition: all 0.2s;
          position: relative;
          cursor: pointer;
        }

        .custom-checkbox input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          cursor: pointer;
        }

        .custom-checkbox input:checked + .checkbox-visual {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }

        .custom-checkbox input:checked + .checkbox-visual::after {
          content: "✓";
          position: absolute;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .checkbox-visual {
          width: 100%;
          height: 100%;
          border-radius: 0.25rem;
          transition: all 0.2s;
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 1rem;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: #4b5563;
        }

        .animate-pulse-delayed-1 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 700ms;
        }

        .animate-pulse-delayed-2 {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1000ms;
        }

        .loading-spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 2px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          color: #10b981;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }

        .error-message {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-[#4f39f679] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-[#4f39f65e] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-1"></div>
        <div className="absolute -top-8 -right-8 w-72 h-72 bg-[#4f39f659] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse-delayed-2"></div>
      </div>

      <div className="flex flex-1 justify-center items-center min-h-screen py-5 relative z-10">
        <div className="card-shadow login-form flex flex-col w-full max-w-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative">
          
          {/* Header with animated icon */}
          <div className="text-center mb-10">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br bg-[#4F39F6] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="35"
                  height="35"
                  fill="white"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M12 14c-4.5 0-8 2.5-8 5.5V22h16v-2.5c0-3-3.5-5.5-8-5.5z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg">Sign in to your account</p>
            
            {/* Success Message */}
            {isSuccess && message && (
              <div className="success-message">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {message}
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="error-message">
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
          </div>

          {/* Social Login */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                className="social-btn" 
                onClick={handleGoogleLogin}
                disabled={googleLoading || isLoading}
              >
                {googleLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                <span className="text-sm font-medium text-gray-700 relative z-10">
                  {googleLoading ? 'Loading...' : 'Google'}
                </span>
              </button>
              
              <button 
                className="social-btn" 
                onClick={handleGithubLogin}
                disabled={githubLoading || isLoading}
              >
                {githubLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                )}
                <span className="text-sm font-medium text-gray-700 relative z-10">
                  {githubLoading ? 'Loading...' : 'GitHub'}
                </span>
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  or continue with email
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(login)}>
            <div className="input-container mb-6 relative gap-1">
              <Input
                className="mb-4"
                placeholder="Enter your email"
                type="email"
                disabled={isLoading}
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center cursor-pointer">
                <div className="custom-checkbox">
                  <input type="checkbox" disabled={isLoading} />
                  <div className="checkbox-visual"></div>
                </div>
                <span className="ml-3 text-sm text-gray-600">Remember me</span>
              </label>

              <button
                type="button"
                className="text-sm text-[#4F39F6] hover:text-blue-700 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
                onClick={() => navigate('/recover')}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading || googleLoading || githubLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <Link
              to="/signup"
              className="text-[#4F39F6] font-semibold hover:text-blue-700 transition-colors duration-200 ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;