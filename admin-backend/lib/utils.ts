import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { config } from './config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the full URL for an image
 * @param imagePath - The image path (can be relative or full URL)
 * @returns Full URL with backend base URL if needed
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/placeholder.svg"
  }
  
  // If already a full URL (http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it's a local path (starts with /), add backend URL
  if (imagePath.startsWith('/')) {
    return `${config.api.backendUrl}${imagePath}`
  }
  
  // Otherwise, assume it needs backend URL prefix
  return `${config.api.backendUrl}/${imagePath}`
}
