from fastapi import APIRouter, HTTPException, Depends, Request
from domain.forms.register import RegisterForm
from domain.forms.login import LoginForm
from controllers.AuthController import AuthController
from domain.service_response import ServiceResponse


router = APIRouter(prefix="/user", tags=["user"])

@router.post("/register")
async def home(registerForm : RegisterForm) -> ServiceResponse: 
    new_user = AuthController().register(registerForm)
    return ServiceResponse(data={'email' : new_user}, message="User has been created")

@router.post("/auth")
async def login(loginForm: LoginForm) -> ServiceResponse:
    try:
        login = AuthController().auth(loginForm.email, loginForm.password)
        return ServiceResponse(data=login)
    except HTTPException as e:
        raise HTTPException(status_code=500, detail=str(e))    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e), message="Something went wrong")  
    
@router.get("/")
async def get_auth(request: Request):
    headers = dict(request.headers)
    user = AuthController().get_user(headers["authorization"])
    if(user):
        return ServiceResponse(data=user)
    raise HTTPException(status_code=400, default="NO TOKEN")
    

    

    
    