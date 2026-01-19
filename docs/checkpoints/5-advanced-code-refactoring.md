# Checkpoint 5: Advanced Code Refactoring

**Priority**: 🟡 High  
**Estimated Time**: 3-4 hours  
**Dependencies**: Checkpoint 1 (Layout Refactor)  
**Status**: 📋 Planned

---

## 🎯 Objective

Melakukan refactoring mendalam untuk meningkatkan code quality, maintainability, dan developer experience dengan menghilangkan code duplication, mengaktifkan kembali linting, dan menerapkan best practices.

---

## 🔍 Issues Identified

### 1. **Loading Component Duplication** 🔴 Critical

**Problem**: Loading component identik di 5 lokasi berbeda

**Files**:

- `src/app/loading.tsx`
- `src/app/blog/loading.tsx`
- `src/app/contact/loading.tsx`
- `src/app/portofolio/loading.tsx`
- `src/app/resume/loading.tsx`

**Code** (37 lines, duplicated 5x = 185 lines total):

```typescript
export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center ">
        <div className="loader w-full h-full flex justify-center items-center">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>
      </div>
    </div>
  );
}
```

**Impact**:

- 185 lines of duplicated code
- Maintenance nightmare (change in 5 places)
- Violates DRY principle

---

### 2. **ESLint Completely Disabled** 🔴 Critical

**File**: `.eslintrc.json`

**Current State**:

```json
// {
//   "extends": "next/core-web-vitals",
//   "rules": {
//     "react/no-unescaped-entities": "off",
//     "@next/next/no-page-custom-font": "off"
//   }
// }
```

**Problem**:

- Entire ESLint configuration commented out
- No code quality checks
- Potential bugs undetected
- No consistency enforcement

---

### 3. **Excessive Inline Tailwind Classes**

**Example** from `resume/page.tsx`:

```typescript
<div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center text-white ">
  <div className="flex flex-col w-full overflow-y-auto space-y-8">
    <section className="w-full flex-col flex justify-center items-center space-y-4 h-screen text-white">
      {/* ... */}
    </section>
  </div>
</div>
```

**Problems**:

- Long, unreadable class strings
- Repeated patterns across components
- Hard to maintain consistency
- No reusable utility classes

---

### 4. **Commented Code Not Removed**

**Examples**:

```typescript
// Loading components (all 5 files):
// "use client"
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// const router = useRouter();
// useEffect(() => { ... }, [router]);

// Resume page:
// <span className="text-2xl">I&apos;M Sarip</span>

// Footer:
// <div className="w-4/6 border-l-2 border-t-0 h-full float-right" />
```

**Impact**:

- Cluttered codebase
- Confusing for new developers
- Increases file size
- Unclear intent

---

### 5. **No TypeScript Interfaces for Components**

**Current**:

```typescript
const HeaderSection = () => { ... }
const FooterSection = () => { ... }
```

**Missing**:

- No prop types
- No component interfaces
- No type safety for component APIs

---

### 6. **Hardcoded Values**

**Examples**:

```typescript
// Footer
<p>&copy; 2023 Sarip Hidayatullah</p>  // Year hardcoded

// Resume
<span>Age:</span><span>22 Years</span>  // Age hardcoded
```

---

## 📋 Refactoring Plan

### Step 1: Create Shared Loading Component

**File**: `src/app/components/ui/LoadingSpinner.tsx` (new)

```typescript
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center">
        <div className="loader w-full h-full flex justify-center items-center">
          <span className="l">L</span>
          <span className="o">o</span>
          <span className="a">a</span>
          <span className="d">d</span>
          <span className="i">i</span>
          <span className="n">n</span>
          <span className="g">g</span>
          <span className="d1">.</span>
          <span className="d2">.</span>
        </div>
      </div>
    </div>
  );
}
```

**Update all loading.tsx files**:

```typescript
// src/app/loading.tsx
import LoadingSpinner from './components/ui/LoadingSpinner';

export default function Loading() {
  return <LoadingSpinner />;
}

// Repeat for:
// - src/app/blog/loading.tsx
// - src/app/contact/loading.tsx
// - src/app/portofolio/loading.tsx
// - src/app/resume/loading.tsx
```

**Result**: 185 lines → 42 lines (77% reduction)

---

### Step 2: Re-enable and Configure ESLint

**File**: `.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "react/display-name": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "prefer-const": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

**Run ESLint**:

```bash
npm run lint
```

**Fix all errors** before proceeding.

---

### Step 3: Extract Common Tailwind Patterns

**File**: `src/app/styles/utilities.css` (new)

```css
/* Container utilities */
.container-centered {
  @apply flex justify-center items-center;
}

.container-full {
  @apply w-full h-full;
}

.container-page {
  @apply flex-1 w-full py-4 px-6 overflow-y-auto;
}

