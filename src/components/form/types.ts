export type Status = FormStatus | CompletionStatus;

export type FormStatus = {
    type: "form";
    submitting: boolean;
};

export type CompletionStatus = {
    type: "completion";
};

export type Step = FormStep | ReviewStep;

export type FormStep = {
    type: "form";
    step: {
        progress: {
            numberOfSteps: number;
            currentStep: number;
        };
    };
    edit: boolean;
};

export type ReviewStep = {
    type: "review";
};
