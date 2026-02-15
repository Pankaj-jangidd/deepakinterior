"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const portfolioItems = [
  {
    title: "Deepak Interior",
    subtitle: "RESIDENTIAL & COMMERCIAL",
    description:
      "Bespoke living spaces that reflect your personality and heritage.",
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80",
    link: "/portfolio/interiors",
  },
  {
    title: "Deepak CNC",
    subtitle: "HIGH PRECISION WORKS",
    description:
      "Advanced fabrication for intricate jali work, panels, and patterns.",
    image: "/images/cnc-machine.jpg",
    link: "/portfolio/cnc",
  },
];

const Portfolio: React.FC = () => {
  return (
    <section
      id="portfolio"
      className="h-screen bg-light flex flex-col justify-center"
    >
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Our Projects
          </h2>
          <div className="w-16 h-1 bg-olive mt-4" />
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative h-[400px] md:h-[500px] overflow-hidden group rounded-3xl shadow-2xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.image}')` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-accent text-xs font-semibold tracking-widest"
                >
                  {item.subtitle}
                </motion.span>

                <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm md:text-base mb-6 max-w-sm">
                  {item.description}
                </p>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 bg-olive text-white font-medium px-6 py-3 rounded-full hover:bg-olive-dark hover:scale-105 hover:shadow-lg transition-all duration-150"
                >
                  View Gallery
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
