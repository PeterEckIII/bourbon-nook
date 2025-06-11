import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    email.length > 5 &&
    email.includes('@') &&
    email.includes('.')
  );
}
