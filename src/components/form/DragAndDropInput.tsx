import React, { ReactNode, useEffect, useRef, useState } from "react";

import axios, { AxiosProgressEvent, AxiosRequestConfig, Canceler } from "axios";

import ErrorField from "./ErrorField";
import { uploadFile } from "../../actions";
import { closeIcon, deleteIcon, uploaded, uploadFailed } from "../../assets/icons/icons";
import { fileFormats, Status } from "../../constants";

type InputPropsType = {
  name: string;
  setFile: (value: File | undefined) => void;
  file: File | undefined;
  isUploaded: boolean;
  setIsUploaded: (value: boolean) => void;
  disabled: boolean;
  supportedFormats: string[];
  maxSize: number;
  label: ReactNode;
};

const DragAndDropInput = ({
  name,
  file,
  isUploaded,
  disabled,
  setFile,
  setIsUploaded,
  supportedFormats,
  maxSize,
  label,
}: InputPropsType) => {
  const CancelToken = axios.CancelToken;

  const [status, setStatus] = useState<Status>(Status.DEFAULT);
  const [errorMessage, setErrorMessage] = useState("Incorrect format");
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [isFormatCorrect, setFormat] = useState(true);

  const cancelFileUpload = useRef<Canceler | null>(null);
  const formData = new FormData();

  const checkFileConfig = (doc: File) => {
    const allowedTypes: string[] = supportedFormats.map((format) => fileFormats[format as keyof typeof fileFormats]);
    const format = doc.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(doc.type) && (!format || !supportedFormats.includes(format))) {
      setErrorMessage(`Format must be ${supportedFormats.join(", ")}`);
      setFormat(false);
      return false;
    }

    const maxSizeBytes = maxSize * 1024 * 1024;
    if (doc.size > maxSizeBytes) {
      setErrorMessage(`Max file size - ${maxSize}MB.`);
      setFormat(false);
      return false;
    }

    setFormat(true);
    return true;
  };

  const handleUploadingProcess = (fileToSend: FormData) => {
    setStatus(Status.LOADING);

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const percentCompleted = Math.round(((progressEvent.loaded ?? 0) / (progressEvent.total ?? 1)) * 100);
        setUploadedPercentage(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      cancelToken: new CancelToken((cancel) => (cancelFileUpload.current = cancel)),
    };

    const handleUploadResponse = () => {
      setFile(file);
      setIsUploaded(true);
    };

    const handleUpload = uploadFile({ fileToSend, config });

    handleUpload
      .then(handleUploadResponse)
      .catch(() => setIsUploaded(false))
      .finally(() => setStatus(Status.LOADED));
  };

  useEffect(() => {
    if (file && checkFileConfig(file)) {
      formData.append("uploadFile", file);
      handleUploadingProcess(formData);
    }
    return () => {
      if (cancelFileUpload.current) {
        cancelFileUpload.current();
      }
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.target;
    if (files && files.length) {
      setFile(files[0]);
      e.target.value = "";
    }
  };
  const handleFileDelete = () => {
    setStatus(Status.DEFAULT);
    setFile(undefined);
    setIsUploaded(false);
  };
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      const { files } = e.dataTransfer;
      if (files && files.length) {
        setFile(e.dataTransfer.files[0]);
      }
    }
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        className={`${disabled ? "opacity-25" : ""}`}
      >
        <div className="flex flex-col gap-3">
          <span className="text-14 font-medium text-white">{label}</span>
          <div className="flex gap-5 items-center">
            <div className="w-full flex justify-center items-center rounded-full px-8 py-9 gap-6 bg-black bg-opacity-40">
              {status === Status.LOADING && (
                <>
                  <div className="flex gap-2 items-center">
                    <span className="text-16 font-medium text-white">{file?.name}</span>
                  </div>
                  <div className="grow flex items-center rounded-[120px] p-0.5 bg-white bg-opacity-15">
                    <p className="h-2 rounded-[199px] bg-white" style={{ width: `${uploadedPercentage}%` }} />
                  </div>
                </>
              )}

              {status === Status.LOADED && (
                <>
                  {isUploaded ? (
                    <div className="flex w-full items-center justify-between">
                      <span className="text-16 font-medium text-white">{file?.name}</span>
                      {uploaded}
                    </div>
                  ) : (
                    <div className="flex w-full justify-between items-center">
                      <span className="text-16 font-medium text-white">File has not been uploaded</span>
                      {uploadFailed}
                    </div>
                  )}
                </>
              )}

              {status === Status.DEFAULT && (
                <div className="flex gap-2 items-center">
                  <span className="text-12 font-medium text-white">Drag & Drop</span>
                  <span className="text-12 font-normal text-white">Or</span>
                  <label htmlFor={name}>
                    <div
                      className={`rounded-full text-12 font-medium transition-all py-2 px-3 text-white bg-white bg-opacity-15 ${disabled ? "cursor-default" : "cursor-pointer hover:opacity-80"}`}
                    >
                      Browse
                    </div>
                  </label>
                </div>
              )}
            </div>

            {status === Status.LOADING && (
              <div
                className="flex justify-center items-center gap-2 max-h-fit rounded-full p-4 cursor-pointer bg-black bg-opacity-40"
                onClick={() => {
                  if (cancelFileUpload.current) {
                    cancelFileUpload.current();
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  {closeIcon}
                </svg>
              </div>
            )}

            {status === Status.LOADED && (
              <div
                className="flex justify-center items-center gap-2 rounded-full max-h-fit p-4 cursor-pointer bg-black bg-opacity-40"
                onClick={handleFileDelete}
              >
                {isUploaded ? (
                  deleteIcon
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    {closeIcon}
                  </svg>
                )}
              </div>
            )}
          </div>
          {
            <span className="text-12 font-normal text-white">
              Supported formats: {supportedFormats.join(", ")} | Max file size: {maxSize}MB
            </span>
          }
        </div>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          disabled={disabled}
          style={{ display: "none" }}
          id={name}
        />
      </div>
      {!isFormatCorrect && <ErrorField message={errorMessage} />}
    </>
  );
};

export default DragAndDropInput;
