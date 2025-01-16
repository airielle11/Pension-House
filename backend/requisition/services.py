from venv import logger
from gotrue.errors import AuthApiError
from supabase import create_client, Client
import tkinter as tk
from tkinter import filedialog
import mimetypes

# import io
# from PIL import Image  # Correct import for Pillow
# import os

# public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbHl4bHhwdHlpYmxxc3N1Znh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NjIyNDEsImV4cCI6MjA0ODMzODI0MX0.6i31MPTdsGWREIr2wXzZn5plVFu22QcgZDSXCTX6GRQ"

# # Initialize the Supabase client
# url = "https://hdlyxlxptyiblqssufxu.supabase.co"  #Supabase URL
# key = public_key  #Supabase API key
# supabase: Client = create_client(url, key)    

from supabase_client import supabase


def get_rooms():
    try:
        # Call the Supabase RPC function
        response = supabase.rpc("get_rooms").execute()

        if response.data:
            # Prepare the result with room details
            rooms = []
            for column in response.data:
                room_details = {
                    "id": column.get("id", "N/A"),
                    "room": column.get("room", "N/A"),
                }
                rooms.append(room_details)
                # Print each room for debugging
                print(f"ID: {room_details['id']}, Room: {room_details['room']}")
                print("-" * 50)  # Separator between

            return {"success": True, "rooms": rooms}
        else:
            # No rooms found
            print("No rooms found.")
            return {"success": False, "message": "No rooms found."}

    except Exception as e:
        # Handle unexpected errors
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}


def get_priority_levels():
    try:
        # Call the Supabase RPC function
        response = supabase.rpc("get_priority_levels").execute()

        if response.data:
            # Prepare and print priority level details
            priority_levels = []
            for column in response.data:
                priority_details = {
                    "id": column.get("id", "N/A"),
                    "priority_no": column.get("Priority No.", "N/A"),
                    "priority_name": column.get("Priority name", "N/A"),
                }
                priority_levels.append(priority_details)
                # Print each priority level
                print(f"ID: {priority_details['id']}, Priority No.: {priority_details['priority_no']}, "
                      f"Priority Name: {priority_details['priority_name']}")
                print("-" * 50)  # Separator between items

            return {"success": True, "priority_levels": priority_levels}
        else:
            print("No priority levels found.")
            return {"success": False, "message": "No priority levels found."}

    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}



#REQUISITION TYPES
# [1] Item requisition
# [2] Job Requisition
def create_requisition_service(room_id: int, priority_id: int, requisition_type: int):
    try:
        # Parameters for the Supabase RPC call
        function_params = {
            "p_room_id": room_id,
            "p_prio_id": priority_id,
            "p_requisition_type": requisition_type
        }

        # Call the Supabase function
        response = supabase.rpc("create_requisition_wrapper", function_params).execute()

        # Return response from Supabase (can be data, or you can return any custom format)
        return response.data
    except Exception as e:
        # Handling error if something goes wrong in the service layer
        return {"error": str(e)}


def get_item_requisitions():
    try:
        response = supabase.rpc("get_item_requisition").execute()
        
        if response.data:
            # Create a list to store processed records
            requisitions = []
            
            # Iterate through each record and add its details to the list
            for column in response.data:
                requisition = {
                    "ID": column.get("id", "N/A"),
                    "Image name": column.get("ar_image", "N/A"),
                    "Created by": column.get("Created by", "N/A"),
                    "Date": column.get("Date", "N/A"),
                    "Room No.": column.get("Room No.", "N/A"),
                    "Room Type": column.get("Room Type", "N/A"),
                    "Priority Level": column.get("Priority Level", "N/A"),
                    "Item attachment by": column.get("Item attachment by", "N/A"),
                    "Approved by": column.get("Approved by", "N/A"),
                    "Accepted by": column.get("Accepted by", "N/A"),
                    "Status": column.get("Status", "N/A"),
                }
                requisitions.append(requisition)
            
            # Return the processed data
            return requisitions
        else:
            return []  # Return an empty list if no data found
    except Exception as e:
        print(f"An error occurred: {e}")
        return None  # Return None if an error occurs



