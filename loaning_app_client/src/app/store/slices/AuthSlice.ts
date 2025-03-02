import {createSlice} from "@reduxjs/toolkit"

interface IAuthInitialState
{
    token_type : string
    token : string | null
}

const initialState : IAuthInitialState = {
    token_type : '',
    token : '',
}
const slice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setAuth : (state, action) => {
            state.token = action.payload?.token
            state.token_type = action.payload?.token_type
        },
        destroyAuth : (state) => {
            state.token = null;
            localStorage.removeItem("persist:root")
        }
    }
})

export const { setAuth, destroyAuth } = slice.actions
export default slice.reducer