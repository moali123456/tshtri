"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function LogoutButton({ className }) {
  const t = useTranslations("auth");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success(t("logout-successfully"), { className: "toast-style" });
        router.push("/login"); // Redirect to login or home
      } else {
        toast.error(t("logout-failed"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("something-went-wrong"));
    }
  };

  return (
    <button onClick={handleLogout} className={`${className} cursor-pointer`}>
      {t("logout")}
    </button>
  );
}

export default LogoutButton;
