import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  Box,
  FormControlLabel,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};
export function RHFSwitch<T extends FieldValues>({ name, label }: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
}
