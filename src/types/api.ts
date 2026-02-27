export type SuccessResponse<T> = {
  success: true;
  status: number;
  message: string;
  data: T;
}

export type ErrorResponse = {
  success: false;
  status: number;
  message: string;
  errors: ApiError[];
}

export type ApiError = {
  code: string;
  message: string;
}

export type Response<T> = SuccessResponse<T>;