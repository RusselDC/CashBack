from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from domain.service_response import ServiceResponse
from domain.forms.login import LoginForm
from domain.forms.register import RegisterForm
from controllers.AuthController import AuthController


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

@app.post("/register")
async def home(registerForm : RegisterForm) -> ServiceResponse: 
    try:
        new_user = AuthController().register(registerForm)
        return ServiceResponse(data={'email' : new_user}, message="User has been created")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/auth")
async def login(loginForm: LoginForm) -> ServiceResponse:
    try:
        login = AuthController().auth(loginForm.email, loginForm.password)
        return ServiceResponse(data=login)
    except HTTPException as e:
        raise e  
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e), message="Logged In")  
    
    
    
