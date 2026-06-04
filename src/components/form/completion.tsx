import {CheckIcon, EyeIcon, ListIcon, PlusIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Link} from "@tanstack/react-router";

interface CompletionProps {

}

export function Completion({}: CompletionProps) {

    return (
        <div className="@container flex h-full flex-1 flex-col items-center justify-center px-8 py-12 text-center">
            {/* Icon */}
            <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-100">
                <CheckIcon className="size-7 text-emerald-600" strokeWidth={2.5}/>
            </div>

            {/* Heading */}
            <h1 className="mb-3 text-3xl font-bold text-gray-950 @3xl:text-4xl">
                🎉 Job published successfully
            </h1>

            {/* Message */}
            <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
                Your job is now live and visible to candidates. You can manage it or
                create another posting.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                    nativeButton={false}
                    render={
                        <Link to={`/`}>
                            <EyeIcon className="size-4"/>
                            View Job
                        </Link>
                    }
                    className="gap-2"
                ></Button>

                <Button
                    nativeButton={false}
                    render={
                        <Link to="/">
                            <ListIcon className="size-4"/>
                            Go to Jobs
                        </Link>
                    }
                    variant="outline"
                    className="gap-2"
                ></Button>

                <Button
                    nativeButton={false}
                    render={
                        <Link to="/">
                            <PlusIcon className="size-4"/>
                            Create Another
                        </Link>
                    }
                    variant="secondary"
                    className="gap-2"
                ></Button>
            </div>
        </div>
    );
}