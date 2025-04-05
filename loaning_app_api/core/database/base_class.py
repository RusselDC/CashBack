from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.Settings import settings


engine = create_engine(settings.DB_SERVER, echo=True)
Session = sessionmaker(bind=engine, autoflush=True)

session = Session()