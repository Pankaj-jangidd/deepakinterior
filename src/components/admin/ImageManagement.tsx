"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Trash2, X, Upload, ImageIcon } from "lucide-react";
import { INTERIOR_CATEGORIES, CNC_CATEGORIES } from "@/lib/constants";
import {
  getInteriorImages,
  getCNCImages,
  addInteriorImage,
  addCNCImage,
  deleteInteriorImage,
  deleteCNCImage,
  fileToBase64,
  getImageCount,
} from "@/lib/storage";
import { PortfolioImage } from "@/lib/types";

interface ImageManagementProps {
  type: "interior" | "cnc";
  onUpdate: () => void;
}

const ImageManagement: React.FC<ImageManagementProps> = ({
  type,
  onUpdate,
}) => {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const categories = type === "interior" ? INTERIOR_CATEGORIES : CNC_CATEGORIES;
  const title = type === "interior" ? "Deepak Interiors" : "Deepak CNC";

  useEffect(() => {
    loadImages();
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].slug);
      setUploadCategory(categories[0].slug);
    }
  }, [type]);

  const loadImages = () => {
    const imgs = type === "interior" ? getInteriorImages() : getCNCImages();
    setImages(imgs);
  };

  const filteredImages = images.filter(
    (img) => img.category === selectedCategory,
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const base64 = await fileToBase64(file);
      setPreviewImage(base64);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadCategory) return;

    setIsUploading(true);
    const base64 = await fileToBase64(selectedFile);

    if (type === "interior") {
      addInteriorImage(uploadCategory, base64);
    } else {
      addCNCImage(uploadCategory, base64);
    }

    loadImages();
    onUpdate();
    setIsModalOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
    setIsUploading(false);
  };

  const handleDelete = (id: string) => {
    if (type === "interior") {
      deleteInteriorImage(id);
    } else {
      deleteCNCImage(id);
    }
    loadImages();
    onUpdate();
    setDeleteConfirm(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#2c3e50]">{title}</h2>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => {
          const count = getImageCount(type, cat.slug);
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#2c3e50] text-white shadow-md"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-[#2c3e50]"
              }`}
              style={
                !isActive ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" } : {}
              }
            >
              {cat.name}
              <span
                className={`ml-2 text-xs ${isActive ? "text-white/60" : "text-gray-400"}`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Box */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
      >
        {/* Box Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#2c3e50]">
            {categories.find((c) => c.slug === selectedCategory)?.name || ""}
          </h3>
          <button
            onClick={() => {
              setUploadCategory(selectedCategory);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#2c3e50] text-white text-sm font-semibold rounded-xl hover:bg-[#1a252f] transition-colors shadow-md"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>

        {/* Images */}
        {filteredImages.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <ImageIcon size={36} className="text-gray-300" />
            </div>
            <p className="text-gray-600 text-base font-medium mb-1">
              No images yet
            </p>
            <p className="text-gray-400 text-sm">Upload first image</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={image.imageUrl}
                  alt="Portfolio image"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                <button
                  onClick={() => setDeleteConfirm(image.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-md"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-xl p-8 w-full max-w-md"
              style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#2c3e50]">
                  Upload Image
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Category Label */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Category
                </label>
                <div className="px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 text-sm text-[#2c3e50] font-medium">
                  {categories.find((c) => c.slug === uploadCategory)?.name ||
                    uploadCategory}
                </div>
              </div>

              {/* File Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2c3e50] mb-2">
                  Image
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    previewImage
                      ? "border-[#2c3e50] bg-gray-50"
                      : "border-gray-200 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  {previewImage ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Upload size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!previewImage || isUploading}
                className="w-full py-3.5 rounded-lg bg-[#2c3e50] hover:bg-[#1a252f] text-white font-semibold text-sm tracking-wider uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl p-8 w-full max-w-sm text-center"
              style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Trash2 size={28} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#2c3e50] mb-2">
                Delete Image?
              </h3>
              <p className="text-gray-400 text-sm mb-8">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-lg border-2 border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-3 rounded-lg bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageManagement;
