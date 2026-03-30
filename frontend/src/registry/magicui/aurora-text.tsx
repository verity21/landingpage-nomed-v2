import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function AuroraText({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("aurora-text", className)} {...props}>
      {children}
    </span>
  );
}
