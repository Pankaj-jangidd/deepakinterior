"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  Image as ImageIcon,
  MessageSquare,
  Home,
  ChevronRight,
  Camera,
  User,
} from "lucide-react";
import {
  isAuthenticated,
  clearAuthState,
  getAdminProfile,
  updateAdminProfile,
  fileToBase64,
  getImageCount,
  getSubmissionCount,
} from "@/lib/storage";
import ImageManagement from "@/components/admin/ImageManagement";
import ContactSubmissions from "@/components/admin/ContactSubmissions";

type View = "dashboard" | "interiors" | "cnc" | "submissions";

export default function AdminDashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [profile, setProfile] = useState({
    name: "Deepak Suthar",
    image: "/images/team/deepak.jpg",
  });
  const [stats, setStats] = useState({ interiors: 0, cnc: 0, submissions: 0 });

  const updateStats = () => {
    setStats({
      interiors: getImageCount("interior"),
      cnc: getImageCount("cnc"),
      submissions: getSubmissionCount(),
    });
  };

  useEffect(() => {
    // Clear any old localStorage auth data (from before sessionStorage switch)
    if (typeof window !== "undefined") {
      localStorage.removeItem("deepak_admin_auth");
    }

    if (!isAuthenticated()) {
      router.replace("/admin/login");
      return;
    }

    // Auth verified - show dashboard
    setIsAuthChecked(true);
    setProfile(getAdminProfile());
    updateStats();
  }, [router]);

  // Don't render anything until auth is checked
  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[var(--light-grey)] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[var(--olive-green)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleLogout = () => {
    clearAuthState();
    router.replace("/admin/login");
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      updateAdminProfile({ image: base64 });
      setProfile((prev) => ({ ...prev, image: base64 }));
    }
  };

  const sidebarItems = [
    { id: "interiors" as View, label: "Deepak Interiors", icon: ImageIcon },
    { id: "cnc" as View, label: "Deepak CNC", icon: ImageIcon },
    {
      id: "submissions" as View,
      label: "Contacts",
      icon: MessageSquare,
    },
  ];

  const dashboardCards = [
    {
      id: "interiors" as View,
      title: "Deepak Interiors",
      count: stats.interiors,
      label: "images",
      bgImage:
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=60",
    },
    {
      id: "cnc" as View,
      title: "Deepak CNC",
      count: stats.cnc,
      label: "images",
      bgImage: "/images/cnc-machine.jpg",
    },
    {
      id: "submissions" as View,
      title: "Contacts",
      count: stats.submissions,
      label: "messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--light-grey)] flex">
      {/* Sidebar */}
      <aside
        style={{ width: "250px" }}
        className="bg-[#2c3e50] text-white flex flex-col fixed h-full z-10"
      >
        {/* Profile Section */}
        <div className="p-8 border-b border-white/10 flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
              <User size={48} className="text-white/70" />
            </div>
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          <h3 className="text-center text-lg font-semibold text-white">
            Deepak Suthar
          </h3>
          <p className="text-center text-xs text-white/50 font-semibold mt-1 tracking-widest">
            ADMIN
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <button
            onClick={() => {
              setCurrentView("dashboard");
              updateStats();
            }}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors uppercase text-sm tracking-wider font-semibold ${
              currentView === "dashboard"
                ? "bg-white/15 text-white border-l-4 border-white"
                : "text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
            }`}
          >
            <Home size={20} />
            Dashboard
          </button>

          <div className="my-3 border-t border-white/10 mx-4" />

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors uppercase text-sm tracking-wider font-semibold ${
                currentView === item.id
                  ? "bg-white/15 text-white border-l-4 border-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: "250px" }} className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6">
          <h1 className="text-2xl font-bold text-[#2c3e50] tracking-wide">
            DEEPAK INTERIOR & CNC
          </h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </header>

        {/* Content */}
        <div className="p-8">
          {currentView === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
                Welcome back, {profile.name.split(" ")[0]}!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dashboardCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setCurrentView(card.id)}
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    {card.bgImage ? (
                      <>
                        <Image
                          src={card.bgImage}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--olive-green)] to-[var(--dark-olive)]">
                        {card.icon && (
                          <card.icon
                            className="absolute right-4 bottom-4 text-white/20"
                            size={80}
                          />
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <p className="text-4xl font-bold">{card.count}</p>
                      <p className="text-sm text-gray-300">{card.label}</p>
                      <p className="font-semibold mt-2">{card.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === "interiors" && (
            <ImageManagement type="interior" onUpdate={updateStats} />
          )}

          {currentView === "cnc" && (
            <ImageManagement type="cnc" onUpdate={updateStats} />
          )}

          {currentView === "submissions" && (
            <ContactSubmissions onUpdate={updateStats} />
          )}
        </div>
      </main>
    </div>
  );
}
