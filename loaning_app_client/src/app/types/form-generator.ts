import * as Yup from "yup";
import { SxProps, Theme } from "@mui/system";
import { Control, FieldErrors } from "react-hook-form";
import React, { Dispatch, SetStateAction } from "react";

export type FormFields = {
  id: string;
  label: string;
  component: Exclude<string, "custom">;
  validation: Yup.AnySchema;
  style?: SxProps<Theme>;
  width?: number;
  apiId?: string;
  objectAddress?: string;
  parentAddress?: string;
  dropdownOpts?: Record<string, string>[];
};

export type FormConfigs<T = unknown, Z = unknown> = {
  form_id: string;
  fields: FormFields[];
  onSubmit: (
    data: Record<string, T>,
    setStep?: Dispatch<SetStateAction<number>>,
    setData?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
  ) => Z;
};

export interface FieldProps extends FormFields {
  control: Control;
  errors: FieldErrors;
}

export type TextProps = FieldProps;

export type DatePickerProps = FieldProps;

export type CustomDropdownProps = FieldProps;
