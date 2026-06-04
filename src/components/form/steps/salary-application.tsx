
import {FormCardChoice, FormInput, FormTextarea} from "#/components/form/components";
import { ArrowLeftRight, Building2, Globe, Mail } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import SalaryRangeForm from "#/components/form/steps/salary-form.tsx";

const SalaryApplicationForm = () => {
    const { control } = useFormContext();

    const applyMode = useWatch({
        control,
        name: "applyMode",
    });

    const showEmail = applyMode === "EMAIL" || applyMode === "BOTH";

    const showExternalUrl = applyMode === "EXTERNAL" || applyMode === "BOTH";

    return (
        <div className="space-y-4">
            <SalaryRangeForm />

            <FormCardChoice required
                type="cardChoice"
                name="applyMode"
                label="Apply Mode"
                description="Choose how candidates can submit their applications for this job."
                options={[
                    {
                        label: "Internal",
                        value: "INTERNAL",
                        icon: <Building2 className="size-5" />,
                    },
                    {
                        label: "Apply With Email",
                        value: "EMAIL",
                        icon: <Mail className="size-5" />,
                    },
                    {
                        label: "External Link",
                        value: "EXTERNAL",
                        icon: <Globe className="size-5" />,
                    },
                    {
                        label: "Both Email and External Link",
                        value: "BOTH",
                        icon: <ArrowLeftRight className="size-5" />,
                    },
                ]}
            />

            <FormTextarea required
                label="Submission Guidelines"
                name="submissionGuidelines"
                control={control}
            />

            {showEmail && (
                <FormInput
                    control={control}
                    name="applicationEmail"
                    label="Application Email"
                    type="email"
                />
            )}

            {showExternalUrl && (
                <FormInput
                    control={control}
                    name="externalApplyUrl"
                    label="Apply URL"
                    type="url"
                />
            )}
        </div>
    );
};

export default SalaryApplicationForm;
