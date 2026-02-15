"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Instagram,
} from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { sendContactEmail } from "@/lib/email";
import { addContactSubmission } from "@/lib/storage";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  project: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fullText = "Let's Connect";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Typewriter effect - triggers on scroll into view, replays each time
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timerRef.current) clearInterval(timerRef.current);
          setDisplayText("");
          let index = 0;
          timerRef.current = setInterval(() => {
            if (index <= fullText.length) {
              setDisplayText(fullText.slice(0, index));
              index++;
            } else {
              if (timerRef.current) clearInterval(timerRef.current);
            }
          }, 150);
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          setDisplayText("");
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      observer.disconnect();
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await sendContactEmail({ ...data, phone: "" });
      addContactSubmission({ ...data, phone: "" });
      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Failed to submit:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <section
        ref={sectionRef}
        id="contact"
        className="bg-[#f5f5f0] flex items-center justify-center scroll-mt-16 min-h-screen py-16 md:py-32"
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
              Contact Us
            </h2>
            <div className="w-16 h-1 bg-olive mt-2" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-stretch">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="h-full flex flex-col"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark leading-tight mb-8">
                {displayText.split(" ").map((word, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      word
                    ) : (
                      <span className="text-olive">{word}</span>
                    )}
                    {index === 0 && " "}
                  </React.Fragment>
                ))}
                <span
                  className="inline-block bg-dark ml-3"
                  style={{
                    width: "5px",
                    height: "1em",
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </h2>

              {/* Contact Info Items - Increased height to 70px with hover animation */}
              <div className="flex-1 flex flex-col gap-6 justify-center">
                {/* Phone Number */}
                <motion.a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{}}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-olive/20"
                  style={{ height: "80px" }}
                >
                  <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-olive transition-colors">
                    <Phone
                      className="text-olive group-hover:text-white transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-base text-dark group-hover:text-olive transition-colors font-medium">
                      {CONTACT_INFO.phone}
                    </p>
                  </div>
                </motion.a>

                {/* Email Address */}
                <motion.a
                  href={`mailto:${CONTACT_INFO.email}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-olive/20"
                  style={{ height: "80px" }}
                >
                  <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-olive transition-colors">
                    <Mail
                      className="text-olive group-hover:text-white transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-base text-dark group-hover:text-olive transition-colors font-medium break-all">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href={CONTACT_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-olive/20"
                  style={{ height: "80px" }}
                >
                  <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-olive transition-colors">
                    <Instagram
                      className="text-olive group-hover:text-white transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-base text-dark group-hover:text-olive transition-colors font-medium">
                      deepakinterior&cnc
                    </p>
                  </div>
                </motion.a>

                {/* Studio Address */}
                <motion.a
                  href={CONTACT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-olive/20"
                  style={{ minHeight: "80px" }}
                >
                  <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-olive transition-colors">
                    <MapPin
                      className="text-olive group-hover:text-white transition-colors"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-dark group-hover:text-olive transition-colors font-medium">
                      Door No. 391-B, 100 Feet Inner Ring Road, Hosur 635109
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg h-full flex flex-col justify-center"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-grey uppercase tracking-wider mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-olive transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-grey uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-olive transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Project Dropdown */}
                <div>
                  <label
                    htmlFor="project"
                    className="block text-xs font-medium text-grey uppercase tracking-wider mb-2"
                  >
                    Project Type
                  </label>
                  <select
                    id="project"
                    {...register("project")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.project ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-olive transition-all bg-white`}
                  >
                    <option value="">Select a project type</option>
                    <option value="Residential Project">
                      Residential Project
                    </option>
                    <option value="Commercial Project">
                      Commercial Project
                    </option>
                    <option value="CNC Works">CNC Works</option>
                    <option value="Interior 3D Designing">
                      Interior 3D Designing
                    </option>
                  </select>
                  {errors.project && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.project.message}
                    </p>
                  )}
                </div>

                {/* Message - Reduced to 2 rows */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-grey uppercase tracking-wider mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    {...register("message")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-olive transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-olive text-white font-medium py-4 rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50 uppercase tracking-widest text-sm shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "SEND MESSAGE"}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-green-600 mt-2"
                  >
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">
                      Message sent successfully!
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-red-600 mt-2"
                  >
                    <XCircle size={20} />
                    <span className="text-sm font-medium">
                      Failed to send message
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
