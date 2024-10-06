import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
  options: { label: string; value: string }[];
  label: string;
};
export function RHFCheckboxGroup<T extends FieldValues>({
  name,
  options,
  label,
}: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormControl error={!!error}>
            <FormLabel>{label}</FormLabel>
            <FormGroup>
              {options.map((option) => {
                return (
                  <FormControlLabel
                    label={option.label}
                    control={
                      <Checkbox
                        checked={value.includes(option.value)}
                        onChange={() => {
                          if (value.includes(option.value)) {
                            onChange(
                              (value as string[]).filter(
                                (item) => item !== option.value
                              )
                            );
                          } else {
                            onChange([...value, option.value]);
                          }
                        }}
                        key={option.value}
                      />
                    }
                  />
                );
              })}
              <Box color={"red"}>{error?.message}</Box>
            </FormGroup>
          </FormControl>
        );
      }}
    />
  );
}
