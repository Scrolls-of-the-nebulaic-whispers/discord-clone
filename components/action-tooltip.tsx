"use client";

import { FC, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  align?: "start" | "center" | "end";
  children: ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
}

import React from "react";

export const ActionTooltip: FC<Props> = ({
  align = "center",
  children,
  label,
  side = "left",
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label?.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
