import * as Yup from "yup";
import { FormConfigs, FormFields } from "app/types/form-generator";

const Borrower: FormFields[] = [
  {
    id: "first_name",
    label: "First Name",
    validation: Yup.string().required("First name is required"),
    component: "text",
    width: 12,
  },
  {
    id: "middle_name",
    label: "Middle Name",
    validation: Yup.string().required("Middle name is required"),
    component: "text",
    width: 12,
  },
  {
    id: "last_name",
    label: "Last Name",
    validation: Yup.string().required("Last name is required"),
    component: "text",
    width: 12,
  },
  {
    id: "birth_date",
    label: "Birth date",
    validation: Yup.date()
      .required("Birthdate is required")
      .test("is-old_enough", "You muse be atleast 21 years old", (value) => {
        if (!value) return false;
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        const monthDifference = today.getMonth() - value.getMonth();
        const dayDifference = today.getDate() - value.getDate();
        // Check if the user is at least 21 years old
        return (
          age > 21 ||
          (age === 21 && monthDifference > 0) ||
          (age === 21 && monthDifference === 0 && dayDifference >= 0)
        );
      }),
    component: "date",
    width: 12,
  },
];

export const BorrowerRegisterConfig: FormConfigs<string, unknown> = {
  form_id: "borrower_register_form",
  fields: Borrower,
  onSubmit: async (data, setStep, setData) => {
    setStep?.((prev) => prev + 1);
    return setData?.((prev) => ({ ...prev, ...data }));
  },
};
