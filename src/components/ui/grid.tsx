
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  numItemsSm?: number;
  numItemsMd?: number;
  numItemsLg?: number;
  children: React.ReactNode;
}

export const Grid = ({
  numItemsSm = 1,
  numItemsMd = 2,
  numItemsLg = 3,
  className,
  children,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        "grid gap-4",
        numItemsSm && `sm:grid-cols-${numItemsSm}`,
        numItemsMd && `md:grid-cols-${numItemsMd}`,
        numItemsLg && `lg:grid-cols-${numItemsLg}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
