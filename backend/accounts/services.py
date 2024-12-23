from supabase_client import supabase
import random
import string
import time

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
    
def view_active_employees():
    """
    Fetches active employees from the Supabase stored procedure and returns their details.
    """
    try:
        # Call the stored procedure from Supabase
        response = supabase.rpc("get_active_employees").execute()

        # Initialize a list to store employee details
        employees = []

        if response.data:
            # Iterate through each employee record and append to the list
            for employee in response.data:
                employees.append({
                    "emp_id": employee.get("v_employee_id", "N/A"),
                    "full_name": employee.get("v_full_name", "N/A"),
                    "birth_date": employee.get("v_birth", "N/A"),
                    "hired_date": employee.get("v_hired", "N/A"),
                    "email": employee.get("v_email", "N/A"),
                    "phone": employee.get("v_phone", "N/A"),
                    "image_name": employee.get("v_image_name", "N/A"),
                    "position_and_management": employee.get("v_pos_manage", "N/A"),
                })
            return {"success": True, "employees": employees}
        else:
            # If no data is found, return a message
            return {"success": False, "message": "No active employees found."}

    except Exception as e:
        # Handle and return errors in case of failure
        return {"success": False, "error": f"An error occurred: {str(e)}"}

def generate_temp_password(length=8): 
    # Generate random characters for random password
    letters = string.ascii_letters   
    digits = string.digits          
    special_chars = "!@#$%^&*()_+-=[]{};':\"|<>?,./`~"

    # Combine all random characters
    temp = letters + digits + special_chars

    # Generate the random password
    random_password = ''.join(random.choices(temp, k=length))
 
    return f"Penistock2024{random_password}" 

def add_employee_account(email, lname, mname, fname, birth_date, phone, pos_id, hired_date=None):
    temp_password = generate_temp_password()
    try:
        # Attempt to sign up the user
        print("Signing up user...")
        response = supabase.auth.sign_up({"email": email, "password": temp_password})

        # Check the response object for user creation
        if response.user and response.user.id:
            auth_id = response.user.id.replace(" ", "")  # Clean up auth_id
            print("User signed up successfully! Auth ID:", auth_id)

            # Wait for user record to be fully available in the database
            time.sleep(20)   

            # Parameters for the RPC function
            function_params = {
                "p_lname": lname,
                "p_mname": mname,
                "p_fname": fname,
                "p_birth_date": birth_date,
                "p_auth_id": auth_id,
                "p_email": email,
                "p_phone": phone,
                "p_pos_id": pos_id,
                "p_hired_date": hired_date
            }

            try:
                # Call the RPC function to insert employee data
                print("Calling the function to insert employee...")
                rpc_response = supabase.rpc("insert_employee_wrapper", function_params).execute()
                
                # Check for successful insertion
                if rpc_response.data:
                    print("Employee added successfully:", rpc_response.data)
                    return {"success": True, "data": rpc_response.data, "temp_password": temp_password}
                else:
                    print("Employee insertion failed.")
                    return {"success": False, "message": "Unable to insert employee data."}

            except Exception as e:
                print(f"RPC Error: {str(e)}")
                return {"success": False, "message": f"RPC Error: {str(e)}"}

        else:
            print("User sign-up failed! No user ID returned.")
            return {"success": False, "message": "User sign-up failed or invalid user ID."}

    except Exception as e:
        print(f"Error during sign-up: {str(e)}")
        return {"success": False, "message": f"Error during sign-up: {str(e)}"}

# def add_employee_account(email, lname, mname, fname, birth_date, phone, pos_id, hired_date=None):
#     temp_password = generate_temp_password()

#     try:
#         # Step 1: Sign up the user
#         print("Signing up user...")
#         response = supabase.auth.sign_up({"email": email, "password": temp_password})

#         # Wait briefly to ensure the user record is ready
#         time.sleep(1)  

#         auth_id = response.user.id if response.user else None
        
#         if not auth_id:
#             print("User sign-up failed. No auth ID returned.")
#             return {"success": False, "message": "User sign-up failed."}

#         print(f"User signed up successfully! Auth ID: {auth_id}")

#         # Step 2: Call the RPC function to insert employee data
#         print("Inserting employee data into the database...")
#         function_params = {
#             "p_lname": lname,
#             "p_mname": mname,
#             "p_fname": fname,
#             "p_birth_date": birth_date,
#             "p_auth_id": auth_id,
#             "p_email": email,
#             "p_phone": phone,
#             "p_pos_id": pos_id,
#             "p_hired_date": hired_date
#         }

#         # Use Supabase's RPC method
#         rpc_response = supabase.rpc("insert_employee_wrapper", function_params).execute()

#         # Check response from the RPC
#         if rpc_response.data:
#             print("Employee added successfully:", rpc_response.data)
#             return {"success": True, "data": rpc_response.data, "temp_password": temp_password}
#         else:
#             print("Failed to insert employee data.")
#             return {"success": False, "message": "Unable to insert employee data."}

#     except Exception as e:
#         print(f"Error: {str(e)}")
#         return {"success": False, "message": str(e)}
    
def delete_employee_account(employee_id):
    try:
        # Parameters for the Supabase RPC function
        function_param = {
            "p_emp_id": employee_id
        }

        # Call the Supabase RPC function
        response = supabase.rpc("delete_employee_wrapper", function_param).execute()
 
        if response.data:
            print("Employee deleted successfully! :", response.data)
            return {"success": True, "data": response.data}
        else:
            return {"success": False, "message": response.get("error", "Unknown error occurred")}

    except Exception as e: 
        return {"success": False, "message": str(e)}
    
def update_employee_account(
  p_emp_id: int,
  p_new_lname: str,
  p_new_fname: str,
  p_new_mname: str,
  p_st_no: str,
  p_st_name: str,
  p_unit_no: str,
  p_city: str,
  p_state: str,
  p_zip: str,
  p_country: str,
  p_phone: str
  ):
  try:
    # Convert the list of dictionaries into a JSON string
    function_params = {
      "p_emp_id": p_emp_id,
      "p_new_lname": p_new_lname,
      "p_new_fname": p_new_fname,
      "p_new_mname": p_new_mname,
      "p_st_no": p_st_no,
      "p_st_name": p_st_name,
      "p_unit_no": p_unit_no,
      "p_city": p_city,
      "p_state": p_state,
      "p_zip": p_zip,
      "p_country": p_country,
      "p_phone": p_phone
    }

    # Call the Supabase function
    print("Updating employee info..")
    response = supabase.rpc("update_employee_info_wrapper", function_params).execute()

    print(response.data)
  except Exception as e:
    print("Exception occurred:", str(e))

# def delete_employee(employee_id):
#   try:
#     function_param = {
#       "p_emp_id": employee_id
#     }
#     response = supabase.rpc("delete_employee_wrapper", function_param).execute()
#     print(response.data)

#   except Exception as e:
#     print("Error occurred during employee account deletion")
#     print(e)
 