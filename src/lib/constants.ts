import { NavItem, PortfolioCategory, TeamMember } from "./types";

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Managers", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

// Contact Information
export const CONTACT_INFO = {
  phone: "+91 93603 49866",
  phoneRaw: "9360349866",
  email: "deepakinteriorcnc@gmail.com",
  instagram: {
    handle: "@deepakinteriorandcncwork",
    url: "https://www.instagram.com/deepakinteriorandcncwork?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  address:
    "Door No. 391-B, Ground Floor, 100 Feet Inner Ring Road, Kaveri Street, Mookandapalli, Hosur-635109, Krishnagiri District",
  mapsUrl:
    "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEINDUwN2owajGoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KXEj7RIdca47MWENyPBSJahP&daddr=No.+391-B,+KAVERI+STREET,+MUNEESHWARA+NAGAR,+Hosur,+Tamil+Nadu+635109",
};

// Team Members
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Virmaram Suthar",
    role: "MASTER CRAFTSMAN",
    roleColor: "text-[var(--accent-red)]",
    description:
      "The soul of our traditional roots. With decades of hands-on experience, Virmaram ensures every piece maintains the intricate detail and structural integrity that Rajasthani woodcraft is world-renowned for.",
    phone: "9442270932",
    image: "/images/team/virmaram.jpg",
    bgClass: "bg-[var(--light-grey)]",
  },
  {
    name: "Deepak Suthar",
    role: "CNC DIRECTOR",
    roleColor: "text-[var(--accent-red)]",
    description:
      "Bridging tradition with tech. Deepak oversees our high-precision CNC operations, bringing complex geometric patterns and architectural visions to life with mathematical perfection and modern flair.",
    phone: "+91 93603 49866",
    image: "/images/team/deepak.jpg",
    bgClass: "bg-white",
  },
];

// Interior Categories
export const INTERIOR_CATEGORIES: PortfolioCategory[] = [
  {
    id: "modular-kitchens",
    name: "Modular Kitchens",
    slug: "modular-kitchens",
    description: "Premium modular kitchen solutions with modern designs",
    coverImage:
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80",
  },
  {
    id: "luxurious-living-rooms",
    name: "Luxurious Living Rooms",
    slug: "luxurious-living-rooms",
    description: "Elegant living room designs for modern homes",
    coverImage:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
  },
  {
    id: "serene-bedrooms",
    name: "Serene Bedrooms",
    slug: "serene-bedrooms",
    description: "Peaceful and stylish bedroom interiors",
    coverImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  },
  {
    id: "designer-false-ceilings",
    name: "Designer False Ceilings",
    slug: "designer-false-ceilings",
    description: "Custom false ceiling designs to elevate your space",
    coverImage: "/images/false-ceiling-cover.png",
  },
];

// CNC Categories
export const CNC_CATEGORIES: PortfolioCategory[] = [
  {
    id: "fluted-panels",
    name: "Fluted Panels",
    slug: "fluted-panels",
    description: "Precision CNC fluted panels for walls and ceilings",
    coverImage: "/images/fluted-panels-cover.png",
  },
  {
    id: "jali-designs",
    name: "Jali Designs",
    slug: "jali-designs",
    description: "Intricate jali patterns for partitions and decor",
    coverImage: "/images/jali-design-cover.png",
  },
  {
    id: "door-ceiling-designs",
    name: "Door & Ceiling Designs",
    slug: "door-ceiling-designs",
    description: "Custom CNC door and ceiling patterns",
    coverImage: "/images/door-ceiling-cover-v2.png",
  },
  {
    id: "custom-designs",
    name: "Custom Designs",
    slug: "custom-designs",
    description: "Bespoke CNC solutions for unique requirements",
    coverImage: "/images/custom-designs-cover.png",
  },
];

// Stats
export const STATS = [
  { value: "500+", label: "PROJECTS COMPLETED", icon: "ClipboardList" },
  { value: "450+", label: "HAPPY CLIENTS", icon: "Smile" },
  { value: "12+", label: "YEARS EXPERIENCE", icon: "Calendar" },
];

// Admin Credentials (for demo purposes - in production, use proper auth)
export const ADMIN_CREDENTIALS = {
  username: "deepaksuthar",
  password: "deepak123",
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  AUTH: "deepak_admin_auth",
  INTERIOR_IMAGES: "deepak_interior_images",
  CNC_IMAGES: "deepak_cnc_images",
  CONTACT_SUBMISSIONS: "deepak_contact_submissions",
  ADMIN_PROFILE: "deepak_admin_profile",
};
