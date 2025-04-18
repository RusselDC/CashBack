import { RootState } from "../store/app-store"
import * as React from "react"
import { useSelector } from "react-redux"
import { getUser } from "../service/api.service"
import { AxiosError } from "axios"
import { enqueueSnackbar } from "notistack"
import { useState } from "react"


interface IUserContext {
    user : User | null,
    setUser : React.Dispatch<React.SetStateAction<User | null>>
}

interface Address {
    city: string;
    home_number: string;
    land_mark: string;
    province: string;
    street: string;
}

interface User {
    birth_date: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    address: Address;
}

export const Context = React.createContext<IUserContext | null>(null)


const UserProvider = (props : {children : React.ReactNode}) => {
    const {children} = props
    const [user, setUser] = useState<User | null>(null)
    const userStore = useSelector((state : RootState) => state.authStore)

    React.useEffect(() => {
        if(!user)
        {
            (async() => {
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
        }
    }, [])


    return <Context.Provider value={{user, setUser}}>
        {children}
    </Context.Provider>


}

export default UserProvider

