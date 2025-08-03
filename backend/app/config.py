import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://schedge:schedge@localhost:5432/schedge")
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

config_instance = Config()