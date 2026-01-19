# Checkpoint 3: Implement Contact Page

**Priority**: 🟡 High  
**Estimated Time**: 3-4 hours  
**Dependencies**: Checkpoint 1 (Layout Refactor)  
**Status**: 📋 Planned

---

## 🎯 Objective

Mengimplementasikan halaman Contact dengan form yang fungsional, validasi, dan integrasi email service untuk memudahkan visitor menghubungi Anda.

---

## 🔍 Current State

**File**: `src/app/contact/page.tsx`

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

## 🎨 Design Concept

### Layout Structure

```
┌─────────────────────────────────────────┐
│         GET IN TOUCH                    │
│   Let's work together on your next      │
│         amazing project                 │
├──────────────────┬──────────────────────┤
│                  │                      │
│  Contact Form    │   Contact Info       │
│                  │                      │
│  - Name          │   📧 Email           │
│  - Email         │   📱 Phone           │
│  - Subject       │   📍 Location        │
│  - Message       │   🔗 Social Links    │
│                  │                      │
│  [Send Message]  │   ⏰ Availability    │
│                  │                      │
└──────────────────┴──────────────────────┘
```

---

## 📦 Dependencies

### Required Packages

```bash
npm install react-hook-form zod @hookform/resolvers
npm install react-hot-toast  # For notifications
npm install @react-email/components resend  # For email service
```

---

## 🧩 Component Structure

```
src/app/
├── components/
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   └── SocialLinks.tsx
│   └── ui/
│       ├── Input.tsx
│       ├── Textarea.tsx
│       └── Button.tsx
├── api/
│   └── contact/
│       └── route.ts          # API endpoint for form submission
└── contact/
    └── page.tsx
```

---

## 📊 Form Validation Schema

**File**: `src/lib/validations/contact.ts` (new)

