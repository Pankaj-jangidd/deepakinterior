// Portfolio Types
export interface PortfolioImage {
  id: string;
  category: string;
  imageUrl: string;
  uploadedAt: number;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
}

// Contact Types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project: string;
  message: string;
  submittedAt: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  project: string;
  message: string;
}

// Admin Types
export interface AdminUser {
  isAuthenticated: boolean;
  username: string;
  loginTime: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Team Member Types
export interface TeamMember {
  name: string;
  role: string;
  roleColor: string;
  description: string;
  phone: string;
  image: string;
  bgClass: string;
}
