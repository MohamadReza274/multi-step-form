"use client";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import type {Control, FieldValues, Path} from "react-hook-form";
import MultiSelect from "#/components/multi-select";
import {Asterisk} from "lucide-react";

interface Option {
    label: string;
    value: string;
}

interface FormMultiSelectProps<T extends FieldValues> {
    name: Path<T>; // type-safe field name
    control: Control<T>; // pass RHF control
    label?: string;
    placeholder?: string;
    options: Option[];
    defaultValue?: string[]; // type-safe default value (should be an array)
    description?: string;
    required?: boolean;
}

const FormMultiSelect = <T extends FieldValues>({
                                                    name,
                                                    control,
                                                    label,
                                                    placeholder,
                                                    options,
                                                    defaultValue,
                                                    description, required = false
                                                }: FormMultiSelectProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className="flex flex-col">
                    {label && <FormLabel className="inline-flex">{label}{required &&
                        <Asterisk className="text-destructive/50 size-3.5 -ml-1 -mt-1.5"
                                  aria-label="required"/>}</FormLabel>}
                    <FormControl>
                        <MultiSelect
                            defaultValue={defaultValue}
                            options={options}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder={placeholder ?? "Choose Items..."}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormMultiSelect;
