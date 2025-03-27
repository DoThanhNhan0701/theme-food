import { getDictionary } from "../dictionaries";
import { PageProps } from "@/helpers/interface";

import HomePage from "@/components/pages/HomePage";
export default async function Page({ params }: PageProps) {
  const dict = await getDictionary((await params)?.lang);
  return <HomePage dict={dict} />;
}
