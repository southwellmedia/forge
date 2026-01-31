"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faInfoCircle,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

export interface ToasterProps {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  expand?: boolean;
  duration?: number;
  closeButton?: boolean;
  gap?: number;
  offset?: string;
}

const Toaster = React.memo(function Toaster({
  position = "bottom-right",
  expand = false,
  duration = 4000,
  closeButton = false,
  gap = 14,
  offset = "24px",
  ...props
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      expand={expand}
      richColors={false}
      duration={duration}
      closeButton={closeButton}
      gap={gap}
      offset={offset}
      icons={{
        success: <FontAwesomeIcon icon={faCheckCircle} />,
        error: <FontAwesomeIcon icon={faTimesCircle} />,
        warning: <FontAwesomeIcon icon={faExclamationCircle} />,
        info: <FontAwesomeIcon icon={faInfoCircle} />,
        loading: <FontAwesomeIcon icon={faCircleNotch} spin />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: [
            // Base container
            "group w-[380px] p-4 pl-5",
            "bg-[var(--color-card)] dark:bg-[var(--color-gray-900)]",
            "rounded-2xl",
            // Shadow
            "shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)]",
            "dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5),0_4px_12px_-2px_rgba(0,0,0,0.3)]",
            // Subtle border
            "ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
            // Layout
            "flex items-start gap-4",
            // Animation
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:slide-out-to-right-full",
            "data-[state=open]:duration-300 data-[state=closed]:duration-200",
          ].join(" "),
          // Title - uses CSS custom property from global tokens
          title: [
            "text-[14px] font-semibold tracking-[-0.01em] leading-tight",
            "text-[var(--toast-title-color)]",
          ].join(" "),
          // Description - always muted
          description: [
            "text-[13px] leading-relaxed mt-1.5",
            "text-[var(--color-gray-500)] dark:text-[var(--color-gray-400)]",
          ].join(" "),
          // Action button - uses design system tokens with !important to override Sonner defaults
          actionButton: [
            "!inline-flex !items-center !justify-center",
            "!h-8 !px-3.5 !rounded-lg !mt-3",
            "!text-[13px] !font-semibold !tracking-[-0.01em]",
            "!bg-[var(--color-gray-900)] dark:!bg-white",
            "!text-white dark:!text-[var(--color-gray-900)]",
            "hover:!bg-[var(--color-gray-800)] dark:hover:!bg-[var(--color-gray-100)]",
            "!transition-colors !duration-150",
            "!border-0 !outline-none",
            "focus-visible:!ring-2 focus-visible:!ring-offset-2 focus-visible:!ring-[var(--color-gray-400)]",
          ].join(" "),
          // Cancel button
          cancelButton: [
            "!inline-flex !items-center !justify-center",
            "!h-8 !px-3.5 !rounded-lg !mt-3",
            "!text-[13px] !font-medium",
            "!bg-transparent !border-0",
            "!text-[var(--color-gray-600)] dark:!text-[var(--color-gray-300)]",
            "hover:!bg-[var(--color-gray-100)] dark:hover:!bg-[var(--color-gray-800)]",
            "!transition-colors !duration-150",
          ].join(" "),
          // Close button - minimal, appears on hover
          closeButton: [
            "!absolute !right-2 !top-2",
            "!h-7 !w-7 !rounded-lg",
            "!flex !items-center !justify-center",
            "!border-0 !bg-transparent",
            "!text-[var(--color-gray-400)] dark:!text-[var(--color-gray-500)]",
            "!opacity-0 group-hover:!opacity-100",
            "hover:!bg-[var(--color-gray-100)] dark:hover:!bg-[var(--color-gray-800)]",
            "hover:!text-[var(--color-gray-600)] dark:hover:!text-[var(--color-gray-300)]",
            "!transition-all !duration-150",
          ].join(" "),
          // Icon container - uses CSS custom properties from global tokens
          icon: [
            "flex-shrink-0 relative",
            "w-9 h-9 mt-0.5",
            "flex items-center justify-center",
            "rounded-xl",
            // Colors from CSS custom properties defined in tokens/index.css
            "bg-[var(--toast-icon-bg)]",
            "text-[var(--toast-icon-color)]",
            "shadow-[var(--toast-icon-shadow)]",
            "[&>svg]:w-[18px] [&>svg]:h-[18px]",
          ].join(" "),
          // Empty - styling handled by CSS custom properties in tokens/index.css
          success: "",
          error: "",
          warning: "",
          info: "",
          loading: "",
        },
      }}
      {...props}
    />
  );
});

// Re-export toast with all sonner methods
const toast = sonnerToast;

export { Toaster, toast };
