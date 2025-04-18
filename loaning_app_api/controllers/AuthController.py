
from models.User import User
from fastapi import HTTPException
from core.database.base_class import session
from models.User import User
from sqlalchemy.exc import SQLAlchemyError 
from utils.string import String
from utils.auth_utils import AuthUtils
from domain.forms.register import RegisterForm
from models import Borrower
from models import BorrowerAddress
class AuthController:
    def register(self, form : RegisterForm):
        try:
            new_user = User(
                email=form.email,
                password=String().hash_string(form.password)  
            )
            
            session.add(new_user)
            session.flush()
            print(f"new user : {new_user.id}")

            new_lender = Borrower(
                user_id=new_user.id,
                first_name=form.first_name,
                middle_name=form.middle_name,
                last_name=form.last_name,
                birth_date=form.birth_date
            )
            
            session.add(new_lender)
            session.flush()
            lender_address = BorrowerAddress(
                borrowers_id=new_lender.id,
                state=form.state,
                city=form.city,
                street=form.street,
                home_number=form.home_number,
                landmark=form.land_mark
            )
            session.add(lender_address)
            session.commit()
            
            return new_user.email
        except SQLAlchemyError as e:
            session.rollback() 
            raise HTTPException(status_code=500, detail="Database error occurred")

        except Exception as e:
            session.rollback()
            raise HTTPException(status_code=500, detail=str(e))

   
            
    def auth(self, email: str, password: str) -> any:
        user = session.query(User).filter(User.email == email).one_or_none()

        if user:
            if user.password == String().hash_string(password):  
                return AuthUtils().generate_jwt_token(user)
            
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    def get_user(self, token:str) -> dict:
        if(token):
            user_id = AuthUtils().validate_token(token)
            user = (
                session.query(User.email, Borrower.first_name, Borrower.last_name, Borrower.middle_name,
                                Borrower.birth_date, BorrowerAddress)
                                .join(Borrower, Borrower.user_id == User.id)
                                .join(BorrowerAddress, BorrowerAddress.borrowers_id == Borrower.id)
                                .filter(User.id == user_id)
                                .one_or_none()
            )
            if(user):
                email, first_name, last_name, middle_name, birth_date, address = user
                return {
                    "email": email,
                    "first_name": first_name,
                    "last_name": last_name,
                    "middle_name": middle_name,
                    "birth_date": str(birth_date), 
                    "address": {
                        "street": address.street,
                        "city": address.city,
                        "province": address.state,
                        "street" : address.street,
                        "home_number" : address.home_number,
                        "land_mark" : address.landmark
                    }
                }
        raise HTTPException(status_code=401, detail="Invalid Request")

        