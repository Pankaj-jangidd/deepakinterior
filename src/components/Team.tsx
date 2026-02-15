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
      "The soul of our traditional roots, Virmaram brings decades of hands-on expertise, ensuring every piece reflects the intricate detailing and structural strength of Rajasthani woodcraft.",
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
      "Bridging tradition with technology, Deepak leads our high-precision CNC operations, transforming complex designs and architectural concepts into perfectly executed forms.",
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
      <div className="container-custom mx-auto px-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 0.1,
                opacity: { duration: 0.5, delay: index * 0.2 },
                y: { duration: 0.1 },
              }}
              whileHover={{
                y: -15,
                scale: 1.02,
                zIndex: 50,
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
              }}
              className={`${member.bgColor} p-8 md:p-12 text-center cursor-pointer relative z-10 flex flex-col items-center justify-center rounded-2xl transition-all duration-75 shadow-lg border border-gray-100 hover:border-olive/20`}
            >
              {/* Company Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-olive tracking-wider mb-8">
                {member.company}
              </h3>

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 rounded-full overflow-hidden ring-4 ${member.ringColor} shadow-lg`}
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
              <p className="text-sm font-semibold tracking-widest mb-4 text-accent uppercase">
                {member.role}
              </p>

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
