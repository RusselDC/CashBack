import { DesktopDatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { DatePickerProps } from "app/types/form-generator";
import dayjs from "dayjs"; // Import dayjs for date formatting

const DatePicker = ({ id, label, style, control, errors }: DatePickerProps) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <MUIDatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            const formattedDate = newValue
              ? dayjs(newValue).format("YYYY-MM-DD")
              : "";
            field.onChange(formattedDate);
          }}
          sx={{ ...style }}
          label={label}
          slotProps={{
            textField: {
              variant: "standard",
              fullWidth: true,
              error: !!errors[id],
              helperText: errors[id]?.message as string,
            },
          }}
        />
      )}
    />
  );
};

export default DatePicker;
