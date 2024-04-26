"use client";

import React, { useState, forwardRef } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import type { CalendarProps } from "~/components/ui/calendar";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import TimePicker from "./time-picker";

export interface DateTimePickerProps
  extends React.ComponentPropsWithRef<typeof PopoverTrigger>,
    Pick<CalendarProps, "onSelect" | "selected"> {}

export const DateTimePicker = forwardRef<typeof PopoverTrigger, DateTimePickerProps>(
  ({ onChange, selected, ...props }, ref) => {
    const formatter = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "medium",
    });

    return (
      <Popover>
        <PopoverTrigger ref={ref} {...props} asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[280px] justify-start rounded-md text-left font-normal",
              !selected && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? formatter.format(selected) : <span>Choisissez une date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={selected} onSelect={onChange} initialFocus />
          <div className="border-t border-border p-3">
            <TimePicker setDate={onChange} date={selected} />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";
