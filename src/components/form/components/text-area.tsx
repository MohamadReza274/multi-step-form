"use client";

import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Asterisk} from "lucide-react";
import type {Control, FieldValues, Path} from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;

    label?: string;
    placeholder?: string;
    description?: string;

    rows?: number;
    required?: boolean;

    defaultValue?: T[Path<T>];
}

export function FormTextarea<T extends FieldValues>({
                                                        name,
                                                        control,
                                                        label,
                                                        placeholder,
                                                        description,
                                                        rows = 6,
                                                        required = false,
                                                        defaultValue,
                                                    }: FormTextareaProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
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
                        <Textarea
                            {...field}
                            value={field.value ?? ""}
                            placeholder={placeholder}
                            rows={rows}
                        />
                    </FormControl>

                    {description && <FormDescription>{description}</FormDescription>}

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FormTextarea;
