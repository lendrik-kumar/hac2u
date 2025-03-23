import React from 'react';
import { BackgroundBeamsWithCollision } from '../../components/ui/background-beams-with-collision';
import Logo from '../../assets/Logo.png';

function About() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="max-w-7xl h-auto mx-auto  w-screen justify-center items-center shadow-2xl rounded-xl p-20 flex flex-col lg:flex-row gap-10 border border-gray-300 relative overflow-hidden">
        

        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-blue-100 opacity-40 blur-3xl"></div>

        {/* Left Section: Text Content */}
        <div className="flex-1 relative z-10">
          <p className="text-orange-500 font-semibold text-lg tracking-wider uppercase">How It Started</p>
          <h1 className="text-5xl font-extrabold text-gray-800 mt-3 leading-tight">
            Our Dream is of a city united by the <span className="text-green-400">Urban Energy Board.</span>
          </h1>
          <p className="text-gray-100 mt-6 leading-relaxed text-lg">
            <b className="text-gray-200">The Urban Energy Board</b> will provide hyperlocal energy insights, offering detailed consumption data at the neighborhood or household level.
            It will feature an interactive footprint simulation, allowing users to visualize the environmental impact of their energy choices, such as switching to renewable sources or improving energy efficiency.
            The platform will ensure complete transparency in energy sourcing, displaying real-time shifts toward renewables and empowering users with actionable insights.
            Users will be able to engage in community energy comparisons, competing to reduce their carbon footprint while gaining recognition for sustainable practices.
          </p>
        </div>

        {/* Right Section: Image & Stats */}
        <div className="flex-1 flex flex-col gap-8 relative z-10">
          <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-300 shadow-2xl p-4 transition-transform transform hover:scale-105">
            <img
              src={Logo} // Replace with actual image
              alt="Urban Energy Board Logo"
              className="w-full h-56 object-contain"
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-8">
            {[
              { value: '3.5', label: 'Years Experience' },
              { value: '23', label: 'Project Challenge' },
              { value: '830+', label: 'Positive Reviews' },
              { value: '100K', label: 'Trusted Clients' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white shadow-xl p-6 rounded-xl text-center border border-gray-400 transition-transform transform hover:scale-105 relative"
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500 to-orange-400 opacity-20 blur-xl"></div>
                <h2 className="text-3xl font-extrabold text-gray-900">{stat.value}</h2>
                <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default About;
