import { AxiosError, AxiosResponse } from "axios";

export type SuccessResponse = AxiosResponse<{ message: string }>
export type ErrorResponse = AxiosError<{ message: string; error: unknown }>
