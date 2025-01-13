import io
import logging
import mimetypes

from supabase import Client, create_client
from supabase_client import supabase 


def create_purchase_order(items: list):
    try:
        function_params = {
            "items": items
        }
        
        print("Creating purchase order...")
        response = supabase.rpc("create_purchase_order_wrapper", function_params).execute()
        
        if response.data:
            print("Purchase order created successfully:", response.data)
            return {"success": True, "data": response.data}
        else:
            print("Purchase order creation failed.")
            return {"success": False, "message": "Unable to create purchase order."}
    except Exception as e:
        print("Exception occurred:", str(e))
        return {"success": False, "message": f"RPC Error: {str(e)}"}

def get_purchase_orders():
    try:
        print("Fetching purchase orders...")
        response = supabase.rpc("get_purchase_orders").execute()

        if response.data:
            print("Purchase orders fetched successfully:", response.data)
            return {"success": True, "data": response.data}
        else:
            print("No purchase orders found.")
            return {"success": False, "message": "No purchase orders found."}
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return {"success": False, "message": f"RPC Error: {str(e)}"}

def get_purchase_items(purchase_order_id: int):
    try:
        print("Fetching purchase items...") 
        params = {
            "p_po_id": purchase_order_id 
        }
        response = supabase.rpc("get_purchase_items", params).execute()

        if response.data:
            print("Purchase items fetched successfully:", response.data)
            return {"success": True, "data": response.data}
        else:
            print("No purchase items found.")
            return {"success": False, "message": "No purchase items found."}
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return {"success": False, "message": f"RPC Error: {str(e)}"}

def mark_po_as_completed(purchase_order_id: int, receiving_memo, delivery_receipt):
    try:
        # Fetch service role key
        response = supabase.rpc("service_role").execute()

        if not response.data:
            return {"success": False, "message": "Failed to retrieve service role key."}

        # Initialize Supabase client
        new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"
        new_key = response.data["service_role_key"]
        bucket = create_client(new_url, new_key)

        # Process and upload Receiving Memo
        file_name1 = receiving_memo.name
        mime_type1 = mimetypes.guess_type(file_name1)[0]

        if not mime_type1:
            return {"success": False, "message": "Unable to determine MIME type for the receiving memo file."}

        # Use receiving_memo.read() to get binary data
        bucket.storage.from_("purchasing").upload(
            f'popq/{file_name1}',
            receiving_memo.read(),
            {"content-type": mime_type1}
        )

        # Process and upload Delivery Receipt
        file_name2 = delivery_receipt.name
        mime_type2 = mimetypes.guess_type(file_name2)[0]

        if not mime_type2:
            return {"success": False, "message": "Unable to determine MIME type for the delivery receipt file."}

        bucket.storage.from_("purchasing").upload(
            f'popq/{file_name2}',
            delivery_receipt.read(),
            {"content-type": mime_type2}
        )

        # Update the database with file names
        params = {
            "p_po_id": purchase_order_id,
            "p_rm_image": file_name1,
            "p_dr_image": file_name2
        }
        db_response = supabase.rpc("mark_po_as_completed_wrapper", params).execute()

        if db_response.data:
            return {"success": True, "data": db_response.data}
        else:
            return {"success": False, "message": "Database operation failed.", "error": db_response.error}

    except Exception as e:
        return {"success": False, "message": "An error occurred during the operation.", "error": str(e)}

import mimetypes

def upload_po_with_quotations(purchase_order_id: int, file_obj):
    try:
        # Retrieve service role key from the database
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            # Initialize Supabase client with service role key
            new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            new_key = response.data["service_role_key"]  # Supabase API key
            bucket = create_client(new_url, new_key)

            # Determine the MIME type of the file
            mime_type, _ = mimetypes.guess_type(file_obj.name)
            if not mime_type:
                return {"success": False, "message": "Unable to determine MIME type for the receiving memo file."}

            print(f"Uploading file: {file_obj.name} (MIME type: {mime_type})")

            # Upload the file to the bucket
            upload_response = bucket.storage.from_("purchasing").upload(
                f'popq/{file_obj.name}',
                file_obj.read(),
                {"content-type": mime_type}
            )

            if not upload_response:
                print("File upload failed.")
                return {"success": False, "message": "File upload failed."}

            print("File uploaded successfully.")

            # Call the database procedure with file names
            print("Connecting to database...")

            params = {
                "p_po_id": purchase_order_id,
                "p_image_name": file_obj.name
            }

            db_response = supabase.rpc("upload_popq_wrapper", params).execute()

            if db_response.data:
                print("Database updated successfully.")
                return {"success": True, "data": db_response.data}
            else:
                return {"success": False, "error": db_response.error}
        else:
            return {"success": False, "error": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}
    
