import { Dispatch, SetStateAction } from "react";
import { FormFields, FormConfigs } from "./form-generator";
import { ObjectSchema } from "yup";

export type FormContextType = {
  dropdownValue: Record<string, string>;
  setDropdownValue: Dispatch<SetStateAction<Record<string, string>>>;
  setFormDatas: Dispatch<SetStateAction<Record<string, unknown>>>;
  formDatas: Record<string, unknown>;
  setRequestError: Dispatch<SetStateAction<string>>;
  requestError: string;
  selectedForm: FormConfigs;
  formPass: boolean;
  setForm: Dispatch<SetStateAction<string>>;
  setFormPass: SetStateAction<boolean>;
  Form: string;
  formErrors: { [key: string]: ValidationError };
  setFormErrors: Dispatch<SetStateAction<{ [key: string]: string }>>;
  generateYupSchema: (
    data: FormFields[],
  ) => ObjectSchema<Record<string, unknown>>;
};

type ValidationError = {
  name: string;
  message: string;
  path: string;
  type: string;
  errors: string[];
  innert: unknown[];
};
