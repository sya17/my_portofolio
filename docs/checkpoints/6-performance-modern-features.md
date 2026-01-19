# Checkpoint 6: Performance & Modern Features Enhancement

**Priority**: 🟢 Medium  
**Estimated Time**: 4-5 hours  
**Dependencies**: Checkpoint 1, Checkpoint 5  
**Status**: 📋 Planned

---

## 🎯 Objective

Mengimplementasikan fitur-fitur modern dan optimasi performa untuk meningkatkan user experience, page speed, dan overall quality website portfolio.

---

## 🔍 Enhancement Areas

### 1. **Font Optimization with next/font**

### 2. **Image Optimization & WebP Support**

### 3. **Progressive Web App (PWA)**

### 4. **Page Transitions & Animations**

### 5. **Error Boundaries**

### 6. **404 & Error Pages**

### 7. **Analytics Integration**

### 8. **Performance Monitoring**

---

## 📋 Implementation Plan

### Enhancement 1: Font Optimization

**Current**: Using system monospace font (no optimization)

**Target**: Use next/font for optimal font loading

**File**: `src/app/layout.tsx`

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google';

// Primary font for body text
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Monospace font for code and special elements
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {/* ... */}
      </body>
    </html>
  );
}
```

**Update Tailwind Config**:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
};
```

**Benefits**:

- Automatic font optimization
- Reduced layout shift
- Better performance
- Self-hosted fonts (no external requests)

---

### Enhancement 2: Image Optimization

#### 2.1 WebP Conversion

**Install Sharp** (automatic with Next.js):

```bash
npm install sharp
```

**Configure next.config.js**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
```

#### 2.2 Optimize Profile Image

**Convert to WebP**:

```bash
# Using Sharp CLI
npx @squoosh/cli --webp auto public/profile_sya.jpg
```

**Or use online tool**: https://squoosh.app/

**Update usage**:

```typescript
import Image from 'next/image';
import profilePic from '@/public/profile_sya.webp';

<Image
  src={profilePic}
  alt="Profile photo of Sarip Hidayatullah, Software Developer"
  width={80}
  height={80}
  className="rounded-full"
  priority // For above-the-fold images
  placeholder="blur" // Automatic blur placeholder
/>
```

#### 2.3 Create Placeholder Images

**File**: `src/lib/image-utils.ts` (new)

```typescript
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const shimmerDataUrl = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
```

**Usage**:

```typescript
import { shimmerDataUrl } from '@/lib/image-utils';

<Image
  src={imageSrc}
  alt="Description"
  placeholder="blur"
  blurDataURL={shimmerDataUrl(700, 475)}
