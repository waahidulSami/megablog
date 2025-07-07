import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LogoutBtn from './LogoutBtn';
import dummimg from '../../assets/dummy.jpg'
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', postId: '/', active: true },
    { name: 'All Posts', postId: '/all-posts', active: true },
    { name: 'Login', postId: '/login', active: !authStatus },
    { name: 'Signup', postId: '/signup', active: !authStatus },
    { name: 'Add Post', postId: '/add-post', active: authStatus },
  ];

  const handleNav = (postId) => {
    navigate(postId);
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-[#eaedf1] bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 text-[#101518]">
          <div className="size-6 cursor-pointer bg_" >
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
            </svg>
          </div>
          <h2 className="text-[#101518] text-lg font-bold tracking-tight">Bloggr</h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center" aria-label="Main navigation">
          <ul className="flex gap-8">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="text-[#101518] cursor-pointer text-sm font-medium hover:text-[#4F39F6] transition-colors"
                      onClick={() => handleNav(item.postId)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
          </ul>
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">
          {authStatus && <LogoutBtn />}
          <div
            className="bg-center bg-no-repeat bg-cover rounded-full size-10 cursor-pointer hover:ring-2 hover:ring-[#4F39F6] hover:ring-opacity-50 transition-all border-2 border-gray-200"
            style={{
              backgroundImage: `url(${dummimg})`,
            }}
            role="button"
            tabIndex={0}
            aria-label="User profile"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md cursor-pointer transition-colors bg-[#3722d463]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#101518]" /> : <Menu className="w-6 h-6 text-[#101518]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
{/* Mobile Navigation */}
<div
  className={`
    flex justify-center items-center flex-col
    lg:hidden px-4 py-2 border-t border-gray-200 bg-white space-y-2
    transition-all duration-300 ease-in-out transform
    ${isMenuOpen ? 'opacity-100 translate-y-0 max-h-[500px] pointer-events-auto' : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden pointer-events-none'}
  `}
>
  {navItems.map(
    (item) =>
      item.active && (
        <button
          key={item.name}
          onClick={() => handleNav(item.postId)}
          className="flex justify-center items-center flex-col
           w-full text-left py-2 px-3 rounded-md text-sm
            font-medium text-[#101518] hover:bg-blue-50
             hover:text-[#4F39F6] transition-all"
        >
          {item.name}
        </button>
      )
  )}

  {/* Mobile Logout/Profile */}
  {authStatus && (
    <div className="pt-3 border-t border-gray-100">
      <div className="flex items-center justify-between px-2 py-2">
        <LogoutBtn />
      </div>
    </div>
  )}
</div>

    </header>
  );
};

export default Header;
