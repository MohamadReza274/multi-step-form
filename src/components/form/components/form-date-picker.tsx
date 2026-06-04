"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Asterisk, Calendar as CalendarIcon, ChevronDown} from "lucide-react";
import React from "react";
import type {DateRange, DayPickerProps} from "react-day-picker";
import type {Control, FieldValues, Path} from "react-hook-form";

interface FormDatePickerProps<T extends FieldValues> extends Omit<
    DayPickerProps,
    "selected" | "onSelect" | "mode"
> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
    mode?: "single" | "range";
    /** NEW: whether to show calendar icon */
    hasIcon?: boolean;
    required?: boolean;
}

const FormDatePicker = <T extends FieldValues>({
                                                   name,
                                                   control,
                                                   label,
                                                   placeholder,
                                                   mode = "single",
                                                   buttonVariant = "outline",
                                                   captionLayout = "dropdown",
                                                   required = false,
                                                   hasIcon = false, // default: hide icon
                                                   ...rest
                                               }: FormDatePickerProps<T>) => {
    return (
        <FormField
            name={name}
            control={control}
            // defaultValue={defaultValue}
            render={({field}) => {
                const isRange = mode === "range";

                const formattedValue = () => {
                    if (!field.value) return placeholder ?? "Pick a date";

                    if (isRange) {
                        const range = field.value as DateRange;
                        const from = range?.from ? format(range.from, "PPP") : "";
                        const to = range?.to ? format(range.to, "PPP") : "";
                        return from && to ? `${from} - ${to}` : from || to || placeholder;
                    }

                    if ((field.value as any) instanceof Date) {
                        return format(field.value, "PPP");
                    }

                    return placeholder ?? "Pick a date";
                };

                const [open, setOpen] = React.useState(false);

                const handleSelect = (value: Date | DateRange | undefined) => {
                    field.onChange(value);

                    if (mode === "single" && value instanceof Date) {
                        setOpen(false);
                        return;
                    }

                    if (
                        mode === "range" &&
                        value &&
                        (value as DateRange).from &&
                        (value as DateRange).to
                    ) {
                        setOpen(false);
                    }
                };

                return (
                    <FormItem className="flex flex-col">
                        {label && <FormLabel className="inline-flex">{label} {required && <Asterisk className="text-destructive/50 size-3.5 -ml-1 -mt-1.5" aria-label="required" />}</FormLabel>}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger
                                render={
                                    <Button
                                        type="button"
                                        variant={buttonVariant}
                                        className={cn(
                                            "w-full flex justify-between text-left! font-normal",
                                            !field.value && "text-muted-foreground",
                                        )}
                                    >
                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                            {hasIcon && (
                                                <CalendarIcon className="w-4 h-4 shrink-0 text-muted-foreground"/>
                                            )}

                                            <span className="truncate">{formattedValue()}</span>
                                        </div>

                                        <ChevronDown className="w-4 h-4 shrink-0"/>
                                    </Button>
                                }
                            >
                                Open Popover
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                                <Calendar required={required}
                                    captionLayout={captionLayout}
                                    mode={mode}
                                    selected={field.value ?? undefined}
                                    onSelect={handleSelect}
                                    {...rest}
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage/>
                    </FormItem>
                );
            }}
        />
    );
};

export default FormDatePicker;