def get_job_requisitions():
    try:
        response = supabase.rpc("get_job_requisition").execute()

        if response.data:
            requisitions = []
            # Iterate through each record and add its details to a list of dictionaries
            for column in response.data:
                requisition = {
                    "ID": column.get("id", "N/A"),
                    "Created by": column.get("Created by", "N/A"),
                    "Date": column.get("Date", "N/A"),
                    "Room No.": column.get("Room No.", "N/A"),
                    "Room Type": column.get("Room Type", "N/A"),
                    "Priority Level": column.get("Priority Level", "N/A"),
                    "Job attachment by": column.get("Job attachment by", "N/A"),
                    "Approved by": column.get("Approved by", "N/A"),
                    "Accepted by": column.get("Accepted by", "N/A"),
                    "Status": column.get("Status", "N/A"),
                }
                requisitions.append(requisition)
            return requisitions
        else:
            return []  # Return an empty list if no data is found

    except Exception as e:
        print(f"An error occurred: {e}")
        return None  # Return None to indicate an error



def requisition_attach_items(item_requisition_id: int, items: list):
    try:
        # Convert the list of dictionaries into a JSON string (if needed)
        function_params = {
            "p_itemr_id": item_requisition_id,
            "items": items
        }

        # Call the Supabase function (assuming 'requisition_attach_items_wrapper' is the stored procedure)
        print("Attaching items to requisition...")
        response = supabase.rpc("requisition_attach_items_wrapper", function_params).execute()
        print("Function Parameters:", function_params)
        print("Supabase Response:", response.data if response.data else response.error_message)

        # Check if the response data is not empty and return success
        if response.data:
            return {
                "success": True,
                "message": "Items successfully attached.",
                "data": response.data  # Return the data received from Supabase
            }
        else:
            # Handle case where no data is returned, but no error occurred
            error_message = response.error_message if hasattr(response, 'error_message') else "Unknown error"
            return {
                "success": False,
                "message": "Failed to attach items",
                "details": error_message
            }

    except Exception as e:
        # Catch any unexpected exceptions and return a meaningful error
        return {
            "success": False,
            "message": "Exception occurred",
            "details": str(e)
        }



def requisition_attach_job(job_requisition_id: int, job_description: str):
    try:
        # Check if the job requisition exists and if a job is already attached
        existing_job = supabase.table("job_requisitions").select("*").eq("id", job_requisition_id).execute()
        
        if not existing_job or not existing_job.data:
            return {
                "success": False,
                "message": "Job requisition not found.",
                "details": "The provided job requisition ID does not exist."
            }
        
        if existing_job.data[0].get("job_attached"):
            return {
                "success": False,
                "message": "Job already attached.",
                "details": "The job requisition already has an attached job. Remove it first."
            }

        # Attach the job using Supabase RPC
        function_params = {
            "p_jobr_id": job_requisition_id,
            "p_job_descr": job_description
        }

        response = supabase.rpc("requisition_attach_job_wrapper", function_params).execute()

        if response.data:
            return {
                "success": True,
                "message": "Job successfully attached.",
                "data": response.data
            }
        else:
            error_message = getattr(response, 'error', "Unknown error occurred")
            return {
                "success": False,
                "message": "Failed to attach job.",
                "details": error_message
            }

    except Exception as e:
        # Log the exception instead of returning it
        print(f"Error in requisition_attach_job: {str(e)}")
        return {
            "success": False,
            "message": "An unexpected error occurred.",
            "details": "Please try again later."
        }





# Action Types
# [1] Approve
# [2] Decline
def approve_or_decline_item(action_type: int, item_requisition_id: int, p_rejection_note: str = None):
    try:
        # Prepare function parameters
        function_params = {
            "p_itemr_id": item_requisition_id,
            "p_action_type": action_type,
            "p_rejection_note": p_rejection_note
        }

        # Call the Supabase function
        print("Action in process...")
        response = supabase.rpc("approve_decline_item_wrapper", function_params).execute()

        # Check if the response contains any data
        if response.data:
            print(response.data)  # Optionally log the response data
            return {"data": response.data}  # Always return a dictionary with a "data" key    
        else:
            return {"error": "No data returned from the function."}
    except Exception as e:
        # Always return a dictionary in case of an error
        return {"error": str(e)}


