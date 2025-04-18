import { RootState } from "../store/app-store"
import * as React from "react"
import { useSelector } from "react-redux"
import { getUser } from "../service/api.service"
import { AxiosError } from "axios"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"


interface IUserContext {
    user : User
}

interface Address {
    city: string;
    home_number: string;
    land_mark: string;
    province: string;
    street: string;
}

interface User {
    birth_date: string;  // If it's a string in the provided format, you can also use Date type if it's a Date object
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    address: Address;
}

export const Context = React.createContext<IUserContext | null>(null)


const UserProvider = (props : {children : React.ReactNode}) => {
    const {children} = props
    const [user, setUser] = useState<User>({
        birth_date: "",
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        address: {
            city: "",
            home_number: "",
            land_mark: "",
            province: "",
            street: "",
        },
    })
    const userStore = useSelector((state : RootState) => state.authStore)

    React.useEffect(() => {
        ( async() => {
           try{
                const authUser = await getUser(userStore.token as string)
                
                if(!authUser)
                {
                    return enqueueSnackbar("Expired Token", {variant:"error",preventDuplicate: true})
                }
                setUser(authUser.data)
           }catch(e)
           {
                const error = e as AxiosError
                enqueueSnackbar(error.message, {variant:"error", preventDuplicate:true})
           }
            
        })()
    }, [])


    return <Context.Provider value={{user}}>
        {children}
    </Context.Provider>


}

export default UserProvider

