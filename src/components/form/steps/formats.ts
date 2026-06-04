export const format = {
    text: (value?: string | null) => {
        if (!value) return "Not provided";
        return value;
    },

    number: (value?: number | null) => {
        if (value == null) return "Not specified";
        return value.toLocaleString();
    },

    list: (value?: string[]) => {
        if (!value?.length) return "None";
        return value.join(", ");
    },

    date: (value?: Date | string | null) => {
        if (!value) return "Not scheduled";

        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(new Date(value));
    },

    experience: (years?: number | null) => {
        if (years == null) return "Not specified";

        if (years === 0) return "No experience required";

        return `${years} year${years === 1 ? "" : "s"}`;
    },

    salary: (
        min?: number | null,
        max?: number | null,
        currency?: string | null,
    ) => {
        if (min == null && max == null) {
            return "Not specified";
        }

        const formatter = new Intl.NumberFormat("en-US");

        if (min != null && max != null) {
            return `${formatter.format(min)} - ${formatter.format(max)} ${currency ?? ""}`;
        }

        if (min != null) {
            return `From ${formatter.format(min)} ${currency ?? ""}`;
        }

        return `Up to ${formatter.format(max!)} ${currency ?? ""}`;
    },

    questions: (count?: number) => {
        if (!count) return "No custom questions";

        return `${count} custom question${count === 1 ? "" : "s"}`;
    },

    description: (value?: string | null) => {
        if (!value) return "Not provided";

        return `${value.length} characters`;
    },

    requirements: (value?: string | null) => {
        if (!value) return "Not provided";

        return `${value.length} characters`;
    },
};
