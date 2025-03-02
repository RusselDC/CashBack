import { BrowserRouter } from "react-router-dom"
import Routings from "./app/index"
import FormProvider from "./app/context/form.context"
import { SnackbarProvider } from 'notistack'
import "./App.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistedStore} from "./app/store/app-store"
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, ValidationModule, AllCommunityModule, TooltipModule } from "ag-grid-community";
function App() {

  ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule,AllCommunityModule,TooltipModule]);
  return (
    
   <BrowserRouter>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
   <SnackbarProvider>
    <FormProvider>
      <Routings/>
    </FormProvider>
    </SnackbarProvider>
    </PersistGate>
    </Provider>
   </BrowserRouter>
  )
}

export default App
