import type {OnReturn} from "@formity/react";
import {useFormity} from "@formity/react";
import {useCallback, useState} from "react";

import {Completion} from "./completion";

import type {FormStatus, Status} from "./types.ts";
import {flow, type Schema} from "./flow";
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
        setStatus({type: "form", submitting: false});

        setStatus({type: "completion"})
    }, []);

    return (
        <div
            className="h-full"
        >
            <Stage

                status={status}
                onStatusChange={setStatus}
                onReturn={onReturn}
            />
        </div>
    );
}

interface StageProps {
    status: Status;
    onStatusChange: (status: Status) => void;
    onReturn: OnReturn<Schema>;
}

function Stage({
                   status,
                   onReturn,
               }: StageProps) {
    switch (status.type) {
        case "form": {
            return (
                <Form

                    status={status}
                    onReturn={onReturn}
                />
            );
        }
        case "completion": {
            return (
                <Completion/>
            );
        }
    }
}

interface FormProps {
    status: FormStatus;
    onReturn: OnReturn<Schema>;
}

function Form({status, onReturn}: FormProps) {
    const {step, form} = useFormity({
        flow,
        params: {status},
        history: false,
        onReturn,
    });
    return (
        <div className="flex h-full flex-col overflow-hidde">
            <FormHeader step={step}/>
            <div className="flex-1 flex-col overflow-hidden">{form}</div>
        </div>
    );
}
