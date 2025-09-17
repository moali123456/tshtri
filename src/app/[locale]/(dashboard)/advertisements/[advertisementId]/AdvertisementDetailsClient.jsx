"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import AttributesTable from "./attributes-table";
import AdImagesTable from "./images-table";

export default function AdvertisementDetailsClient({
  advertisement,
  advertisementId,
  updateAction,
  adAttributes,
  adImages,
  searchParams,
  currentPage,
}) {
  const router = useRouter();
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    sellerName: advertisement.sellerName || "",
    sellerPhone: advertisement.sellerPhone || "",
    category: advertisement.category || "",
    city: advertisement.city || "",
    price: advertisement.price || "",
    isPublished: advertisement.isPublished || false,
    isNegotionable: advertisement.isNegotionable || false,
    isSold: advertisement.isSold || false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the server action to update the advertisement
      const result = await updateAction(advertisementId, formData);

      if (result.success) {
        // Refresh the page to show updated data
        router.refresh();
        setIsEditing(false);
      } else {
        console.error("Failed to update advertisement:", result.error);
      }
    } catch (error) {
      console.error("Error updating advertisement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="ad-details-page" className="p-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-[#4ca161]">
            {t("edit-advertisement")}
          </h1>
          <h3 className="text-gray-500">
            {t("advertisement-welcome-message")}
          </h3>
        </div>
        {/* <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-[#4ca161] text-white px-4 py-2 rounded-md hover:bg-[#3a8a4f] transition-colors"
        >
          {isEditing ? t("cancel") : t("edit")}
        </button> */}
      </div>

      <div className="mt-5 bg-muted/50 p-6 rounded-xl">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-12">
            <div className="">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("seller-name")}
                    </label>
                    <input
                      type="text"
                      name="sellerName"
                      disabled
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("seller-phone")}
                    </label>
                    <input
                      type="text"
                      disabled
                      name="sellerPhone"
                      value={formData.sellerPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("category-name")}
                    </label>
                    <input
                      type="text"
                      name="category"
                      disabled
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("price")}
                    </label>
                    <input
                      type="number"
                      name="price"
                      disabled
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed disabled:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {t("published")}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isNegotionable"
                      disabled
                      checked={formData.isNegotionable}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161] disabled:cursor-not-allowed"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {t("negotiable")}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isSold"
                      disabled
                      checked={formData.isSold}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161] disabled:cursor-not-allowed"
                    />
                    <span className="ml-2 text-sm text-gray-500">
                      {t("sold")}
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#4ca161] text-white px-4 py-2 rounded-md hover:bg-[#3a8a4f] transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <MoonLoader size={14} color="#fff" /> {t("saving")}
                      </>
                    ) : (
                      t("save-changes")
                    )}
                  </button>

                  <Link
                    href="/advertisements"
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {t("back")}
                  </Link>
                </div>
              </form>
            </div>
            {/* {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("seller-name")}
                    </label>
                    <input
                      type="text"
                      name="sellerName"
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("seller-phone")}
                    </label>
                    <input
                      type="text"
                      name="sellerPhone"
                      value={formData.sellerPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("category-name")}
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("price")}
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {t("published")}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isNegotionable"
                      checked={formData.isNegotionable}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {t("negotiable")}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isSold"
                      checked={formData.isSold}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#4ca161] focus:ring-[#4ca161]"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {t("sold")}
                    </span>
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#4ca161] text-white px-4 py-2 rounded-md hover:bg-[#3a8a4f] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t("saving") : t("save-changes")}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("seller-name")}
                  </h3>
                  <p className="mt-1">{advertisement.sellerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("seller-phone")}
                  </h3>
                  <p className="mt-1">{advertisement.sellerPhone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("category-name")}
                  </h3>
                  <p className="mt-1">{advertisement.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("city")}
                  </h3>
                  <p className="mt-1">{advertisement.city}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("price")}
                  </h3>
                  <p className="mt-1">{advertisement.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("date")}
                  </h3>
                  <p className="mt-1">{advertisement.createdAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("published")}
                  </h3>
                  <p className="mt-1">
                    {advertisement.isPublished ? (
                      <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("published")}
                      </span>
                    ) : (
                      <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("not-published")}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("negotiable")}
                  </h3>
                  <p className="mt-1">
                    {advertisement.isNegotionable ? (
                      <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("negotiable")}
                      </span>
                    ) : (
                      <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("not-negotiable")}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {t("sold")}
                  </h3>
                  <p className="mt-1">
                    {advertisement.isSold ? (
                      <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("sold")}
                      </span>
                    ) : (
                      <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                        {t("not-sold")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-12 gap-4 mt-5">
        {/* Attributes Table */}
        <div className="col-span-12 md:col-span-7">
          <div className="bg-muted/50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-[#4ca161]">
              {t("ad-attributes")}
            </h3>
            <AttributesTable
              initialData={adAttributes}
              currentPage={currentPage}
              searchParams={searchParams}
            />
          </div>
        </div>

        {/*  */}
        <div className="col-span-12 md:col-span-5">
          <div className="bg-muted/50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-[#4ca161]">
              {t("ad-images")}
            </h3>
            <AdImagesTable
              initialData={adImages}
              currentPage={currentPage}
              searchParams={searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
