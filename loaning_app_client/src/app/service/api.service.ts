import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios"
import { enqueueSnackbar } from "notistack"



export const getUser = async (token: string) => {
    try
    {
        const response = await axios.get(`http://localhost:8000/user/`,
            {
                headers : {"Authorization" : `Bearer ${token}`}
            }
        ) as AxiosResponse

        if(response.status !== 200)
        {
            enqueueSnackbar("Something went wrong", {variant : "success"})
            console.log(response)
            throw Error("Something went wrong")
        }

        return response.data
    }catch(e)
    {
        if(isAxiosError(e))
        {
            const error = e as AxiosError
            enqueueSnackbar(error.message, {variant:"error"})
        }
        else{
            enqueueSnackbar("Something went wrong", {variant:"error"})
        }
    }
}