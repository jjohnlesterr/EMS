import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark border border-primary hover:border-primary-dark",
  secondary: "bg-white text-black border border-gray hover:bg-page",
  outline: "bg-white text-primary border border-primary hover:bg-primary-soft",
  danger: "bg-red text-white border border-red hover:bg-[#e02a2e]",
  success: "bg-[#eaf7ee] text-black border border-green hover:bg-[#dcf2e3]",
  ghost: "bg-transparent text-primary border border-transparent hover:bg-primary-soft",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
  md: "h-9 px-3.5 text-[13px] gap-2 rounded-md",
  lg: "h-10 px-4 text-sm gap-2 rounded-lg",
};

const base =
  "inline-flex items-center justify-center whitespace-nowrap font-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50";

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function buttonClass({ variant = "primary", size = "md" }: StyleProps = {}, className?: string) {
  return cn(base, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  children,
  type = "button",
  ...props
}: StyleProps & ComponentProps<"button">) {
  return (
    <button type={type} className={buttonClass({ variant, size }, className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size }, className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}
