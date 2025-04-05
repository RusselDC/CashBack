from sqlalchemy import String, ForeignKey, Integer, Boolean, Column, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship 
from core.database import Base
from datetime import date

class Borrower(Base):
    id : Mapped[int] = mapped_column(Integer, unique=True, nullable=False, primary_key=True, autoincrement=True)
    user_id : Mapped[int] = mapped_column(Integer,ForeignKey('users.id', ondelete="CASCADE", onupdate="NO ACTION"), unique=True, nullable=False,)
    first_name : Mapped[str] = mapped_column(String(100), nullable=False)
    last_name : Mapped[str] = mapped_column(String(100), nullable=False)
    middle_name : Mapped[str] = mapped_column(String(100), nullable=False)
    birth_date : Mapped[date] = mapped_column(DateTime, nullable=False)

    

    