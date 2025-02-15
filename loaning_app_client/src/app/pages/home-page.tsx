
import {Box, Button} from "@mui/material"
import {useForm as useFormGen} from "../hooks/useFormGen"
import { useRef } from "react"
import DynamicForm from "../utils/form-generator/dynamic-form"
import React from "react"
import {IButtons} from "../types/buttons"


const HomePage = () => {
    const {setForm} = useFormGen()
    const formRef = useRef<HTMLFormElement | null>(null)
    React.useEffect(() => {
        setForm('login_form')
    },[setForm])

   const onSubmit = (data : Record<string,unknown>) => {
    console.log(data)
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
        {
            buttons.map((button, index) => (
                <Button key={index} {...button}>{button.title}</Button>
            ))
        }
    </Box>
}

export default HomePage