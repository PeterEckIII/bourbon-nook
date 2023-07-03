import { type ChangeEvent, useState } from "react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { BottleErrors, ImageData, RedisFormData } from "~/utils/types";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevronDown";
import { Transition } from "@headlessui/react";
import ImageForm from "./ImageForm";
import Download from "../Icons/Download";
import Button from "../UI/Button";
import { Form, useNavigation } from "@remix-run/react";
import Spinner from "../Icons/Spinner";
import CheckIcon from "../Icons/CheckIcon";

type NewBottleFormProps = {
  data: RedisFormData | null;
  errors: BottleErrors | null;
  imageFetcher: TypedFetcherWithComponents<ImageData>;
  formIsSubmitting: boolean;
  submissionSuccessful: boolean;
  imageIsSubmitting: boolean;
};

export default function NewBottleForm({
  data,
  errors,
  imageFetcher,
  imageIsSubmitting,
  submissionSuccessful,
  formIsSubmitting,
}: NewBottleFormProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigation = useNavigation();
  const init = navigation.state === "idle";
  const actionSubmission = navigation.state === "submitting";

  const redisId = 123;

  const handlePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files)
      throw new Error(`Error reading files from import`);
    if (e.currentTarget.files && e.currentTarget.files[0] !== undefined) {
      console.log(`Handling preview image`);
      const newUrl = URL.createObjectURL(e.currentTarget.files[0]);
      setPreviewUrl(newUrl);
    } else {
      console.log(`Cannot handle preview image`);
      setPreviewUrl("");
    }
  };

  const handleClearSelection = () => {
    setPreviewUrl("");
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold text-blue-500">Add Bottle</h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <Form method="POST" encType="multipart/form-data" action="/test">
            <div className="flex flex-col">
              {/* FIRST COLUMN */}
              <div className="relative z-0 my-4">
                <input type="hidden" name="redisId" value={redisId || null} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                >
                  Bottle Name
                </label>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 w-3/5">
                  <label htmlFor="status" className="sr-only">
                    Bottle Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-900 bg-transparent px-0 py-2.5 text-sm text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue="Select a status"
                  >
                    <option>Select a status</option>
                    <option value="OPENED">Opened</option>
                    <option value="CLOSED">Closed</option>
                    <option value="FINISHED">Finished</option>
                  </select>
                </div>
                <div className="relative z-0 my-4 w-2/5">
                  <input
                    type="text"
                    id="type"
                    name="type"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="type"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Type
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="distiller"
                    name="distiller"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="distiller"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Distiller
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="producer"
                    name="producer"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="producer"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Producer
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="country"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Country
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="region"
                    name="region"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="region"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Region
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="color"
                    name="color"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="color"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Color
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="price"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Price
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="proof"
                    name="proof"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="proof"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Proof
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="alcoholPercent"
                    name="alcoholPercent"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="alcoholPercent"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    ABV
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="age"
                    name="age"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="age"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Age
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="size"
                    name="size"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="size"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Bottle Size
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="finishing"
                    name="finishing"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="finishing"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Finishing Cask(s)
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              {/* SECOND COLUMN */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="year"
                    name="year"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="year"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Year
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="batch"
                    name="batch"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="batch"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Batch #
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="text"
                    id="barrel"
                    name="barrel"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="barrel"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Barrel #
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row md:mt-3">
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="date"
                    id="openDate"
                    name="openDate"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="openDate"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Open Date
                  </label>
                </div>
                <div className="relative z-0 my-4 sm:w-1/3">
                  <input
                    type="date"
                    id="killDate"
                    name="killDate"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600"
                    placeholder=" "
                  />
                  <label
                    htmlFor="killDate"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600"
                  >
                    Kill Date
                  </label>
                </div>
              </div>
              <div className="image">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="img"
                    className="float-left clear-both mx-2 my-4 w-full cursor-pointer select-none rounded-lg border-[3px] border-gray-300 bg-white px-6 py-8 text-center transition-all duration-200 ease-linear hover:border-blue-500"
                  >
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      className="hidden"
                      id="img"
                      onChange={(e) => handlePreviewChange(e)}
                    />
                    <div className="">
                      {previewUrl !== "" && init ? (
                        <div className="">
                          <img
                            src={previewUrl}
                            alt={`The bottle you uploaded]`}
                            className="mx-auto my-0 h-40 w-40 object-cover lg:h-[600px] lg:w-[400px]"
                          />
                        </div>
                      ) : actionSubmission ? (
                        <div>
                          <Spinner />
                        </div>
                      ) : (
                        <div className="clear-both mb-2 ml-0 mr-0 mt-0 w-full">
                          <Download classes="h-10 w-10 my-4 mx-auto" />
                          <div className="float-left clear-both block w-full">
                            Select an image from your device
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="focus:shadow-outline mr-2 h-10 rounded-lg border border-blue-600 px-5 text-blue-700 transition-colors duration-150 hover:bg-blue-500 hover:text-blue-100"
                      disabled={previewUrl === ""}
                      aria-disabled={previewUrl === ""}
                    >
                      Clear Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-right">
              <Button primary type="submit" callToAction="Add Bottle" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

/*
{previewUrl === "" ? (
                  <>
                    <div className="clear-both my-0 flex w-full items-center justify-center">
                      <label
                        htmlFor="imageUrl"
                        className="float-left clear-both mx-2 my-2 w-full cursor-pointer select-none rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center transition-all duration-200 ease-linear hover:border-blue-500"
                      >
                        <input
                          type="file"
                          name="imageUrl"
                          id="imageUrl"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePreviewChange(e)}
                        />
                        <div>
                          <div className="clear-both mb-2 ml-0 mr-0 mt-0 w-full">
                            <Download classes="h-10 w-10 my-4 mx-auto" />
                            <div className="float-left clear-both block w-full">
                              Select an image from your device
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={previewUrl}
                      alt="The bottle you uploaded"
                      className="mx-auto my-0 h-40 w-40"
                    />
                    <input type="hidden" name="img" value={previewUrl} />
                  </>
                )}
*/

/*
{submissionSuccessful ? (
                  <imageFetcher.Form
                    encType="multipart/form-data"
                    method="POST"
                    action="/services/image"
                  >
                    <h4 className="text-sm">Bottle Image</h4>
                    <div className="clear-both my-0 flex w-full items-center justify-center">
                      <label
                        htmlFor="image"
                        className="float-left clear-both mx-2 my-2 w-full cursor-pointer select-none rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center transition-all duration-200 ease-linear hover:border-blue-500"
                      >
                        <input
                          type="file"
                          name="img"
                          id="image"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => 1}
                        />
                        <div>
                          <div className="clear-both mb-2 ml-0 mr-0 mt-0 w-full">
                            <Download classes="h-10 w-10 my-4 mx-auto" />
                            <div className="float-left clear-both block w-full">
                              Select an image from your device
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={handleClearSelection}
                          className="focus:shadow-outline mr-2 h-10 rounded-lg border border-blue-600 px-5 text-blue-700 transition-colors duration-150 hover:bg-blue-500 hover:text-blue-100"
                          disabled={previewUrl === ""}
                          aria-disabled={previewUrl === ""}
                        >
                          Clear Image
                        </button>
                      </div>
                    </div>
                  </imageFetcher.Form>
                ) : (
                  <input type="hidden" name="imageUrl" value="" />
                )}
*/

/*
{previewUrl !== "" && init ? (
                            <div className="">
                              <img
                                src={previewUrl}
                                alt={`The bottle you uploaded]`}
                                className="mx-auto my-0"
                              />
                            </div>
                          ) : isActionSubmission ? (
                            <div>
                              <Spinner />
                            </div>
                          ) : isDone ? (
                            <div
                              id="uploadConfirmation"
                              className="border-black-100 m-4 flex items-center justify-center rounded-md p-4 text-green-700"
                            >
                              <CheckIcon />
                              <span>&nbsp;</span>Successfully uploaded!
                            </div>
                          ) : (
                            
                          )}
*/

/*

<div className="clear-both my-0 flex w-full items-center justify-center">
                      <label
                        htmlFor="image"
                        className="float-left clear-both mx-2 my-2 w-full cursor-pointer select-none rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 text-center transition-all duration-200 ease-linear hover:border-blue-500"
                      >
                        <input
                          type="file"
                          name="img"
                          id="image"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => 1}
                        />
                        <div>
                          <div className="clear-both mb-2 ml-0 mr-0 mt-0 w-full">
                            <Download classes="h-10 w-10 my-4 mx-auto" />
                            <div className="float-left clear-both block w-full">
                              Select an image from your device
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={handleClearSelection}
                          className="focus:shadow-outline mr-2 h-10 rounded-lg border border-blue-600 px-5 text-blue-700 transition-colors duration-150 hover:bg-blue-500 hover:text-blue-100"
                          disabled={previewUrl === ""}
                          aria-disabled={previewUrl === ""}
                        >
                          Clear Image
                        </button>
                      </div>
                    </div>
*/
