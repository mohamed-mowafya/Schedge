import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://schedge:schedge@localhost:5432/schedge")
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")