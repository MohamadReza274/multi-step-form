"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type {Control, FieldValues, Path} from "react-hook-form";
import {Asterisk} from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps<T extends FieldValues> {
    name: Path<T>; // type-safe key in the form
    control: Control<T>; // pass RHF control
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    defaultValue?: T[Path<T>]; // type-safe default value
    required?: boolean;
}

const FormSelect = <T extends FieldValues>({
                                               name,
                                               control,
                                               label,
                                               placeholder,
                                               options,
                                               defaultValue,
                                               required = false,
                                           }: FormSelectProps<T>) => {
    return (
        <FormField
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel className="inline-flex">{label} {required &&
                        <Asterisk className="text-destructive/50 size-3.5 -ml-1 -mt-1.5"
                                  aria-label="required"/>}</FormLabel>}
                    <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={placeholder ?? "Select a value"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FormSelect;
