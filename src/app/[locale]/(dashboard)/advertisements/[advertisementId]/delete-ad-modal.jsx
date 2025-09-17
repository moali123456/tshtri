"use client";

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
import { MoonLoader } from "react-spinners";
import { toast } from "sonner";
import { useState } from "react";
import { deleteAd } from "@/lib/actions/advertisement/delete-ad";
import { Trash2 } from "lucide-react";

export default function DeleteAdModal({
  open,
  onOpenChange,
  onClose = () => {},
  advertise,
  onAdvertiseDeleted,
}) {
  const t = useTranslations();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!advertise?.id) return;
    setIsDeleting(true);
    try {
      await deleteAd(advertise.id);
      toast.success(t("advertise-deleted-successfully"));
      onAdvertiseDeleted?.(); // Refresh table
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || t("something-went-wrong"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          {/* <DialogTitle>{t("delete-admin")}</DialogTitle> */}
          <DialogDescription />
        </DialogHeader>

        <div className="flex justify-center">
          <div className="bg-[#EF444430] text-red-500 p-4 rounded-full inline-flex size-14">
            <Trash2 />
          </div>
        </div>
        <div className="text-center text-md text-gray-600">
          {t("delete-confirmation")} <strong>{advertise?.sellerName}</strong>?
        </div>

        <DialogFooter className="pt-4 flex gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer w-1/2"
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-1/2 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {isDeleting ? <MoonLoader size={18} color="#fff" /> : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
