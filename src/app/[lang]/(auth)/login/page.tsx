import { getDictionary } from "../../dictionaries";
import { PageProps } from "@/helpers/interface";

import Login from "@/components/pages/LoginPage";

export default async function LoginPage({ params }: PageProps) {
  const dict = await getDictionary((await params).lang);
  return <Login dict={dict} />;
}
