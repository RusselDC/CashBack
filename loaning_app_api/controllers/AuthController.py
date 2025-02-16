
from models.User import User
from fastapi import HTTPException
from config.database import session
from models.User import User
from sqlalchemy.exc import SQLAlchemyError 
from utils.string import String
from utils.auth_utils import AuthUtils

class AuthController:
    
    def register(self, email=str, password=str) -> dict:
        try:
            user = session.query(User).filter(User.email == email).one_or_none()

            if user:
                raise HTTPException(status_code=401, detail="User already exist")
            new_user = User(
                email=email,
                password=String().hash_string(password)
            )

            session.add(new_user)
            session.commit()

            return new_user.email
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=e)
        finally:
            session.close()

    def auth(self, email: str, password: str) -> dict:
        user = session.query(User).filter(User.email == email).one_or_none()

        if user:
            if user.password == String().hash_string(password):  
                return AuthUtils().generate_jwt_token(user)
            
        raise HTTPException(status_code=401, detail="Invalid credentials")
       
        