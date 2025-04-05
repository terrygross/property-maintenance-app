
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
  // Create grid classes manually instead of using string interpolation
  // which doesn't work well with Tailwind's JIT compiler
  const getGridColsClass = (breakpoint: string, count: number) => {
    const map = {
      '1': `${breakpoint}:grid-cols-1`,
      '2': `${breakpoint}:grid-cols-2`,
      '3': `${breakpoint}:grid-cols-3`,
      '4': `${breakpoint}:grid-cols-4`,
      '5': `${breakpoint}:grid-cols-5`,
      '6': `${breakpoint}:grid-cols-6`,
    };
    return map[count as keyof typeof map] || `${breakpoint}:grid-cols-${count}`;
  };

  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-1",
        numItemsSm && getGridColsClass('sm', numItemsSm),
        numItemsMd && getGridColsClass('md', numItemsMd),
        numItemsLg && getGridColsClass('lg', numItemsLg),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
