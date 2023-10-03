import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomInt(max: number, min = 0) {
  return Math.floor(Math.random() * max) + min;
}

export function stringToSeed(x: string) {
  return x.split('').reduce((acc, cur, i) => {
    return acc + (cur.charCodeAt(0) << i);
  }, 0);
}
