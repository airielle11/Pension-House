
from gotrue.errors import AuthApiError
import tkinter as tk
from tkinter import filedialog
import mimetypes

from supabase_client import supabase

from django.conf import settings
import os

import logging
import psycopg2
from psycopg2 import IntegrityError  # Add this import

logger = logging.getLogger(__name__)




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
                    "status": column.get("status", "N/A")
                })
            logger.info(f"Fetched {len(stocks)} stock records.")
            return stocks
        else:
            logger.warning("No stock data found.")
            return []
    except Exception as e:
        logger.error(f"An error occurred while fetching stocks: {e}")
        raise  # Re-raise the exception for higher-level handling






"""
def get_stocks():
    try:
        response = supabase.rpc("get_stocks").execute()

        

        if response.data:
            stocks = []
            # Iterate through each record and collect the stock data
            for column in response.data:
                stocks.append({ 
                    "ID": column.get("id", "N/A"),
                    "Image": column.get("image", "N/A"),
                    "Item name": column.get("Item name", "N/A"),
                    "SKU": column.get("sku", "N/A"),
                    "Category": column.get("Category", "N/A"),
                    "Brand": column.get("brand", "N/A"),
                    "Added by": column.get("Added by", "N/A"),
                    "Net Vol/Qty.": column.get("Net Vol/Qty.", "N/A"),
                    "In-Stock": column.get("In-Stock", "N/A"),
                    "Supplier": column.get("supplier", "N/A"),
                    "Status": column.get("status", "N/A")

                })
               # stocks.append(stock)
            #return stocks  # Return the list of stocks
            return {"success": True, "stocks": stocks}
        else:
            return {"success": False, "message": response.get("error", "No stocks found")}

    except Exception as e:
       # print(f"An error occurred: {e}")
        #return []  # Return an empty list if an error occurs

        return {"success": False, "error": f"An error occurred: {str(e)}"}

"""
def get_defective_items():
    """
    Fetches defective item data using Supabase and returns the results in a structured format.
    """
    try:
        # Execute the RPC to get defective items
        response = supabase.rpc("get_defective_items").execute()

        logger.info(f"Response data structure: {response.data}")

        if response.data:
            defective_items = []
            # Iterate through each record and collect the defective item data
            for column in response.data:
                defective_items.append({
                    "id": column.get("id", "N/A"),
                    "image": column.get("image", "N/A"),
                    "item_name": column.get("Item name", "N/A"),
                    "sku": column.get("sku", "N/A"),
                    "category": column.get("Category", "N/A"),
                    "brand": column.get("brand", "N/A"),
                    "added_by": column.get("Added by", "N/A"),
                    "net_vol_qty": column.get("Net Vol/Qty.", "N/A"),
                    "defect_quantity": column.get("Defect Quantity", "N/A"),
                    "supplier": column.get("supplier", "N/A"),
                    "status": column.get("status", "N/A"),
                })

            logger.info(f"Fetched {len(defective_items)} defective item records.")
            return {"success": True, "defective_items": defective_items}
        else:
            logger.warning("No defective items found.")
            return {"success": False, "message": "No defective items found"}

    except Exception as e:
        logger.error(f"An error occurred while fetching defective items: {e}")
        return {"success": False, "error": f"An error occurred: {str(e)}"}





def get_categories():
    """
    Fetches category data using Supabase and returns the results in a structured format.
    """
    try:
        # Execute the RPC to get categories
        logger.info("Attempting to fetch categories from Supabase.")
        response = supabase.rpc("get_categories").execute()

        logger.info(f"Response data structure: {response.data}")

        if response.data:
            categories = []
            # Iterate through each record and collect the category data
            for column in response.data:
                categories.append({
                    "ID": column.get("id", "N/A"),
                    "Category": column.get("category", "N/A")
                })

            logger.info(f"Fetched {len(categories)} categories.")
            return {"success": True, "categories": categories}
        else:
            logger.warning("No categories found.")
            return {"success": False, "message": "No categories found"}

    except Exception as e:
        logger.error(f"An error occurred while fetching categories: {e}")
        return {"success": False, "error": f"An error occurred: {str(e)}"}


