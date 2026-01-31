import { cn } from "@repo/utils";
import * as React from "react";

type Gap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

const gapClasses: Record<Gap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "column",
      gap = "4",
      align = "stretch",
      justify = "start",
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "row" ? "flex-row" : "flex-col",
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";
