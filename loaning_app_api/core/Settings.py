from pydantic import PostgresDsn, model_validator
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME : str = "CashBack"
    
    
    
    DB_HOST : str
    DB_PORT : str
    DB_NAME : str
    DB_PASSWORD : str
    DB : str
    
    DB_SERVER : Optional[str] = None
    
    JWT_SECRET : str
    JWT_ALGO : str
    
    @model_validator(mode="before")
    def getDatabaseDsn(cls, data):
        if data.get("DB_SERVER") is None:
            data["DB_SERVER"] = (
                f"postgresql://{data['DB_NAME']}:{data['DB_PASSWORD']}@"
                f"{data['DB_HOST']}:{data['DB_PORT']}/{data['DB']}"
            )
        return data
        
        
        
        
    class Config:
        env_file = ".env"
        
        
settings = Settings()