import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
  options: { label: string; value: string }[];
};
export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options,
}: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest } }) => {
        return (
          <ToggleButtonGroup
            value={value.length ? value : [options?.[0].value]}
            onChange={(_, newVal) => {
              if (newVal.length) {
                onChange(newVal);
              }
            }}
            {...rest}
          >
            {options.map((option) => (
              <ToggleButton value={option.value} key={option.value}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      }}
    />
  );
}
