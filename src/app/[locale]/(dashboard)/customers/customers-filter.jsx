"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ListFilter, CircleX } from "lucide-react";
import Select from "react-select";

function CustomersFilter({ initialSearchParams = {}, rolesList = [] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const { register, control, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: initialSearchParams.name || "",
      email: initialSearchParams.email || "",
      phoneNumber: initialSearchParams.phoneNumber || "",
      role: initialSearchParams.role
        ? {
            value: initialSearchParams.role,
            label:
              rolesList.find(
                (r) => r.id.toString() === initialSearchParams.role
              )?.name || initialSearchParams.role,
          }
        : null,
      active: initialSearchParams.active
        ? {
            value: initialSearchParams.active,
            label: initialSearchParams.active,
          }
        : null,
    },
  });

  // Prepare role and active options
  const roleOptions = rolesList.map((role) => ({
    value: role.id.toString(), // Using id as value
    label: role.name, // Using name as label
  }));

  const activeOptions = [
    { value: "true", label: t("active") },
    { value: "false", label: t("inactive") },
  ];

  // Submit handler
  const onSubmit = (data) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // Add non-empty filter values to params
    if (data.name) params.set("name", data.name);
    if (data.email) params.set("email", data.email);
    if (data.phoneNumber) params.set("phoneNumber", data.phoneNumber);
    if (data.role) params.set("role", data.role.value);
    if (data.active) params.set("active", data.active.value);

    console.log("Submitting phone number:", data.phoneNumber);
    console.log("Form data before submission:", data);

    // Navigate with new params
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Clear form handler
  const onClear = () => {
    // Reset form
    reset();

    // Clear URL params
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="table-filters">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex gap-4 flex-wrap">
          {/* Name Input */}
          <div className="mb-4 w-[calc(20%-16px)]">
            <Label htmlFor="name" className="text-[#364153] text-base mb-1">
              {t("name")}
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder={t("type-here")}
                className="h-10 bg-[#f5f6f8] ps-7"
                {...register("name")}
              />
              <div className="text-[#79716b] absolute top-3 start-2.5">
                <Search className="size-4" />
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4 w-[calc(20%-16px)]">
            <Label htmlFor="email" className="text-[#364153] text-base mb-1">
              {t("email")}
            </Label>
            <div className="relative">
              <Input
                id="email"
                placeholder={t("type-here")}
                className="h-10 bg-[#f5f6f8] ps-7"
                {...register("email")}
              />
              <div className="text-[#79716b] absolute top-3 start-2.5">
                <Search className="size-4" />
              </div>
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-4 w-[calc(20%-16px)]">
            <Label
              htmlFor="phoneNumber"
              className="text-[#364153] text-base mb-1"
            >
              {t("phone-number")}
            </Label>
            <div className="relative">
              <Input
                id="phoneNumber"
                placeholder={t("type-here")}
                className="h-10 bg-[#f5f6f8] ps-7"
                {...register("phoneNumber")}
              />
              <div className="text-[#79716b] absolute top-3 start-2.5">
                <Search className="size-4" />
              </div>
            </div>
          </div>

          {/* Role Select */}
          <div className="mb-4 w-[calc(20%-16px)]">
            <Label htmlFor="role" className="text-[#364153] text-base mb-1">
              {t("role")}
            </Label>
            <Controller
              name="role"
              control={control}
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
          </div>

          {/* Active Select */}
          <div className="mb-4 w-[calc(20%-16px)]">
            <Label htmlFor="active" className="text-[#364153] text-base mb-1">
              {t("active")}
            </Label>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  instanceId="active-select"
                  options={activeOptions}
                  isClearable
                  classNamePrefix="react-select"
                  placeholder={t("select-active")}
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            className="cursor-pointer bg-[#4ca161] text-white w-36"
            type="submit"
          >
            <ListFilter /> {t("apply-filters")}
          </Button>
          <Button
            className="cursor-pointer text-[#feeaeb] bg-red-500 w-36"
            type="button"
            onClick={onClear}
          >
            <CircleX className="size-5" /> {t("clear")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CustomersFilter;

