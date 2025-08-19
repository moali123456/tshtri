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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import PaginationControls from "@/app/_components/pagination-controls/pagination-controls";
import { PuffLoader, MoonLoader } from "react-spinners";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

export default function AdminsTable({
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      roleId: null, // Ensure proper initialization
    },
  });

  // Prepare role and active options
  const roleOptions = rolesList.map((role) => ({
    value: role.id.toString(), // Using id as value
    label: role.name, // Using name as label
  }));

  // Clear form handler
  const onClear = () => {
    // Reset form
    reset();
  };

  const onSubmit = async (data) => {
    console.log(data);
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

  // Detect router changes (filter or pagination)
  useEffect(() => {
    setClientPending(isPending);
  }, [isPending]);

  return (
    <div className="pt-1 pb-4 px-4">
      <div className="mb-5 w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#4ca161] text-white cursor-pointer">
              {t("add-admin")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {/* Move form INSIDE DialogContent */}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              {/* name */}
              <div className="mb-4">
                <Label htmlFor="name" className="text-[#364153] text-base mb-1">
                  {t("name")}
                </Label>
                <Input
                  id="name"
                  placeholder={t("type-here")}
                  className=" bg-[#f5f6f8] border-[#e7e5e4]"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">{t("name-required")}</span>
                )}
              </div>

              {/* email */}
              <div className="mb-4">
                <Label
                  htmlFor="email"
                  className="text-[#364153] text-base mb-1"
                >
                  {t("email-address")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("type-here")}
                  className=" bg-[#f5f6f8] border-[#e7e5e4]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">{t("email-required")}</span>
                )}
              </div>

              {/* phone */}
              <div className="mb-4">
                <Label
                  htmlFor="phoneNumber"
                  className="text-[#364153] text-base mb-1"
                >
                  {t("phone-number")}
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder={t("type-here")}
                  className="bg-[#f5f6f8] border-[#e7e5e4]"
                  {...register("phoneNumber", {
                    required: t("phone-required"),
                    pattern: {
                      value: /^\d+$/,
                      message: t("phone-must-be-number"),
                    },
                    onChange: (e) => {
                      // Filter out non-numeric characters in real-time
                      e.target.value = e.target.value.replace(/\D/g, "");
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-600">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Role Select */}
              <div className="mb-4 colored-select">
                <Label htmlFor="role" className="text-[#364153] text-base mb-1">
                  {t("role")}
                </Label>
                <Controller
                  name="roleId"
                  control={control}
                  rules={{ required: t("role-required") }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      instanceId="role-select"
                      options={roleOptions}
                      isClearable
                      classNamePrefix="react-select"
                      placeholder={t("select-role")}
                    />
                  )}
                />
                {errors.roleId && (
                  <span className="text-red-600">{errors.roleId.message}</span>
                )}
              </div>
              {/*  */}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" ype="button" onClick={onClear}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <MoonLoader size={20} color="#fff" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/*  */}

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
              <TableCell colSpan={5}>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px]">
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>{t("edit")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>{t("delete")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-gray-500 py-10"
              >
                {t("no-admins-found")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              {t("showing")} {admins.length} {t("admins-text")} - {t("page")}{" "}
              {currentPage} {t("of")} {totalPages}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination */}
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