def approve_or_decline_job(action_type: int, job_requisition_id: int, p_rejection_note: str = None):
    try:
        # Prepare function parameters
        function_params = {
            "p_jobr_id": job_requisition_id,
            "p_action_type": action_type,
            "p_rejection_note": p_rejection_note
        }

        # Call the Supabase function
        print("Action in process...")
        response = supabase.rpc("approve_decline_job_wrapper", function_params).execute()

        # Check if the response contains any data
        if response.data:
            print(response.data)  # Optionally log the response data
            return {"data": response.data}  # Always return a dictionary with a "data" key    
        else:
            return {"error": "No data returned from the function."}
    except Exception as e:
        # Always return a dictionary in case of an error
        return {"error": str(e)}
    

def get_attached_items(item_requisition_id: int):
    try:
        function_params = {
            "p_itemr_id": item_requisition_id
        }
        response = supabase.rpc("get_attached_items", function_params).execute()

        if response.data:
            # Create a list to store the details of each item
            attached_items = []
            for column in response.data:
                item_details = {
                    "ID": column.get("id", "N/A"),
                    "Image": column.get("image", "N/A"),
                    "Item name": column.get("Item name", "N/A"),
                    "SKU": column.get("sku", "N/A"),
                    "Category": column.get("Category", "N/A"),
                    "Brand": column.get("brand", "N/A"),
                    "Net Vol/Qty.": column.get("Net Vol/Qty.", "N/A"),
                    "Supplier": column.get("Supplier", "N/A"),
                    "Status": column.get("Status", "N/A"),
                    "Pieces": column.get("Pieces", "N/A")
                }
                attached_items.append(item_details)
            
            return attached_items
        else:
            return "No rooms found."
    
    except Exception as e:
        return f"An error occurred: {e}"




#Wala pani views and path
def get_item_image(file_name):
    try:
        # Execute the service role function to get the API key
        response = supabase.rpc("service_role").execute()

        if response.data:
            url2 = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            key2 = response.data["service_role_key"]  # Supabase API key
            supabase2: Client = create_client(url2, key2)

            try:
                # Fetch image from bucket
                response2 = supabase2.storage.from_("item").download(file_name)
            except Exception:
                # If file not found, use fallback image
                response2 = supabase2.storage.from_("item").download("item not found.png")

            # Check if the response is binary data
            if isinstance(response2, bytes):
                # Convert the binary data to an image
                img = Image.open(io.BytesIO(response2))
                return img  # Return the image object
            else:
                # In case of an unexpected response type
                return None
        else:
            # If service role response does not return valid data
            return None
    except Exception as e:
        # In case of failure, return None
        return None


def get_attached_job(job_requisition_id: int):
    try:
        function_params = {
            "p_jobr_id": job_requisition_id
        }
        # Execute the RPC call to get the attached job details
        response = supabase.rpc("get_attached_job", function_params).execute()

        # Check if the response has data
        if response.data:
            return response.data  # Return the job description or data
        else:
            return {"message": "No data found for the given job requisition ID."}  # If no data returned
    except Exception as e:
        # Return an error message if an exception occurs
        return {"error": f"An error occurred: {e}"}



def accept_job(job_requisition_id: int):
    try:
        function_params = {
            "p_jobr_id": job_requisition_id
        }
        response = supabase.rpc("accept_job_wrapper", function_params).execute()

        # Return the response data or a success message
        if response.data:
            return {"status": "success", "data": response.data}
        else:
            return {"status": "error", "message": "No data returned from the function."}
    except Exception as e:
        # Return the exception message in case of error
        return {"status": "error", "message": str(e)}




def accept_and_mark_item_as_available(item_requisition_id: int):
    try:
        # Prepare function parameters
        function_params = {
            "p_itemr_id": item_requisition_id
        }

        # Call the Supabase function
        response = supabase.rpc("accept_and_mark_item_as_available_wrapper", function_params).execute()

        # Check if the response contains data
        if response.data:
            return {"status": "success", "data": response.data}
        else:
            return {"status": "error", "message": "No data returned from the function."}
    except Exception as e:
        # Return the exception message in case of error
        return {"status": "error", "message": str(e)}



