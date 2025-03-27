"use client";

import { Dictionary } from "@/helpers/types";
import { useRouter } from "next/navigation";

type DictKeys = "products";

export default function HomePage({ dict }: { dict: Dictionary<DictKeys> }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/login")}>
      login {dict.products.cart}
    </button>
  );
}
