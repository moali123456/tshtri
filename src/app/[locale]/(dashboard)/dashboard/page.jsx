import React from "react";
import { useTranslations } from "next-intl";

function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1 className="text-3xl font-medium">dashboard page</h1>
      <h3>{t("welcome-message")}</h3>
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-muted/50 p-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