def accept_and_mark_item_as_unavailable(item_requisition_id: int):
    try:
        # Prepare the function parameters
        function_params = {
            "p_itemr_id": item_requisition_id
        }

        # Call the Supabase function
        response = supabase.rpc("accept_and_mark_item_as_unavailable_wrapper", function_params).execute()

        # Check if the response contains data
        if response.data:
            return {"status": "success", "data": response.data}
        else:
            return {"status": "error", "message": "No data returned from the function."}
    except Exception as e:
        # Return the exception message in case of error
        return {"status": "error", "message": str(e)}

import json

def mark_job_as_completed(job_requisition_id: int):
    try:
        function_params = {
            "p_jobr_id": job_requisition_id
        }
        response = supabase.rpc("complete_job_wrapper", function_params).execute()

        # Convert response.data to dictionary if it's a string
        if isinstance(response.data, str):
            response_data = json.loads(response.data)
        else:
            response_data = response.data

        print(f"Supabase response data: {response_data}")  # Debugging
        return response_data  # Return the response data
    except Exception as e:
        return {"error": str(e)}  # Return the error message as a dictionary


def mark_item_as_completed(item_requisition_id: int, file_content: bytes, file_name: str):
    try:
        # Execute the function to retrieve the service role key
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            # Initialize Supabase client with service role key
            new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            new_key = response.data["service_role_key"]  # Supabase API key
            bucket: Client = create_client(new_url, new_key)

            # Sanitize the file name
            safe_file_name = "".join(c if c.isalnum() or c in "._-" else "_" for c in file_name)
            print(f"File name: {safe_file_name}")

            # Determine the MIME type of the uploaded file
            mime_type, _ = mimetypes.guess_type(safe_file_name)
            if not mime_type:
                print("Unable to determine the MIME type. Exiting.")
                return {"status": "error", "message": "Invalid MIME type."}
            print(f"Detected MIME type: {mime_type}")

            try:
                # Upload the file to the bucket
                upload_response = bucket.storage.from_("A-Receipt").upload(
                    safe_file_name,
                    file_content,
                    {"content-type": mime_type}  # Explicitly set the MIME type
                )
                if upload_response:
                    print("Connecting to database...")
                    try:
                        print("Processing...")
                        params = {
                            "p_itemr_id": item_requisition_id,
                            "p_image_name": safe_file_name
                        }
                        db = supabase.rpc("mark_item_as_complete_wrapper", params).execute()

                        print(db.data)
                        return {"status": "success", "data": db.data}
                    except Exception as e:
                        print(str(e))
                        return {"status": "error", "message": str(e)}
                else:
                    print("File upload failed.")
                    return {"status": "error", "message": "File upload failed."}
            except Exception as e:
                print(str(e))
                return {"status": "error", "message": str(e)}
        else:
            print("Failed to retrieve service role key.")
            return {"status": "error", "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"Failed. {e}")
        return {"status": "error", "message": str(e)}



from PIL import Image
import io

def get_ar_image(file_name: str):
    try:
        print("Checking bucket...")
        # Executes function then returns service role key
        response = supabase.rpc("service_role").execute()

        if not response.data:
            print("Failed to retrieve service role key.")
            return {"error": "Failed to retrieve service role key."}

        print("Connecting...")
        url2 = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
        key2 = response.data["service_role_key"]  # Supabase API key
        supabase2: Client = create_client(url2, key2)

        try:
            # Fetch image from bucket
            print(f"Retrieving image: {file_name}...")
            response2 = supabase2.storage.from_("item").download(file_name)

            if not response2:  # Check if response is empty
                raise FileNotFoundError(f"File '{file_name}' not found in 'item' bucket.")

            print("File retrieved successfully.")
            # Convert binary data to an image
            img = Image.open(io.BytesIO(response2))
            return img
        except FileNotFoundError as fnf_error:
            print(fnf_error)
            print("Attempting to retrieve fallback image...")
            try:
                fallback_response = supabase2.storage.from_("A-Receipt").download("ar not found.png")

                if not fallback_response:
                    raise FileNotFoundError("Fallback image 'ar not found.png' not found in 'A-Receipt' bucket.")

                print("Fallback image retrieved successfully.")
                fallback_img = Image.open(io.BytesIO(fallback_response))
                return fallback_img
            except Exception as fallback_error:
                print(f"Error retrieving fallback image: {fallback_error}")
                return {"error": f"Fallback image error: {fallback_error}"}
        except Exception as download_error:
            print(f"Error downloading the file: {download_error}")
            return {"error": f"Error downloading the file: {download_error}"}
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"error": f"An unexpected error occurred: {e}"}

    
def get_stocks():
    """
    Fetches stock data using Supabase and returns the results in a structured format.
    """
    try:
        # Call the Supabase RPC function
        response = supabase.rpc("get_stocks").execute()
        logger.info(f"Response data structure: {response.data}")

        if response.data:
            # If response.data is a list of dictionaries
            stocks = []
            for column in response.data:
                stocks.append({
                    "id": column.get("id", "N/A"),
                    "image": column.get("image", "N/A"),
                    "item_name": column.get("Item name", "N/A"),
                    "sku": column.get("sku", "N/A"),
                    "category": column.get("Category", "N/A"),
                    "brand": column.get("brand", "N/A"),
                    "added_by": column.get("Added by", "N/A"),
                    "net_vol_qty": column.get("Net Vol/Qty.", "N/A"),
                    "in_stock": column.get("In-Stock", "N/A"),
                    "supplier": column.get("supplier", "N/A"),
                    "added_at": column.get("Date added", "N/A"),
                    "status": column.get("status", "N/A"),
                })
            logger.info(f"Fetched {len(stocks)} stock records.")
            return stocks
        else:
            logger.warning("No stock data found.")
            return []
    except Exception as e:
        logger.error(f"An error occurred while fetching stocks: {e}")
        raise  # Re-raise the exception for higher-level handling

