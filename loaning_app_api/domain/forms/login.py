from pydantic import BaseModel, Field, EmailStr, validate_email
class LoginForm(BaseModel):
    email: EmailStr = Field(description="email for your account")
    password: str = Field(description="password for your account",  max_length=16, min_length=8)
    

