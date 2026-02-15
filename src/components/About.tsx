"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const features = [
  "Modular Kitchens",
  "Living Rooms",
  "Serene Bedrooms",
  "CNC Designs",
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    alt: "Modern Luxury Interior",
    className: "h-full",
  },
  {
    src: "/images/about/interior-1.jpg",
    alt: "Luxury Interior",
    className: "h-full",
  },
  {
    src: "/images/about/worker-1.jpg",
    alt: "Expert Craftsmanship",
    className: "h-full",
  },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="h-[calc(100vh-80px)] bg-light flex flex-col justify-center items-center scroll-mt-16 pb-32"
    >
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark">About Us</h2>
          <div className="w-16 h-1 bg-olive mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]"
          >
            <div className="flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-1/2 rounded-2xl overflow-hidden"
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-1/2 rounded-2xl overflow-hidden"
              >
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-2xl overflow-hidden"
            >
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-dark leading-tight mb-6">
              Deepak Interior & CNC blends Indian artistry with modern
              manufacturing.
            </h3>

            <p className="text-grey leading-relaxed mb-6">
              Deepak Interiors was founded in early 2008 by Mr. Virmaram Suthar
              and has since grown widely across Hosur and Bangalore, delivering
              exceptional interior solutions. We pride ourselves on premium
              finishing, timely delivery, and reasonable rates, making dream
              spaces accessible to all.
            </p>

            <p className="text-grey leading-relaxed mb-8">
              Based in Hosur, Deepak Interiors integrates traditional
              craftsmanship with modern CNC technology through its in-house CNC
              unit, managed by Mr. Deepak Suthar. He oversees all CNC design and
              execution, ensuring precision, consistency, and high-quality
              detailing across every project.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-olive flex-shrink-0" size={24} />
                  <span className="text-dark font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
