from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()

# Retrieve Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API = os.getenv("SUPABASE_API")

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_API)
 