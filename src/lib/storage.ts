import { PortfolioImage, ContactSubmission, AdminUser } from "./types";
import { STORAGE_KEYS } from "./constants";

// Helper function to check if we're in browser
const isBrowser = typeof window !== "undefined";

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// ============ AUTH STORAGE ============
export const getAuthState = (): AdminUser | null => {
  if (!isBrowser) return null;
  const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH);
  return auth ? JSON.parse(auth) : null;
};

export const setAuthState = (user: AdminUser): void => {
  if (!isBrowser) return;
  sessionStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
};

export const clearAuthState = (): void => {
  if (!isBrowser) return;
  sessionStorage.removeItem(STORAGE_KEYS.AUTH);
};

export const isAuthenticated = (): boolean => {
  const auth = getAuthState();
  if (!auth) return false;
  // Session expires after 1 hour
  const sessionDuration = 1 * 60 * 60 * 1000;
  if (auth.isAuthenticated && Date.now() - auth.loginTime < sessionDuration) {
    return true;
  }
  // Clear expired session
  clearAuthState();
  return false;
};

// ============ PORTFOLIO IMAGES STORAGE ============
export const getInteriorImages = (): PortfolioImage[] => {
  if (!isBrowser) return [];
  const images = localStorage.getItem(STORAGE_KEYS.INTERIOR_IMAGES);
  return images ? JSON.parse(images) : [];
};

export const getCNCImages = (): PortfolioImage[] => {
  if (!isBrowser) return [];
  const images = localStorage.getItem(STORAGE_KEYS.CNC_IMAGES);
  return images ? JSON.parse(images) : [];
};

export const addInteriorImage = (
  category: string,
  imageUrl: string,
): PortfolioImage => {
  const images = getInteriorImages();
  const newImage: PortfolioImage = {
    id: generateId(),
    category,
    imageUrl,
    uploadedAt: Date.now(),
  };
  images.push(newImage);
  localStorage.setItem(STORAGE_KEYS.INTERIOR_IMAGES, JSON.stringify(images));
  return newImage;
};

export const addCNCImage = (
  category: string,
  imageUrl: string,
): PortfolioImage => {
  const images = getCNCImages();
  const newImage: PortfolioImage = {
    id: generateId(),
    category,
    imageUrl,
    uploadedAt: Date.now(),
  };
  images.push(newImage);
  localStorage.setItem(STORAGE_KEYS.CNC_IMAGES, JSON.stringify(images));
  return newImage;
};

export const deleteInteriorImage = (id: string): void => {
  const images = getInteriorImages().filter((img) => img.id !== id);
  localStorage.setItem(STORAGE_KEYS.INTERIOR_IMAGES, JSON.stringify(images));
};

export const deleteCNCImage = (id: string): void => {
  const images = getCNCImages().filter((img) => img.id !== id);
  localStorage.setItem(STORAGE_KEYS.CNC_IMAGES, JSON.stringify(images));
};

export const getImagesByCategory = (
  type: "interior" | "cnc",
  category: string,
): PortfolioImage[] => {
  const images = type === "interior" ? getInteriorImages() : getCNCImages();
  return images.filter((img) => img.category === category);
};

export const getImageCount = (
  type: "interior" | "cnc",
  category?: string,
): number => {
  const images = type === "interior" ? getInteriorImages() : getCNCImages();
  if (category) {
    return images.filter((img) => img.category === category).length;
  }
  return images.length;
};

// ============ CONTACT SUBMISSIONS STORAGE ============
export const getContactSubmissions = (): ContactSubmission[] => {
  if (!isBrowser) return [];
  const submissions = localStorage.getItem(STORAGE_KEYS.CONTACT_SUBMISSIONS);
  return submissions ? JSON.parse(submissions) : [];
};

export const addContactSubmission = (
  data: Omit<ContactSubmission, "id" | "submittedAt">,
): ContactSubmission => {
  const submissions = getContactSubmissions();
  const newSubmission: ContactSubmission = {
    ...data,
    id: generateId(),
    submittedAt: Date.now(),
  };
  submissions.unshift(newSubmission); // Add to beginning
  localStorage.setItem(
    STORAGE_KEYS.CONTACT_SUBMISSIONS,
    JSON.stringify(submissions),
  );
  return newSubmission;
};

export const deleteContactSubmission = (id: string): void => {
  const submissions = getContactSubmissions().filter((sub) => sub.id !== id);
  localStorage.setItem(
    STORAGE_KEYS.CONTACT_SUBMISSIONS,
    JSON.stringify(submissions),
  );
};

export const getSubmissionCount = (): number => {
  return getContactSubmissions().length;
};

// ============ ADMIN PROFILE STORAGE ============
export const getAdminProfile = (): { name: string; image: string } => {
  if (!isBrowser)
    return { name: "Deepak Suthar", image: "/images/team/deepak.jpg" };
  const profile = localStorage.getItem(STORAGE_KEYS.ADMIN_PROFILE);
  return profile
    ? JSON.parse(profile)
    : { name: "Deepak Suthar", image: "/images/team/deepak.jpg" };
};

export const updateAdminProfile = (profile: {
  name?: string;
  image?: string;
}): void => {
  const current = getAdminProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem(STORAGE_KEYS.ADMIN_PROFILE, JSON.stringify(updated));
};

// ============ UTILITY: Convert File to Base64 ============
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
