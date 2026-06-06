import type {Flow, s} from "@formity/react";
import {Form} from "#/components/form";
import type {FormStatus, Step} from "./types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import type {UnionToIntersection} from "type-fest";
import {z} from "zod";
import BasicInfo from "./steps/basic-info.tsx";
import CandidateRequirements from "./steps/candidate-requirements";
import {format} from "./steps/formats.ts";
import JobDetailsForm from "./steps/job-details";
import PublishingForm from "./steps/publish-form.tsx";
import QuestionsForm from "./steps/questions-form";
import {Review} from "./steps/review-form.tsx";
import SalaryApplicationForm from "./steps/salary-application.tsx";
import * as React from "react";

type Values = UnionToIntersection<Fields[keyof Fields]>;

type Fields = {
    basicInfo: {
        title: string;
        categoryId: string;
        description: string;
    };
    additionalInfo: {
        employmentType: any;
        workMode: any;
        locations: string[];
        contractDuration: string;
        numberOfJobs: number;
        vacancyNumber: string;
    };
    candidateRequirements: {
        educationLevel: any;
        minExperience: number;
        gender: any;
        requirements: string;
        jobLevel: any;
    };
    salaryApplication: {
        salaryMin: number;
        salaryMax: number;
        salaryNotSpecified: boolean;
        currency: any;
        applyMode: any;
        submissionGuidelines: string;
        applicationEmail: string | undefined;
        externalApplyUrl: string | undefined;
    };
    questions: {
        questions: [];
    };
    publishInfo: {
        closeDate: Date | undefined;
        status: any;
        publishedAt: Date | null;
    };
};

export type Schema = {
    render: {
        step: Step;
        form: React.ReactNode;
    };
    struct: [
        s.Jump<s.Form<Fields["basicInfo"]>>,
        s.Jump<s.Form<Fields["additionalInfo"]>>,
        s.Jump<s.Form<Fields["candidateRequirements"]>>,
        s.Jump<s.Form<Fields["salaryApplication"]>>,
        s.Condition<{ then: [s.Jump<s.Form<Fields["questions"]>>]; else: [] }>,
        s.Jump<s.Form<Fields["publishInfo"]>>,
        s.Variables<{ edit: boolean }>,
        s.Jump<s.Form<Record<never, never>>>,
        s.Return<Values>,
    ];
    inputs: Values & { edit: boolean };
    params: {
        status: FormStatus;
    };
};

