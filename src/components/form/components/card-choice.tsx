import {useId} from "react";
import {Controller, useFormContext} from "react-hook-form";

import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {cn} from "#/lib/utils";
import {Asterisk} from "lucide-react";

export interface CardChoice {
    type: "cardChoice";
    name: string;
    label: string;
    description?: string;
    required?: boolean;
    options: {
        icon?: React.ReactNode;
        label: string;
        value: string;
    }[];
}

export default function CardChoiceView({
                                           name,
                                           label,
                                           options,
                                           description, required = false
                                       }: CardChoice) {
    const id = useId();
    const {control} = useFormContext();

    return (
        <div>
            <div className="mb-3">
                <Label htmlFor={id} className="block text-sm font-semibold">
                    {label} {required && <Asterisk className="inline-flex text-destructive/50 size-3.5 -ml-1 -mt-1.5"
                                                   aria-label="required"/>}
                </Label>

                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <RadioGroup
                        aria-labelledby={id}
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-wrap gap-3"
                    >
                        {options.map((option) => {
                            const itemId = `${name}-${option.value}`;
                            const isSelected = field.value === option.value;

                            return (
                                <Label
                                    key={option.value}
                                    htmlFor={itemId}
                                    className={cn(
                                        "flex min-w-32 flex-1 cursor-pointer flex-col items-center gap-3 rounded-xl border px-4 py-6 text-sm font-medium transition-all duration-150",
                                        isSelected
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:bg-accent hover:text-accent-foreground",
                                    )}
                                >
                                    <RadioGroupItem
                                        id={itemId}
                                        value={option.value}
                                        className="sr-only"
                                    />

                                    {option.icon && (
                                        <span
                                            className={cn(
                                                "transition-colors",
                                                isSelected ? "text-primary" : "text-muted-foreground",
                                            )}
                                        >
                      {option.icon}
                    </span>
                                    )}

                                    <span className="text-center leading-tight">
                    {option.label}
                  </span>
                                </Label>
                            );
                        })}
                    </RadioGroup>
                )}
            />
        </div>
    );
}
