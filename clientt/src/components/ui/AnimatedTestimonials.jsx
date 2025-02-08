import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className=" mx-auto px-4 md:px-8 lg:px-12 py-20 max-w-full h-100vh font-sans antialiased overflow-hidden">
 
      <div className="mt-16 h-full">
        <div className="relative gap-20 grid grid-cols-1 md:grid-cols-2 h-full">
          <div>
            <div className="relative w-full h-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      className="m-6 my-10 py-2 p-3 p-object-center rounded-3xl w-full h-150 object-cover"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4 h-full">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="mx-5 my-15 font-bold text-4xl text-black dark:text-white">
                {testimonials[active].name}
              </h3>
              <p className="mx-5 my-5 text-gray-500 text-lg dark:text-neutral-500">
                {testimonials[active].designation}
              </p>
              <motion.p className="mx-5 my-5 mt-8 text-gray-500 text-base dark:text-neutral-300 m">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
              {/* Read More Button */}
              <a
                href={testimonials[active].link} // Link to the detailed information
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg mx-5 mt-4 px-6 py-3 rounded-lg font-semibold text-white transform transition-transform hover:scale-105"
              >
                Read More
              </a>
            </motion.div>
            <div className="flex gap-4 mt-10 pt-12 md:pt-0">
              <button
                onClick={handlePrev}
                className="group/button flex justify-center items-center bg-gray-100 dark:bg-neutral-800 rounded-full w-10 h-10"
              >
                <IconArrowLeft className="group-hover/button:rotate-12 w-6 h-6 text-black dark:text-neutral-400 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="group/button flex justify-center items-center bg-gray-100 dark:bg-neutral-800 rounded-full w-10 h-10"
              >
                <IconArrowRight className="group-hover/button:-rotate-12 w-6 h-6 text-black dark:text-neutral-400 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
