import * as Yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { SxProps, Theme } from '@mui/system'
import { Control, FieldValues, FieldErrors } from 'react-hook-form'
export type FormFields = {
    id : string,
    label : string,
    component : string,
    validation : Yup.AnySchema,
    style? : SxProps<Theme>
}

export type FormConfigs<T = unknown> = {
    form_id : string,
    fields : FormFields[],
    onSubmit : (data : Record<string, T>) => Promise<AxiosResponse | AxiosError>
}

export interface TextProps extends FormFields
{
    control : Control<FieldValues>;
    errors : FieldErrors<{ [x: string]: unknown; }>
}