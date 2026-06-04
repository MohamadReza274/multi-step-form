import { useFormContext, useWatch } from "react-hook-form";

import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormInput } from "#/components/form/components";

const SalaryRangeForm = () => {
    const { control, setValue } = useFormContext();

    const preferNotToSpecify = useWatch({
        control,
        name: "salaryNotSpecified",
    });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div>
                <h3 className="text-sm font-semibold">Salary Range</h3>
                <p className="text-xs text-muted-foreground">
                    Define salary expectations or let candidates know it's not specified.
                </p>
            </div>

            {/* Checkbox */}
            <FormField
                control={control}
                name="salaryNotSpecified"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <Checkbox
                            id="no-salary"
                            checked={field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked);

                                // clear values when enabled
                                if (checked) {
                                    setValue("salaryMin", undefined);
                                    setValue("salaryMax", undefined);
                                }
                            }}
                        />

                        <FormLabel id="no-salary" className="text-sm font-medium">
                            I prefer not to specify salary
                        </FormLabel>
                    </FormItem>
                )}
            />

            {/* Min / Max */}
            {!preferNotToSpecify && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormInput
                        name="salaryMin"
                        control={control}
                        label="Minimum Salary"
                        placeholder="e.g. 1000"
                        type="number"
                    />

                    <FormInput
                        type="number"
                        placeholder="e.g. 10000"
                        name="salaryMax"
                        control={control}
                        label="Maximum Salary"
                    />
                </div>
            )}

            {/* Currency (only if not hidden) */}
            {!preferNotToSpecify && (
                <FormField
                    control={control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem className="max-w-xs">
                            <FormLabel>Currency</FormLabel>

                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Currencies</SelectLabel>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="AFN">AFN</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    );
};

export default SalaryRangeForm;
