import axios from "axios";

import { ApiResponse, UploadFileProps } from "./models";
import { geoJsonData } from "../constants";
import { Data } from "../models/models";

const client = axios.create({
  baseURL: "",
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

export const mockApi = {
  createProject: async (projectData: Data): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { name, startDate, endDate, file } = projectData;

        if (!name || name.length > 32) {
          reject({ status: 400, message: "Name is required and must be under 32 characters." });
        } else if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
          reject({ status: 400, message: "Invalid date range. Start date must be before end date." });
        } else if (!file) {
          reject({ status: 400, message: "Geojson file is required." });
        } else {
          const randomOutcome = Math.random() < 0.5;
          if (randomOutcome) {
            resolve({
              status: 201,
              message: "Project successfully created.",
              data: geoJsonData,
            });
          } else {
            reject({ status: 500, message: "Something went wrong. Please check all the details and try again later" });
          }
        }
      }, 1000);
    });
  },
};
