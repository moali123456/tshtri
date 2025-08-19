import { Suspense } from "react";
import { useTranslations } from "next-intl";
import AdminsTable from "./admins-table";
import TableFilters from "./table-filters";
import { getAdmins } from "@/lib/actions/admin-actions";
import { getRolesList } from "@/lib/actions/roles-actions";
import "./admins-page.scss";

export default async function AdminPage({ searchParams }) {
  // Include all search parameters for filtering
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const pageSize = 8;

  // Pass all search params to getAdmins
  //const adminsData = await getAdmins(currentPage, pageSize, params);

  // const adminsData = await getAdmins(currentPage, pageSize, {
  //   name: params.name,
  //   email: params.email,
  //   phoneNumber: params.phoneNumber,
  //   role: params.role,
  //   active: params.active
  // });

  // Fetch both admins and roles in parallel
  const [adminsData, rolesList] = await Promise.all([
    getAdmins(currentPage, pageSize, {
      name: params.name,
      email: params.email,
      phoneNumber: params.phoneNumber,
      role: params.role,
      active: params.active,
    }),
    getRolesList(),
  ]);

  return (
    <AdminPageContent
      adminsData={adminsData}
      currentPage={currentPage}
      searchParams={params}
      rolesList={rolesList}
    />
  );
}

// Client component to handle translations
function AdminPageContent({
  adminsData,
  currentPage,
  searchParams,
  rolesList,
}) {
  const t = useTranslations("admins");

  return (
    <div id="admins-page">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#4ca161]">{t("admins-page")}</h1>
        <h3 className="text-gray-500">{t("welcome-message")}</h3>
      </div>

      {/* filters */}
      <div className="">
        <TableFilters
          initialSearchParams={searchParams}
          rolesList={rolesList}
        />
      </div>

      {/* table */}
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-muted/50 p-6 rounded-xl">
            <Suspense fallback={<div>Loading table...</div>}>
              <AdminsTable
                initialData={adminsData}
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
