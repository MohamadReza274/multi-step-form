import {FormInput, FormMultiSelect, FormSelect} from "#/components/form/components";
import {afghanistanProvinces, jobTypes, workModes} from "#/utils/constants";
import {useFormContext} from "react-hook-form";

// employmentType
// workMode
// locations
// contractDuration
// numberOfJobs
// vacancyNumber

type Props = {
    locationDefaultValues?: string[];
};

const JobDetailsForm = ({locationDefaultValues}: Props) => {
    const {control} = useFormContext();
    const locations = afghanistanProvinces.map((p) => ({
        label: p.label,
        value: p.name,
    }));
    return (
        <div className="space-y-4">
            <FormSelect required
                        label="Employment Type"
                        name="employmentType"
                        options={jobTypes.map((t) => ({label: t.value, value: t.key}))}
                        control={control}
            />
            <FormSelect required
                        label="Work Mode"
                        options={workModes}
                        name="workMode"
                        control={control}
            />
            <FormMultiSelect required
                             defaultValue={locationDefaultValues}
                             label="Select Locations"
                             description="Select where this job is available"
                             options={locations}
                             name="locations"
                             control={control}
            />
            <FormInput
                label="Contract Duration"
                control={control}
                name="contractDuration"
            />
            <FormInput required
                       type="number"
                       name="numberOfJobs"
                       control={control}
                       label="Number of jobs"
            />
            <FormInput required
                       label="Vacancy Number"
                       control={control}
                       name="vacancyNumber"
            />
        </div>
    );
};

export default JobDetailsForm;
