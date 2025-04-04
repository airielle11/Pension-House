from gotrue.errors import AuthApiError
from supabase import create_client, Client

public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbHl4bHhwdHlpYmxxc3N1Znh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NjIyNDEsImV4cCI6MjA0ODMzODI0MX0.6i31MPTdsGWREIr2wXzZn5plVFu22QcgZDSXCTX6GRQ"
private = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbHl4bHhwdHlpYmxxc3N1Znh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjc2MjI0MSwiZXhwIjoyMDQ4MzM4MjQxfQ.o4Qsj8C_vh0sR_GotLfJMDuSD-b3T10gsxcgLMNI7jA"
# Initialize the Supabase client
url = "https://hdlyxlxptyiblqssufxu.supabase.co"  #Supabase URL
key = private  #Supabase API key
supabase: Client = create_client(url, key)




def sign_in(email, password):
  # Log in a user with email and password.
  try:
    # Attempt to log in using email and password
    print("Signing in....")
    response = supabase.auth.sign_in_with_password({"email": email, "password": password})

    # Check if login is successful by inspecting the user object
    if response.user.user_metadata.get("is_active", True):

      try:
        print("Checking database layer...")
        params = {"idd": response.user.id}
        response = supabase.rpc("sign_in", params).execute()

        # Ensure response.data is not empty and is a list
        if response.data:
          for result in response.data:
            print(f"Full Name: {result['v_full_name']}")
            print(f"Email: {result['v_email']}")
            print(f"Image file name: {result['v_image_name']}")
            print(f"Position and Management: {result['v_pos_manage']}")
            print(f"URL: {result['v_url']}")
        else:
          print("No data returned from the database.")
      except Exception as e:
        print(e.message)

    elif response.user.user_metadata.get("is_active", False):
      print("User is_active = false")
      supabase.auth.sign_out()
    else:
      print("Login failed. No user returned.")

  except Exception as e:
    # Catch and print any exceptions (e.g., invalid credentials)
    print(f"{str(e)}")



def add_new_room_type(room_type_name: str):
    """
    Add a new room type by calling the 'add_room_type_wrapper' RPC function.
    Returns a dictionary containing the operation status or error message.
    """
    try:
        # Prepare the parameters for the RPC function
        function_params = {
            "p_rt_name": room_type_name
        }

        # Call the RPC function
        response = supabase.rpc("add_room_type_wrapper", function_params).execute()

        # Check if the response has data
        if response.data:
            return {"status": "success", "message": "Room type added successfully.", "data": response.data}
        else:
            return {"status": "error", "message": "No data returned from the RPC function."}
    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": str(e)}





def add_new_room(room_number: str, room_type_id: int):
    """
    Add a new room by calling the 'add_room_wrapper' RPC function.
    Returns a dictionary containing the operation status or error message.
    """
    try:
        # Prepare the parameters for the RPC function
        function_params = {
            "p_room_no": room_number,
            "p_rt_id": room_type_id
        }

        # Call the RPC function
        response = supabase.rpc("add_room_wrapper", function_params).execute()

        # Check if the response has data
        if response.data:
            return {"status": "success", "message": "Room added successfully.", "data": response.data}
        else:
            return {"status": "error", "message": "No data returned from the RPC function."}
    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": str(e)}


def get_room_types():
    """
    Retrieve all room types by calling the 'get_room_types' RPC function.
    Returns a dictionary containing the operation status and retrieved data or error messages.
    """
    try:
        # Call the RPC function to get room types
        response = supabase.rpc("get_room_types").execute()

        # Check if the response has data
        if response.data:
            room_types = []
            for column in response.data:
                room_types.append({
                    "id": column.get("id", "N/A"),
                    "room_type": column.get("Room Type", "N/A")
                })
            return {"status": "success", "data": room_types}
        else:
            return {"status": "error", "message": "No room types found."}
    except Exception as e:
        # Handle exceptions and return an error message
        return {"status": "error", "message": str(e)}




sign_in("admin@gmail.com", "admin")
print("\n\n")

print("\n1.) ")
add_new_room_type("sample type")

print("\n2.) ")
add_new_room("103", 1)

print("\n3.) ")
get_room_types()

