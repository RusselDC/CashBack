from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv


DATABASE_URL = "postgresql://postgres:Russeldc189@localhost:5432/cashback"


engine = create_engine(DATABASE_URL)

Session = sessionmaker(bind=engine)

session = Session()


