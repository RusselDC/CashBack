import { BrowserRouter } from "react-router-dom"
import Routings from "./app/index"
import FormProvider from "./app/context/form.context"
import { SnackbarProvider } from 'notistack'
import "./App.css"
function App() {


  return (
    
   <BrowserRouter>
   <SnackbarProvider>
    <FormProvider>
      <Routings/>
    </FormProvider>
    </SnackbarProvider>
   </BrowserRouter>
  )
}

export default App
