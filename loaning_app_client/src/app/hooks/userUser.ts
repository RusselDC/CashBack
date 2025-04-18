import { Context } from "../context/user.context";
import { useContext } from "react";


export const useUser = () => {
    const context = useContext(Context)
    if(!context)
    {
        throw new Error("USER CONTEXT INSIDE PROVIDER")
    }
    
    return context
}

export default useUser