import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

type RHFtype<T extends FieldValues> = {
  name: Path<T>;
  options: { label: string; value: string }[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
  label,
  name,
  options,
}: RHFtype<T>) {
  const { control } = useFormContext();
  console.log(control);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, ref, name },
        fieldState: { error },
      }) => {
        return (
          <Autocomplete
            multiple
            options={options}
            // converting the value to the actual object's array
            value={value.map((val: string) =>
              options.find((option) => option.value === val)
            )}
            isOptionEqualToValue={(options, newVal) =>
              options.value === newVal.value
            }
            onChange={(_, newVal) => onChange(newVal.map((val) => val.value))}
            getOptionLabel={(options) => options.label}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <Box component={"li"} {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option.label}
              </Box>
            )}
          />
        );
      }}
    />
  );
}
