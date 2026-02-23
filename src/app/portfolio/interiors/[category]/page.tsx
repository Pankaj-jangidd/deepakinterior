"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { INTERIOR_CATEGORIES } from "@/lib/constants";
import { getImagesByCategory } from "@/lib/storage";
import { PortfolioImage } from "@/lib/types";
import Lightbox from "@/components/ui/Lightbox";

export default function InteriorCategoryGallery() {
  const params = useParams();
  const category = params.category as string;
  const [images, setImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryInfo = INTERIOR_CATEGORIES.find((c) => c.slug === category);

  useEffect(() => {
    const loadImages = () => {
      const storedImages = getImagesByCategory("interior", category);
      setImages(storedImages.map((img: PortfolioImage) => img.imageUrl));
    };

    loadImages();

    // Re-read when tab gets focus (picks up admin changes)
    const handleFocus = () => loadImages();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleFocus);
    };
  }, [category]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
            Category not found
          </h1>
          <Link
            href="/portfolio/interiors"
            className="text-[var(--olive-green)] hover:underline"
          >
            Go back to Interior Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--primary-white)]">
      {/* Header */}
      <div
        className="container-custom mx-auto text-center"
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
      >
        {/* Back Arrow + Heading on same line */}
        <div className="flex items-center mb-2">
          <Link
            href="/portfolio/interiors"
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
            {categoryInfo.name}
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
          {categoryInfo.description}
        </motion.p>
      </div>

      {/* Gallery Grid */}
      <div className="container-custom mx-auto px-4 lg:px-8 py-16">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No images uploaded yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Images can be added from the admin panel
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`${categoryInfo.name} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </main>
  );
}
