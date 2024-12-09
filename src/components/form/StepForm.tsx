import React, { useCallback, useState } from "react";

import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as yup from "yup";

import "swiper/css";
import "swiper/css/pagination";
import CustomButton from "../CustomButton";
import CustomTextInput from "./CustomTextInput";
import DateStep from "./DateStep";
import DragAndDropInput from "./DragAndDropInput";
import { mockApi } from "../../actions";
import { ApiError } from "../../actions/models";
import { ModalType, TextInput } from "../../constants";
import Modal from "../Modal";
import StepWrapper from "../StepWrapper";

type StepFormPropsType = {
  onNext: (data: string) => void;
};

const StepForm = ({ onNext }: StepFormPropsType) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [file, setFile] = useState<File>();
  const [isUploaded, setIsUploaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const handleSwiper = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const initialValues = {
    name: "",
    description: "",
    startDate: dayjs().toDate(),
    endDate: dayjs().toDate(),
  };

  const validationSchema = yup.object().shape({
    name: yup.string().max(32, "Name must be 32 characters maximum").required("Name is required"),
    description: yup.string().max(500, "Name must be 500 characters maximum"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsSubmitting(true);
    try {
      const response = await mockApi.createProject({ ...values, file });
      onNext(response.data);
    } catch (error: unknown) {
      setModalContent((error as ApiError).message);
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative z-10 flex flex-col gap-5 w-full h-full max-w-screen-sm mx-auto tracking-wide">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={false}
      >
        {({ values, handleChange, errors, touched, handleBlur, isValid, setFieldValue }) => (
          <Form className="w-full flex flex-col gap-6 items-center">
            <span className="text-16 text-white">Kindly provide the following details</span>
            <div className="flex flex-col gap-4">
              <div className="max-w-[640px] flex">
                <Swiper
                  spaceBetween={24}
                  slidesPerGroup={1}
                  slidesPerView={1.175}
                  centeredSlides
                  centeredSlidesBounds
                  //mousewheel
                  slideToClickedSlide
                  modules={[Mousewheel]}
                  onSwiper={(swiper: SwiperType) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                    setSwiperRef(swiper);
                  }}
                  onSlideChange={handleSwiper}
                  observer={true}
                  observeParents={true}
                  className="max-w-[90vw] kyc min-h-content"
                >
                  <SwiperSlide className="w-[400px]">
                    <StepWrapper>
                      <CustomTextInput
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        label="Project name"
                        disabled={false}
                        type={TextInput.TEXT}
                        error={(touched.name && errors.name) || ""}
                        showError
                        maxLength={23}
                        placeholder={"Enter project name"}
                        onBlur={handleBlur}
                      />
                    </StepWrapper>
                  </SwiperSlide>
                  <SwiperSlide className="w-[400px]">
                    <StepWrapper>
                      <CustomTextInput
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        label="Project description (optional)"
                        disabled={false}
                        type={TextInput.TEXTAREA}
                        error={(touched.description && errors.description) || ""}
                        showError
                        maxLength={500}
                        placeholder={"Enter project description"}
                        onBlur={handleBlur}
                      />
                    </StepWrapper>
                  </SwiperSlide>
                  <SwiperSlide className="w-[400px]">
                    <StepWrapper>
                      <DateStep
                        from={values.startDate ? new Date(values.startDate) : undefined}
                        to={values.endDate ? new Date(values.endDate) : undefined}
                        setFrom={(date) => setFieldValue("startDate", date ? date.toISOString() : undefined)}
                        setTo={(date) => setFieldValue("endDate", date ? date.toISOString() : undefined)}
                        error={
                          (errors.startDate && typeof errors.startDate === "string" ? errors.startDate : "") ||
                          (errors.endDate && typeof errors.endDate === "string" ? errors.endDate : "")
                        }
                      />
                    </StepWrapper>
                  </SwiperSlide>
                  <SwiperSlide className="w-[400px]">
                    <StepWrapper>
                      <DragAndDropInput
                        name="file"
                        setFile={setFile}
                        file={file}
                        isUploaded={isUploaded}
                        setIsUploaded={setIsUploaded}
                        disabled={false}
                        supportedFormats={["geojson"]}
                        maxSize={10}
                        label="Area of Interest"
                      />
                    </StepWrapper>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`kyc-prev w-8 h-8 flex justify-center items-center relative rounded-full bg-white ${
                    isBeginning ? "swiper-button-disabled" : ""
                  }`}
                />
                <div className="flex gap-2 items-center">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-full w-2 h-2 ${activeIndex === index ? "bg-white" : "bg-white opacity-50"}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className={`kyc-next w-8 h-8 flex justify-center  relative rounded-full bg-white ${
                    isEnd ? "swiper-button-disabled" : ""
                  }`}
                />
              </div>
            </div>
            <div className="w-full max-w-[200px] flex mt-4">
              <CustomButton
                text="Submit"
                disabled={!isValid || !file || new Date(values.startDate) > new Date(values.endDate)}
                isLoading={isSubmitting}
              />
            </div>
            <div>{new Date(values.startDate) > new Date(values.endDate)}</div>
          </Form>
        )}
      </Formik>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} type={ModalType.FAIL}>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white text-20 font-bold">Oops!</p>
          <p className="text-white text-center text-16">{modalContent}</p>
        </div>
      </Modal>
    </div>
  );
};

export default StepForm;
