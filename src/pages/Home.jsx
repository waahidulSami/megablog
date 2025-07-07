import React from "react";


function Home() {
  return (
<section className="container mx-auto px-4 mb-16 m-10">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
            <div className="absolute inset-0">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20workspace%20with%20laptop%20and%20coffee%20on%20wooden%20desk%2C%20soft%20morning%20light%20streaming%20through%20window%2C%20plants%20and%20minimalist%20decor%2C%20professional%20lifestyle%20photography%20with%20bokeh%20effect%20and%20warm%20tones&width=1200&height=500&seq=7&orientation=landscape"
                alt="Featured post"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-900/30"></div>
            </div>
            <div className="relative  h-full flex flex-col justify-end p-8 md:p-12 max-w-2xl text-white">
              <span className="bg-indigo-500 w-27  text-white text-sm px-3 py-1 rounded-full mb-4 inline-block !rounded-button whitespace-nowrap">
                Featured Post
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                The Intersection of Technology and Creativity in Modern
                Workspaces
              </h1>
              <p className="text-white/90 mb-6">
                Discover how the evolution of technology is reshaping creative
                environments and fostering innovation in unexpected ways.
              </p>
              <div>
                <button className="bg-white text-indigo-700 px-6 py-3 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>
  );
}

export default Home;