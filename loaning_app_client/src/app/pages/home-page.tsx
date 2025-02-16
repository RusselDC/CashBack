
import { Box, Button} from "@mui/material"
import {useForm as useFormGen} from "../hooks/useFormGen"
import { useRef } from "react"
import DynamicForm from "../utils/form-generator/dynamic-form"
import React from "react"
import {IButtons} from "../types/buttons"
import { enqueueSnackbar } from "notistack"
import { ExceptionRespose } from "../types/response"




const HomePage = () => {
    const {setForm, selectedForm} = useFormGen()
    const formRef = useRef<HTMLFormElement | null>(null)


    React.useEffect(() => {
        setForm('login_form')
    },[setForm])

   const onSubmit = async (data : Record<string,unknown>) => {
        const response = await selectedForm.onSubmit(data)
        if(response.status === 200) return enqueueSnackbar("Logged In", { variant: "success", autoHideDuration:3000 })
        return enqueueSnackbar((response as ExceptionRespose).response?.data?.detail, {variant : "error", autoHideDuration:3000})
   }

   const buttons: IButtons[] = [
    {
        title : "Submit",
        variant: "contained",
        color: "primary",
        onClick: () => formRef.current?.requestSubmit()
    }
   ]


   



    return <Box sx={{padding:"1.5%", height:"50%",width:"50%"}}> 
        <DynamicForm formRef={formRef} onSubmit={onSubmit}/>
        <Box sx={{height:"auto",width:"100%", position:"relative"}}>
        {
            buttons.map((button, index) => (
                <Button sx={{position:"absolute", right:0}} key={index} {...button}>{button.title}</Button>
            ))
        }
        </Box>
        
    </Box>
}

export default HomePage