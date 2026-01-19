# Checkpoint 1: Refactor Layout & Component Structure

**Priority**: 🔴 Critical  
**Estimated Time**: 2-3 hours  
**Dependencies**: None  
**Status**: 📋 Planned

---

## 🎯 Objective

Memperbaiki struktur layout dan komponen untuk menghilangkan duplikasi kode, meningkatkan maintainability, dan mengikuti best practices React/Next.js.

---

## 🔍 Current Issues

### 1. **Layout Duplication**

Setiap page mengulang struktur yang sama:

```typescript
// Repeated in: page.tsx, blog/page.tsx, contact/page.tsx, portofolio/page.tsx, resume/page.tsx
const SomePage = () => {
  return (
    <body className="flex flex-col min-h-screen font-mono bg-black">
      <HeaderSection />
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center">
        {/* Page content */}
      </div>
      <FooterSection />
    </body>
  );
};
```

**Problems**:

- 5 files dengan kode identik
- Perubahan layout harus dilakukan di 5 tempat
- Tidak memanfaatkan Next.js layout system
- `<body>` tag seharusnya hanya di root layout

---

### 2. **Component Naming Convention**

```typescript
// ❌ Current: lowercase function names
const resume = () => { ... }
const blog = () => { ... }
const contact = () => { ... }

// ✅ Should be: PascalCase
const Resume = () => { ... }
const Blog = () => { ... }
const Contact = () => { ... }
```

---

### 3. **Flat Component Structure**

```
components/
├── headerSection.tsx
└── footerSection.tsx
```

**Issues**:

- No organization
- No separation between layout and UI components
- Hard to scale

---

## ✅ Success Criteria

1. ✅ `<body>`, `<HeaderSection>`, dan `<FooterSection>` hanya ada di `layout.tsx`
2. ✅ Semua page components menggunakan PascalCase naming
3. ✅ Component structure terorganisir dengan baik
4. ✅ Tidak ada duplikasi kode layout
5. ✅ Navigation tetap sticky dan tidak reload saat berpindah halaman

---

## 📋 Implementation Plan

### Step 1: Refactor Root Layout

**File**: `src/app/layout.tsx`

**Current**:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="user_icon.ico" />
      </Head>
      {children}
    </html>
  );
}
```

**Target**:

```typescript
import HeaderSection from './components/layout/Header';
import FooterSection from './components/layout/Footer';
import './globals.css';

export const metadata = {
  title: "Sarip Hidayatullah",
  description: "Portofolio Sarip Hidayatullah - Software Developer",
  icons: {
    icon: '/user_icon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-mono bg-black">
        <HeaderSection />
        <main className="flex-1 w-full py-4 px-6 overflow-y-auto">
          {children}
        </main>
        <FooterSection />
      </body>
    </html>
  );
}
```

**Changes**:

- ✅ Move `<body>` tag to root layout
- ✅ Move Header and Footer to root layout
- ✅ Wrap children in `<main>` tag
- ✅ Fix favicon configuration (use metadata.icons)
- ✅ Remove `<Head>` component (deprecated in App Router)

---

### Step 2: Reorganize Component Structure

**Current**:

```
src/app/components/
├── headerSection.tsx
└── footerSection.tsx
```

**Target**:

```
src/app/components/
├── layout/
│   ├── Header.tsx          (renamed from headerSection.tsx)
│   └── Footer.tsx          (renamed from footerSection.tsx)
└── ui/                     (for future UI components)
    ├── Button.tsx
    ├── Link.tsx
    └── ...
