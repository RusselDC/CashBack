from sqlalchemy import ForeignKey, String, Integer
from models import Base
from sqlalchemy.orm import mapped_column, Mapped

class LenderAddress(Base):
    __tablename__ = "borrower_address"
    
    id : Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)
    borrowers_id : Mapped[int] = mapped_column(Integer, ForeignKey('borrowers.id', ondelete="CASCADE", onupdate="NO ACTION"), nullable=False)
    state : Mapped[str] = mapped_column(String(50), nullable=False)
    city : Mapped[str] = mapped_column(String(50), nullable=False)
    street : Mapped[str] = mapped_column(String(50), nullable=False)
    home_number : Mapped[str] = mapped_column(String(50), nullable=True)
    landmark : Mapped[str] = mapped_column(String(50), nullable=True)
    
    