"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";

const teamData = [
  {
    company: "DEEPAK INTERIORS",
    name: "Virmaram Suthar",
    role: "MASTER CRAFTSMAN",
    description:
      "Virmaram carries the soul of our traditional roots, with decades of hands-on experience shaping finely detailed, structurally strong Rajasthani woodwork.",
    phone: "9442270932",
    phoneDisplay: "9442270932",
    image:
      "https://ui-avatars.com/api/?name=Virmaram+Suthar&size=200&background=D4A574&color=fff",
    bgColor: "bg-[#f0f0f0]",
    ringColor: "ring-[#D4A574]",
  },
  {
    company: "DEEPAK CNC",
    name: "Deepak Suthar",
    role: "CNC DIRECTOR",
    description:
      "Deepak blends craftsmanship with technology, leading our CNC operations to turn complex designs into precise, flawless executions.",
    phone: "9360349866",
    phoneDisplay: "9360349866",
    image:
      "https://ui-avatars.com/api/?name=Deepak+Suthar&size=200&background=4A5568&color=fff",
    bgColor: "bg-white",
    ringColor: "ring-[#4A5568]",
  },
];

const Team: React.FC = () => {
  return (
    <section
      id="services"
      className="min-h-screen bg-[#f5f5f0] flex flex-col justify-center py-16 md:py-32"
    >
      <div className="container-custom flex flex-col items-center justify-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Our Managers
          </h2>
          <div className="w-16 h-1 bg-olive mt-4" />
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
          {teamData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              className={`${member.bgColor} p-8 md:p-10 text-center cursor-pointer relative z-10 flex flex-col items-center justify-center rounded-2xl shadow-lg border border-gray-100 hover:border-olive/20 transition-colors duration-200`}
            >
              {/* Company Name */}
              <h3 className="text-xl md:text-2xl font-bold text-olive tracking-wider mb-6">
                {member.company}
              </h3>

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`relative w-48 h-48 md:w-60 md:h-60 mx-auto mb-6 rounded-full overflow-hidden ring-4 ${member.ringColor} shadow-lg`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Name & Role */}
              <h4 className="text-xl md:text-2xl font-bold text-dark mb-2">
                {member.name}
              </h4>

              {/* Description */}
              <p className="text-grey text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
                {member.description}
              </p>

              {/* Phone */}
              <motion.a
                href={`tel:${member.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-olive text-white font-medium px-8 py-3 rounded-full hover:bg-olive-dark transition-colors shadow-md"
              >
                <Phone size={18} />
                {member.phoneDisplay}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
