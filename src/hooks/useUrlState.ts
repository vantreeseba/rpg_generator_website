import { useNavigate, useSearch } from '@tanstack/react-router';

export function useUrlState<T extends object>(): [T, (state: Partial<T>) => void] {
  const search = useSearch({ strict: false } as any) as T;
  const navigate = useNavigate();

  const setState = (state: Partial<T>) =>
    navigate({ to: '.', search: (prev: any) => ({ ...prev, ...state }) });

  return [search, setState];
}

export function buildParamsFromObject(params: object): string {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null) urlParams.set(key, String(value));
  }
  return urlParams.toString();
}
