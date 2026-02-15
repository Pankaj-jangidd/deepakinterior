"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - Absolutely Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight"
            style={{ lineHeight: "1.2" }}
          >
            End-to-End Interior &<br />
            CNC Solutions
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto"
          >
            Hosur's premier destination for luxury custom furniture and
            architectural CNC precision. We transform spaces into masterpieces.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection("portfolio")}
              className="bg-olive hover:bg-olive/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Explore Our Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Get a Quote
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
