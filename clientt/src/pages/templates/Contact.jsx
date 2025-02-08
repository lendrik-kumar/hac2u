import React from 'react';
import { BackgroundBeamsWithCollision } from '../../components/ui/background-beams-with-collision';

function Contact() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center  shadow-2xl py-20 px-8 w-full rounded-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute inset-0  opacity-40 blur-3xl"></div>

        {/* Contact Us Section */}
        <div className="text-center relative z-10">
          <p className="text-blue-600 font-semibold text-lg tracking-wider uppercase">
            Contact us
          </p>
          <h1 className="text-5xl font-extrabold text-white mt-3 leading-tight">
            Get in touch with our <span className="text-green-500">team</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            We have the team and know-how to help you scale <b className="text-gray-500">10x faster.</b>
          </p>
        </div>

        {/* World Map with Locations */}
        <div className="mt-12 relative z-10">
          <img
            src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/31829/32563_dotted-worldmap-1.jpg"
            alt="Global Locations"
            className="w-full max-w-4xl rounded-xl shadow-xl border border-gray-300 transition-transform transform hover:scale-105"
          />
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-4xl w-full relative z-10">
          {[
            {
              title: 'Chat to Sales',
              desc: 'Speak to our friendly team.',
              link: 'mailto:sales@untitledui.com',
              label: 'sales@untitledui.com'
            },
            {
              title: 'Chat to Support',
              desc: "We're here to help.",
              link: 'mailto:support@untitledui.com',
              label: 'support@untitledui.com'
            },
            {
              title: 'Visit Us',
              desc: 'Visit our office HQ.',
              link: 'https://maps.google.com',
              label: 'View on Google Maps'
            },
            {
              title: 'Call Us',
              desc: 'Mon-Fri from 8am to 5pm.',
              label: '+1 (555) 000-0000'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg shadow-lg p-6 rounded-xl text-center border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <p className="text-xl font-semibold text-gray-900">{item.title}</p>
              <p className="text-gray-600 mt-2">{item.desc}</p>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium mt-3 block relative inline-block after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              ) : (
                <p className="text-blue-600 font-medium mt-3">{item.label}</p>
              )}
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions */}
        <h2 className="text-3xl font-extrabold text-white mt-16 relative z-10">
          <span className="text-blue-600"></span>
        </h2>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Contact;
