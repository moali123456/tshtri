"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { MoonLoader } from "react-spinners";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { addAdmin } from "@/lib/actions/admin/addAdmin";

export default function AddAdminModal({ rolesList = [], onAdminAdded }) {
  const t = useTranslations();
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      roleId: null,
    },
  });

  const roleOptions = rolesList.map((role) => ({
    value: role.id.toString(),
    label: role.name,
  }));

  const onClear = () => {
    reset();
  };

  const onSubmit = async (data) => {
    try {
      await addAdmin({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId.value,
      });

      toast.success(t("admin-added-successfully"));
      reset();
      setOpenModal(false);
      onAdminAdded(); // Callback to refresh the table
    } catch (error) {
      console.error(error);
      toast.error(error.message || t("something-went-wrong"));
    }
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);
        if (!isOpen) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#4ca161] text-white cursor-pointer">
          {t("add-admin")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <DialogHeader>
            <DialogTitle>{t("add-admin")}</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>

          <div className="pt-5">
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
                  pattern: {
                    value: /^\d+$/,
                    message: t("phone-must-be-number"),
                  },
                  onChange: (e) => {
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
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                onClick={onClear}
                className="cursor-pointer text-[#feeaeb] bg-red-500"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-[#4ca161]"
            >
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
  );
}
