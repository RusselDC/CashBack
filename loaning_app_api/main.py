from fastapi import FastAPI, Request, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from domain.service_response import ServiceResponse
from domain.forms.login import LoginForm
from domain.forms.register import RegisterForm
from controllers.AuthController import AuthController
from typing import Annotated
from core.Settings import settings
from routers import user


app = FastAPI(
    title=settings.APP_NAME,
    version = "0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

app.include_router(user.router)


    

    

