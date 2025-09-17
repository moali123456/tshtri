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
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
import { PuffLoader } from "react-spinners";
import DeleteAdModal from "./[advertisementId]/delete-ad-modal";

export default function AdvertismentTable({
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [advertiseToDelete, setAdvertiseToDelete] = useState(null);

  // To reset select menu after action
  const [selectActionStates, setSelectActionStates] = useState({});

  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleAdvertiseAdded = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleAdminUpdated = () => {
    handleAdvertiseAdded(); // Refresh the table
    setEditingAdmin(null);
    //setIsEditModalOpen(false);
  };

  const handleEditClick = (ads) => {
    // Navigate to the advertisement details page WITH locale
    router.push(`/${locale}/advertisements/${ads.id}`);
  };

  const handleDeleteClick = (advertise) => {
    setAdvertiseToDelete(advertise);
    setIsDeleteModalOpen(true);
  };

  const ads = initialData?.items || [];
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
      <div className="mb-5 w-full flex justify-end"></div>

      <Table className="admins-table">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              ID
            </TableHead>
            <TableHead className="w-[200px] bg-white font-semibold text-[15px] text-start">
              {t("seller-name")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("seller-phone")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("category-name")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("city")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("price")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("date")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("published")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("negotiable")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("sold")}
            </TableHead>
            {/* <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("sold-at")}
            </TableHead> */}
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
                    {t("loading-advertisment")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : ads.length > 0 ? (
            ads.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.sellerName}</TableCell>
                <TableCell>{item.sellerPhone}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  {item.isPublished ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("published")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("not-published")}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item.isNegotionable ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("negotiable")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("not-negotiable")}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item.isSold ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("sold")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("not-sold")}
                    </span>
                  )}
                </TableCell>
                {/* <TableCell>
                  {admin.active ? (
                    <span className="bg-[#b6e2bf] py-1 px-5 text-sm rounded-full inline-flex">
                      {t("admins.active")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-4 text-sm rounded-full inline-flex">
                      {t("admins.inactive")}
                    </span>
                  )}
                </TableCell> */}
                <TableCell>
                  <Select
                    value={selectActionStates[item.id] || ""}
                    onValueChange={(value) => {
                      if (value === "edit") {
                        handleEditClick(item);
                      } else if (value === "delete") {
                        // Handle delete logic here
                        //alert(`Delete admin: ${admin.name}`);
                        handleDeleteClick(item);
                      }

                      // Reset the selected value for this admin
                      setSelectActionStates((prev) => ({
                        ...prev,
                        [item.id]: "",
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
                      <SelectItem value="edit" className="cursor-pointer">
                        <div className="flex items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("edit")}
                        </div>
                      </SelectItem>
                      <SelectItem value="delete" className="cursor-pointer">
                        <div className="flex items-center text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t("delete")}
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
                {t("no-advertisment-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              {t("showing")} {ads.length} {t("admins-text")} - {t("page")}{" "}
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

      {/* Delete advertise Modal */}
      <DeleteAdModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAdvertiseToDelete(null);
        }}
        advertise={advertiseToDelete}
        onAdvertiseDeleted={handleAdvertiseAdded}
      />
    </div>
  );
}
