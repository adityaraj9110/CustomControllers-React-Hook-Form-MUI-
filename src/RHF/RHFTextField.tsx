import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFType<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;

export function RHFTextField<T extends FieldValues>({
  name,
  ...rest
}: RHFType<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