""" old
def get_categories():
    try:
        # Execute the RPC to get categories
        response = supabase.rpc("get_categories").execute()

        if response.data:
            categories = []
            # Iterate through each record and collect the category data
            for column in response.data:
                categories.append({
                    "ID": column.get("id", "N/A"),
                    "Category": column.get("category", "N/A")
                })

            # Return the list of categories
            return {"success": True, "categories": categories}
        else:
            return {"success": False, "message": "No categories found"}

    except Exception as e:
        # Return an error message if an exception occurs
        return {"success": False, "error": f"An error occurred: {str(e)}"}
"""


def get_brands():
    try:
        response = supabase.rpc("get_brands").execute()

        if response.data:
            brands = []
            # Iterate through each record and collect the brand data
            for column in response.data:
                brands.append({
                    "ID": column.get("id", "N/A"),
                    "Brand": column.get("brand", "N/A")
                })
            return {"success": True, "brands": brands}
        else:
            return {"success": False, "message": "No brands found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}



def get_suppliers():
    try:
        response = supabase.rpc("get_suppliers").execute()

        if response.data:
            suppliers = []
            # Iterate through each record and collect the supplier data
            for column in response.data:
                suppliers.append({
                    "ID": column.get("id", "N/A"),
                    "Supplier": column.get("supplier", "N/A")
                })
            return {"success": True, "suppliers": suppliers}
        else:
            return {"success": False, "message": "No suppliers found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}



def get_containers():
    try:
        response = supabase.rpc("get_containers").execute()

        if response.data:
            containers = []
            # Iterate through each record and collect the container data
            for column in response.data:
                containers.append({
                    "ID": column.get("id", "N/A"),
                    "Container": column.get("container", "N/A")
                })
            return {"success": True, "containers": containers}
        else:
            return {"success": False, "message": "No containers found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}



def get_units():
    try:
        response = supabase.rpc("get_units").execute()

        if response.data:
            units = []
            # Iterate through each record and collect the unit data
            for column in response.data:
                units.append({
                    "ID": column.get("id", "N/A"),
                    "Unit": column.get("unit", "N/A")
                })
            return {"success": True, "units": units}
        else:
            return {"success": False, "message": "No units found"}

    except Exception as e:
        return {"success": False, "error": f"An error occurred: {str(e)}"}



"""
def add_new_item_v2(
    p_item_name: str,
    p_item_descr: str,
    p_scat_id: int,
    p_br_id: int,
    p_splr_id: int,
    p_net_volqty: float,
    p_in_stock: int,
    p_rol: int,
    p_pk_descr: str,
    p_cont_id: int,
    p_ut_id: int
):
    try:
        # Initialize Supabase client with service role key
        bucket: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

        # Define the directory containing the image
        image_dir = "temporary_storage"
        allowed_extensions = {".jpg", ".jpeg", ".png"}  # Allowed file types

        # Search for an image in the directory
        image_files = [
            f for f in os.listdir(image_dir)
            if os.path.splitext(f)[1].lower() in allowed_extensions
        ]

        if not image_files:
            print("No valid image file found in the directory. Exiting.")
            return

        # Use the first valid image file
        original_image_name = image_files[0]
        original_file_path = os.path.join(image_dir, original_image_name)

        # Generate a unique name for the image
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = os.path.splitext(original_image_name)[1]
        unique_image_name = f"{p_item_name}_{timestamp}{file_extension}"
        unique_file_path = os.path.join(image_dir, unique_image_name)

        # Rename the file
        os.rename(original_file_path, unique_file_path)
        print(f"Renamed file to: {unique_image_name}")

        # Determine the MIME type of the file
        mime_type, _ = mimetypes.guess_type(unique_file_path)
        if not mime_type:
            print("Unable to determine the MIME type. Exiting.")
            return
        if mime_type == "image/gif":
            print("GIF images are not supported. Exiting.")
            return
        print(f"Detected MIME type: {mime_type}")

        # Upload the file to the Supabase storage
        with open(unique_file_path, "rb") as file:
            upload_response = bucket.storage.from_("item").upload(
                unique_image_name,
                file,
                {"content-type": mime_type}  # Explicitly set the MIME type
            )

        if upload_response:
            print("File uploaded successfully.")
            # Now, insert the new item into the database
            params = {
                "p_item_name": p_item_name,
                "p_item_descr": p_item_descr,
                "p_image": unique_image_name,
                "p_scat_id": p_scat_id,
                "p_br_id": p_br_id,
                "p_splr_id": p_splr_id,
                "p_net_volqty": p_net_volqty,
                "p_in_stock": p_in_stock,
                "p_rol": p_rol,
                "p_pk_descr": p_pk_descr,
                "p_cont_id": p_cont_id,
                "p_ut_id": p_ut_id
            }
            try:
                db = bucket.rpc("add_new_item_wrapper", params).execute()
                print("Database operation successful:", db.data)
            except Exception as e:
                print(f"Database operation failed: {e}")
        else:
            print("File upload failed.")
    except Exception as e:
        print(f"Operation failed: {e}")
"""



def add_new_item(
    p_item_name: str,
    p_item_descr: str,
    p_scat_id: int,
    p_br_id: int,
    p_splr_id: int,
    p_net_volqty: float,
    p_in_stock: int,
    p_rol: int,
    p_pk_descr: str,
    p_cont_id: int,
    p_ut_id: int,
    uploaded_image: str = None
):
    try:
        # Create Supabase client
        new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"
        new_key = "your_service_role_key"  # You should securely fetch this key
        bucket = create_client(new_url, new_key).storage

        if uploaded_image:
            # Handle file upload to Supabase
            file_name = os.path.basename(uploaded_image)
            mime_type, _ = mimetypes.guess_type(uploaded_image)

            if not mime_type:
                return {"success": False, "message": "Unable to determine MIME type of file."}

            with open(uploaded_image, "rb") as file:
                upload_response = bucket.from_("item").upload(file_name, file, {"content-type": mime_type})

            if upload_response:
                # Item data and image file name ready to be added to the database
                item_data = {
                    "p_item_name": p_item_name,
                    "p_item_descr": p_item_descr,
                    "p_image": file_name,
                    "p_scat_id": p_scat_id,
                    "p_br_id": p_br_id,
                    "p_splr_id": p_splr_id,
                    "p_net_volqty": p_net_volqty,
                    "p_in_stock": p_in_stock,
                    "p_rol": p_rol,
                    "p_pk_descr": p_pk_descr,
                    "p_cont_id": p_cont_id,
                    "p_ut_id": p_ut_id
                }

                # Call to Supabase function to add item data
                response = supabase.rpc("add_new_item_wrapper", item_data).execute()

                # Check for errors in the RPC response
               
            return {"da": True, "ywa ka": response.data}

            
        else:
            return {"success": False, "message": "No image uploaded."}
    except Exception as e:
        return {"das": False, "df": str(e)}





def add_new_item_v3(
    p_item_name: str,
    p_item_descr: str,
    p_scat_id: int,
    p_br_id: int,
    p_splr_id: int,
    p_net_volqty: float,
    p_in_stock: int,
    p_rol: int,
    p_pk_descr: str,
    p_cont_id: int,
    p_ut_id: int
):
  try:
    print("Connecting to database...")
    print("Adding new item...")
    params = {
      "p_item_name": p_item_name,
      "p_item_descr": p_item_descr,
      "p_image": None,
      "p_scat_id": p_scat_id,
      "p_br_id": p_br_id,
      "p_splr_id": p_splr_id,
      "p_net_volqty": p_net_volqty,
      "p_in_stock": p_in_stock,
      "p_rol": p_rol,
      "p_pk_descr": p_pk_descr,
      "p_cont_id": p_cont_id,
      "p_ut_id": p_ut_id
    }
    db = supabase.rpc("add_new_item_wrapper", params).execute()
    print("Response Data:", db.data)
    # return db.data
    return str(db.data)

  except Exception as e:
    # print(f"Database operation failed: {e}")
    return {"success": False, "error": f"An error occurred: {str(e)}"}
    print(f"Error occurred: {str(e)}")










def add_defective_items(defectives):
    try:
        # Ensure defectives is a valid, non-empty list
        if not isinstance(defectives, list) or len(defectives) == 0:
            print("Invalid input: defectives should be a non-empty list.")
            return False
        
        # Prepare the data for the function call to Supabase
        function_params = {
            "items": defectives  # Supabase will automatically serialize it to JSONB
        }

        # Call the Supabase function
        print("Adding defective items...")
        response = supabase.rpc("add_defective_items_wrapper", function_params).execute()

        # Print the response data directly
        print("Response data:", response.data)

        return response.data

    except Exception as e:
        # Catch any exception and print the error message
        print(f"Exception occurred: {str(e)}")
        return False


"""
def add_defective_items(defectives):
    try:
        # Ensure defectives is a valid list
        if not isinstance(defectives, list) or len(defectives) == 0:
            print("Invalid input: defectives should be a non-empty list.")
            return False
        
        # Prepare the data for the function call
        function_params = {
            "items": defectives  # Supabase will automatically serialize it to JSONB
        }

        # Call the Supabase function
        print("Adding defective items...")
        response = supabase.rpc("add_defective_items_wrapper", function_params).execute()

        return response.data



#comment
        # Check if the response contains the expected data
        if response.data:
            print("Defective items added successfully:", response.data)
            return True  # Return True if successful
        else:
            print("Failed to add defective items. Response data:", response.data)
            return False  # Return False if no data is returned or the function failed
#
    except Exception as e:
        # Catch any exception and log the error message
        print(f"Exception occurred: {str(e)}")
        return False  # Return False if an exception occurs
"""

""" old
def add_defective_items(defectives):
    try:
        # Convert the list of dictionaries into a JSON string
        function_params = {
            "items": defectives  # Supabase will automatically serialize it to JSONB
        }

        # Call the Supabase function
        print("Adding defective items...")
        response = supabase.rpc("add_defective_items_wrapper", function_params).execute()

        if response.data:
            print("Defective items added successfully:", response.data)
            return True  # Return True if successful
        else:
            print("Failed to add defective items. Response data:", response.data)
            return False  # Return False if failed

    except Exception as e:
        print("Exception occurred:", str(e))
        return False  # Return False if an exception occurs
"""

def mark_defect_as_returned(defect_item_id: int, p_status: bool):
    try:
        # Define the function parameters as a dictionary
        function_params = {
            "p_item_id": defect_item_id,  # Pass the defect item ID,
            "status": p_status  # Pass the defect item ID
        }

        # Call the Supabase RPC function to mark the defect as returned
        print("Marking defective item as returned...")
        response = supabase.rpc("mark_defect_as_returned_wrapper", function_params).execute()

        # Check if the response contains data and return a success message
        return {"success": True, "message": response.data}

    except Exception as e:
        # Handle any errors that occur during the RPC call
        print(f"Exception occurred: {str(e)}")
        return {"success": False, "error": f"An error occurred: {str(e)}"}

        

def update_stock(item_id: int, new_stock: int):
    try:
        # Prepare parameters for the RPC call
        function_params = {
            "p_item_id": item_id,
            "new_stock": new_stock
        }

        # Execute the RPC function in Supabase to update stock
        print("Updating stock...")  # Optional logging for debug purposes
        response = supabase.rpc("update_stock_wrapper", function_params).execute()

        # Check if the response contains data
        if response.data:
            return {"success": True, "message": "Stock updated successfully.", "data": response.data}
        else:
            return {"success": False, "message": "Failed to update stock."}

    except Exception as e:
        # Log any exceptions that occur and return an error message
        print(f"Error updating stock: {str(e)}")  # Optional logging for debugging
        return {"success": False, "error": f"An error occurred: {str(e)}"}

"""
def update_stock(item_id: int, new_stock: int):
    try:
        # Prepare parameters for the RPC call
        function_params = {
            "p_item_id": item_id,
            "new_stock": new_stock
        }

        # Execute the RPC function in Supabase to update stock
        print("Updating stock...")
        response = supabase.rpc("update_stock_wrapper", function_params).execute()

        # Check if the response contains data
        if response.data:
            return {"success": True, "message": "Stock updated successfully.", "data": response.data}
        else:
            return {"success": False, "message": "Failed to update stock."}

    except Exception as e:
        # Log any exceptions that occur and return an error message
        return {"success": False, "error": f"An error occurred: {str(e)}"}
"""


def update_defect_qty(defect_item_id: int, new_qty: int):
    try:
        # Prepare parameters for the RPC call
        function_params = {
            "p_item_id": defect_item_id,
            "new_qty": new_qty
        }

        # Execute the RPC function in Supabase to update defect quantity
        print("Updating defective item quantity...")
        response = supabase.rpc("update_defect_qty_wrapper", function_params).execute()

        # Check if the response contains data
        if response.data:
            return {"success": True, "message": "Defective item quantity updated successfully.", "data": response.data}
        else:
            return {"success": False, "message": "Failed to update defective item quantity."}

    except Exception as e:
        # Log any exceptions that occur and return an error message
        return {"success": False, "error": f"An error occurred: {str(e)}"}



"""
def add_new_item_v2(
    p_item_name: str,
    p_item_descr: str,
    p_scat_id: int,
    p_br_id: int,
    p_splr_id: int,
    p_net_volqty: float,
    p_in_stock: int,
    p_rol: int,
    p_pk_descr: str,
    p_cont_id: int,
    p_ut_id: int
):
    try:
        # Initialize Supabase client with service role key
        bucket: Client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

        # Define the directory containing the image
        image_dir = "temporary_storage"
        allowed_extensions = {".jpg", ".jpeg", ".png"}  # Allowed file types

        # Search for an image in the directory
        image_files = [
            f for f in os.listdir(image_dir)
            if os.path.splitext(f)[1].lower() in allowed_extensions
        ]

        if not image_files:
            print("No valid image file found in the directory. Exiting.")
            return

        # Use the first valid image file
        original_image_name = image_files[0]
        original_file_path = os.path.join(image_dir, original_image_name)

        # Generate a unique name for the image
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = os.path.splitext(original_image_name)[1]
        unique_image_name = f"{p_item_name}_{timestamp}{file_extension}"
        unique_file_path = os.path.join(image_dir, unique_image_name)

        # Rename the file
        os.rename(original_file_path, unique_file_path)
        print(f"Renamed file to: {unique_image_name}")

        # Determine the MIME type of the file
        mime_type, _ = mimetypes.guess_type(unique_file_path)
        if not mime_type:
            print("Unable to determine the MIME type. Exiting.")
            return
        if mime_type == "image/gif":
            print("GIF images are not supported. Exiting.")
            return
        print(f"Detected MIME type: {mime_type}")

        # Upload the file to the Supabase storage
        with open(unique_file_path, "rb") as file:
            upload_response = bucket.storage.from_("item").upload(
                unique_image_name,
                file,
                {"content-type": mime_type}  # Explicitly set the MIME type
            )

        if upload_response:
            print("File uploaded successfully.")
            # Now, insert the new item into the database
            params = {
                "p_item_name": p_item_name,
                "p_item_descr": p_item_descr,
                "p_image": unique_image_name,
                "p_scat_id": p_scat_id,
                "p_br_id": p_br_id,
                "p_splr_id": p_splr_id,
                "p_net_volqty": p_net_volqty,
                "p_in_stock": p_in_stock,
                "p_rol": p_rol,
                "p_pk_descr": p_pk_descr,
                "p_cont_id": p_cont_id,
                "p_ut_id": p_ut_id
            }
            try:
                db = bucket.rpc("add_new_item_wrapper", params).execute()
                print("Database operation successful:", db.data)
            except Exception as e:
                print(f"Database operation failed: {e}")
        else:
            print("File upload failed.")
    except Exception as e:
        print(f"Operation failed: {e}")
"""
"""

def add_new_item_v2(p_item_name: str, p_item_descr: str, p_scat_id: int, p_br_id: int, p_splr_id: int,
                     p_net_volqty: float, p_in_stock: int, p_rol: int, p_pk_descr: str, p_cont_id: int, p_ut_id: int):
    try:
        # Prepare the function parameters for Supabase RPC call
        function_params = {
            "item_name": p_item_name,
            "item_descr": p_item_descr,
            "p_image": p_image,
            "scat_id": p_scat_id,
            "br_id": p_br_id,
            "splr_id": p_splr_id,
            "net_volqty": p_net_volqty,
            "in_stock": p_in_stock,
            "rol": p_rol,
            "pk_descr": p_pk_descr,
            "cont_id": p_cont_id,
            "ut_id": p_ut_id
        }

        # Call the Supabase function
        print("Adding new item...")  # Replaced logging with print statement
        response = supabase.rpc("add_new_item_wrapper", function_params).execute()

        # Check the response status
        if response.is_success() and response.data:
            print(f"Response data: {response.data}")  # Print response instead of logging
            return response.data
        else:
            print(f"Error: Failed to add new item. {response.error_message}")  # Print error message
            return False

    except Exception as e:
        print(f"Exception occurred: {str(e)}")  # Print exception details
        return False
"""