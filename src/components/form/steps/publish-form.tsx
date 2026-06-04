// closeDate
// status
// publishedAt

import { FormDatePicker, FormSelect } from "#/components/form/components";
import { useFormContext, useWatch } from "react-hook-form";

const PublishingForm = () => {
    const { control } = useFormContext();
    const status = useWatch({
        control,
        name: "status",
    });
    return (
        <div className="space-y-4">
            <FormDatePicker required
                hasIcon
                label="Close Date"
                name="closeDate"
                control={control}
            />
            <FormSelect
                label="Job Status"
                name="status"
                control={control}
                options={[
                    { label: "Draft", value: "DRAFT" },
                    { label: "Publish", value: "PUBLISHED" },
                ]}
            />
            {status === "PUBLISHED" && (
                <FormDatePicker
                    label="Published Date"
                    name="publishedAt"
                    control={control}
                />
            )}
        </div>
    );
};
export default PublishingForm;
