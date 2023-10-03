'use client';

import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation.js';

export function useUrlState<T extends object>(): [T, (state: T) => void] {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = Object.fromEntries(searchParams.entries()) as T;

  return [
    params,
    (state: T) => {
      const params = new URLSearchParams(searchParams);
      for (let [key, value] of Object.entries(state)) {
        params.set(key, value.toString());
      }
      router.replace(`${path}?${params.toString()}`);
    },
  ];
}

export function buildParamsFromObject(newParams: object) {
  const params = new URLSearchParams();
  for (let [key, value] of Object.entries(newParams)) {
    params.set(key, value.toString());
  }

  return params.toString();
}
