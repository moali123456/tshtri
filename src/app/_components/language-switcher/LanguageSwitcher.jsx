"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Images from "../../../../public/assets/images/images";
import Image from "next/image";

const LanguageSwitcher = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Determine the new locale and icon based on currentLocale
  const newLocale = currentLocale === "ar" ? "en" : "ar";
  const icon = currentLocale === "ar" ? Images.enIcon : Images.arIcon;

  const handleSwitch = () => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale part
    const newPath = segments.join("/");

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="cursor-pointer rounded"
    >
      <Image src={icon} alt="Switch Language Icon" width={40} height={40} className="!h-auto" />
    </button>
  );
};

export default LanguageSwitcher;