/* Section utilities */
.section-hero {
  @apply w-full flex-col flex justify-center items-center space-y-4 h-screen;
}

.section-content {
  @apply w-full h-screen flex justify-center items-center;
}

/* Text utilities */
.text-primary {
  @apply text-white;
}

.text-secondary {
  @apply text-gray-400;
}

.text-accent {
  @apply text-brandColor;
}

/* Card utilities */
.card {
  @apply bg-gray-900 border border-gray-800 rounded-lg p-6;
}

.card-hover {
  @apply hover:border-brandColor transition-all duration-300;
}

/* Button utilities */
.btn-primary {
  @apply bg-brandColor text-black px-6 py-3 rounded-lg font-medium hover:bg-brandColor/90 transition-all;
}

.btn-secondary {
  @apply bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all;
}
```

**Import in globals.css**:

```css
@import "./utilities.css";
```

**Usage Example**:

```typescript
// Before:
<div className="flex-1 w-full py-4 px-6 overflow-y-auto flex justify-center items-center text-white">

// After:
<div className="container-page container-centered text-primary">
```

---

### Step 4: Remove All Commented Code

**Script**: Create cleanup script

**File**: `scripts/cleanup-comments.sh` (new)

```bash
#!/bin/bash
# Remove commented code from all loading.tsx files

files=(
  "src/app/loading.tsx"
  "src/app/blog/loading.tsx"
  "src/app/contact/loading.tsx"
  "src/app/portofolio/loading.tsx"
  "src/app/resume/loading.tsx"
)

for file in "${files[@]}"; do
  # Remove lines 1-17 (commented code)
  sed -i '1,17d' "$file"
done
```

**Manual cleanup**:

- Remove commented imports
- Remove commented code blocks
- Remove unused commented JSX
- Keep only meaningful comments

---

### Step 5: Add TypeScript Interfaces

**File**: `src/types/components.ts` (new)

```typescript
import { ReactNode } from "react";

// Layout Components
export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

// UI Components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  children: ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

// Page Components
export interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}
```

**Update components**:

```typescript
// src/app/components/layout/Header.tsx
import { HeaderProps } from "@/types/components";

export default function Header({ className = "" }: HeaderProps) {
  // ...
}

// src/app/components/layout/Footer.tsx
import { FooterProps } from "@/types/components";

export default function Footer({ className = "" }: FooterProps) {
  // ...
}
```

---

### Step 6: Create Constants File

**File**: `src/lib/constants.ts` (new)

```typescript
// Personal Information
export const PERSONAL_INFO = {
  name: "Sarip Hidayatullah",
  title: "Software Developer",
  email: "sariphidayatullah170701@gmail.com",
  location: {
    city: "Jakarta",
    country: "Indonesia",
  },
  birthYear: 2001, // Calculate age dynamically
  citizenship: "Indonesia",
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/sya17",
  linkedin: "https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/",
  facebook: "https://web.facebook.com/syrf17/",
  instagram: "https://www.instagram.com/srp_hdyt/?igshid=ZDdkNTZiNTM=",
} as const;

// Work Experience
export const WORK_EXPERIENCE = [
  {
    id: "lemurian",
    company: "PT. Lemurian Inovasi Teknologi",
    position: "Java Developer",
    period: "2021-2023",
    technologies: ["ZK Framework (Monolith)"],
  },
  {
    id: "prawathiya",
    company: "PT. Prawathiya Karsa Pradiptha",
    position: "Java Developer",
    period: "2023-Now",
    technologies: [
      "ZK Framework",
      "Vue Framework",
      "Spring Framework (Microservice)",
    ],
  },
] as const;

// Education
export const EDUCATION = [
  {
    id: "smkn1",
    institution: "SMKN 1 Cikaum",
    major: "Rekayasa Perangkat Lunak",
    period: "2017-2020",
  },
] as const;

// Helper Functions
export const calculateAge = (birthYear: number): number => {
  return new Date().getFullYear() - birthYear;
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};
```

**Usage**:

```typescript
// Footer.tsx
import { PERSONAL_INFO, getCurrentYear } from '@/lib/constants';

<p>&copy; {getCurrentYear()} {PERSONAL_INFO.name}</p>

// Resume.tsx
import { PERSONAL_INFO, calculateAge } from '@/lib/constants';

<span>Age:</span>
<span>{calculateAge(PERSONAL_INFO.birthYear)} Years</span>
```

---

### Step 7: Create Custom Hooks

**File**: `src/hooks/useScrollTo.ts` (new)

```typescript
import { useRef, RefObject } from "react";

export function useScrollTo<T extends HTMLElement>(): [
  RefObject<T>,
  () => void,
] {
  const ref = useRef<T>(null);

  const scrollToElement = () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return [ref, scrollToElement];
}
```

**Usage in Resume**:

```typescript
// Before:
const ref = useRef<HTMLDivElement>(null);
const handleClick = () => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

