"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ADMIN_CREDENTIALS } from "@/lib/constants";
import { setAuthState, isAuthenticated, clearAuthState } from "@/lib/storage";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Always clear session when visiting login page
    clearAuthState();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      data.username === ADMIN_CREDENTIALS.username &&
      data.password === ADMIN_CREDENTIALS.password
    ) {
      setAuthState({
        isAuthenticated: true,
        username: data.username,
        loginTime: Date.now(),
      });
      router.replace("/admin/dashboard");
    } else {
      setLoginError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 relative">
      {/* Back Arrow */}
      <Link
        href="/"
        className="absolute top-8 left-8 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md text-[#2c3e50] transition-all"
      >
        <ArrowLeft size={20} strokeWidth={2.5} />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-10"
          style={{ boxShadow: "0 0 30px rgba(0,0,0,0.1)" }}
        >
          {/* Header inside card */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#2c3e50] tracking-wider">
              ADMIN PANEL
            </h1>
            <p className="text-olive font-semibold text-sm tracking-widest mt-3">
              DEEPAK INTERIOR & CNC
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#2c3e50] mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.username
                    ? "border-red-400"
                    : "border-gray-200 focus:border-[#2c3e50]"
                } focus:outline-none transition-colors text-sm bg-gray-50 focus:bg-white`}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#2c3e50] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 ${
                    errors.password
                      ? "border-red-400"
                      : "border-gray-200 focus:border-[#2c3e50]"
                  } focus:outline-none transition-colors text-sm bg-gray-50 focus:bg-white`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center font-medium"
              >
                {loginError}
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-olive hover:bg-[#5a6b3a] text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "LOGIN"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}
