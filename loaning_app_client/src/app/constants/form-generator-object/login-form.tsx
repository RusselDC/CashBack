import * as Yup from "yup";
import { FormConfigs, FormFields } from "../../types/form-generator";
import axios, { AxiosError, AxiosResponse } from "axios";

const LoginFields: FormFields[] = [
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
    validation: Yup.string().required("Password is required"),
    component: "text",
    style: { marginBottom: "10px" },
    width: 12,
  },
];

export const LoginConfig: FormConfigs<
  string,
  Promise<AxiosError | AxiosResponse>
> = {
  form_id: "login_form",
  fields: LoginFields,
  onSubmit: async (data) => {
    try {
      const url = "http://127.0.0.1:8000/user/auth";
      const response = await axios.post(url, data);
      return response;
    } catch (error: unknown) {
      const requestError = error as AxiosError;
      return requestError;
    }
  },
};
