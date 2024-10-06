import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
  options: { label: string; value: string }[];
  label: string;
};
export function RHFRadioGroup<T extends FieldValues>({
  name,
  options,
}: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl {...field}>
            <FormLabel>{name}</FormLabel>
            <RadioGroup>
              {options.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio checked={field.value === option.value} />}
                  label={option.label}
                  key={option.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
}
