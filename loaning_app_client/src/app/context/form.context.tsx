import { ReactNode, useState, useEffect } from "react";
import { FormContextType } from "../types/context";
import { AnySchema, object } from "yup";
import { FormFields, FormConfigs } from "../types/form-generator";
import { FormContext } from "../hooks/useFormGen";
import {FORMS} from "../constants/form-generator-object/index"


const FormProvider = ({children} : {children: ReactNode}) => {

    const [formPass, setFormPass] = useState(false)
    const [Form, setForm] = useState<string>('')
    const [formErrors, setFormErrors] = useState<{[key:string] : string}>({})
    const [selectedForm, setSelectedForm] = useState<FormConfigs<string>>({} as FormConfigs<string>)

    const generateYupSchema = (data: FormFields[]) => {
        const shape = data?.reduce((acc : Record<string,AnySchema>, current:FormFields) => {
            acc[current.id] = current.validation
            return acc
        },{})

        return object().shape(shape)
    }

    useEffect(() => {
        setSelectedForm(FORMS[Form])
    },[Form])

    const values = {
        selectedForm,
        formPass,
        setForm,
        setFormPass,
        formErrors,
        setFormErrors,
        generateYupSchema,
    } as unknown as FormContextType

    return <FormContext.Provider value={values}>
        {children}
    </FormContext.Provider>

}

export default FormProvider