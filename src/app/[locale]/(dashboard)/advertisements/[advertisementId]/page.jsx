import { getTranslations } from "next-intl/server";
import {
  getAdvertisementDetails,
  updateAdvertisementDetails,
  getAdAttributesDetails,
  getAdImages,
} from "@/lib/actions/advertisement/ad-details";
import AdvertisementDetailsClient from "./AdvertisementDetailsClient";

export default async function AdvertisementDetails({ params, searchParams }) {
  const { advertisementId, locale } = params;
  const searchPar = await searchParams;
  const currentPage = Number(searchPar?.page) || 1;
  const pageSize = 8;
  const t = await getTranslations();

  // Fetch advertisement details
  const result = await getAdvertisementDetails(advertisementId);
  // Fetch AttributesDetails
  const attributesResult = await getAdAttributesDetails(
    advertisementId,
    currentPage,
    pageSize
  );
  // Fetch AdImages
  const adImagesResult = await getAdImages(
    advertisementId,
    currentPage,
    pageSize
  );

  if (!result.success) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{t("error-fetching-advertisement")}</p>
          <p>{result.error}</p>
        </div>
      </div>
    );
  }

  const advertisement = result?.data?.data;
  const adAttributes = attributesResult?.data;
  const adImages = adImagesResult?.data;
  console.log("add details", advertisement);
  console.log("adAttributes", adAttributes);
  console.log("adImages", adImages);

  return (
    <AdvertisementDetailsClient
      advertisement={advertisement}
      advertisementId={advertisementId}
      locale={locale}
      updateAction={updateAdvertisementDetails}
      adAttributes={adAttributes}
      adImages={adImages}
      currentPage={currentPage}
      searchParams={searchPar}
    />
  );
}
