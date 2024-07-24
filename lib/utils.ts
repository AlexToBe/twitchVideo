import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToColor = (str: string) => {
  let hash = 0
  for (let index = 0; index < str.length; index++) {
    hash = str.charCodeAt(index) + ((hash << 5) - hash)
    
  }
  let color = '#'
  for (let  i = 0; i < 3; i++) {
    const value = (hash>>(i*8))&0xff
    color += (`00${value.toString(16)}`).substr(-2)
  }
  return color
}