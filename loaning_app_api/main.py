from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from domain.service_response import ServiceResponse
from domain.forms.login import LoginForm
from controllers.AuthController import AuthController
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

@app.post("/register")
async def home(loginForm : LoginForm) -> ServiceResponse: 
    try:
        new_user = AuthController().register(loginForm.email, loginForm.password)
        return ServiceResponse(message=str(new_user))
    except Exception as e:
        return HTTPException(status_code=500, detail=e)
    
@app.post("/auth")
async def login(loginForm: LoginForm) -> ServiceResponse:
    try:
        login = AuthController().auth(loginForm.email, loginForm.password)
        return ServiceResponse(data=str(login))  
    except HTTPException as e:
        raise e  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e), message="Logged In")  