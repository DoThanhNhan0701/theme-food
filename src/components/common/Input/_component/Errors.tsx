import { twMerge } from "tailwind-merge";

type ErrorProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Errors({ className, children }: ErrorProps) {
  return (
    <p className={twMerge("text-red-600 text-right mt-1", className)}>
      {children}
    </p>
  );
}