def identify_view_more():
  try:
    response = supabase.rpc("identify_dd").execute()
    return int(response.data)

  except Exception as e:
    print(f"An error occurred: {e}")

# #########################################################
# # TEST HERE

# # get_rooms()
# get_priority_levels()

# #REQUISITION TYPES
# # [1] Item requisition
# # [2] Job Requisition
# create_requisition(1,1,1)
# create_requisition(1,1,2)


# get_item_requisitions()
# get_job_requisitions()


# Example usage
# item_to_attach = [
#   {"item_id": 14, "qty": 5},
# ]
# requisition_attach_items(1, item_to_attach)
# requisition_attach_job(1, "kapoy nako")
    
# # Action Types
# # [1] Approve
# # [2] Decline

# #approve item requisition
# approve_or_decline_item(1, 5)
# #decline item requisition
# approve_or_decline_item(2, 6, "wala lang feel ko lang")


# #approve job requisition
# approve_or_decline_job(1, 5)
# #decline job requisition
# approve_or_decline_job(2, 6, "wala lang , mag buot ka?")


# #get attached items in a requisition
# get_attached_items(1)

# # get the item image
# # img = get_item_image("lay's classice.png")
# # img.show()
# # Save the image to a file (ensure the directory exists) --> OPTIONAL
# # save_path = 'C:/Users/Admin/Downloads/supabasetest/downloaded_image.png'
# # os.makedirs(os.path.dirname(save_path), exist_ok=True)
# # # Save the image
# # img.save(save_path)
# # print(f"Image saved successfully at: {save_path}")

# #get the attached job in a requisition
# get_attached_job(1)

# accept_job(1)
# mark_job_as_completed(1)


# mark_item_as_completed(1)

#get the acknowledgement receipt image
# img = get_ar_image("sample.png")
# img.show()
# # Save the image to a file (ensure the directory exists) --> OPTIONAL
# save_path = 'C:/Users/Admin/Downloads/supabasetest/downloaded_image.png'
# # os.makedirs(os.path.dirname(save_path), exist_ok=True)
# # Save the image
# img.save(save_path)
# print(f"Image saved successfully at: {save_path}")
