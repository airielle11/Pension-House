# from gotrue.errors import AuthApiError  
# Abosulute file import
from supabase_client import supabase

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
      
# def login_user(email, password):
#     try:
#         # Attempt to log in using email and password
#         print("Signing in....")
#         response = supabase.auth.sign_in_with_password({"email": email, "password": password})

#         # Check if the user is active
#         if response.user.user_metadata.get("is_active", True):
#             print("Checking database layer...")
#             params = {"idd": response.user.id}
#             rpc_response = supabase.rpc("sign_in", params).execute()

#             # Ensure data exists in the response
#             if rpc_response.data:
#                 # Extract user details and role
#                 user_details = rpc_response.data[0]  # Assuming data is returned as a list
#                 role = user_details.get("v_pos_manage", "User")  # Default role is 'User'

#                 # Return a structured response with token and role
#                 return {
#                     "token": response.session.access_token,
#                     "user": {
#                         "full_name": user_details.get("v_full_name"),
#                         "email": user_details.get("v_email"),
#                         "role": role,
#                         "image_name": user_details.get("v_image_name"),
#                         "url": user_details.get("v_url"),
#                     },
#                 }
#             else:
#                 raise ValueError("No data returned from the database.")

#         elif response.user.user_metadata.get("is_active", False):
#             print("User is not active.")
#             supabase.auth.sign_out()
#             raise ValueError("Account is inactive.")

#         else:
#             raise ValueError("Login failed. No user returned.")

#     except Exception as e:
#         # Return exception message
#         raise ValueError(f"Login failed: {str(e)}")

    
def sign_in(email, password):
    # Log in a user with email and password.
    try:
        # Attempt to log in using email and password
        print("Signing in....")
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})

        # Extract auth_id from the user object
        auth_id = response.user.id   

        # Check if login is successful by inspecting the user object
        if response.user.user_metadata.get("is_active", True):
            try:
                print("Checking database layer...")
                params = {"idd": auth_id}
                rpc_response = supabase.rpc("sign_in", params).execute()

                # Ensure response.data is not empty and is a list
                if rpc_response.data:
                    user_details = []
                    for result in rpc_response.data:
                        user_details.append({
                            "full_name": result.get("v_full_name"),
                            "email": result.get("v_email"),
                            "image_name": result.get("v_image_name"),
                            "position_management": result.get("v_pos_manage"),
                            "url": result.get("v_url")
                        })
                    return {
                        "success": True,
                        "message": "Login successful",
                        "user_details": user_details,
                        "token": response.session.access_token,
                        "auth_id": auth_id  # Return the auth ID
                    }
                else:
                    return {
                        "success": False,
                        "error": "No data returned from the database.",
                        "auth_id": auth_id  # Return auth_id for troubleshooting
                    }
                    
            # Catch and return any database errors
            except Exception as e:
                return {
                    "success": False,
                    "auth_id": f"Auth ID: {response.user.id}",
                    "error": f"s{str(e)}"
                }

        elif response.user.user_metadata.get("is_active", False):
            supabase.auth.sign_out()
            return {
                "success": False,
                "error": "Account is inactive.",
                "auth_id": auth_id  # Return the auth ID for debugging
            }

        else:
            return {
                "success": False,
                "error": "Login failed. No user returned.",
                "auth_id": auth_id
            }

    except Exception as e:
        # Catch and return any exceptions (e.g., invalid credentials)
        return {
            "success": False,
            "error": f"Authentication failed: {str(e)}",
            "auth_id": None  # No auth ID available due to failed authentication
        }

# def sign_in(email, password):
#     try:
#         # Attempt to log in using email and password
#         response = supabase.auth.sign_in_with_password({"email": email, "password": password})

#         # Check if login is successful by inspecting the user object
#         if response.user:
#             return response.session.access_token, response.user  
#         else: 
#             raise ValueError("Login failed. Invalid credentials.") 
#     except Exception as e: 
#         raise ValueError(f"Login failed: {str(e)}") 

def request_reset_password(email):
    try:
        response = supabase.auth.reset_password_for_email(email)
        return {"success": True, "message": "Password reset email sent successfully", "user_email": email}
    except Exception as e:
        return {"success": False, "error": str(e)}

def reset_passwordv2(new_password, confirmed_password):
    try:
        # Check if the new password and confirmed password match
        if new_password == confirmed_password:
            # Update user password in Supabase
            response = supabase.auth.update_user({"password": new_password})
            
            # Check if the response is successful
            if response.get('user'):
                return {"success": True, "message": "Password reset is successful!"}
            else:
                return {"success": False, "message": "Failed to reset password. Please try again."}
        else:
            return {"success": False, "message": "Passwords do not match!"}

    except Exception as e:
        # Handle any other unexpected errors
        return {"success": False, "error": f"An unexpected error occurred: {e}"}
  
