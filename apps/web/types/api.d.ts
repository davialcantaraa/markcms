import { AxiosError, AxiosResponse } from "axios";

export type SuccessResponse = AxiosResponse<{ message: string }>
export type SuccessIdResponse = AxiosResponse<{ message: string; id: string }>
export type SuccessTokenResponse = AxiosResponse<{ message: string; token: string }>
export type ErrorResponse = AxiosError<{ message: string; error: unknown }>
