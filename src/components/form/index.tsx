import type {DefaultValues, FieldValues, Resolver} from "react-hook-form";
import {FormProvider, useForm} from "react-hook-form";
import type {OnJump, OnNext} from "@formity/react";

import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {type ReactNode} from "react";
import type {FormStatus} from "#/components/form/types.ts";

interface FormProps<T extends FieldValues> {
    defaultValues: DefaultValues<T>;
    resolver: Resolver<T>;
    heading: string;
    message: string;
    buttons: {
        back: string | null;
        next: string;
        edit: string;
    };
    onNext: OnNext<T>;
    onJump: OnJump<T>;
    prevId: string | null;
    edit: boolean;
    children: ReactNode;
    status: FormStatus;

    eyebrow: string | null;
}

export function Form<T extends FieldValues>({
                                                defaultValues,
                                                resolver,
                                                heading,
                                                message,
                                                children,
                                                status, eyebrow,
                                                buttons,
                                                onNext,
                                                onJump,
                                                prevId,
                                                edit,
                                            }: FormProps<T>) {
    const form = useForm({defaultValues, resolver, mode: "onChange"});
    return <div

        className="h-full"
    >
        <form
            noValidate
            autoComplete="off"
            onSubmit={form.handleSubmit((fields) => {
                if (edit) onJump("review", fields);
                else onNext(fields);
            })}
            className="@container flex h-full flex-1 flex-col overflow-hidden"
        >
            <FormProvider {...form}>
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-2xl px-6 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-8">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                            {eyebrow}
                        </p>

                        <h2 className="mb-2 text-2xl leading-tight font-bold text-foreground">
                            {heading}
                        </h2>

                        <p className="mb-10 text-sm font-medium text-muted-foreground">
                            {message}
                        </p>
                        <div className="flex flex-col gap-10">{children}</div>
                    </div>
                </div>
                <div className="shrink-0 border-t border-border">
                    <div className="mx-auto flex max-w-2xl items-center px-6 py-4 sm:px-10 sm:py-5">
                        {buttons.back && !edit && (
                            <Button
                                type="button"
                                onClick={() => onJump(prevId, form.getValues())}
                                variant="ghost"
                            >
                                <ArrowLeftIcon className="size-3.5"/> {buttons.back}
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={!form.formState.isValid || status.submitting}
                            className="ml-auto"
                        >
                            {edit ? buttons.edit : buttons.next}
                            {/* {status.submitting ? "Submitting..." : buttons.next} */}
                            <ArrowRightIcon className="size-3.5"/>
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </form>
    </div>

}
