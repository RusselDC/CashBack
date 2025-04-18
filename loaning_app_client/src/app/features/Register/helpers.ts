import { IButtons } from "app/types/buttons";
import { FormConfigs } from "app/types/form-generator";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { NavigateFunction } from "react-router-dom";

export const submitRegister = async (data : Record<string,string>, navigate : NavigateFunction) => {

    const url = "http://127.0.0.1:8000/register";
    try
    {
        const response = await axios.post(url, data)
        
        if(response.status === 200)
        {
            return enqueueSnackbar(response.data.message ?? "User has been created", {variant : "success", onClose: () => navigate("/")})
        }
    
        return enqueueSnackbar(response.data.detail ?? "Something went wrong", {variant: "error"})
        
    }catch(e)
    {
        const error = e as AxiosError
        enqueueSnackbar((error?.response?.data as unknown as {detail:string})?.detail ?? "Something went wrong", {variant: "error"})
    }
}

export const submit = (data: Record<string, unknown>, selectedForm: FormConfigs, setStep : React.Dispatch<React.SetStateAction<number>>, setFormDatas : React.Dispatch<React.SetStateAction<Record<string, unknown>>>) => selectedForm.onSubmit(data, setStep, setFormDatas)


export const Buttons = (step : number, setStep : React.Dispatch<React.SetStateAction<number>>, data:Record<string,string>, formRef : React.RefObject<HTMLFormElement | null>, navigate : NavigateFunction): IButtons[] => {
    return [
        {
            title: "Back",
            variant: "contained",
            color: "primary",
            sx: { display: step === 0 ? "none" : "flex" },
            onClick: () => setStep((prev) => prev - 1),
        },
        {
            title: step === 3 ? "Submit" : "Next",
            variant: "contained",
            color: "primary",
            onClick: () => step === 3 ? submitRegister(data,navigate) : formRef.current?.requestSubmit(),
        },
    ]
}