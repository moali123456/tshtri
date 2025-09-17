// "use client";

// import { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { MoonLoader } from "react-spinners";
// import { getContactDetails } from "@/lib/actions/admin/contact-action";

// export default function ViewContactModal({
//   open,
//   onOpenChange,
//   onClose = () => {},
//   contact,
// }) {
//   const t = useTranslations();
//   const [contactDetails, setContactDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContactDetails = async () => {
//       if (open && contact?.id) {
//         setIsLoading(true);
//         setError(null);

//         try {
//           const result = await getContactDetails(contact.id);

//           if (result.success) {
//             setContactDetails(result.data);
//           } else {
//             setError(result.error || "Failed to fetch contact details");
//           }
//         } catch (err) {
//           setError(err.message || "An error occurred");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchContactDetails();
//   }, [open, contact?.id]);

//   // Reset state when modal closes
//   useEffect(() => {
//     if (!open) {
//       setContactDetails(null);
//       setError(null);
//     }
//   }, [open]);

//   const handleClose = () => {
//     onClose(); // Call the parent's onClose function
//     onOpenChange(false); // Close the modal
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{t("contact-details")}</DialogTitle>
//         </DialogHeader>

//         {isLoading ? (
//           <div className="flex justify-center items-center py-8">
//             <MoonLoader size={30} color="#3b82f6" />
//           </div>
//         ) : error ? (
//           <div className="text-red-500 py-4 text-center">{error}</div>
//         ) : (
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">{t("name")}</Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50">
//                 {contactDetails?.name || contact?.name || "-"}
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">{t("email")}</Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50">
//                 {contactDetails?.email || contact?.email || "-"}
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">{t("subject")}</Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50">
//                 {contactDetails?.subject || contact?.subject || "-"}
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">{t("message")}</Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50 min-h-[100px]">
//                 {contactDetails?.message || contact?.message || "-"}
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">
//                 {t("created-on")}
//               </Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50">
//                 {contactDetails?.createdOnUtc || contact?.createdOnUtc || "-"}
//               </div>
//             </div>

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label className="text-right font-medium">{t("is-read")}</Label>
//               <div className="col-span-3 p-2 border rounded-md bg-gray-50">
//                 {contactDetails?.isRead !== undefined ? (
//                   contactDetails?.isRead
//                 ) : contact?.isRead ? (
//                   <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
//                     {t("read")}
//                   </span>
//                 ) : (
//                   <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
//                     {t("not-read")}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end">
//           <Button onClick={handleClose}>{t("close")}</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoonLoader } from "react-spinners";
import { getContactDetails } from "@/lib/actions/contacts/contact-action";
import { format } from "date-fns"; // Import format from date-fns

export default function ViewContactModal({
  open,
  onOpenChange,
  onClose = () => {},
  contact,
}) {
  const t = useTranslations();
  const [contactDetails, setContactDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (open && contact?.id) {
        setIsLoading(true);
        setError(null);

        try {
          const result = await getContactDetails(contact.id);

          if (result.success) {
            setContactDetails(result.data);
          } else {
            setError(result.error || "Failed to fetch contact details");
          }
        } catch (err) {
          setError(err.message || "An error occurred");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchContactDetails();
  }, [open, contact?.id]);

  useEffect(() => {
    if (!open) {
      setContactDetails(null);
      setError(null);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("contact-details")}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <MoonLoader size={30} color="#3b82f6" />
          </div>
        ) : error ? (
          <div className="text-red-500 py-4 text-center">{error}</div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">{t("name")}</Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50">
                {contactDetails?.name || contact?.name || "-"}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">{t("email")}</Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50">
                {contactDetails?.email || contact?.email || "-"}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">{t("subject")}</Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50">
                {contactDetails?.subject || contact?.subject || "-"}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">{t("message")}</Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50 min-h-[100px]">
                <div className=" break-all">
                  {contactDetails?.message || contact?.message || "-"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                {t("created-on")}
              </Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50">
                {contactDetails?.createdOnUtc || contact?.createdOnUtc
                  ? format(
                      new Date(
                        contactDetails?.createdOnUtc || contact?.createdOnUtc
                      ),
                      "dd/MM/yyyy"
                    )
                  : "-"}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">{t("is-read")}</Label>
              <div className="col-span-3 p-2 border rounded-md bg-gray-50">
                {contactDetails?.isRead !== undefined ? (
                  contactDetails?.isRead
                ) : contact?.isRead ? (
                  <span className="bg-[#b6e2bf] py-1 px-3 text-[12px] rounded-full inline-flex">
                    {t("is-read")}
                  </span>
                ) : (
                  <span className="bg-[#ff5b5f] text-white py-1 px-3 text-[12px] rounded-full inline-flex">
                    {t("not-read")}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button className="cursor-pointer bg-[#4ca161]" onClick={handleClose}>
            {t("close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
