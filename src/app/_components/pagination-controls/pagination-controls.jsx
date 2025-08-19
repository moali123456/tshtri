"use client";
import { useTranslations, useLocale } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

function PaginationControls({ pageNumber, totalPages, setPageNumber }) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isRTL = locale === "ar";

  // Function to update URL with new page number
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
    
    // If you provided a setPageNumber function, call it too
    // This allows compatibility with both approaches
    if (typeof setPageNumber === 'function') {
      setPageNumber(page);
    }
  };

  const renderPageNumber = (page) => (
    <PaginationItem key={page}>
      <PaginationLink
        href={`${pathname}?page=${page}`}
        isActive={pageNumber === page}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(page);
        }}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  const renderDots = (key) => (
    <PaginationItem key={key}>
      <span className="px-2 text-gray-500">...</span>
    </PaginationItem>
  );

  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(renderPageNumber(i));
    }
  } else {
    // Always show first page
    pages.push(renderPageNumber(1));

    // Show left dots
    if (pageNumber > 3) {
      pages.push(renderDots("left-dots"));
    }

    // Show middle pages
    const start = Math.max(2, pageNumber - 1);
    const end = Math.min(totalPages - 1, pageNumber + 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(renderPageNumber(i));
      }
    }

    // Show right dots
    if (pageNumber < totalPages - 2) {
      pages.push(renderDots("right-dots"));
    }

    // Always show last page
    pages.push(renderPageNumber(totalPages));
  }

  return (
    <Pagination>
      <PaginationContent className={isPending ? "opacity-70" : ""}>
        <PaginationItem>
          <PaginationLink
            href={`${pathname}?page=${Math.max(1, pageNumber - 1)}`}
            className="flex w-full me-2"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 1) {
                handlePageChange(pageNumber - 1);
              }
            }}
            disabled={pageNumber <= 1 || isPending}
          >
            <ChevronLeft className={isRTL ? "rotate-180 transform" : ""} />{" "}
            {t("previous")}
          </PaginationLink>
        </PaginationItem>

        {pages}

        <PaginationItem>
          <PaginationLink
            href={`${pathname}?page=${Math.min(totalPages, pageNumber + 1)}`}
            className="flex w-full ms-2"
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber < totalPages) {
                handlePageChange(pageNumber + 1);
              }
            }}
            disabled={pageNumber >= totalPages || isPending}
          >
            {t("next")}{" "}
            <ChevronRight className={isRTL ? "rotate-180 transform" : ""} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationControls;
