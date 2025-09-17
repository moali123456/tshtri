"use client";

import { useEffect, useState } from "react";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
import { PuffLoader } from "react-spinners";

export default function AttributesTable({
  initialData,
  currentPage,
  searchParams,
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isClientPending, setClientPending] = useState(false);

  // Check the structure of initialData and adjust accordingly
  const ads =
    initialData?.items || initialData?.data?.items || initialData || [];
  const totalPages =
    initialData?.totalPages || initialData?.data?.totalPages || 1;

  useEffect(() => {
    console.log("Attributes data:", initialData);
    console.log("Processed ads:", ads);
  }, [initialData, ads]);

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
    <div className="pt-1 pb-4">
      <div className="mb-5 w-full flex justify-end"></div>

      <Table className="admins-table">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              ID
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("attribute-name")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("option")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("unit")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("attribute-type")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("published")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("main")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("refine")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("display-order")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isClientPending ? (
            <TableRow>
              <TableCell colSpan={3}>
                <div className="flex flex-col gap-2 justify-center items-center py-12">
                  <PuffLoader size={50} color="#4ca161" />
                  <span className="text-gray-500 mr-3">
                    {t("loading-advertisment")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : ads.length > 0 ? (
            ads.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell>{item.id || index + 1}</TableCell>
                <TableCell>
                  {item.name || item.attributeName || "N/A"}
                </TableCell>
                <TableCell>{item.value || item.option || "N/A"}</TableCell>
                <TableCell>{item.value || item.unit || "N/A"}</TableCell>
                <TableCell>
                  {item.value || item.attributeType || "N/A"}
                </TableCell>

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
                  {item.isMain ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("main")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("not-main")}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item.isRefine ? (
                    <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("refine")}
                    </span>
                  ) : (
                    <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                      {t("not-refine")}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  {item.value || item.displayOrder || "N/A"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-gray-500 py-10"
              >
                {t("no-attributes-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              {t("showing")} {ads.length} {t("attributes")} - {t("page")}{" "}
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
    </div>
  );
}
