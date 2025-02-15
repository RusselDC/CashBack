import {Controller, Control, FieldValues, FieldErrors} from "react-hook-form"
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FormFields } from "../../../types/form-generator";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


interface Text extends FormFields
{
    control : Control<FieldValues>;
    errors : FieldErrors<{ [x: string]: unknown; }>
}

const Text = ({id, label, style, control, errors} : Text) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    
    
   
    return <Controller
    name={id}
    control={control}
    defaultValue=""
    rules={{
        required: `${label} is required`,
    }}
    render={({ field }) => (
        <TextField
            {...field}
            id="standard-basic"
            label={label}
            variant="standard"
            fullWidth
            error={!!errors[id]}
            helperText={errors[id]?.message}
            type={id === "password" ? showPassword ? "text" : "password" : "text"}
            sx={{...style}}
        InputProps={{
            endAdornment: id === "password" ? (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((previous) => !previous)}
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon/>}
                    </IconButton>
                </InputAdornment>
            ) : null
        }}
        />
    )}
/>
}

export default Text