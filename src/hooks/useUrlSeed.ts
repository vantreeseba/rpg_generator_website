'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation.js';

export function useUrlSeed(): [number, Function] {
  const path = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  return [
    parseInt(params.get('seed') || '0'),
    (seed: string) => router.replace(`${path}?seed=${seed || 0}`),
  ];
}
