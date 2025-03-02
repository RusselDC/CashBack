from pydantic import BaseModel, Field, EmailStr, field_validator
from datetime import date, timedelta
from typing import Optional


class RegisterForm(BaseModel):
    email: EmailStr = Field(description="email for your account")
    password: str = Field(description="password for your account",  max_length=16, min_length=8)
    first_name: str = Field(description="First name of the lender", max_length=100, min_Length=2)
    last_name: str = Field(description="Last name of the lender", max_length=100, min_Length=2)
    middle_name: str = Field(description="Middle name of the lender", max_length=100, min_Length=2)
    birth_date: date = Field(description="birth date of the lender")
    state : str = Field(description="state or province the lender lives")
    city : str = Field(description="City where the lender lives")
    street : str = Field(description="The street where the lender lives")
    home_number : str = Field( "home number of the house of lender")
    land_mark : Optional[str] = Field("land mark of the lenders home")
    
    
    
    @field_validator("birth_date")
    @classmethod
    def validate_birthdate(cls, value: date) -> Optional[date]:
        if value is not None:
            min_date = date.today() - timedelta(days=21 * 365)
            if value > min_date:
                raise ValueError("Birth date must be more than 21 years ago.")
        return value