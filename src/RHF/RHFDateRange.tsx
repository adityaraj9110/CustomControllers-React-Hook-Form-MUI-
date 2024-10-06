import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};
export function RHFDateRange<T extends FieldValues>({
  name,
  label,
}: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...rest }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            {...rest}
            value={Array.isArray(value) ? value : [null, null]}
          />
          {!!error && <Box color={"red"}>{error?.message}</Box>}
        </LocalizationProvider>
      )}
    />
  );
}
