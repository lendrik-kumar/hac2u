"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

export const Card = React.memo(({ card, index, hovered, setHovered }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);


  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false); 
  };

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gradient-to-br from-purple-600 to-blue-500 overflow-hidden h-80 md:h-112 max-w-full transition-all duration-300 ease-out shadow-lg hover:shadow-2xl transform hover:scale-105",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="absolute inset-0 w-full h-full transform transition-transform duration-300 ease-in-out object-cover hover:scale-105"
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end py-4 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-200 font-bold text-lg text-transparent md:text-xl">
          {card.title}
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleLike}
            className={cn(
              "px-3 py-1 rounded-lg transition duration-300 ease-in-out flex items-center",
              liked ? "bg-blue-600 text-white" : "bg-gray-300 text-black hover:bg-blue-400"
            )}
          >
            👍 Like { <span className="ml-1 text-sm"></span>}
          </button>
          <button
            onClick={handleDislike}
            className={cn(
              "px-3 py-1 rounded-lg transition duration-300 ease-in-out",
              disliked ? "bg-red-600 text-white" : "bg-gray-300 text-black hover:bg-red-400"
            )}
          >
            👎 Dislike
          </button>
          <button
            onClick={() => window.open(card.link, "_blank")} 
            className="bg-gray-800 hover:bg-black ml-4 px-4 py-1 rounded-lg text-white transition duration-300 ease-in-out"
          >
            Read More
          </button>
        </div>
        
      </div>
    </div>
  );
});

Card.displayName = "Card";


export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className=" px-4 md:px-8 py-20 min-h-screen w-full mx-6">
      <h1 className="relative mb-20 font-bold text-5xl text-center text-white transform transition-all duration-300 hover:scale-105">
        Environment Policies
        <span className="right-0 bottom-0 left-0 absolute bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 h-1 transform origin-left transition-transform duration-500 scale-x-0 hover:scale-x-100 shadow-lg"></span>
      </h1>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-3 mx-auto w-full max-w-7xl">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
}
