import { useRouter, usePathname } from "next/navigation";

export function useLocaleRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const pushWithLocale = (path: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];

    if (!currentLocale || !["en-US", "nl-NL"].includes(currentLocale)) {
      router.push(`/${path}`);
    } else {
      router.push(
        `/${currentLocale}${path.startsWith("/") ? path : `/${path}`}`
      );
    }
  };

  return { pushWithLocale };
}
