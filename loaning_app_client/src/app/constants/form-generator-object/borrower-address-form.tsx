import * as Yup from "yup";
import { FormConfigs, FormFields } from "app/types/form-generator";
import { Provinces } from "../provinces";

const BorrowerAddress: FormFields[] = [
  {
    id: "province",
    label: "Province",
    validation: Yup.string().required("Province is required"),
    component: "dropdown",
    objectAddress: "provinceDD",
    dropdownOpts: Provinces,
    width: 12,
  },
  {
    id: "cities",
    label: "Cities",
    parentAddress: "provinceDD",
    objectAddress: "citiesDD",
    validation: Yup.string().required("City is required"),
    component: "dropdown",
    apiId: "citiesApi",
    width: 12,
  },
  {
    id: "baranggays",
    label: "Baranggay",
    parentAddress: "citiesDD",
    validation: Yup.string().required("Baranggay is required"),
    component: "dropdown",
    apiId: "baranggaysApi",
    width: 12,
  },
  {
    id : "houseNumber",
    label : "House Number",
    component : "text",
    width : 12,
    validation : Yup.number().label("House Number").typeError(({label, value}) => `${label} must be a ${value}`).required(),
  },
  {
    id : "landMark",
    label : "Land Mark",
    component : "text",
    width : 12,
    validation : Yup.string().notRequired()
  }
];

export const BorrowerAddressConfig: FormConfigs<string, unknown> = {
  form_id: "borrower_address_form",
  fields: BorrowerAddress,
  onSubmit: async (data, setStep, setData) => {
    setStep?.((prev) => prev + 1);
    return setData?.((prev) => ({ ...prev, ...data }));
  },
};
