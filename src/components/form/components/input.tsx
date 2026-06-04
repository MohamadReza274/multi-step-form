"use client";

import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Asterisk, type LucideIcon} from "lucide-react";
import type {HTMLInputTypeAttribute} from "react";
import type {Control, FieldValues, Path} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    control: Control<T>;
    defaultValue?: T[Path<T>];
    description?: string;
    required?: boolean;

    /** Now accepts icon component */
    icon?: LucideIcon;
    direction?: "ltr" | "rtl";
    iconPosition?: "left" | "right";
}

const FormInput = <T extends FieldValues>({
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                              description,
                                              control,
                                              defaultValue,
                                              icon: Icon,
                                              iconPosition = "left",
                                              required = false,
                                          }: FormInputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem>
                    {label && (
                        <FormLabel className="inline-flex">
                            {label}
                            {required && (
                                <Asterisk className="text-destructive/50 size-3.5 -ml-1 -mt-1.5" aria-label="required" />
                            )}
                        </FormLabel>
                    )}

                    <FormControl>
                        <div className="relative">
                            <Input
                                type={type}
                                placeholder={placeholder}
                                {...field}
                                className={cn(
                                    Icon && iconPosition === "left" && "pl-10",
                                    Icon && iconPosition === "right" && "pr-10",
                                )}
                                onChange={(e) => {
                                    if (type === "number") {
                                        const value = e.target.value;
                                        field.onChange(value === "" ? undefined : Number(value));
                                    } else {
                                        field.onChange(e.target.value);
                                    }
                                }}
                            />

                            {Icon && (
                                <div
                                    className={cn(
                                        "pointer-events-none absolute inset-y-0 flex items-center text-muted-foreground peer-disabled:opacity-50",
                                        iconPosition === "left" && "left-0 pl-3",
                                        iconPosition === "right" && "right-0 pr-3",
                                    )}
                                >
                                    <Icon className="size-4"/>
                                </div>
                            )}
                        </div>
                    </FormControl>

                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormInput;
