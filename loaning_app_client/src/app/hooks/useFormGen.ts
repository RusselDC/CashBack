import { useContext, createContext, } from "react"
import { FormContextType } from "../types/context"

export const FormContext = createContext<FormContextType | null>(null)


export const useForm = () => {
    const context = useContext(FormContext)
    if (context) return context
    
    throw new Error("useForm must be used within the provider")
}

