import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./_component/Icon";
import Errors from "./_component/Errors";

interface InputProps {
  className?: string;
  containerStyle?: React.CSSProperties;
  errors?: boolean;
  disabled?: boolean;
  icon?: string;
  inputStyle?: React.CSSProperties;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  wrapperStyle?: React.CSSProperties;
}

export default function Input({
  errors,
  disabled,
  icon,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  type = "text",
  value,
  inputStyle,
  className,
  wrapperStyle,
  containerStyle,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className={twMerge("relative w-full", className)} style={wrapperStyle}>
      <div
        onClick={handleClick}
        className={twMerge(
          "flex items-center border rounded-lg px-3 py-2 transition-all duration-200",
          errors && required && !value ? "border-red-500" : "border-gray-400",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500"
        )}
        style={containerStyle}
      >
        {icon && <Icon dataTestId={`icon-${name}`} type={icon} />}
        <input
          ref={inputRef}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          style={inputStyle}
          disabled={disabled}
          readOnly={readOnly}
          className={twMerge(
            "w-full bg-transparent text-sm px-2 py-1 border-none outline-none",
            icon ? "pl-8" : "pl-2"
          )}
        />
      </div>
      {errors && required && !value && (
        <Errors data-testid="errors" className="text-red-500 text-sm mt-1">
          Required!
        </Errors>
      )}
    </div>
  );
}
