// import React from 'react'; // Not needed in modern React with JSX transform

const Footer = () => {
   return (
<footer className="bg-gray-100 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                BlogVista
              </h3>
              <p className="text-gray-600 mb-6">
                Curating thoughtful insights on technology, design, business,
                and lifestyle for the modern reader.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-gray-800 font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  "Home",
                  "About Us",
                  "Categories",
                  "Contact",
                  "Privacy Policy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                
                    <li>
                      <a
                      
                      >
                        sami
                      </a>
                    </li>
                 
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 font-bold mb-4">
                Subscribe to Newsletter
              </h4>
              <p className="text-gray-600 mb-4">
                Stay updated with our latest articles and news.
              </p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 BlogVista. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors cursor-pointer"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors cursor-pointer"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 text-sm transition-colors cursor-pointer"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;