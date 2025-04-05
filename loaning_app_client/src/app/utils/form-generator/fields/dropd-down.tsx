import { Controller } from "react-hook-form";
import { CustomDropdownProps } from "app/types/form-generator";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
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
  const [options, setOptions] = React.useState<Record<string, string>[]>([]);
  const parentValue = dropdownValue[parentAddress as keyof typeof dropdownValue];

  React.useEffect(() => {
    if (dropdownOpts) {
      setOptions(dropdownOpts as Record<string, string>[]);
    } else {
      if (parentValue) {
        (async () => {
          const dropdownValues = dropdownApi[apiId as keyof typeof dropdownApi];
          const values = await dropdownValues(parentValue);
          setOptions(values as unknown as Record<string, string>[]);
        })();
      }
    }
  }, [parentValue]);



  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
       <Autocomplete 
        id={id}
        options={options}
        disablePortal
        onChange={(_, newValue) => {
          field.onChange(newValue.label);
          setDropdownValue((prev) => ({
            ...prev,
            [objectAddress as string]: newValue.value,
          }));
        }}
        sx={{ ...style }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            id={id}
            error={!!errors[id]}
            helperText={errors[id]?.message as string || ""}
          />
        )}
       
       />
      )}
    />
  );
};

export default Dropdown;


