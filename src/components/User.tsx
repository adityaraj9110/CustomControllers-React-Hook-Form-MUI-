import { Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { RHFAutocomplete } from "../RHF/RHFAutocomplete";
import { Onboarding } from "../onboarding/types/onboarding.types";
import { RHFToggleButtonGroup } from "../RHF/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../RHF/RHFRadioGroup";
import { RHFCheckboxGroup } from "../RHF/RHFCheckboxGroup";
import { RHFDatePicker } from "../RHF/RHFDatePicker";
import { RHFDateRange } from "../RHF/RHFDateRange";
import { RHFSlider } from "../RHF/RHFSlider";
import { RHFSwitch } from "../RHF/RHFSwitch";
import { RHFTextField } from "../RHF/RHFTextField";

const options = [
  { label: "Bihar", value: "bihar" },
  { label: "Delhi", value: "delhi" },
  { label: "Mumbai", value: "mumbai" },
];

const langOptions = [
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi" },
  { label: "Bengali", value: "bengali" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const skillsOptions = [
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
];

export const User = () => {
  const { watch, control, unregister } = useFormContext<Onboarding>();
  const { append, fields, remove, replace } = useFieldArray<Onboarding>({
    name: "companies",
    control: control,
  });
  console.log(watch(), "watch");

  const isExperienced = watch("isExperienced");

  useEffect(() => {
    if (!isExperienced) {
      replace([]);
      unregister("companies");
    }
  }, [isExperienced, replace, unregister]);

  return (
    <Stack spacing={2}>
      <RHFAutocomplete<Onboarding>
        label="state"
        name="states"
        options={options}
      />
      <RHFToggleButtonGroup<Onboarding>
        name="languagesSpoken"
        options={langOptions}
      />
      <RHFRadioGroup<Onboarding>
        label="Gender"
        name="gender"
        options={genderOptions}
      />
      <RHFCheckboxGroup<Onboarding>
        label="Skills"
        name="skills"
        options={skillsOptions}
      />
      <RHFDatePicker<Onboarding> label="Date Of Birth" name="dateOfBirth" />
      <RHFDateRange<Onboarding> label="Age Limit" name="ageRange" />
      <RHFSlider<Onboarding> label="Salary Range" name="salaryRange" />
      <RHFSwitch<Onboarding>
        label="Do you have any experience ?"
        name="isExperienced"
      />

      {isExperienced && (
        <Button type="button" onClick={() => append({ name: "" })}>
          Click To add companies
        </Button>
      )}
      {fields.map((field, idx) => (
        <Stack key={field.id}>
          <RHFTextField<Onboarding>
            name={`companies.${idx}.name`}
            label={`Your ${idx + 1} company name`}
          />
          <Button type="button" color="error" onClick={() => remove(idx)}>
            Remove
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
