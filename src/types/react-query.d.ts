import '@tanstack/react-query';
import type { ErrorResponse } from './api';
import type { AxiosError } from 'axios';
import handleMutationError from '@/utils/api';
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
  }
}