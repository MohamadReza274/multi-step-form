import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "#/components/ui/select";
import {
    Controller,
    useFieldArray,
    useFormContext,
    type Control,
} from "react-hook-form";
import { XIcon } from "lucide-react";

const renderOptionsInput = (type: any): boolean => {
    switch (type) {
        case "SELECT":
            return true;
        case "CHECKBOX":
            return true;
        case "RADIO":
            return true;
        case "BOOLEAN":
            return true;
        case "TEXT":
            return false;
        case "TEXTAREA":
            return false;
        default:
            return false;
    }
};

interface StepScreeningQuestionsProps {
    control?: Control<any>;
}

const QuestionsForm = ({
                           control: propControl,
                       }: StepScreeningQuestionsProps) => {
    const context = useFormContext();
    // Try to get control from context, fallback to prop
    const control = propControl || context?.control;

    if (!control) {
        console.error(
            "StepScreeningQuestions must be used within a FormProvider or receive control prop",
        );
        return null;
    }

    const { register, watch } = context || {};

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Screening Questions</h2>

            {fields.map((field, index) => {
                const selectedType = watch(`questions.${index}.type`);
                const currentType = renderOptionsInput(selectedType);
                return (
                    <div key={field.id} className="border p-4 rounded-md space-y-2">
                        <Input
                            placeholder="Enter your question..."
                            {...register(`questions.${index}.question`)}
                        />

                        <Controller
                            name={`questions.${index}.type`}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select question type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TEXT">Short Answer</SelectItem>
                                        <SelectItem value="TEXTAREA">Long Answer</SelectItem>
                                        <SelectItem value="SELECT">Dropdown</SelectItem>
                                        <SelectItem value="RADIO">Single Choice</SelectItem>
                                        <SelectItem value="CHECKBOX">Multiple Choise</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        {/* Optional options input */}
                        {currentType && (
                            // <FormInput
                            //   label="Options for Dropdown,Single Choise,Multiple Choise"
                            //   placeholder="Options (comma separated)"
                            //   name={`questions.${index}.options`}
                            //   control={control}
                            // />
                            <QuestionOptions index={index} />
                        )}

                        <div className="flex justify-between">
                            <Controller
                                name={`questions.${index}.required`}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`required-${index}`}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor={`required-${index}`}>
                                            This Question is Required?
                                        </Label>
                                    </div>
                                )}
                            />

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                );
            })}

            <Button
                type="button"
                onClick={() =>
                    append({
                        question: "",
                        type: "TEXT",
                        required: false,
                        options: [],
                    })
                }
            >
                + Add Question
            </Button>
        </div>
    );
};

export default QuestionsForm;

interface Props {
    index: number;
}
function QuestionOptions({ index }: Props) {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${index}.options`,
    });

    return (
        <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Options</p>
            {fields.map((field, optIndex) => (
                <div key={field.id} className="flex gap-2">
                    <Input
                        placeholder={`Option${optIndex + 1}`}
                        {...register(`questions.${index}.options.${optIndex}`)}
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(optIndex)}
                    >
                        <XIcon />
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                variant="secondary"
                onClick={() => append("", { shouldFocus: true })}
            >
                + Add Option
            </Button>
        </div>
    );
}
