import React, { createContext, useState, useContext } from 'react';


const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [isIconClicked, setIsIconClicked] = useState(false);

  return (
    <MapContext.Provider value={{ isIconClicked, setIsIconClicked }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
