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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { EllipsisVertical, CirclePause } from "lucide-react";
import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
import { PuffLoader } from "react-spinners";
import DeactivateCustomerModal from "./deactivate-customer-modal";

export default function CustomersTable({
  initialData,
  currentPage,
  searchParams,
  rolesList = [],
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isClientPending, setClientPending] = useState(false);
  //const [editingAdmin, setEditingAdmin] = useState(null);
  //const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [customerToDeactivate, setCustomerToDeactivate] = useState(null);

  // To reset select menu after action
  const [selectActionStates, setSelectActionStates] = useState({});

  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleCustomerAdded = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // const handleAdminUpdated = () => {
  //   handleAdminAdded(); // Refresh the table
  //   setEditingAdmin(null);
  //   setIsEditModalOpen(false);
  // };

  // const handleEditClick = (admin) => {
  //   setEditingAdmin(admin);
  //   setIsEditModalOpen(true);
  // };

  const handleDeactivateClick = (admin) => {
    setCustomerToDeactivate(admin);
    setIsDeactivateModalOpen(true);
  };

  const admins = initialData?.items || [];
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

  return (
    <div className="pt-1 pb-4 px-4">
      <div className="mb-5 w-full flex justify-end">
        {/* <AddAdminModal rolesList={rolesList} onAdminAdded={handleAdminAdded} /> */}
        {/* <AddCustomerModal /> */}
      </div>

      <Table className="admins-table">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              ID
            </TableHead>
            <TableHead className="w-[200px] bg-white font-semibold text-[15px] text-start">
              {t("admins.full-name")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("admins.email")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("admins.phone-number")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("admins.status")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isClientPending ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex flex-col gap-2 justify-center items-center py-12">
                  <PuffLoader size={50} color="#4ca161" />
                  <span className="text-gray-500 mr-3">
                    {t("admins.loading-admins")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : admins.length > 0 ? (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell className="font-medium">{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phoneNumber}</TableCell>
                <TableCell>
                  {admin.active ? (
                    <span className="bg-[#b6e2bf] py-1 px-5 text-sm rounded-full inline-flex">
                      {t("admins.active")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-4 text-sm rounded-full inline-flex">
                      {t("admins.inactive")}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={selectActionStates[admin.id] || ""}
                    onValueChange={(value) => {
                      if (value === "edit") {
                        // handleEditClick(admin);
                      } else if (value === "delete") {
                        // Handle delete logic here
                        //alert(`Delete admin: ${admin.name}`);
                        handleDeactivateClick(admin);
                      }

                      // Reset the selected value for this admin
                      setSelectActionStates((prev) => ({
                        ...prev,
                        [admin.id]: "",
                      }));
                    }}
                  >
                    <SelectTrigger className="cursor-pointer">
                      {/* <SelectValue placeholder={t("select-action")} /> */}
                      <EllipsisVertical className="h-4 w-4" />
                    </SelectTrigger>
                    <SelectContent
                      //className="translate-x-[-100%]"
                      className={
                        isRTL
                          ? "translate-y-[calc(100%-40px)]"
                          : "translate-x-[calc(-100%+40px)]"
                      }
                    >
                      {/* <SelectItem value="edit" className="cursor-pointer">
                        <div className="flex items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("edit")}
                        </div>
                      </SelectItem> */}
                      <SelectItem value="delete" className="cursor-pointer">
                        <div className="flex items-center text-red-600">
                          <CirclePause className="mr-2 h-4 w-4" />
                          {t("deactivate")}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-gray-500 py-10"
              >
                {t("no-admins-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              {t("showing")} {admins.length} {t("admins-text")} - {t("page")}{" "}
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

      {/* Edit Admin Modal */}
      {/* <EditAdminModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        rolesList={rolesList}
        admin={editingAdmin}
        onAdminUpdated={handleAdminUpdated}
        onClose={() => setIsEditModalOpen(false)}
      /> */}
      {/* <EditCustomerModal /> */}

      {/* Delete Admin Modal */}
      {/* <DeleteAdminModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAdminToDelete(null);
        }}
        admin={adminToDelete}
        onAdminDeleted={handleAdminAdded}
      /> */}
      <DeactivateCustomerModal
        open={isDeactivateModalOpen}
        onOpenChange={setIsDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setCustomerToDeactivate(null);
        }}
        customer={customerToDeactivate}
        onCustomerDeactivate={handleCustomerAdded}
      />
    </div>
  );
}
