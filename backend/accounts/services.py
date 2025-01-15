from supabase_client import supabase
import random
import string
import time

def get_user_auth_info():
  try:
    # Attempt to get the current user
    user_response = supabase.auth.get_user()

    if user_response and user_response.user: 
      user = user_response.user
      print("User ID:", user.id)
      print("User Email:", user.email)
      print("Created At:", user.created_at)
      print("User Metadata:", user.user_metadata if user.user_metadata else "No metadata available")
    elif user_response and user_response.error: 
      print("Error:", user_response.error.message)
    else:
      print("No user is currently logged in or the session has expired.")
  except Exception as e:
    print("An error occurred:", str(e))
    
def view_active_employees(): 
    try: 
        response = supabase.rpc("get_active_employees").execute()
 
        employees = []

        if response.data:
            # Iterate through each active employee record and append to the list
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
            return {"success": False, "message": response.get("error", "No active employees found.")}

    except Exception as e: 
        return {"success": False, "error": f"An error occurred: {str(e)}"}

def view_deleted_employees(): 
    try: 
        response = supabase.rpc("get_deleted_employees").execute()
 
        inactive_employees = []

        if response.data:
            for inactive_employee in response.data:
                # Iterate through each inactive employee record and append to the list
                inactive_employees.append({
                    "emp_id": inactive_employee.get("v_employee_id", "N/A"),
                    "full_name": inactive_employee.get("v_full_name", "N/A"),
                    "birth_date": inactive_employee.get("v_birth", "N/A"),
                    "hired_date": inactive_employee.get("v_hired", "N/A"),
                    "email": inactive_employee.get("v_email", "N/A"),
                    "phone": inactive_employee.get("v_phone", "N/A"),
                    "image_name": inactive_employee.get("v_image_name", "N/A"),
                    "position_and_management": inactive_employee.get("v_pos_manage", "N/A"),
                })
            return {"success": True, "inactive_employees": inactive_employee}
        else: 
            return {"success": False, "message": response.get("error", "No deleted employees found.")}

    except Exception as e: 
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
    # Auto generated temporary password
    temp_password = generate_temp_password()
    
    try: 
        print("Signing up user...")
        response = supabase.auth.sign_up({"email": email, "password": temp_password})
 
        if response.user and response.user.id:
            # Clean up auth_id
            auth_id = response.user.id.replace(" ", "")  
            
            print("User signed up successfully! Auth ID:", auth_id)

            # Wait for user record to be fully available in the database
            time.sleep(20)   
 
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
                print("Calling the function to insert employee...")
                response = supabase.rpc("insert_employee_wrapper", function_params).execute()
                 
                if response.data:
                    print("Employee added successfully:", response.data)
                    return {"success": True, "data": response.data, "temp_password": temp_password}
                else:
                    print("Employee insertion failed.")
                    return {"success": False, "message": response.get("error", "Unable to insert employee.")}

            except Exception as e:
                print(f"RPC Error: {str(e)}")
                return {"success": False, "message": f"RPC Error: {str(e)}"}

        else:
            print("User sign-up failed! No user ID returned.")
            return {"success": False, "message": "User sign-up failed or invalid user ID."}

    except Exception as e:
        print(f"Error during sign-up: {str(e)}")
        return {"success": False, "message": f"Error during sign-up: {str(e)}"}

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
            return {"success": False, "message": response.get("error", "Unable to delete employee.")}

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
 
    print("Updating employee info with parameters:", function_params)
    response = supabase.rpc("update_employee_info_wrapper", function_params).execute()
    print(response.data)
    
    if response.data:
        print("Employee successfully updated:", response.data)
        return {"success": True, "data": response.data}
    else:
        print("Employee update failed")
        return {"success": False, "message": response.get("error", "Unable to edit employee.")}
  except Exception as e:
    print("Exception occurred:", str(e))
    return {"success": False, "message": f"RPC Error: {str(e)}"}

def recover_employee_account(employee_id):
  try:
    function_param = {
      "p_emp_id": employee_id
    }
    response = supabase.rpc("recover_employee_wrapper", function_param).execute()
    print(response.data)
    
    if response.data:
        print("Employee successfully recovered:", response.data)
        return {"success": True, "data": response.data}
    else:
        print("Employee recovery failed") 
        return {"success": False, "message": response.get("error", "Unable to recover employee.")}

  except Exception as e:
    print("Exception occurred:", str(e))
    return {"success": False, "message": f"RPC Error: {str(e)}"} 
 
def get_positions():
    try:
        response = supabase.rpc("get_positions").execute()

        if response.data:
            positions = []
            # Iterate through each record and collect details
            for column in response.data:
                positions.append({
                    "id": column.get("id", "N/A"),
                    "position": column.get("position_name", "N/A"),
                })
            return positions  # Return the collected positions
        else:
            print("No positions found.")
            return []  # Return an empty list if no data found
    except Exception as e:
        print(f"An error occurred: {e}")
        return None  # Return None on error

def update_employee_name_wrapper( p_new_lname: str, p_new_fname: str, p_new_mname: str):
  try:
    # Prepare parameters
    function_params = {
      "p_new_lname": p_new_lname,
      "p_new_fname": p_new_fname,
      "p_new_mname": p_new_mname
    }

    # Call the Supabase function
    print("Updating employee name...")
    response = supabase.rpc("update_employee_name_wrapper", function_params).execute()

    print(response.data)  # Prints the returned message from the database
  except Exception as e:
    print("Exception occurred while updating employee name:", str(e))


def update_employee_address(
  p_st_no: str,
  p_st_name: str,
  p_unit_no: str,
  p_city: str,
  p_state: str,
  p_zip: str,
  p_country: str
):
  try:
    # Prepare parameters
    function_params = {
      "p_st_no": p_st_no,
      "p_st_name": p_st_name,
      "p_unit_no": p_unit_no,
      "p_city": p_city,
      "p_state": p_state,
      "p_zip": p_zip,
      "p_country": p_country
    }

    # Call the Supabase function
    print("Updating employee address...")
    response = supabase.rpc("update_employee_address_wrapper", function_params).execute()

    print(response.data)  # Prints the returned message from the database
  except Exception as e:
    print("Exception occurred while updating employee address:", str(e))


def update_employee_phone_wrapper( p_phone: str):
  try:
    # Prepare parameters
    function_params = {
      "p_phone": p_phone
    }

    # Call the Supabase function
    print("Updating employee phone...")
    response = supabase.rpc("update_employee_phone_wrapper", function_params).execute()

    print(response.data)  # Prints the returned message from the database
  except Exception as e:
    print("Exception occurred while updating employee phone:", str(e))
