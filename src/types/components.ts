import { ReactNode } from 'react';

// Layout Components
export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

// UI Components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
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

// Loading Component
export interface LoadingSpinnerProps {
  className?: string;
}