// After:
import { useScrollTo } from '@/hooks/useScrollTo';

const [ref, scrollToElement] = useScrollTo<HTMLDivElement>();

<button onClick={scrollToElement}>
  <AiOutlineDown className="animate-bounce z-0" />
</button>
```

---

### Step 8: Organize CSS Animations

**File**: `src/app/styles/animations.css` (new)

```css
/* Loading Animation */
@keyframes pass {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes pass1 {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.loading-letter {
  color: #fff;
  opacity: 0;
  animation: pass 2s ease-in-out infinite;
  letter-spacing: 0.5em;
  text-shadow: 2px 2px 3px #919191;
}

.l {
  animation-delay: 0.2s;
}
.o {
  animation-delay: 0.4s;
}
.a {
  animation-delay: 0.6s;
}
.d {
  animation-delay: 0.8s;
}
.i {
  animation-delay: 1s;
}
.n {
  animation-delay: 1.2s;
}
.g {
  animation-delay: 1.4s;
}
.d1 {
  animation: pass1 2s ease-in-out infinite;
  animation-delay: 1.6s;
}
.d2 {
  animation: pass1 2s ease-in-out infinite;
  animation-delay: 2s;
}

/* Typing Animation */
@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.typing-demo {
  width: 300px;
  animation:
    typing 4s steps(22),
    blink 0.5s step-end infinite alternate;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
}
```

**Update globals.css**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./animations.css";
@import "./utilities.css";

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  display: none;
}

::-webkit-scrollbar:hover {
  display: block;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #000000;
  border-radius: 5px;
}

::-webkit-scrollbar-corner {
  background-color: #f5f5f5;
}

html {
  scroll-behavior: smooth;
}
```

---

### Step 9: Add Prettier Configuration

**File**: `.prettierrc.json` (new)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**File**: `.prettierignore` (new)

```
node_modules
.next
out
dist
build
*.lock
```

**Add to package.json**:

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\""
  },
  "devDependencies": {
    "prettier": "^3.0.0"
  }
}
```

**Install**:

```bash
npm install -D prettier
```

**Run**:

```bash
npm run format
```

---

### Step 10: Add Husky for Pre-commit Hooks

**Install**:

```bash
npm install -D husky lint-staged
npx husky init
```

**File**: `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**File**: `package.json` (add)

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md}": ["prettier --write"]
  }
}
```

---

## 🧪 Testing Checklist

### Code Quality

- [ ] ESLint runs without errors
- [ ] Prettier formats all files
- [ ] No commented code remains
- [ ] All TypeScript interfaces defined
- [ ] No hardcoded values

### Functionality

- [ ] All pages load correctly
- [ ] Loading states work
- [ ] Scroll functionality works (resume)
- [ ] All links work
- [ ] Responsive design maintained

### Build

- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] No console warnings

---

## 📁 Files to Create

### New Files:

- `src/app/components/ui/LoadingSpinner.tsx`
- `src/app/styles/utilities.css`
- `src/app/styles/animations.css`
- `src/types/components.ts`
- `src/lib/constants.ts`
- `src/hooks/useScrollTo.ts`
- `.prettierrc.json`
- `.prettierignore`
- `.husky/pre-commit`

### Modified Files:

- `.eslintrc.json` (uncomment and enhance)
- `src/app/globals.css` (reorganize)
- All `loading.tsx` files (5 files)
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/Footer.tsx`
- `src/app/resume/page.tsx`
- `package.json` (add scripts and dependencies)

### Deleted Files:

- None (but cleaned up)

---

## 📊 Impact Metrics

### Code Reduction

- **Loading components**: 185 lines → 42 lines (77% reduction)
- **Commented code**: ~50 lines removed
- **Duplicated CSS**: Extracted to utilities

### Code Quality

- **ESLint**: Disabled → Enabled with rules
- **Prettier**: None → Configured
- **Pre-commit hooks**: None → Husky + lint-staged
- **Type safety**: Partial → Full interfaces

### Maintainability

- **DRY violations**: Fixed
- **Magic numbers**: Extracted to constants
- **Reusability**: Improved with utilities and hooks

---

## 🎯 Success Metrics

- ✅ Zero ESLint errors
- ✅ Zero Prettier warnings
- ✅ All code formatted consistently
- ✅ No commented code
- ✅ All components typed
- ✅ No hardcoded values
- ✅ Pre-commit hooks working

---

## 🚀 Next Steps

After completing this checkpoint:

1. **Checkpoint 6**: Component Library Creation
2. **Checkpoint 7**: Testing Setup
3. **Checkpoint 8**: Performance Optimization
4. **Checkpoint 9**: Documentation

---

**Estimated Completion**: 3-4 hours  
**Complexity**: Medium-High  
**Impact**: Very High (improves entire codebase quality)
