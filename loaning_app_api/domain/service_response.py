from pydantic import BaseModel, Field

class ServiceResponse(BaseModel):
    
    status: str = Field(default="success")
    status_code: int = Field(default=200, ls=500, gt=100)
    data: str = Field(default="{}")
    message: str = Field(default="message")