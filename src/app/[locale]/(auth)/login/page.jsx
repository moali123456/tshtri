import React from "react";
import { useTranslations } from "next-intl";
import LoginForm from "./login-form";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }]; // Your supported locales
}

function LoginPage() {
  const t = useTranslations("auth");

  return (
    <div>
      <h1 className="text-gray-700 text-3xl font-semibold mb-6 text-center">
        {t("login")}
      </h1>

      <LoginForm />
    </div>
  );
}

export default LoginPage;
