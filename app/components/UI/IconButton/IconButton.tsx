import type { ChangeEvent, ReactElement, ReactNode } from "react";
import React from "react";

interface IconButtonProps {
  Icon: () => ReactElement;
  isActive: boolean;
  color?: string;
  children?: ReactNode;
  handler?: () => void;
  deleteHandler?: (e: any) => void;
  likeHandler?: (e: any) => void;
  disabled?: boolean;
}

export default function IconButton({
  Icon,
  isActive,
  color,
  children,
  handler,
  deleteHandler,
  likeHandler,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`
      btn icon-btn 
      ${isActive ? "icon-button-active" : ""} ${color || ""}`}
      onClick={handler ?? deleteHandler ?? likeHandler}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      <span className={children !== null ? "mr-1" : ""}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
