import type {OnReturn} from "@formity/react";
import {useFormity} from "@formity/react";
import {useCallback, useState} from "react";

import {Completion} from "./completion";

import type {FormStatus, Status} from "./types.ts";
import {flow, inputs, type Schema} from "./flow";
import FormHeader from "./form-header";

export function AddJobForm() {
    const [status, setStatus] = useState<Status>({
        type: "form",
        submitting: false,
    });

    const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
        setStatus({type: "form", submitting: true});

        // Show output in the console
        console.log(output);

        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStatus({type: "completion"})
    }, []);


    if (status.type === "completion") {
        return (
            <Completion/>
        );
    }

    return (
        <div
            className="h-full"
        >
            <Form
                status={status}
                onReturn={onReturn}
            />
        </div>
    );
}

interface FormProps {
    status: FormStatus;
    onReturn: OnReturn<Schema>;
}

function Form({status, onReturn}: FormProps) {
    const { step, form } = useFormity({
        flow,
        inputs,
        params: { status },
        history: true,
        onReturn,
    });
    return (
        <div className="flex h-full flex-col overflow-hidden">
            <FormHeader step={step}/>
            <div className="flex-1 flex-col overflow-hidden">{form}</div>
        </div>
    );
}
