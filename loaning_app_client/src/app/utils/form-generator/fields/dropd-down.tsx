import { Controller } from "react-hook-form";
import { CustomDropdownProps } from "app/types/form-generator";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import React from "react";
import { useForm } from "../../../hooks/useFormGen";
import { dropdownApi } from "../../../api/dropdown";

const Dropdown = ({
  id,
  label,
  style,
  control,
  errors,
  dropdownOpts,
  apiId,
  parentAddress,
  objectAddress,
}: CustomDropdownProps) => {
  const { dropdownValue, setDropdownValue } = useForm();
  const [options, setOptions] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (dropdownOpts) {
      setOptions(dropdownOpts as Record<string, string>);
    } else {
      const parentValue =
        dropdownValue[parentAddress as keyof typeof dropdownValue];
      if (parentValue) {
        (async () => {
          const dropdownValues = dropdownApi[apiId as keyof typeof dropdownApi];
          const values = await dropdownValues(parentValue);
          setOptions(values as unknown as Record<string, string>);
        })();
      }
    }
  }, [apiId, dropdownOpts, dropdownValue, parentAddress]);

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <FormControl error={!!errors[id]} fullWidth={true}>
          <InputLabel id={`${label}-label`}>{label}</InputLabel>
          <Select
            value={dropdownValue[objectAddress as keyof typeof dropdownValue]}
            labelId={`${label}-label`}
            id={`${label}-dropdown`}
            label={label}
            onChange={(newValue) => {
              field.onChange(newValue.target.value);
              setDropdownValue((prev) => ({
                ...prev,
                [objectAddress as string]: newValue.target.value as string,
              }));
            }}
            sx={{ ...style }}
          >
            {options ? (
              Object.keys(options).map((key, index) => {
                return (
                  <MenuItem
                    key={`${options?.[key]}-${index}`}
                    value={options?.[key]}
                  >
                    {key}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem>NO DATA</MenuItem>
            )}
          </Select>
          {errors[id]?.message && (
            <FormHelperText sx={{ color: "red" }}>
              {errors[id]?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default Dropdown;
