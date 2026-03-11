import { AxiosError } from 'axios';

export const handleApiError = (err: unknown): string => {
  if (err instanceof AxiosError && err.response?.data?.errors) {
    return err.response.data.errors[0]?.message || 'Unknown error';
  }
  return 'An unexpected error occurred';
};
