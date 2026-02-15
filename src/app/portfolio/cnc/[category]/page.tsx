"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { CNC_CATEGORIES } from "@/lib/constants";
import { getImagesByCategory } from "@/lib/storage";
import { PortfolioImage } from "@/lib/types";
import Lightbox from "@/components/ui/Lightbox";

// Sample placeholder images for demo
const sampleImages = [
  "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
  "https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
];

export default function CNCCategoryGallery() {
  const params = useParams();
  const category = params.category as string;
  const [images, setImages] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryInfo = CNC_CATEGORIES.find((c) => c.slug === category);

  useEffect(() => {
    // Get images from localStorage
    const storedImages = getImagesByCategory("cnc", category);

    if (storedImages.length > 0) {
      setImages(storedImages.map((img: PortfolioImage) => img.imageUrl));
    } else {
      // Use sample images if no uploaded images
      setImages(sampleImages);
    }
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
            href="/portfolio/cnc"
            className="text-[var(--olive-green)] hover:underline"
          >
            Go back to CNC Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--primary-white)]">
      {/* Header */}
      <div className="bg-[var(--text-dark)] text-white py-20">
        <div className="container-custom mx-auto px-4 lg:px-8">
          <Link
            href="/portfolio/cnc"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to CNC Portfolio
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            {categoryInfo.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mt-2 text-lg"
          >
            {categoryInfo.description}
          </motion.p>
        </div>
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
