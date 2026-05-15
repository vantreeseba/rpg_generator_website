import { useNavigate, useSearch } from '@tanstack/react-router';

export function useUrlSeed(): [number, (seed: number) => void] {
  const search = useSearch({ strict: false } as any) as { seed?: string | number };
  const navigate = useNavigate();

  const seed = Number(search.seed) || 0;
  const setSeed = (seed: number) =>
    navigate({ to: '.', search: (prev: any) => ({ ...prev, seed }) });

  return [seed, setSeed];
}