```

**Actions**:

1. Create `components/layout/` directory
2. Move and rename `headerSection.tsx` → `layout/Header.tsx`
3. Move and rename `footerSection.tsx` → `layout/Footer.tsx`
4. Update imports in `layout.tsx`
5. Create `components/ui/` directory for future components

---

### Step 3: Refactor Page Components

#### 3.1 Homepage (`page.tsx`)

**Current**:

```typescript
export default async function Home() {
  return (
    <body className="flex flex-col min-h-screen font-mono bg-black">
      <HeaderSection/>
      <main className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        <div className=" w-full font-bold text-gray-300 flex justify-center items-center">
          <div className="flex flex-col w-full justify-center items-center space-y-6 font-mono">
            <span className="text-2xl">Sarip Hidayatullah</span>
            <span className="typing-demo text-xl">Software Developer</span>
          </div>
        </div>
      </main>
      <FooterSection/>
    </body>
  );
}
```

**Target**:

```typescript
export default function Home() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full font-bold text-gray-300 flex justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center space-y-6">
          <span className="text-2xl">Sarip Hidayatullah</span>
          <span className="typing-demo text-xl">Software Developer</span>
        </div>
      </div>
    </div>
  );
}
```

**Changes**:

- ❌ Remove `<body>`, `<HeaderSection>`, `<FooterSection>`, `<main>`
- ✅ Keep only page-specific content
- ❌ Remove `async` (tidak diperlukan, tidak ada async operation)
- ✅ Simplify class names (remove redundant `font-mono`)

---

#### 3.2 Blog Page (`blog/page.tsx`)

**Current**:

```typescript
const blog = () => {
  return (
    <body className="flex flex-col min-h-screen font-mono bg-black">
      <HeaderSection />
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center text-white ">
        coming soon
      </div>
      <FooterSection />
    </body>
  );
}
export default blog;
```

**Target**:

```typescript
export default function Blog() {
  return (
    <div className="flex justify-center items-center h-full text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}
```

**Changes**:

- ✅ Rename `blog` → `Blog` (PascalCase)
- ❌ Remove layout elements
- ✅ Add proper heading structure
- ✅ Improve "coming soon" styling

---

#### 3.3 Contact Page (`contact/page.tsx`)

**Target**:

```typescript
export default function Contact() {
  return (
    <div className="flex justify-center items-center h-full text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}
```

---

#### 3.4 Portfolio Page (`portofolio/page.tsx`)

**Target**:

```typescript
export default function Portfolio() {
  return (
    <div className="flex justify-center items-center h-full text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}
```

**Note**: Folder name tetap `portofolio` untuk backward compatibility, tapi component name `Portfolio` (English).

---

#### 3.5 Resume Page (`resume/page.tsx`)

**Current**: 351 lines dengan layout wrapper

**Target**: Remove layout wrapper, keep content

```typescript
"use client";
import { AiOutlineDown } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../../../public/profile_sya.jpg";
import { useRef } from "react";

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full overflow-y-auto space-y-8 text-white">
      {/* Hero Section */}
      <section className="w-full flex-col flex justify-center items-center space-y-4 h-screen">
        {/* ... rest of content ... */}
      </section>

      {/* About Section */}
      <section ref={ref} className="w-full h-screen flex justify-center items-center px-4 py-0 md:py-24">
        {/* ... rest of content ... */}
      </section>

      {/* Education, Experience, Projects Section */}
      <section className="w-full h-screen flex justify-center items-center">
        {/* ... rest of content ... */}
      </section>
    </div>
  );
}
```

**Changes**:

- ❌ Remove `<body>`, `<HeaderSection>`, `<FooterSection>`
- ✅ Rename `resume` → `Resume`
- ✅ Keep `"use client"` (needed for scroll functionality)
- ✅ Add `text-white` to root div (moved from body)

---

### Step 4: Update Component Files

#### 4.1 Header Component

**File**: `src/app/components/layout/Header.tsx`

**Current**: `headerSection.tsx`

**Target**:

```typescript
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 px-6 shadow-md sticky top-0 bg-black z-50">
      <nav className="my-2">
        <ul className="flex justify-between md:justify-end text-gray-400">
          <li className="mr-6">
            <Link href="/resume" className="hover:text-gray-600 hover:underline">
              Resume
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/portofolio" className="hover:text-gray-600 hover:underline">
              Portfolio
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/blog" className="hover:text-gray-600 hover:underline">
              Blog
            </Link>
          </li>
          <li className="mr-6">
            <Link href="/contact" className="hover:text-gray-600 hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

**Changes**:

- ✅ Rename `HeaderSection` → `Header`
- ✅ Fix typo: "Portofolio" → "Portfolio" (display text)
- ✅ Keep href as `/portofolio` (actual route)

---

#### 4.2 Footer Component

**File**: `src/app/components/layout/Footer.tsx`

**Current**: `footerSection.tsx`

**Target**:

```typescript
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillFacebook,
  AiFillGithub,
} from "react-icons/ai";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-4 px-6 flex flex-col justify-center items-center sm:flex sm:flex-row sm:justify-between sm:items-center sticky bottom-0 bg-black">
      <p className="text-center sm:text-left font-mono text-xs">
        &copy; {currentYear} Sarip Hidayatullah
      </p>
      <div className="text-center text-xl mt-4 sm:mt-0">
        <div className="w-full inline-flex space-x-4 sm:justify-center sm:items-center">
          <a
            href="https://github.com/sya17"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <AiFillGithub className="w-5 h-5 hover:text-gray-400 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <AiFillLinkedin className="w-5 h-5 hover:text-gray-400 transition-colors" />
          </a>
          <a
            href="https://web.facebook.com/syrf17/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
          >
            <AiFillFacebook className="w-5 h-5 hover:text-gray-400 transition-colors" />
          </a>
          <a
            href="https://www.instagram.com/srp_hdyt/?igshid=ZDdkNTZiNTM="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <AiFillInstagram className="w-5 h-5 hover:text-gray-400 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Changes**:

- ✅ Rename `FooterSection` → `Footer`
- ✅ Dynamic copyright year (not hardcoded 2023)
- ✅ Add `rel="noopener noreferrer"` for security
- ✅ Add `aria-label` for accessibility
- ✅ Add hover effects on icons

---

### Step 5: Clean Up Loading Components

**Current**: Identical loading.tsx in multiple directories

**Action**: Keep them as-is for now (they're already correct for App Router)

**Future**: Consider creating a shared Loading component if customization needed

---

## 🧪 Testing Checklist

### Manual Testing:

1. **Homepage**:
   - [ ] Loads correctly
   - [ ] Typing animation works
   - [ ] Header visible and sticky
   - [ ] Footer visible and sticky

2. **Navigation**:
   - [ ] All nav links work
   - [ ] Header doesn't reload when navigating
   - [ ] Active page indication (future enhancement)

3. **Resume Page**:
   - [ ] Scroll button works
   - [ ] All sections visible
   - [ ] Timeline layout correct
   - [ ] Profile image loads

4. **Other Pages**:
   - [ ] Blog page shows "coming soon"
   - [ ] Portfolio page shows "coming soon"
   - [ ] Contact page shows "coming soon"

5. **Responsive**:
   - [ ] Mobile layout works
   - [ ] Tablet layout works
   - [ ] Desktop layout works

6. **Build**:
   - [ ] `npm run build` succeeds
   - [ ] No TypeScript errors
   - [ ] No ESLint errors

---

## 📁 Files to Modify

### Created:

- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/Footer.tsx`
- `src/app/components/ui/` (directory)

### Modified:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/portofolio/page.tsx`
- `src/app/resume/page.tsx`

### Deleted:

- `src/app/components/headerSection.tsx`
- `src/app/components/footerSection.tsx`

---

## 🎯 Expected Benefits

1. **Maintainability**:
   - Layout changes hanya perlu dilakukan di 1 tempat
   - Component structure lebih terorganisir

2. **Performance**:
   - Header/Footer tidak re-render saat navigasi
   - Smoother page transitions

3. **Code Quality**:
   - Mengikuti React/Next.js best practices
   - Proper naming conventions
   - No code duplication

4. **Developer Experience**:
   - Easier to find components
   - Clear separation of concerns
   - Better scalability

---

## ⚠️ Potential Issues & Solutions

### Issue 1: Import Path Changes

**Problem**: Semua pages import dari `../components/headerSection`

**Solution**: Update all imports to `../components/layout/Header`

---

### Issue 2: Resume Page Scroll Functionality

**Problem**: Resume page needs client-side scroll

**Solution**: Keep `"use client"` directive, rest of pages can be server components

---

### Issue 3: Favicon Not Loading

**Problem**: Current `<Head>` usage deprecated

**Solution**: Use `metadata.icons` in layout.tsx

---

## 📊 Success Metrics

- ✅ Zero layout code duplication
- ✅ All components follow PascalCase naming
- ✅ Build succeeds without errors
- ✅ All pages render correctly
- ✅ Navigation works smoothly
- ✅ Responsive design maintained

---

## 🚀 Next Steps

After completing this checkpoint:

1. **Checkpoint 2**: Implement Portfolio Page
2. **Checkpoint 3**: Implement Blog Page
3. **Checkpoint 4**: Implement Contact Page
4. **Checkpoint 5**: SEO Optimization
5. **Checkpoint 6**: Accessibility Improvements

---

## 📝 Notes

- Keep this refactor focused on structure only
- Don't add new features
- Don't change styling (except minor improvements)
- Test thoroughly before moving to next checkpoint
- Commit changes with clear message: "refactor: reorganize layout and component structure"

---

**Estimated Completion**: 2-3 hours  
**Complexity**: Medium  
**Impact**: High (foundation for all future work)
