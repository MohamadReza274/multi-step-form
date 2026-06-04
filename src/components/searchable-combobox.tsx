"use client";

import {Asterisk, CheckIcon, ChevronDownIcon, type LucideIcon} from "lucide-react";
import {useEffect, useId, useState} from "react";

import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Label} from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

export type ComboOption = {
    value: string;
    label: string;
};

type ComboboxWithSearchProps = {
    options: ComboOption[];

    /** Controlled value */
    value?: string;

    /** Default value for uncontrolled usage */
    defaultValue?: string;

    onChange?: (value: string) => void;

    placeholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
    label?: string;

    icon?: LucideIcon;
    required?: boolean;
    searchBy?: "value" | "label";
};

const ComboboxWithSearch = ({
                                options,
                                value,
                                defaultValue = "",
                                onChange,
                                placeholder = "Select item...",
                                emptyMessage = "No item found.",
                                disabled,
                                className,
                                label,
                                icon: Icon,
                                required,
                                searchBy = "value",
                            }: ComboboxWithSearchProps) => {
    const [open, setOpen] = useState(false);
    const id = useId();

    // internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue);

    // if component becomes controlled, sync state
    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    const currentValue = value !== undefined ? value : internalValue;

    const selectedLabel = currentValue
        ? options.find((o) => o.value === currentValue)?.label
        : "";

    const handleSelect = (val: string) => {
        if (value === undefined) {
            setInternalValue(val); // uncontrolled
        }

        onChange?.(val);
        setOpen(false);
    };

    return (
        <div className="w-full space-y-2">
            {label && <Label htmlFor={id}>{label} {required &&
                <Asterisk className="text-destructive/50 size-3.5 -ml-2.5 -mt-2" aria-label="required" />}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            id={id}
                            type="button"
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            disabled={disabled}
                            className={cn("w-full justify-between", className)}
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                {Icon && (
                                    <Icon className="w-4 h-4 shrink-0 text-muted-foreground"/>
                                )}

                                <span
                                    className={cn(
                                        "truncate",
                                        selectedLabel ? "" : "text-muted-foreground",
                                    )}
                                >
                  {selectedLabel || placeholder}
                </span>
                            </div>

                            <ChevronDownIcon className="opacity-50 w-4 h-4 shrink-0"/>
                        </Button>
                    }
                />

                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9"/>

                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>

                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={searchBy === "label" ? option.label : option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        {option.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto",
                                                currentValue === option.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ComboboxWithSearch;
