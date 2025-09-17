// "use client";
// import React from "react";
// import { useTranslations } from "next-intl";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { MoonLoader } from "react-spinners";
// import { useLoading } from "@/app/_components/loading-provider/LoadingProvider";

// function LoginForm() {
//   const t = useTranslations("auth");
//   const router = useRouter();
//   const { navigateWithLoader } = useLoading();

//   const handleNavigation = (url, e) => {
//     e.preventDefault();
//     navigateWithLoader(url);
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm({
//     mode: "onChange",
//   });

//   const onSubmit = async (data) => {
//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const result = await res.json();

//       if (res.ok && result.success) {
//         toast.success(t("login-successful"), {
//           className: "toast-style",
//         });
//         router.push("/dashboard");
//       } else {
//         toast.error(result.error || t("login-failed"));
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//         <div className="mb-4">
//           <Label htmlFor="email" className="text-[#364153] text-base mb-1">
//             {t("email-address")}
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder={t("type-here")}
//             className="h-14 bg-[#f5f6f8] border-[#f5f6f8]"
//             {...register("email", { required: true })}
//           />
//           {errors.email && (
//             <span className="text-red-600">{t("email-required")}</span>
//           )}
//         </div>

//         <div className="mb-12">
//           <Label htmlFor="email" className="text-[#364153] text-base mb-1">
//             {t("password")}
//           </Label>
//           <Input
//             id="password"
//             type="password"
//             placeholder={t("type-here")}
//             className="h-14 bg-[#f5f6f8] border-[#f5f6f8]"
//             {...register("password", { required: true })}
//           />
//           {errors.password && (
//             <span className="text-red-600">{t("password-required")}</span>
//           )}
//         </div>

//         <Button
//           type="submit"
//           disabled={!isValid || isSubmitting}
//           className="cursor-pointer h-14 w-full bg-[#4ca161] mb-3 font-medium text-base uppercase"
//         >
//           {isSubmitting ? (
//             <>
//               {t("login")}
//               <MoonLoader size={25} className="h-3 w-3 ms-2" color="white" />
//             </>
//           ) : (
//             <>{t("login")}</>
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoonLoader } from "react-spinners";
import { useLoading } from "@/app/_components/loading-provider/LoadingProvider";

function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { navigateWithLoader } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(t("login-successful"), {
          className: "toast-style",
        });
        // Use navigateWithLoader instead of router.push
        navigateWithLoader("/dashboard");
      } else {
        toast.error(result.error || t("login-failed"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mb-4">
          <Label htmlFor="email" className="text-[#364153] text-base mb-1">
            {t("email-address")}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t("type-here")}
            className="h-14 bg-[#f5f6f8] border-[#f5f6f8]"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">{t("email-required")}</span>
          )}
        </div>

        <div className="mb-12">
          <Label htmlFor="password" className="text-[#364153] text-base mb-1">
            {t("password")}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t("type-here")}
            className="h-14 bg-[#f5f6f8] border-[#f5f6f8]"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">{t("password-required")}</span>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="cursor-pointer h-14 w-full bg-[#4ca161] mb-3 font-medium text-base uppercase"
        >
          {isSubmitting ? (
            <>
              {t("login")}
              <MoonLoader size={25} className="h-3 w-3 ms-2" color="white" />
            </>
          ) : (
            <>{t("login")}</>
          )}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
