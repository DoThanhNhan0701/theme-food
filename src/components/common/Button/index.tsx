import classNames from "classnames";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
};

export default function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  disabled,
  loading,
  type = "button",
}: ButtonProps) {
  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!success) +
    Number(!!danger) +
    Number(!!warning);
  if (count > 1) {
    throw new Error(
      "Only one of primary, secondary, success, warning, danger can be true"
    );
  }

  const classes = classNames(
    twMerge(
      "px-4 py-2 cursor-pointer border font-semibold transition-all duration-300 ease-in-out transform active:scale-95 flex items-center justify-center gap-2",
      outline && ""
    ),
    {
      // Gradient background
      "border-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700":
        primary && !disabled,
      "border-gray-900 bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800":
        secondary && !disabled,
      "border-green-500 bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700":
        success && !disabled,
      "border-yellow-400 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white hover:from-yellow-400 hover:to-yellow-600":
        warning && !disabled,
      "border-red-500 bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700":
        danger && !disabled,

      // Outline styles
      "border-2": outline && !disabled,
      "text-blue-500 border-blue-500 hover:bg-blue-100":
        outline && primary && !disabled,
      "text-gray-900 border-gray-900 hover:bg-gray-100":
        outline && secondary && !disabled,
      "text-green-500 border-green-500 hover:bg-green-100":
        outline && success && !disabled,
      "text-while border-yellow-400 hover:bg-yellow-100":
        outline && warning && !disabled,
      "text-red-500 border-red-500 hover:bg-red-100":
        outline && danger && !disabled,

      // Disabled styles
      "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-60":
        disabled,

      // Loading styles
      "cursor-wait": loading,

      // Rounded button
      "rounded-full": rounded,
    }
  );

  return (
    <button type={type} className={classes} disabled={disabled || loading}>
      {loading && (
        <span
          className={twMerge(
            "animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4",
            loading && outline && "border-black border-t-transparent"
          )}
        ></span>
      )}
      {children}
    </button>
  );
}
