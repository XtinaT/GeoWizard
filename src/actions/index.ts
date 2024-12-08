import axios from "axios";

import { UploadFileProps } from "./models";

const client = axios.create({
  baseURL: "",
  // baseURL: "https://acad-102-88-37-243.ngrok-free.app/platforms-base/",
  timeout: 100000,
  headers: {
    "accept-language": "en",
    appVersion: "0001",
    channel: "WEB",
  },
});

export const uploadFile = async ({ fileToSend, config }: UploadFileProps) => {
  try {
    const { data } = await client.post("https://httpbin.org/post", fileToSend, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return Promise.resolve(data);
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};
