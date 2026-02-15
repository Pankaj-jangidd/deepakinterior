# Deepak Interior & CNC Website

A modern, production-ready website for Deepak Interior & CNC - an interior design and CNC manufacturing firm based in Hosur.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## Features

- ✨ Modern, responsive design
- 🎨 Smooth animations with Framer Motion
- 📱 Mobile-first approach
- 🖼️ Portfolio galleries with lightbox
- 📧 Contact form with email integration
- 🔐 Admin panel for content management
- 🔍 SEO optimized with metadata and structured data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Email**: EmailJS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/deepak-interior.git
cd deepak-interior
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

4. Fill in your EmailJS credentials in `.env.local`

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   ├── portfolio/         # Portfolio pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # Reusable UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Team.tsx
│   ├── Portfolio.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── lib/                   # Utilities and helpers
    ├── constants.ts
    ├── email.ts
    ├── storage.ts
    ├── types.ts
    └── utils.ts
```

## Admin Panel

The admin panel allows you to:

- Upload and manage portfolio images
- View and manage contact form submissions
- Update profile information

### Default Credentials

- Username: `admin`
- Password: `deepak2025`

> ⚠️ Change these credentials in production!

## EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `from_name`
   - `from_email`
   - `phone`
   - `message`
   - `to_name`
4. Add your credentials to `.env.local`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Upgrading to Firebase/Supabase

The storage layer (`src/lib/storage.ts`) is designed to be easily swapped:

1. Install the Firebase/Supabase SDK
2. Update the functions in `storage.ts` to use the new backend
3. The rest of the app will work without changes

## License

MIT License - feel free to use this for your own projects!

## Contact

- **Website**: [deepakinterior.com](https://deepakinterior.com)
- **Phone**: +91 93603 49866
- **Email**: deepakinterior.cnc@gmail.com
