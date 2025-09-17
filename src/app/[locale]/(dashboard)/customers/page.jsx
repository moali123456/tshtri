import { Suspense } from "react";
import { useTranslations } from "next-intl";
import CustomersTable from "./customers-table";
import CustomersFilter from "./customers-filter";
import { getCustomers } from "@/lib/actions/customer/customer-actions";
import { getRolesList } from "@/lib/actions/roles-actions";
import "./customers-page.scss";

export default async function CustomerPage({ searchParams }) {
  // Include all search parameters for filtering
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const pageSize = 8;

  // Fetch both admins and roles in parallel
  const [customersData, rolesList] = await Promise.all([
    getCustomers(currentPage, pageSize, {
      name: params.name,
      email: params.email,
      phoneNumber: params.phoneNumber,
      role: params.role,
      active: params.active,
    }),
    getRolesList(),
  ]);

  return (
    <CustomerPageContent
      customersData={customersData}
      currentPage={currentPage}
      searchParams={params}
      rolesList={rolesList}
    />
  );
}

// Client component to handle translations
function CustomerPageContent({
  customersData,
  currentPage,
  searchParams,
  rolesList,
}) {
  const t = useTranslations();
  console.log("texxxt");

  return (
    <div id="customers-page">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#4ca161]">
          {t("customers-page")}
        </h1>
        <h3 className="text-gray-500">{t("customer-welcome-message")}</h3>
      </div>

      {/* filters */}
      <div className="">
        <CustomersFilter
          initialSearchParams={searchParams}
          rolesList={rolesList}
        />
      </div>

      {/* table */}
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-muted/50 p-6 rounded-xl">
            <Suspense fallback={<div>Loading table...</div>}>
              <CustomersTable
                initialData={customersData}
                currentPage={currentPage}
                searchParams={searchParams}
                rolesList={rolesList}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
