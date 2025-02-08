import React from 'react'
import NodeGraph from '../../../PhaseBalancerFrontend/NodeGraph'
import MapImage from '../../assets/Map.png'

function PhaseBalancer() {
  return (
    <div className="relative h-screen w-full">
      {/* Background layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'black' }}
      />
      
      {/* Map image layer */}
        src={MapImage}
        src={('../../assets/Map.png')}
        alt="Map Background"
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-100" // Increased opacity
        onError={(e) => {
          console.error("Image failed to load:", e);
          e.target.style.display = 'none';
        }}
      
       {/* Heading */}
       <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <h1 className="text-4xl font-bold text-white tracking-wider uppercase bg-black bg-opacity-50 px-6 py-3 rounded-lg border-2 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300">
          Phase Balancer Data
        </h1>
      </div>
      
      {/* NodeGraph layer */}
      <div className="absolute inset-0 z-20">
        <NodeGraph />
      </div>
    </div>
  )
}

export default PhaseBalancer
