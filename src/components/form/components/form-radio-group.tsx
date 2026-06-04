import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {Asterisk, type LucideIcon} from "lucide-react";
import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form";

export type RadioOption = {
    label: string;
    value: string;
    id?: string; // optional, auto-generate if not provided
    description?: string;
};

interface FormRadioGroupProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    description?: string;
    options: RadioOption[];
    defaultValue?: T[Path<T>];
    control: Control<T>; // pass RHF control explicitly
    icon?: LucideIcon; // 👈 new prop
    required?: boolean;
}

const FormRadioGroup = <T extends FieldValues>({
                                                   name,
                                                   label,
                                                   description,
                                                   options,
                                                   defaultValue,
                                                   control,
                                                   icon: Icon,
    required = false,
                                               }: FormRadioGroupProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <FieldSet className="w-full max-w-xs">
                    <FieldLegend variant="label">
                        {Icon && <Icon className="size-4 inline-flex items-center" />}{" "}
                        {label} {required && <Asterisk className="inline-flex text-destructive/50 size-3.5 -ml-1 -mt-1.5" aria-label="required" />}
                    </FieldLegend>
                    {description && <FieldDescription>{description}</FieldDescription>}

                    <RadioGroup value={field.value || ""} onValueChange={field.onChange}>
                        {options.map((option, index) => {
                            const id = option.id ?? `${name}-${index}`;
                            return (
                                <Field key={id} orientation="horizontal">
                                    <RadioGroupItem value={option.value} id={id} />
                                    <FieldContent>
                                        <FieldLabel htmlFor={id} className="font-normal">
                                            {option.label}
                                        </FieldLabel>
                                        <FieldDescription>{option.description}</FieldDescription>
                                    </FieldContent>
                                </Field>
                            );
                        })}
                    </RadioGroup>

                    {fieldState.error && (
                        <p className="text-sm text-destructive">
                            {fieldState.error.message}
                        </p>
                    )}
                </FieldSet>
            )}
        />
    );
};

export default FormRadioGroup;
