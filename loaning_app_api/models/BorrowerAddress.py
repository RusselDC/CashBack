from sqlalchemy import ForeignKey, String, Integer
from core.database import Base
from sqlalchemy.orm import mapped_column, Mapped

class BorrowerAddress(Base):
    id : Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)
    borrowers_id : Mapped[int] = mapped_column(Integer, ForeignKey('borrowers.id', ondelete="CASCADE", onupdate="NO ACTION"), nullable=False)
    state : Mapped[str] = mapped_column(String(50), nullable=False)
    city : Mapped[str] = mapped_column(String(50), nullable=False)
    street : Mapped[str] = mapped_column(String(50), nullable=False)
    home_number : Mapped[str] = mapped_column(String(50), nullable=True)
    landmark : Mapped[str] = mapped_column(String(50), nullable=True)
    
    