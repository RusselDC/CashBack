from sqlalchemy import String, ForeignKey, Integer, Boolean, Column, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship 
from models import Base
from datetime import date

class Lender(Base):
    __tablename__ = "borrowers"
    id : Mapped[int] = mapped_column(Integer, unique=True, nullable=False, primary_key=True, autoincrement=True)
    user_id : Mapped[int] = mapped_column(Integer,ForeignKey('users.id', ondelete="CASCADE", onupdate="DO NOTHING"), unique=True, nullable=False,)
    first_name : Mapped[str] = mapped_column(String(100), nullable=False)
    last_name : Mapped[str] = mapped_column(String(100), nullable=False)
    middle_name : Mapped[str] = mapped_column(String(100), nullable=False)
    birth_date : Mapped[date] = mapped_column(DateTime, nullable=False)

    

    