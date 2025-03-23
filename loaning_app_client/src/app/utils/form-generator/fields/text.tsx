import { Controller } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextProps } from "../../../types/form-generator";

const Text = ({ id, label, style, control, errors }: TextProps) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Controller
      name={id}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          id="standard-basic"
          label={label}
          variant="standard"
          fullWidth
          error={!!errors[id]}
          helperText={errors[id]?.message as string}
          type={
            id === "password" || id === "confirm_password"
              ? showPassword
                ? "text"
                : "password"
              : "text"
          }
          sx={{ ...style }}
          InputProps={{
            ...(id === "password" || id === "confirm_password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {}),
          }}
        />
      )}
    />
  );
};

export default Text;
