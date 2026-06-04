"use client";

import ComboboxWithSearch from "@/components/searchable-combobox";
import {type LucideIcon} from "lucide-react";
import {type Control, Controller, type FieldValues, type Path,} from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface FormSearchableSelectProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    placeholder?: string;
    label?: string;
    options: Option[];
    defaultValue?: T[Path<T>];

    /** Optional icon (always on the left) */
    icon?: LucideIcon;
    direction?: "ltr" | "rtl";
    searchBy?: "label" | "value";
    required?: boolean;
}

const FormSearchableSelect = <T extends FieldValues>({
                                                         name,
                                                         control,
                                                         placeholder,
                                                         label,
                                                         options,
                                                         defaultValue,
                                                         icon: Icon,
                                                         direction = "ltr",
                                                         searchBy = "value",
                                                         required = false,
                                                     }: FormSearchableSelectProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field, fieldState}) => (
                <div className="w-full relative">
                    <ComboboxWithSearch required={required}
                        defaultValue={defaultValue}
                        searchBy={searchBy}
                        icon={Icon}
                        placeholder={placeholder}
                        label={label}
                        options={options}
                        value={field.value}
                        onChange={field.onChange}
                        className={Icon && direction === "ltr" ? "pl-10" : ""} // padding for the icon
                    />
                    {fieldState.error && (
                        <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default FormSearchableSelect;
