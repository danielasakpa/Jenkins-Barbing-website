// import ButtonSvg from "../assets/svg/ButtonSvg";
import React, { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  px?: string;
  white?: boolean;
}

import { Button as ButtonUI } from "@/components/ui/button";

const Button = ({
  className,
  variant,
  size,
  href,
  onClick,
  children,
  px,
  white,
}: ButtonProps) => {
  const classes = `button inline-flex items-center justify-center h-11 ${
    px || "px-7"
  } ${className || ""} ${white && "bg-white"}}`;

  const renderButton = () => (
    <ButtonUI
      variant={variant}
      size={size}
      className={classes}
      onClick={onClick}
    >
      {children}
    </ButtonUI>
  );

  const renderLink = () => (
    <a href={href} className={classes}>
      {children}
    </a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
