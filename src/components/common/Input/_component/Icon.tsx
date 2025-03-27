import * as React from "react";
import { BiLock } from "react-icons/bi";
import { FaBug } from "react-icons/fa";
import { IoMailOpenOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const icons = (type: string) => {
  switch (type) {
    case "email":
      return <IoMailOpenOutline />;
    case "password":
      return <BiLock />;
    default:
      return <FaBug />;
  }
};

interface IconProps {
  className?: string;
  dataTestId?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type: string;
}

export default function Icon({
  className,
  dataTestId,
  onClick,
  style,
  type,
}: IconProps) {
  return (
    <i
      role="presentation"
      aria-hidden="true"
      className={twMerge("absolute text-lg transition-all z-10", className)}
      data-testid={dataTestId}
      onClick={onClick}
      style={style}
      tabIndex={-1}
    >
      {icons(type)}
    </i>
  );
}
