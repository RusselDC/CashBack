import * as Yup from "yup";
import { FormConfigs, FormFields } from "app/types/form-generator";

const Register: FormFields[] = [
  {
    id: "email",
    label: "Email",
    validation: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    component: "text",
    style: { marginBottom: "10px" },
    width: 12,
  },
  {
    id: "password",
    label: "Password",
    validation: Yup.string()
      .required("Password is required")
      .min(8, "Password must be atleast 8 characters long")
      .max(16, "Password must not be more than 16 characters")
      .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
    component: "text",
    style: { marginBottom: "10px" },
    width: 12,
  },
  {
    id: "confirm_password",
    label: "Confirm Password",
    validation: Yup.string()
      .required("Password Confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .min(8, "Password must be atleast 8 characters long")
      .max(16, "Password must not be more than 16 characters")
      .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
    component: "text",
    style: { marginBottom: "10px" },
    width: 12,
  },
];

export const AccountRegisterConfig: FormConfigs<string, unknown> = {
  form_id: "account_register_form",
  fields: Register,
  onSubmit: async (data, setStep, setData) => {
    setStep?.((prev) => prev + 1);
    return setData?.((prev) => ({ ...prev, ...data }));
  },
};
