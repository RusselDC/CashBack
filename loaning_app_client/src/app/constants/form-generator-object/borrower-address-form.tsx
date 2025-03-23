import * as Yup from 'yup'
import {FormConfigs, FormFields} from "app/types/form-generator"
import { Provinces } from '../provinces'

const BorrowerAddress : FormFields[] = [
    {
        id : 'province',
        label : "Province",
        validation : Yup.string().required("Province is required"),
        component : "dropdown",
        objectAddress : "provinceDD",
        dropdownOpts : Provinces,
        width : 12
    },
    {
        id: "cities",
        label : "cities",
        parentAddress : "provinceDD",
        objectAddress :"citiesDD",
        validation : Yup.string().required("City is required"),
        component : "dropdown",
        apiId : "citiesApi",
        width : 12
    }
    
]

export const BorrowerAddressConfig : FormConfigs<string, unknown> = {
    form_id : 'borrower_address_form',
    fields : BorrowerAddress,
    onSubmit: async (data, setStep, setData) => {
        setStep?.((prev) => prev + 1);
        return setData?.((prev) => ({ ...prev, ...data }));
    }
}