import z from "zod";

//  this is descriminant union type , in the same we have used this on zod
type HeadPhone = {
  type: "headphone";
  audio: string;
  isForm: boolean;
};
type Tv = {
  type: "tv";
  screen: string;
  isAndroid: boolean;
};

type Product = {
  name: string;
  price: number;
  isAvailable: boolean;
} & (HeadPhone | Tv);

// const prod1: Product = {
//   type: "headphone",
//   name: "sony",
//   audio: "dolby",
//   isForm: true,
//   price: 700,
// };

export const schema = z.intersection(
  z.object({
    states: z
      .array(z.string())
      .min(1, { message: "user should have one residence state" })
      .max(2, { message: "user should maximum present in 2 states only" }),
    languagesSpoken: z.array(z.string()).min(1).max(2),
    gender: z.string().min(1),
    skills: z.array(z.string()).max(2).min(1),
    dateOfBirth: z.date(),
    ageRange: z.array(z.date()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
  }),
  z
    .discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
    .and(
      z.union([
        z.object({ isExperienced: z.literal(false) }),
        z.object({
          isExperienced: z.literal(true),
          companies: z.array(
            z.object({
              name: z.string().min(4),
            })
          ),
        }),
      ])
    )
);

export type Onboarding = z.infer<typeof schema>;
export const defaultValues: Onboarding = {
  variant: "create",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  dateOfBirth: new Date(),
  ageRange: [new Date(), new Date()],
  salaryRange: [0, 1200000],
  isExperienced: false,
};
