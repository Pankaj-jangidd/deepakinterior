"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { INTERIOR_CATEGORIES } from "@/lib/constants";

export default function InteriorsPortfolio() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="container-custom mx-auto text-center"
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
      >
        {/* Back Arrow + Heading on same line */}
        <div className="flex items-center mb-2">
          <Link
            href="/#portfolio"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2c3e50] transition-all cursor-pointer"
          >
            <ArrowLeft size={22} strokeWidth={3} />
          </Link>

          {/* Heading - centered */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-[#2c3e50] flex-1"
          >
            Deepak Interior
          </motion.h1>

          {/* Invisible spacer to balance the arrow */}
          <div className="w-10" />
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-olive text-base md:text-lg font-semibold"
        >
          Explore our residential and commercial interior projects
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div
        className="container-custom mx-auto"
        style={{ paddingBottom: "100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTERIOR_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Link href={`/portfolio/interiors/${category.slug}`}>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                  {/* Background Image */}
                  <Image
                    src={category.coverImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Name */}
                  <div className="absolute bottom-5 left-5">
                    <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-xs md:text-sm mt-1 max-w-xs">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-olive/0 group-hover:bg-olive/15 transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