/>
```

---

### Enhancement 3: Progressive Web App (PWA)

**Install next-pwa**:

```bash
npm install next-pwa
```

**File**: `next.config.js`

```javascript
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // ... existing config
});
```

**File**: `public/manifest.json` (update)

```json
{
  "name": "Sarip Hidayatullah - Software Developer Portfolio",
  "short_name": "SH Portfolio",
  "description": "Portfolio of Sarip Hidayatullah, Software Developer specializing in Java and modern web technologies",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#5BC0BE",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Update layout.tsx**:

```typescript
export const metadata = {
  // ... existing metadata
  manifest: "/manifest.json",
  themeColor: "#5BC0BE",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SH Portfolio",
  },
};
```

---

### Enhancement 4: Page Transitions

**Install Framer Motion**:

```bash
npm install framer-motion
```

**File**: `src/app/components/PageTransition.tsx` (new)

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Update layout.tsx**:

```typescript
import PageTransition from './components/PageTransition';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

**Add scroll progress indicator**:

**File**: `src/app/components/ScrollProgress.tsx` (new)

```typescript
'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brandColor origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

### Enhancement 5: Error Boundaries

**File**: `src/app/error.tsx` (new)

```typescript
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-brandColor">Oops!</h1>
        <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
        <p className="text-gray-400 max-w-md">
          We encountered an unexpected error. Don't worry, it's not your fault.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-brandColor text-black px-6 py-3 rounded-lg font-medium hover:bg-brandColor/90 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            Go Home
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-gray-400">Error Details</summary>
            <pre className="mt-4 p-4 bg-gray-900 rounded-lg text-sm overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
```

---

### Enhancement 6: Custom 404 Page

**File**: `src/app/not-found.tsx` (new)

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-9xl font-bold text-brandColor opacity-20">404</h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-white">
            Page Not Found
          </p>
        </div>
        <p className="text-gray-400 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-brandColor text-black px-6 py-3 rounded-lg font-medium hover:bg-brandColor/90 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/resume"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all"
          >
            View Resume
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-500">Quick Links:</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href="/portofolio" className="text-brandColor hover:underline">
              Portfolio
            </Link>
            <Link href="/blog" className="text-brandColor hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="text-brandColor hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Enhancement 7: Analytics Integration

#### Option A: Vercel Analytics (Recommended)

**Install**:

```bash
npm install @vercel/analytics
```

**Update layout.tsx**:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Option B: Google Analytics

**Install**:

```bash
npm install @next/third-parties
```

**Update layout.tsx**:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

---

### Enhancement 8: Performance Monitoring

**File**: `src/lib/performance.ts` (new)

```typescript
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics
    console.log(metric);

    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}
```

**File**: `src/app/layout.tsx`

```typescript
export { reportWebVitals } from "@/lib/performance";
```

---

### Enhancement 9: Lazy Loading Components

**Example**: Lazy load heavy components

```typescript
import dynamic from 'next/dynamic';

// Lazy load ProjectModal (only when needed)
const ProjectModal = dynamic(
  () => import('@/app/components/portfolio/ProjectModal'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Don't render on server
  }
);

// Lazy load Contact Form (below fold)
const ContactForm = dynamic(
  () => import('@/app/components/contact/ContactForm'),
  {
    loading: () => <div>Loading form...</div>,
  }
);
```

---

### Enhancement 10: Prefetching Strategy

**File**: `src/app/components/layout/Header.tsx`

```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            {/* Prefetch on hover */}
            <Link href="/resume" prefetch={true}>
              Resume
            </Link>
          </li>
          <li>
            <Link href="/portofolio" prefetch={true}>
              Portfolio
            </Link>
          </li>
          {/* ... */}
        </ul>
      </nav>
    </header>
  );
}
```

---

## 🧪 Testing & Verification

### Performance Testing

**Tools**:

1. **Lighthouse** (Chrome DevTools)
2. **WebPageTest**: https://www.webpagetest.org/
3. **PageSpeed Insights**: https://pagespeed.web.dev/

**Target Metrics**:

- Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### PWA Testing

**Test**:

1. Open DevTools → Application → Manifest
2. Check "Offline" in Network tab
3. Reload page (should work offline)
4. Install PWA on mobile device

### Animation Testing

**Test**:

1. Navigate between pages
2. Check smooth transitions
3. Test scroll progress indicator
4. Verify no janky animations

---

## 📁 Files to Create

### New Files:

- `src/app/components/PageTransition.tsx`
- `src/app/components/ScrollProgress.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/lib/image-utils.ts`
- `src/lib/performance.ts`
- `public/manifest.json` (update)
- `public/icon-192x192.png`
- `public/icon-512x512.png`

### Modified Files:

- `src/app/layout.tsx`
- `next.config.js`
- `tailwind.config.js`
- `package.json`

---

## 📊 Expected Improvements

### Before:

- Lighthouse Performance: ~85
- Font loading: Unoptimized
- Images: JPG, no optimization
- No PWA support
- No error handling
- No analytics

### After:

- Lighthouse Performance: 95+
- Font loading: Optimized (next/font)
- Images: WebP/AVIF, optimized
- PWA: Installable, offline support
- Error handling: Graceful error pages
- Analytics: Tracking enabled

---

## 🎯 Success Metrics

- ✅ Lighthouse Performance 95+
- ✅ PWA installable
- ✅ Smooth page transitions
- ✅ Error pages functional
- ✅ Analytics tracking
- ✅ Images optimized (WebP)
- ✅ Fonts optimized

---

**Estimated Completion**: 4-5 hours  
**Complexity**: Medium  
**Impact**: High (significantly improves UX and performance)
