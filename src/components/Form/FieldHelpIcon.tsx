"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

export type FieldHelpIconProps = {
  help: string;
  icon?: ReactNode;
};

/** Label-adjacent help trigger; defaults to lucide Info when icon is omitted. */
export function FieldHelpIcon({ help, icon }: FieldHelpIconProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Help"
            onClick={(e) => e.preventDefault()}
          >
            {icon ?? <Info className="h-3.5 w-3.5" strokeWidth={2} />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs leading-snug">
          {help}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
