from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = f"postgresql://postgres:Russeldc189@localhost:5432/cashback"


engine = create_engine(DATABASE_URL, echo=True)


Session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

session = Session()


