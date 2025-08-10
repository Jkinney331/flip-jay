"use client";

import React from "react";
import clsx from "clsx";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

export const LiquidButton = ({
  children,
  className = "",
  size = "md",
  variant = "default",
  ...props
}: LiquidButtonProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    default: mounted ? "bg-white/30 dark:bg-white/10 border-black/10 dark:border-white/10" : "bg-white/30",
    outline: "bg-transparent border border-current",
    ghost: "bg-transparent border-none",
  };

  return (
    <button
      {...props}
      className={clsx(
        `relative font-semibold rounded-xl 
         backdrop-blur-md shadow-lg overflow-hidden 
         transition-all duration-300 hover:scale-105`,
        mounted ? "text-black dark:text-white" : "text-black",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 opacity-20 blur-md rounded-xl" />
    </button>
  );
};
