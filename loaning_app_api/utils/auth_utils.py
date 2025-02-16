from dotenv import load_dotenv
import os 
from jose import JWTError, jwt
from fastapi import HTTPException
from utils.date_utils import DatesUtils
 
 
class AuthUtils:
    
    def date(self):
        return DatesUtils()
 
    def generate_jwt_token(self, user) -> dict:

           try:
               load_dotenv()
               secret = os.getenv("JWT_SECRET")
               algo = os.getenv("JWT_ALGO")
               payload = {
                   "sub" : str(user.id),
                   "iat" : self.date().now(),
                   "exp" : self.date().tommorow()
               }
               return {"token_type": "Bearer", "token":jwt.encode(payload, secret, algo)}
           except JWTError as e:
               raise HTTPException(detail=str(e))


    def validate_token(self, token: str) -> dict:
        load_dotenv()
        secret = os.getenv("JWT_SECRET")
        algo = os.getenv("JWT_ALGO")

        if not token:
            raise HTTPException(status_code=409, detail="No authentication token in headers")

        parts = token.split(" ", 1)

        if len(parts) == 2:
            prefix, token = parts
            if prefix != "Bearer":
                raise HTTPException(status_code=409, detail="Invalid token: missing or incorrect prefix")

            token = jwt.decode(token, secret, [algo]).get("sub")


            return self.where('id',token).find()

        raise HTTPException(status_code=409, detail="Invalid token") 