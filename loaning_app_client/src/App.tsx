import { BrowserRouter } from "react-router-dom"
import Routings from "./app/index"
import FormProvider from "./app/context/form.context"
import "./App.css"
function App() {


  return (
    
   <BrowserRouter>
    <FormProvider>
      <Routings/>
    </FormProvider>
   </BrowserRouter>
  )
}

export default App
