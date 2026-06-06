import type {OnNext, OnJump} from "@formity/react";

import {ArrowRightIcon, PencilIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import type {FormStatus} from "../types.ts";

interface ReviewProps {
    heading: string;
    message: string;
    content: Item[];
    button: string;
    onNext: OnNext<Record<never, never>>;
    onJump: OnJump<Record<never, never>>;
    status: FormStatus;
}

export function Review({
                           heading,
                           message,
                           content,
                           button,
                           onNext,
                           onJump,
                           status,
                       }: ReviewProps) {
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-2xl px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-950">{heading}</h2>
                        <p className="mt-1 text-sm font-medium text-gray-400">{message}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {content.map((item, i) => (
                            <ItemView
                                key={i}
                                item={item}
                                onEdit={(edit) => onJump(edit, {})}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <footer className="shrink-0 border-t border-gray-200 bg-white">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-8 py-4">
                    <Button
                        disabled={status.submitting}
                        className="ml-auto"
                        onClick={() => onNext({})}
                    >
                        {status.submitting ? "Submitting..." : button}
                        <ArrowRightIcon className="size-3.5"/>
                    </Button>
                </div>
            </footer>
        </>
    );
}

export interface Item {
    text: string;
    edit: string;
    rows: { label: string; value: string }[];
}

interface ItemViewProps {
    item: Item;
    onEdit: (edit: string) => void;
}

function ItemView({item, onEdit}: ItemViewProps) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
                <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                    {item.text}
                </p>
                <button
                    type="button"
                    onClick={() => onEdit(item.edit)}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-gray-500 transition-colors outline-none hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400/50"
                >
                    <PencilIcon className="size-3"/>
                    Edit
                </button>
            </div>
            <div className="divide-y divide-gray-100">
                {item.rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-start justify-between gap-8 px-5 py-3"
                    >
            <span className="shrink-0 text-xs font-medium text-gray-500">
              {row.label}
            </span>
                        <span className="text-right text-xs font-semibold text-gray-800">
              {row.value}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
