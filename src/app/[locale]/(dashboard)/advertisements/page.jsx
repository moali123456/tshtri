import { Suspense } from "react";
import { useTranslations } from "next-intl";
import AdvertismentTable from "./advertisment-table";
import { getAdvertisements } from "@/lib/actions/advertisement/advertisement-actions";
import "./advertisment-page.scss";

export default async function AdvertisementPage({ searchParams }) {
  // Include all search parameters for filtering
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const pageSize = 8;

  // Fetch both admins and roles in parallel
  const advertisementData = await getAdvertisements(currentPage, pageSize);

  return (
    <AddPageContent
      advertisementData={advertisementData}
      currentPage={currentPage}
      searchParams={params}
    />
  );
}

// Client component to handle translations
function AddPageContent({
  advertisementData,
  currentPage,
  searchParams,
}) {
  const t = useTranslations();
  console.log("texxxt");

  return (
    <div id="advertisment-page">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#4ca161]">
          {t("advertisements-page")}
        </h1>
        <h3 className="text-gray-500">{t("advertisement-welcome-message")}</h3>
      </div>

      {/* table */}
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-muted/50 p-6 rounded-xl">
            <Suspense fallback={<div>Loading table...</div>}>
              <AdvertismentTable
                initialData={advertisementData}
                currentPage={currentPage}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
