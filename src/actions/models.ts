import { AxiosRequestConfig } from "axios";

export type UploadFileProps = { fileToSend: FormData; config: AxiosRequestConfig };

export type ApiResponse = {
  status: number;
  message: string;
  data: string;
};

export type ApiError = {
  status: number;
  message: string;
};
