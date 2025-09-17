// import { useTranslations } from "next-intl";

// export default function ContactPage() {
//     const t = useTranslations();

//   return (
//     <div id="contact-page">
//       <div className="mb-8">
//         <h1 className="text-3xl font-medium text-[#4ca161]">
//           {t("contacts-page")}
//         </h1>
//         <h3 className="text-gray-500">{t("contacts-welcome-message")}</h3>
//       </div>

//       {/* table */}
//       <div className="grid grid-cols-12 gap-4 mt-5">
//         <div className="col-span-12 md:col-span-12">
//             <div className="bg-muted/50 p-6 rounded-xl"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import ContactsTable from "./contacts-table";
import { getContacts } from "@/lib/actions/contacts/contact-action";
import "./contacts-page.scss";

export default async function ContactPage({ searchParams }) {
  // Include all search parameters for filtering
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const pageSize = 8;

  // Fetch both admins and roles in parallel
  const contactsData = await getContacts(currentPage, pageSize);
  console.log("contacts", contactsData);

  return (
    <ContactPageContent
      contactsData={contactsData}
      currentPage={currentPage}
      searchParams={params}
    />
  );
}

// Client component to handle translations
function ContactPageContent({ contactsData, currentPage, searchParams }) {
  const t = useTranslations();

  return (
    <div id="advertisment-page">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#4ca161]">
          {t("contacts-page")}
        </h1>
        <h3 className="text-gray-500">{t("contacts-welcome-message")}</h3>
      </div>

      {/* table */}
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-muted/50 p-6 rounded-xl">
            <Suspense fallback={<div>Loading table...</div>}>
              <ContactsTable
                initialData={contactsData}
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