```typescript
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

---

## 🎨 UI Components

### 1. Input Component

**File**: `src/app/components/ui/Input.tsx`

```typescript
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
            focus:outline-none focus:ring-2 transition-all
            ${error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-gray-800 focus:border-brandColor focus:ring-brandColor/50'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
```

---

### 2. Textarea Component

**File**: `src/app/components/ui/Textarea.tsx`

```typescript
import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 bg-gray-900 border rounded-lg text-white
            focus:outline-none focus:ring-2 transition-all resize-none
            ${error
              ? 'border-red-500 focus:ring-red-500/50'
              : 'border-gray-800 focus:border-brandColor focus:ring-brandColor/50'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
```

---

### 3. Button Component

**File**: `src/app/components/ui/Button.tsx`

```typescript
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-brandColor text-black hover:bg-brandColor/90',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'border-2 border-brandColor text-brandColor hover:bg-brandColor hover:text-black',
  };

  return (
    <button
      className={`
        px-6 py-3 rounded-lg font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
```

---

### 4. ContactForm Component

**File**: `src/app/components/contact/ContactForm.tsx`

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validations/contact';
import Input from '@/app/components/ui/Input';
import Textarea from '@/app/components/ui/Textarea';
import Button from '@/app/components/ui/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again or email me directly.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Name"
        placeholder="Your name"
        {...register('name')}
        error={errors.name?.message}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="your.email@example.com"
        {...register('email')}
        error={errors.email?.message}
        required
      />

      <Input
        label="Subject"
        placeholder="What's this about?"
        {...register('subject')}
        error={errors.subject?.message}
        required
      />

      <Textarea
        label="Message"
        placeholder="Tell me about your project or question..."
        rows={6}
        {...register('message')}
        error={errors.message?.message}
        required
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Send Message
      </Button>
    </form>
  );
}
```

---

### 5. ContactInfo Component

**File**: `src/app/components/contact/ContactInfo.tsx`

```typescript
import { AiOutlineMail, AiOutlineEnvironment, AiOutlineClockCircle } from 'react-icons/ai';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: AiOutlineMail,
      label: 'Email',
      value: 'sariphidayatullah170701@gmail.com',
      link: 'mailto:sariphidayatullah170701@gmail.com',
    },
    {
      icon: AiOutlineEnvironment,
      label: 'Location',
      value: 'Jakarta, Indonesia',
    },
    {
      icon: AiOutlineClockCircle,
      label: 'Availability',
      value: 'Open to opportunities',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
        <p className="text-gray-400">
          Feel free to reach out! I'm always open to discussing new projects,
          creative ideas, or opportunities to be part of your vision.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-brandColor/10 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-brandColor" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{detail.label}</p>
                {detail.link ? (
                  <a
                    href={detail.link}
                    className="text-white hover:text-brandColor transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-white">{detail.value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="pt-6 border-t border-gray-800">
        <p className="text-sm text-gray-400 mb-4">Connect with me</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/sya17"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-3 rounded-lg hover:bg-brandColor/10 hover:text-brandColor transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/sarip-hidayatullah-75a3231aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-3 rounded-lg hover:bg-brandColor/10 hover:text-brandColor transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

### 6. Main Contact Page

**File**: `src/app/contact/page.tsx`

```typescript
import ContactForm from '@/app/components/contact/ContactForm';
import ContactInfo from '@/app/components/contact/ContactInfo';

export const metadata = {
  title: 'Contact - Sarip Hidayatullah',
  description: 'Get in touch with me for collaborations, opportunities, or just to say hi!',
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          GET IN TOUCH
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to chat?
          I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <ContactForm />
        </div>

        {/* Contact Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <ContactInfo />
        </div>
      </div>

      {/* Additional CTA */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 mb-4">
          Prefer email? Reach me directly at
        </p>
        <a
          href="mailto:sariphidayatullah170701@gmail.com"
          className="text-brandColor text-xl font-bold hover:underline"
        >
          sariphidayatullah170701@gmail.com
        </a>
      </div>
    </div>
  );
}
```

---

## 🔌 API Route Implementation

### Contact API Endpoint

**File**: `src/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = contactFormSchema.parse(body);

    // Send email using Resend
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your domain
      to: "sariphidayatullah170701@gmail.com",
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <h3>Message:</h3>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
```

---

## 🔐 Environment Variables

**File**: `.env.local` (create this file)

```env
RESEND_API_KEY=your_resend_api_key_here
```

**Note**: Add `.env.local` to `.gitignore` (already included by default)

---

## 🎨 Toast Notifications Setup

**File**: `src/app/layout.tsx` (update)

```typescript
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-mono bg-black">
        <Header />
        <main className="flex-1 w-full py-4 px-6 overflow-y-auto">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1C2541',
              color: '#fff',
              border: '1px solid #5BC0BE',
            },
          }}
        />
      </body>
    </html>
  );
}
```

---

## 🧪 Testing Checklist

### Form Validation:

- [ ] Name field validates (min 2, max 50 chars)
- [ ] Email field validates format
- [ ] Subject field validates (min 5, max 100 chars)
- [ ] Message field validates (min 10, max 1000 chars)
- [ ] Required fields show error when empty
- [ ] Error messages display correctly

### Form Submission:

- [ ] Submit button shows loading state
- [ ] Success toast appears on successful submission
- [ ] Error toast appears on failed submission
- [ ] Form resets after successful submission
- [ ] Email received in inbox

### UI/UX:

- [ ] Input fields have focus states
- [ ] Hover effects work
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Contact info displays correctly
- [ ] Social links work

### Accessibility:

- [ ] Form labels properly associated
- [ ] Required fields marked
- [ ] Error messages announced
- [ ] Keyboard navigation works
- [ ] Focus visible

---

## 📁 Files to Create

### New Directories:

- `src/lib/validations/`
- `src/app/api/contact/`
- `src/app/components/contact/`

### New Files:

- `src/lib/validations/contact.ts`
- `src/app/api/contact/route.ts`
- `src/app/components/contact/ContactForm.tsx`
- `src/app/components/contact/ContactInfo.tsx`
- `src/app/components/ui/Input.tsx`
- `src/app/components/ui/Textarea.tsx`
- `src/app/components/ui/Button.tsx`
- `.env.local`

### Modified Files:

- `src/app/contact/page.tsx`
- `src/app/layout.tsx` (add Toaster)
- `package.json` (add dependencies)

---

## 🎯 Success Metrics

- ✅ Contact form functional
- ✅ Form validation works
- ✅ Email sending works
- ✅ Toast notifications work
- ✅ Responsive design
- ✅ Accessible form
- ✅ Professional design

---

## 🚀 Alternative: Simple Email Link

If you want to skip the email service integration for now:

```typescript
// Simplified version without API
const onSubmit = (data: ContactFormData) => {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  );
  window.location.href = `mailto:sariphidayatullah170701@gmail.com?subject=${subject}&body=${body}`;
};
```

---

**Estimated Completion**: 3-4 hours  
**Complexity**: Medium  
**Impact**: High (enables direct communication)