export const flow: Flow<Schema> = [
    {
        jump: {
            id: "basicInfo",
            at: {
                form: {
                    fields: () => ({
                        title: ["", []],
                        categoryId: ["", []],
                        description: ["", []],
                    }),
                    render: ({fields, values, onNext, onJump}) => ({
                        step: {
                            type: "form",
                            step: {
                                progress: {
                                    currentStep: 1,
                                    numberOfSteps: 6,
                                },
                            },
                            edit: values.edit,
                        },
                        form: (
                            <Form key="basic-info"
                                  defaultValues={
                                      fields
                                  }
                                  resolver={zodResolver(
                                      z.object({
                                          title: z.string().min(3, "Title is required"),
                                          description: z.string({error: "Description is required"}).min(30, "Description must be at least 30 characters"),
                                          categoryId: z.string(),
                                      }),
                                  )}
                                  eyebrow="Step 1 of 6"
                                  heading="Start with the job basics"
                                  message="Provide a clear title, category, and description so candidates understand the role."
                                  buttons={{
                                      back: null,
                                      next: "Continue",
                                      edit: "Save & review",
                                  }}
                                  edit={values.edit}
                                  onNext={onNext}
                                  onJump={onJump}
                                  prevId={null}
                            >
                                <BasicInfo/>
                            </Form>
                        ),
                    }),
                },
            },
        },
    },
    {
        jump: {
            id: "additionalInfo",
            at: {
                form: {
                    fields: () => ({
                        employmentType: ["FULL_TIME", []],
                        workMode: ["ONSITE", []],
                        locations: [[], []],
                        contractDuration: ["", []],
                        numberOfJobs: [1, []],
                        vacancyNumber: ["", []],
                    }),
                    render: ({fields, values, onNext, onJump}) => ({
                        step: {
                            type: "form",
                            step: {
                                progress: {
                                    numberOfSteps: 6,
                                    currentStep: 2,
                                },
                            },
                            edit: values.edit,
                        },
                        form: (
                            <Form key="additional-details"
                                  defaultValues={
                                      fields
                                  }
                                  resolver={
                                      zodResolver(
                                          z.object({
                                              employmentType: z.any().default("FULL_TIME"),
                                              workMode: z.any(),
                                              locations: z
                                                  .array(z.string())
                                                  .default([])
                                                  .refine((val) => val.length > 0, {
                                                      message: "Please select at least one location",
                                                  }),
                                              contractDuration: z.string().optional(),
                                              numberOfJobs: z.coerce
                                                  .number({error: "Please enter a valid number"})
                                                  .int()
                                                  .positive("Value must be greater than zero")
                                                  .default(1),
                                              vacancyNumber: z
                                                  .string()
                                                  .min(1, "Vacancy number is required"),
                                          }),
                                      ) as any
                                  }
                                  eyebrow="Step 2 of 6"
                                  heading="Define the job structure"
                                  message="Set employment type, work mode, locations, and number of openings."
                                  buttons={{
                                      back: "Back",
                                      next: "Continue",
                                      edit: "Save & review",
                                  }}
                                  onNext={onNext}
                                  onJump={onJump}
                                  prevId={"basicInfo"}
                                  edit={values.edit}

                            >
                                <JobDetailsForm/>
                            </Form>
                        ),
                    }),
                },
            },
        },
    },
    {
        jump: {
            id: "candidateRequiments",
            at: {
                form: {
                    fields: () => ({
                        educationLevel: ["HIGH_SCHOOL", []],
                        gender: ["MALE_FEMALE", []],
                        minExperience: [0, []],
                        requirements: ["", []],
                        jobLevel: ["ENTRY", []],
                    }),
                    render: ({fields, values, onNext, onJump}) => ({
                        step: {
                            type: "form",
                            step: {
                                progress: {
                                    numberOfSteps: 6,
                                    currentStep: 3,
                                },
                            },
                            edit: values.edit,
                        },
                        form: (
                            // Candidate Requirements
                            <Form
                                key="candidate-requirements"
                                defaultValues={
                                    fields
                                }
                                resolver={
                                    zodResolver(
                                        z.object({
                                            educationLevel: z.any().optional(),
                                            gender: z.any().default("MALE_FEMALE").optional(),
                                            minExperience: z.number().positive().default(1),
                                            requirements: z.string({error: "please specify the job requirement"}).min(30, {error: "Requirement must be at least 30 characters"}),
                                            jobLevel: z.any().default("ENTRY"),
                                        }),
                                    ) as any
                                }
                                eyebrow="Step 3 of 6"
                                heading="Who are you looking for?"
                                message="Specify education, experience level, and key requirements for this role."
                                buttons={{
                                    back: "Back",
                                    next: "Continue",
                                    edit: "Save & review",
                                }}
                                onNext={onNext}
                                onJump={onJump}
                                edit={values.edit}
                                prevId="additionalInfo"

                            >
                                <CandidateRequirements/>
                            </Form>
                        ),
                    }),
                },
            },
        },
    },
    {
        jump: {
            id: "salaryApplication",
            at: {
                form: {
                    fields: () => ({
                        salaryMin: [3000, []],
                        salaryMax: [30000, []],
                        salaryNotSpecified: [false, []],
                        currency: ["AFN", []],
                        applyMode: ["EXTERNAL", []],
                        submissionGuidelines: ["", []],
                        applicationEmail: [undefined, []],
                        externalApplyUrl: [undefined, []],
                    }),
                    render: ({fields, values, onNext, onJump}) => ({
                        step: {
                            type: "form",
                            step: {
                                progress: {
                                    numberOfSteps: 6,
                                    currentStep: 4,
                                },
                            },
                            edit: values.edit,
                        },
                        form: (
                            // Salary & Application
                            <Form
                                key="salary-application"
                                defaultValues={
                                    fields
                                }
                                resolver={
                                    zodResolver(
                                        z.object({
                                            applyMode: z.any().default("INTERNAL"),
                                            currency: z.any().default("AFN").optional(),
                                            salaryMax: z.number().positive().optional(),
                                            salaryMin: z.number().positive().optional(),
                                            salaryNotSpecified: z.boolean().optional(),
                                            submissionGuidelines: z.string({error: "Please tell applicants how to submit their application."}).min(30, {error: "Guidelines must be at least 30 characters"}),
                                            applicationEmail: z.email().optional(),
                                            externalApplyUrl: z.url().optional(),
                                        }),
                                    ) as any
                                }
                                eyebrow="Step 4 of 6"
                                heading="Set salary and application method"
                                message="Define compensation and how candidates should apply for this job."
                                buttons={{
                                    back: "Back",
                                    next: "Continue",
                                    edit: "Save & review",
                                }}
                                onNext={onNext}
                                prevId="candidateRequiments"
                                onJump={onJump}
                                edit={values.edit}

                            >
                                <SalaryApplicationForm/>
                            </Form>
                        ),
                    }),
                },
            },
        },
    },

    {
        condition: {
            if: ({applyMode}) => applyMode === "INTERNAL" || applyMode === "BOTH",
            then: [
                {
                    jump: {
                        id: "questions",
                        at: {
                            form: {
                                fields: () => ({
                                    questions: [[], []],
                                }),
                                render: ({fields, values, onNext, onJump}) => ({
                                    step: {
                                        type: "form",
                                        step: {
                                            progress: {
                                                numberOfSteps: 6,
                                                currentStep: 5,
                                            },
                                        },
                                        edit: values.edit,
                                    },
                                    form: (
                                        // Questions
                                        <Form
                                            key="questions"
                                            defaultValues={
                                                fields
                                            }
                                            resolver={
                                                zodResolver(
                                                    z.object({
                                                        questions: z
                                                            .array(
                                                                z.object({
                                                                    question: z.string().min(1),
                                                                    type: z.any(),
                                                                    required: z.boolean().optional(),
                                                                    options: z.array(z.string()).optional(),
                                                                }),
                                                            )
                                                            .optional(),
                                                    }),
                                                ) as any
                                            }
                                            eyebrow="Step 5 of 6"
                                            heading="Add screening questions (optional)"
                                            message="Ask candidates questions to help filter and evaluate applications."
                                            buttons={{
                                                back: "Back",
                                                next: "Continue",
                                                edit: "Save & review",
                                            }}
                                            onNext={onNext}
                                            prevId="salaryApplication"
                                            edit={values.edit}
                                            onJump={onJump}
                                        >
                                            <QuestionsForm/>
                                        </Form>
                                    ),
                                }),
                            },
                        },
                    },
                },
            ],
            else: [],
        },
    },

    {
        jump: {
            id: "publishInfo",
            at: {
                form: {
                    fields: () => ({
                        closeDate: [undefined, []],
                        status: ["PUBLISHED", []],
                        publishedAt: [null, []],
                    }),
                    render: ({values, fields, onNext, onJump}) => ({
                        step: {
                            type: "form",
                            step: {
                                progress: {
                                    numberOfSteps: 6,
                                    currentStep: 6,
                                },
                            },
                            edit: values.edit,
                        },
                        form: (
                            // Salary & Application
                            <Form

                                defaultValues={
                                    fields
                                }
                                resolver={
                                    zodResolver(
                                        z.object({
                                            closeDate: z.date({error: "Closing date is required"}),
                                            status: z.any().default("DRAFT"),
                                            publishedAt: z.date().nullable(),
                                        }),
                                    ) as any
                                }
                                eyebrow="Step 6 of 6"
                                heading="Publish your job"
                                message="Set closing date and publish status before posting your job."
                                buttons={{
                                    back: "Back",
                                    next: "Continue",
                                    edit: "Save & review",
                                }}
                                onNext={onNext}
                                onJump={onJump}
                                edit={values.edit}
                                prevId="questions"

                            >
                                <PublishingForm/>
                            </Form>
                        ),
                    }),
                },
            },
        },
    },

    {
        variables: () => ({
            edit: true,
        }),
    },
    {
        jump: {
            id: "review",
            at: {
                form: {
                    fields: () => ({}),
                    render: ({values, params, onNext, onJump}) => ({
                        step: {
                            type: "review",
                        },
                        form: (
                            <Review
                                key="review"
                                heading="Review your job posting"
                                message="Check all details before publishing your job."
                                content={[
                                    {
                                        text: "Basic information",
                                        edit: "basicInfo",
                                        rows: [
                                            {
                                                label: "Job title",
                                                value: format.text(values.title),
                                            },
                                            {
                                                label: "Category",
                                                value: format.text(values.categoryId),
                                            },
                                            {
                                                label: "Description",
                                                value: format.text(values.description),
                                            },
                                        ],
                                    },
                                    {
                                        text: "Additional information",
                                        edit: "additionalInfo",
                                        rows: [
                                            {
                                                label: "Employment type",
                                                value: format.text(values.employmentType),
                                            },
                                            {
                                                label: "Work mode",
                                                value: format.text(values.workMode),
                                            },
                                            {
                                                label: "Locations",
                                                value: format.list(values.locations),
                                            },
                                            {
                                                label: "Contract duration",
                                                value: format.text(values.contractDuration),
                                            },
                                            {
                                                label: "Number of positions",
                                                value: format.number(values.numberOfJobs),
                                            },
                                            {
                                                label: "Vacancy number",
                                                value: format.text(values.vacancyNumber),
                                            },
                                        ],
                                    },
                                    {
                                        text: "Candidate requirements",
                                        edit: "candidateRequiments",
                                        rows: [
                                            {
                                                label: "Education level",
                                                value: format.text(values.educationLevel),
                                            },
                                            {
                                                label: "Minimum experience",
                                                value: format.experience(values.minExperience),
                                            },
                                            {
                                                label: "Job level",
                                                value: format.text(values.jobLevel),
                                            },
                                            {
                                                label: "Gender",
                                                value: format.text(values.gender),
                                            },
                                            {
                                                label: "Requirements",
                                                value: format.text(values.requirements)
                                            },
                                        ],
                                    },
                                    {
                                        text: "Salary & application",
                                        edit: "salaryApplication",
                                        rows: [
                                            {
                                                label: "Salary",
                                                value: values?.salaryNotSpecified
                                                    ? "Not specified"
                                                    : format.salary(
                                                        values?.salaryMin,
                                                        values?.salaryMax,
                                                        values?.currency,
                                                    ),
                                            },
                                            {
                                                label: "Apply mode",
                                                value: format.text(values?.applyMode),
                                            },
                                            {
                                                label: "Application email",
                                                value: format.text(values?.applicationEmail),
                                            },
                                            {
                                                label: "External apply URL",
                                                value: format.text(values.externalApplyUrl),
                                            },
                                            {
                                                label: "Submission guidelines",
                                                value: format.text(values?.submissionGuidelines)
                                            },
                                        ],
                                    },

                                    // ✅ conditionally add this section
                                    ...(values?.questions?.length >= 1
                                        ? [
                                            {
                                                text: "Application questions",
                                                edit: "questions",
                                                rows: [
                                                    {
                                                        label: "Questions",
                                                        value: `${values?.questions.length} custom question${
                                                            Number(values?.questions?.length) === 1 ? "" : "s"
                                                        }`,
                                                    },
                                                ],
                                            },
                                        ]
                                        : []),

                                    {
                                        text: "Publishing",
                                        edit: "publishInfo",
                                        rows: [
                                            {
                                                label: "Status",
                                                value: format.text(values.status),
                                            },
                                            {
                                                label: "Publish date",
                                                value: format.date(values.publishedAt),
                                            },
                                            {
                                                label: "Close date",
                                                value: format.date(values.closeDate),
                                            },
                                        ],
                                    },
                                ]}
                                button="Publish job"
                                onNext={onNext}
                                onJump={onJump}
                                status={params.status}
                            />
                        ),
                    }),
                },
            },
        },
    },
    {
        return: (values) => values,
    },
];

export const inputs: Schema["inputs"] = {
    applicationEmail: "",
    applyMode: "INTERNAL",
    categoryId: "",
    closeDate: undefined,
    contractDuration: "",
    currency: "AFN",
    description: "",
    educationLevel: "HIGH_SCHOOL",
    employmentType: "FULL_TIME",
    externalApplyUrl: "",
    gender: "MALE_FEMALE",
    jobLevel: "ENTRY",
    locations: [],
    minExperience: 1,
    numberOfJobs: 1,
    publishedAt: null,
    questions: [],
    requirements: "",
    salaryMax: 0,
    salaryMin: 0,
    salaryNotSpecified: false,
    status: "DRAFT",
    submissionGuidelines: "",
    title: "",
    vacancyNumber: "",
    workMode: "ONSITE",
    edit: false,
};