"use client";

import { useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();

  const changeLanguage = (locale: "en-US" | "nl-NL") => {
    const currentPath = window.location.pathname;

    const pathWithoutLocale = currentPath.replace(/^\/(en-US|nl-NL)/, "");

    router.push(`/${locale}${pathWithoutLocale}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en-US")}>🇬🇧 English</button>
      <button onClick={() => changeLanguage("nl-NL")}>🇳🇱 Dutch</button>
    </div>
  );
};

export default LanguageSwitcher;
