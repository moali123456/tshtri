// "use client";

// import { useEffect, useState } from "react";
// import { useTransition } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useTranslations, useLocale } from "next-intl";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Eye, EyeClosed } from "lucide-react";
// import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
// import { PuffLoader } from "react-spinners";
// import ViewContactModal from "./view-contact-modal";

// export default function ContactsTable({
//   initialData,
//   currentPage,
//   searchParams,
// }) {
//   const t = useTranslations();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isPending, startTransition] = useTransition();
//   const [isClientPending, setClientPending] = useState(false);
//   const [viewingContact, setViewingContact] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger

//   const locale = useLocale();
//   const isRTL = locale === "ar";

//   const handleRefresh = () => {
//     setRefreshTrigger((prev) => prev + 1); // Increment refresh trigger
//   };

//   const handleAdminAdded = () => {
//     startTransition(() => {
//       router.refresh();
//     });
//   };

//   const handleAdminUpdated = () => {
//     handleAdminAdded(); // Refresh the table
//     setViewingContact(null);
//     setIsViewModalOpen(false);
//   };

//   const handleViewClick = (contact) => {
//     setViewingContact(contact);
//     setIsViewModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsViewModalOpen(false);
//     handleRefresh(); // Trigger refresh when modal closes
//   };

//   const contacts = initialData?.items || [];
//   const totalPages = initialData?.totalPages || 1;

//   const handlePageChange = (newPage) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", newPage.toString());

//     startTransition(() => {
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     });
//   };

//   useEffect(() => {
//     setClientPending(isPending);
//   }, [isPending]);

//   // Refresh data when refreshTrigger changes
//   useEffect(() => {
//     if (refreshTrigger > 0) {
//       handleAdminAdded();
//     }
//   }, [refreshTrigger]);

//   return (
//     <div className="pt-1 pb-4 px-2">
//       <div className="mb-5 w-full flex justify-end"></div>

//       <Table className="admins-table">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               ID
//             </TableHead>
//             <TableHead className="w-[200px] bg-white font-semibold text-[15px] text-start">
//               {t("name")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("email")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("subject")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("message")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("created-on")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("is-read")}
//             </TableHead>
//             <TableHead className="bg-white font-semibold text-[15px] text-start">
//               {t("actions")}
//             </TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {isClientPending ? (
//             <TableRow>
//               <TableCell colSpan={10}>
//                 <div className="flex flex-col gap-2 justify-center items-center py-12">
//                   <PuffLoader size={50} color="#4ca161" />
//                   <span className="text-gray-500 mr-3">
//                     {t("loading-advertisment")}
//                   </span>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ) : contacts.length > 0 ? (
//             contacts.map((item) => (
//               <TableRow key={item?.id}>
//                 <TableCell>{item?.id}</TableCell>
//                 <TableCell>{item?.name}</TableCell>
//                 <TableCell>{item?.email}</TableCell>
//                 <TableCell>{item?.subject}</TableCell>
//                 <TableCell>{item?.message}</TableCell>
//                 <TableCell>{item?.createdOnUtc}</TableCell>
//                 <TableCell>
//                   {item?.isRead ? (
//                     <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
//                       read
//                     </span>
//                   ) : (
//                     <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
//                       not read
//                     </span>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {item?.isRead ? (
//                     <span
//                       className="size-7 rounded-full bg-[#b6e2bf] flex items-center justify-center p-1.5 cursor-pointer"
//                       onClick={() => handleViewClick(item)}
//                     >
//                       <Eye className="size-4" />
//                     </span>
//                   ) : (
//                     <span
//                       className="size-7 rounded-full bg-[#ff5b5f] text-white flex items-center justify-center p-1.5 cursor-pointer"
//                       onClick={() => handleViewClick(item)}
//                     >
//                       <EyeClosed className="size-4" />
//                     </span>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell
//                 colSpan={6}
//                 className="text-center text-gray-500 py-10"
//               >
//                 {t("no-advertisment-found")}
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>

//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={6}>
//               {t("showing")} {contacts.length} {t("admins-text")} - {t("page")}{" "}
//               {currentPage} {t("of")} {totalPages}
//             </TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>

//       <div className="mt-4">
//         <PaginationControls
//           pageNumber={currentPage}
//           totalPages={totalPages}
//           setPageNumber={handlePageChange}
//         />
//       </div>

//       <ViewContactModal
//         open={isViewModalOpen}
//         onOpenChange={setIsViewModalOpen}
//         contact={viewingContact}
//         onClose={handleModalClose} // Use the new handler
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, EyeClosed } from "lucide-react";
import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
import { PuffLoader } from "react-spinners";
import ViewContactModal from "./view-contact-modal";
import { format } from "date-fns"; // Import format from date-fns

export default function ContactsTable({
  initialData,
  currentPage,
  searchParams,
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isClientPending, setClientPending] = useState(false);
  const [viewingContact, setViewingContact] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleAdminAdded = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAdminUpdated = () => {
    handleAdminAdded();
    setViewingContact(null);
    setIsViewModalOpen(false);
  };

  const handleViewClick = (contact) => {
    setViewingContact(contact);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
    handleRefresh();
  };

  const contacts = initialData?.items || [];
  const totalPages = initialData?.totalPages || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    setClientPending(isPending);
  }, [isPending]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      handleAdminAdded();
    }
  }, [refreshTrigger]);

  return (
    <div className="pt-1 pb-4 px-2">
      <div className="mb-5 w-full flex justify-end"></div>

      <Table className="admins-table">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              ID
            </TableHead>
            <TableHead className="w-[200px] bg-white font-semibold text-[15px] text-start">
              {t("name")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("email")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("subject")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("message")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("created-on")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("is-read")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isClientPending ? (
            <TableRow>
              <TableCell colSpan={10}>
                <div className="flex flex-col gap-2 justify-center items-center py-12">
                  <PuffLoader size={50} color="#4ca161" />
                  <span className="text-gray-500 mr-3">
                    {t("loading-contacts")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : contacts.length > 0 ? (
            contacts.map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.id}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.subject}</TableCell>
                <TableCell className="truncate max-w-[120px] overflow-hidden whitespace-nowrap">
                  {item?.message}
                </TableCell>
                <TableCell>
                  {item?.createdOnUtc
                    ? format(new Date(item.createdOnUtc), "dd/MM/yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  {item?.isRead ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      read
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      not read
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.isRead ? (
                    <span
                      className="size-7 rounded-full bg-[#b6e2bf] flex items-center justify-center p-1.5 cursor-pointer"
                      onClick={() => handleViewClick(item)}
                    >
                      <Eye className="size-4" />
                    </span>
                  ) : (
                    <span
                      className="size-7 rounded-full bg-[#ff5b5f] text-white flex items-center justify-center p-1.5 cursor-pointer"
                      onClick={() => handleViewClick(item)}
                    >
                      <EyeClosed className="size-4" />
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-gray-500 py-10"
              >
                {t("no-contacts-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              {t("showing")} {contacts.length} {t("contacts-text")} - {t("page")}{" "}
              {currentPage} {t("of")} {totalPages}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-4">
        <PaginationControls
          pageNumber={currentPage}
          totalPages={totalPages}
          setPageNumber={handlePageChange}
        />
      </div>

      <ViewContactModal
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        contact={viewingContact}
        onClose={handleModalClose}
      />
    </div>
  );
}
