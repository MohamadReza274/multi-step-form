import * as React from "react";
import {
    Controller,
    FormProvider,
    useFormContext,
    useFormState,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Form Root                                */
/* -------------------------------------------------------------------------- */

const Form = FormProvider;

/* -------------------------------------------------------------------------- */
/*                                Form Field                                  */
/* -------------------------------------------------------------------------- */

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue,
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
      ...props
  }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

/* -------------------------------------------------------------------------- */
/*                               useFormField                                 */
/* -------------------------------------------------------------------------- */

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

/* -------------------------------------------------------------------------- */
/*                                Form Item                                   */
/* -------------------------------------------------------------------------- */

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                data-slot="form-item"
                className={cn("grid gap-2", className)}
                {...props}
            />
        </FormItemContext.Provider>
    );
}

/* -------------------------------------------------------------------------- */
/*                                Form Label                                  */
/* -------------------------------------------------------------------------- */

function FormLabel({
                       className,
                       ...props
                   }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    const { error, formItemId } = useFormField();

    return (
        <label
            data-slot="form-label"
            data-error={!!error}
            htmlFor={formItemId}
            className={cn(
                "text-sm font-medium leading-none",
                "data-[error=true]:text-destructive",
                className,
            )}
            {...props}
        />
    );
}

/* -------------------------------------------------------------------------- */
/*                               Form Control                                 */
/* -------------------------------------------------------------------------- */

/**
 * Replaces Radix Slot.Root
 *
 * This clones the child element and injects accessibility props.
 */
function FormControl({ children }: { children: React.ReactElement<any> }) {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return React.cloneElement(children, {
        id: formItemId,
        "aria-describedby": !error
            ? formDescriptionId
            : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
    });
}

/* -------------------------------------------------------------------------- */
/*                             Form Description                               */
/* -------------------------------------------------------------------------- */

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

/* -------------------------------------------------------------------------- */
/*                               Form Message                                 */
/* -------------------------------------------------------------------------- */

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : props.children;

    if (!body) return null;

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn("text-destructive text-sm", className)}
            {...props}
        >
            {body}
        </p>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
