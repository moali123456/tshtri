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
import Image from "next/image";

export default function AdImagesTable({
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
  const images =
    initialData?.items || initialData?.data?.items || initialData || [];
  const totalPages =
    initialData?.totalPages || initialData?.data?.totalPages || 1;

  useEffect(() => {
    console.log("Attributes data:", initialData);
    console.log("Processed images:", images);
  }, [initialData, images]);

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
              {t("title")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("image-url")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("display-order")}
            </TableHead>
            <TableHead className="bg-white font-semibold text-[15px] text-start">
              {t("published")}
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
                    {t("loading-ad-images")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : images.length > 0 ? (
            images.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Image
                    src={item?.imageUrl}
                    width={100}
                    height={100}
                    alt="img"
                    className="w-[50px] !h-[40px] object-cover cursor-pointer"
                  />
                </TableCell>
                <TableCell>
                  {item.value || item.displayOrder || "N/A"}
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
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-gray-500 py-10"
              >
                {t("no-ad-images-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              {t("showing")} {images.length} {t("ad-images")} - {t("page")}{" "}
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