def get_po_quotations_image(file_name: str):
    try:
        # Retrieve service role key from Supabase
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            # Initialize Supabase client with service role key
            new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            new_key = response.data["service_role_key"]  # Supabase API key
            bucket = create_client(new_url, new_key)

            # Fetch the image from the bucket
            print(f"Retrieving file: {file_name}")
            download_response = bucket.storage.from_("purchasing").download(f"popq/{file_name}")

            if download_response and isinstance(download_response, bytes):
                print("File retrieved successfully.")
                return {"success": True, "file": io.BytesIO(download_response)}
            else:
                return {"success": False, "message": "File not found or unexpected response."}
        else:
            return {"success": False, "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}
    
def get_delivery_receipt_image(file_name: str):
    try:
        print("Checking bucket...")
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            key = response.data["service_role_key"]  # Supabase API key
            supabase_client = create_client(url, key)

            print("Retrieving image...")
            response_data = supabase_client.storage.from_("purchasing").download(f"dr/{file_name}")

            if isinstance(response_data, bytes):
                print("File retrieved successfully.")
                return {"success": True, "file": io.BytesIO(response_data)}
            else:
                return {"success": False, "message": "Unexpected response type or file not found."}
        else:
            return {"success": False, "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}

# Service for fetching receiving memo image
def get_receiving_memo_image(file_name: str):
    try:
        print("Checking bucket...")
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            url = "https://hdlyxlxptyiblqssufxu.supabase.co"
            key = response.data["service_role_key"]
            supabase_client = create_client(url, key)

            print("Retrieving image...")
            response_data = supabase_client.storage.from_("purchasing").download(f"rm/{file_name}")

            if isinstance(response_data, bytes):
                print("File retrieved successfully.")
                return {"success": True, "file": io.BytesIO(response_data)}
            else:
                return {"success": False, "message": "Unexpected response type or file not found."}
        else:
            return {"success": False, "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}
     
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
        # Execute the function to retrieve the service role key
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            # Initialize Supabase client with service role key
            new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            new_key = response.data["service_role_key"]  # Supabase API key
            bucket: Client = create_client(new_url, new_key)

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

            # Generate a unique name by concatenating p_item_name and current datetime
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

            try:
                # Open the file and upload it to the bucket
                with open(unique_file_path, "rb") as file:
                    upload_response = bucket.storage.from_("item").upload(
                        unique_image_name,
                        file,
                        {"content-type": mime_type}  # Explicitly set the MIME type
                    )
                if upload_response:
                    print("Connecting to database...")
                    try:
                        print("Adding new item...")
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
                        db = supabase.rpc("add_new_item_wrapper", params).execute()

                        print(db.data)
                    except Exception as e:
                        print(f"Database operation failed: {e}")
                else:
                    print("File upload failed.")
            except Exception as e:
                print(f"Error during file upload: {e}")
        else:
            print("Failed to retrieve service role key.")
    except Exception as e:
        print(f"Operation failed: {e}")
# def upload_purchase_order_quotations(purchase_order_id: int, rm_image_path: str, dr_image_path: str):
#     try:
#         # Execute the function to retrieve the service role key
#         response = supabase.rpc("service_role").execute()

#         if response.data:
#             print("Connecting to Supabase...")
#             # Initialize Supabase client with service role key
#             new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
#             new_key = response.data["service_role_key"]  # Supabase API key
#             bucket: Client = create_client(new_url, new_key)

#             # Process and upload the Receiving Memo image
#             file_name1 = rm_image_path.split("/")[-1]
#             mime_type1, _ = mimetypes.guess_type(rm_image_path)

#             try:
#                 with open(rm_image_path, "rb") as file1:
#                     upload_response1 = bucket.storage.from_("purchasing").upload(
#                         f'popq/{file_name1}',
#                         file1,
#                         {"content-type": mime_type1}
#                     )

#                     if not upload_response1:
#                         print("First file upload failed.")
#                         return {"success": False, "message": "Failed to upload Receiving Memo image."}

#                     print("First file uploaded successfully.")

#                     # Process and upload the Delivery Receipt image
#                     file_name2 = dr_image_path.split("/")[-1]
#                     mime_type2, _ = mimetypes.guess_type(dr_image_path)

#                 with open(dr_image_path, "rb") as file2:
#                     upload_response2 = bucket.storage.from_("purchasing").upload(
#                         f'popq/{file_name2}',
#                         file2,
#                         {"content-type": mime_type2}
#                     )

#                 if not upload_response2:
#                     print("Second file upload failed.")
#                     return {"success": False, "message": "Failed to upload Delivery Receipt image."}

#                 print("Second file uploaded successfully.")

#                 # Call the database procedure with file names
#                 print("Connecting to database...")

#                 # Call the database procedure with file names
#                 params = {
#                     "p_po_id": purchase_order_id,
#                     "p_rm_image": file_name1,
#                     "p_dr_image": file_name2
#                 }

#                 db_response = supabase.rpc("mark_po_as_completed_wrapper", params).execute()
#                 print("Database response:", db_response.data)
#                 return {"success": True, "data": db_response.data}
#             except Exception as e:
#                 print(f"Error during file upload or database operation: {e}")
#         else:
#             return {"success": False, "message": "Failed to retrieve service role key."}
#     except Exception as e:
#         return {"success": False, "message": f"An error occurred: {str(e)}"}
