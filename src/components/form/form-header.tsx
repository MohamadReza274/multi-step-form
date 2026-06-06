import type {Step} from "./types.ts";
import {BriefcaseIcon} from "lucide-react";
import {motion} from "motion/react";

interface Props {
    step: Step;
}

const FormHeader = ({step}: Props) => {
    if (step.type === "review") {
        return <ReviewHeader/>;
    }
    if (step.edit) {
        return <EditHeader/>;
    }
    return (
        <header className="flex shrink-0 items-center justify-end px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex items-center gap-2">
                {Array.from({length: step.step.progress.numberOfSteps}).map(
                    (_, i) => {
                        const prev = i + 1 < step.step.progress.currentStep;
                        const curr = i + 1 === step.step.progress.currentStep;
                        return (
                            <motion.div
                                key={i}
                                className="h-2 rounded-full"
                                animate={{
                                    width: curr ? "1.25rem" : "0.5rem",
                                    backgroundColor: curr || prev ? "#10b981" : "#e5e7eb",
                                }}
                                transition={{duration: 0.3}}
                            />
                        );
                    },
                )}
            </div>
        </header>
    );
};

export default FormHeader;

function EditHeader() {
    return (
        <header className="shrink-0 border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-2xl px-8 py-5">
                <Logo/>
            </div>
        </header>
    );
}

function Logo() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-emerald-500">
                <BriefcaseIcon className="size-3.5 " strokeWidth={2.5}/>
            </div>
            <div>
                <p className="text-sm leading-none font-bold text-gray-950">
                    Full-Stack Engineer
                </p>
                <p className="mt-0.5 text-xs font-medium text-gray-500">
                    Afghanistan · Remote · Full-time
                </p>
            </div>
        </div>
    );
}

function ReviewHeader() {
    return (
        <header className="shrink-0 border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-2xl px-8 py-5">
                <div className="mb-5">
                    <Logo/>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-emerald-500"/>
                    <p className="text-sm font-semibold text-gray-700">
                        Review your application
                    </p>
                </div>
            </div>
        </header>
    );
}
