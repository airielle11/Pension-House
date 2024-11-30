# core/supabase_client.py

from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API = os.getenv("SUPABASE_API")

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_API)


def register_user(email, password):
    """
    Register a new user using Supabase Auth.
    """
    response = supabase.auth.sign_up(
        {"email": email, "password": password}
    )
    if response.get("error"):
        raise Exception(response["error"]["message"])
    return response["user"]

def login_user(email, password):
    """
    Log in a user using Supabase Auth.
    """
    response = supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )
    if response.get("error"):
        raise Exception(response["error"]["message"])
    return response["access_token"], response["user"]
