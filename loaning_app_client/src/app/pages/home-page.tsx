
import { Box, Button, Divider, Typography} from "@mui/material"
import {useForm as useFormGen} from "../hooks/useFormGen"
import { useRef } from "react"
import DynamicForm from "../utils/form-generator/dynamic-form"
import React from "react"
import {IButtons} from "../types/buttons"
import { enqueueSnackbar } from "notistack"
import { ExceptionRespose, Response } from "../types/response"
import { setAuth } from "../store/slices/AuthSlice"
import { useDispatch } from "react-redux"
import { appDispatch } from "../store/app-store"
import { useNavigate } from "react-router-dom"
import { AxiosResponse } from "axios"





const HomePage = () => {
    const {setForm, selectedForm, formDatas, setFormDatas} = useFormGen()
    const dispatch: appDispatch = useDispatch()
    const navigate = useNavigate()


    const formRef = useRef<HTMLFormElement | null>(null)

    React.useEffect(() => {
        setForm('login_form')
    },[setForm])

   const onSubmit = async (data : Record<string,unknown>) => {
        
        setFormDatas((prev: Record<string, unknown>) => ({...prev, ...data}))
        const response = await selectedForm.onSubmit(formDatas)
        if((response as AxiosResponse).status === 200) 
        {
            dispatch(setAuth((response as Response).data.data))
            return navigate('/user/dashboard')
        }
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

   const registerButton: IButtons = {
    title: "Register Here",
    variant : "outlined",
    color: "secondary",
    onClick: () => navigate("/register")
   }

   



    return <Box sx={{padding:"1.5%", height:"50%",width:"50%"}}> 
        <DynamicForm formRef={formRef} onSubmit={onSubmit}/>
        <Box sx={{height:"auto",width:"100%", position:"relative"}}>
        {
            buttons.map((button, index) => (
                <Button sx={{position:"absolute", right:0}} key={index} {...button}>{button.title}</Button>
            ))
        }
        </Box>
       <Divider sx={{marginTop:"17%"}}>
        <Typography variant="body1">or</Typography>
       </Divider>
       <Box sx={{height:"auto",width:"100%", position:"relative", marginTop:"9%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Button sx={{position:"absolute"}} {...registerButton}>{registerButton.title}</Button>
       </Box>

       
        
    </Box>
}

export default HomePage