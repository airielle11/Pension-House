from gotrue.errors import AuthApiError
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# This file contains reusable authentication functions to be used in the views.py file

# Load the .env file
load_dotenv()

# Retrieve Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API = os.getenv("SUPABASE_API")

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_API)

# Authentication functions
def register_user(email, password):
    try:
        # Attempt to sign up the user
        response = supabase.auth.sign_up({"email": email, "password": password})

        # Check the response object
        if response.user: 
            return {"success": True, "user_email": response.user.email}  
        elif response.error: 
            return {"success": False, "error": response.error.message}   
        else: 
            return {"success": False, "error": "Unknown error occurred"} 
    except Exception as e: 
        return {"success": False, "error": str(e)}   
    
def login_user(email, password):
    try:
        # Attempt to log in using email and password
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})

        # Check if login is successful by inspecting the user object
        if response.user:
            return response.session.access_token, response.user  
        else: 
            raise ValueError("Login failed. Invalid credentials.") 
    except Exception as e: 
        raise ValueError(f"Login failed: {str(e)}") 



def get_user_auth_info():
  try:
    # Attempt to get the current user
    user_response = supabase.auth.get_user()

    if user_response and user_response.user:
      # Extract and print only key user details
      user = user_response.user
      print("User ID:", user.id)
      print("User Email:", user.email)
      print("Created At:", user.created_at)
      print("User Metadata:", user.user_metadata if user.user_metadata else "No metadata available")
    elif user_response and user_response.error:
      # Print error details if available
      print("Error:", user_response.error.message)
    else:
      print("No user is currently logged in or the session has expired.")
  except Exception as e:
    print("An error occurred:", str(e))

def request_reset_email(email):
  # Trigger password reset with a custom redirect URL
  try:
      response = supabase.auth.reset_password_for_email(email)
      print("Password reset email sent successfully:")
  except Exception as e:
      print("Error sending password reset email:", e)

def reset_password(email, otp, new_password):
  try:
    # Attempt to verify the OTP and reset the password
    response = supabase.auth.verify_otp(
      {
        "email": email,
        "token": otp,
        "type": "recovery"
      }
    )
    supabase.auth.update_user({
        "password": new_password
    })
    # print("Password reset successful:", response.user.email)
  except AuthApiError as e:
    # Handle AuthApiError
    print(f"{e}")
  except Exception as e:
    # Handle other unexpected exceptions
    print(f"An unexpected error occurred: {e}")

def reset_passwordv2(new_password, confirmed_password):
  try:
    # Check if the new password and confirmed password match
    if new_password == confirmed_password:
      # Update user password in Supabase
      response = supabase.auth.update_user({
        "password": new_password
      })
      # Check if the response is successful
      if response.get('user'):
        print("Password reset successful.")
      else:
        print("Failed to reset password.")
    else:
      raise ValueError("Passwords do not match.")

  except ValueError as e:
    # Handle case where passwords do not match
    print(f"Error: {e}")

  except AuthApiError as e:
    # Handle Supabase-specific authentication errors
    print(f"{e}")

  except Exception as e:
    # Handle any other unexpected errors
    print(f"An unexpected error occurred: {e}") 