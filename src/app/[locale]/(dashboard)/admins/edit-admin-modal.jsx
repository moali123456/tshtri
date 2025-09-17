"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import { MoonLoader } from "react-spinners";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { updateAdmin } from "@/lib/actions/admin/updateAdmin";

export default function EditAdminModal({
  open,
  onOpenChange,
  onClose = () => {},
  rolesList = [],
  admin,
  onAdminUpdated,
}) {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const roleOptions = rolesList.map((role) => ({
    value: role.id.toString(),
    label: role.name,
  }));

  useEffect(() => {
    if (admin) {
      reset({
        name: admin.name,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        roleId: admin.role
          ? {
              value: admin.role.id.toString(),
              label: admin.role.name,
            }
          : null,
        isActive: admin.active ?? false,
      });
    }
  }, [admin, reset]);

  const onClear = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      await updateAdmin({
        id: admin.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        roleId: parseInt(data.roleId.value, 10),
        isActive: Boolean(data.isActive),
      });

      toast.success(t("admin-updated-successfully"));
      reset();
      onClose();
      onAdminUpdated();
    } catch (error) {
      console.error(error);
      toast.error(error.message || t("something-went-wrong"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <DialogHeader>
            <DialogTitle>{t("edit-admin")}</DialogTitle>
            <DialogDescription>{t("edit-admin-description")}</DialogDescription>
          </DialogHeader>

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

          <div className="mb-4">
            <Label htmlFor="email" className="text-[#364153] text-base mb-1">
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
                // pattern: {
                //   value: /^\d+$/,
                //   message: t("phone-must-be-number"),
                // },
                // onChange: (e) => {
                //   e.target.value = e.target.value.replace(/\D/g, "");
                // },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-600">{errors.phoneNumber.message}</span>
            )}
          </div>

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

          <div className="mb-4">
            <div className="flex items-center gap-3">
              <Controller
                name="isActive"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isActive">{t("active")}</Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer text-[#feeaeb] bg-red-500"
                type="button"
                onClick={onClear}
              >
                {t("cancel")}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer bg-[#4ca161]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <MoonLoader size={20} color="#fff" />
              ) : (
                t("save-changes")
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
