// education
// minExperience
// gender
// requirements
// jobLevel

import {
    FormInput,
    FormRadioGroup,
    FormSelect,
    FormTextarea,
} from "#/components/form/components";
import { educationLevels, genderInfo, jobLevels } from "#/utils/constants";
import { useFormContext } from "react-hook-form";

const CandidateRequirements = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-4">
            <FormSelect required
                name="educationLevel"
                options={educationLevels}
                control={control}
                label="Education Level"
            />
            <FormInput required
                name="minExperience"
                type="number"
                control={control}
                label="Min Experience (in years)"
            />
            <FormRadioGroup required
                control={control}
                label="Gender"
                name="gender"
                options={genderInfo.map((g) => ({ value: g.id, label: g.title }))}
            />
            <FormSelect label="Job Level"
                control={control}
                name="jobLevel"
                options={jobLevels.map((jl) => ({ value: jl.id, label: jl.title }))}
            />
            <FormTextarea required label="Job Requirements" name="requirements" control={control} />
        </div>
    );
};

export default CandidateRequirements;
