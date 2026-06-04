import {FormInput, FormSearchableSelect, FormTextarea,} from "#/components/form/components";
import {useFormContext} from "react-hook-form";
import {categories} from "#/utils/constants.ts";

// title
// categoryId
// description

const BasicInfo = () => {
    const {control} = useFormContext();
    return (
        <div className="space-y-4">
            <FormInput required
                name="title"
                control={control}
                label="Job Title"
                placeholder="e.g. Senior Software Engineer"
            />

            <FormSearchableSelect required
                label="Select Category"
                placeholder="Select one category"
                name="categoryId"
                options={categories.map((c) => ({label:c.name,value:c.name}))}
                control={control}
            />

            <FormTextarea required
                label="Description"
                name="description"
                control={control}
            />
        </div>
    );
};

export default BasicInfo;
