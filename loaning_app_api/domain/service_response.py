from pydantic import BaseModel, Field
from typing import Any, Dict

class ServiceResponse(BaseModel):
    status: str = Field(default="success")
    status_code: int = Field(default=200, le=500, gt=100)  
    data: Dict[str, Any] = Field(default_factory=dict)
    message: str = Field(default="message")
   
