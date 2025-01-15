import base64
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

def get_stocks_for_po():
    try:
        print("Fetching stocks for PO...") 
        # Fetch stock data from Supabase RPC
        response = supabase.rpc("get_stocks").execute()

        if response.data:
            stock_with_images = []

            # Loop through each stock data item
            for stock_item in response.data:
                stock_image = stock_item.get("image")  # Assuming 'image' field contains the filename
                
                # If there's an image, fetch it from the bucket
                if stock_image:
                    print(f"Fetching image: {stock_image}")
                    
                    # Retrieve service role key from Supabase
                    image_response = supabase.rpc("service_role").execute()

                    if image_response.data: 
                        new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  
                        new_key = image_response.data["service_role_key"]  
                        bucket = create_client(new_url, new_key)

                        # Fetch the image from the 'item' bucket
                        print(f"Fetching file from bucket: item/{stock_image}")
                        download_response = bucket.storage.from_("item").download(stock_image)
                        
                        if download_response and isinstance(download_response, bytes):
                            print(f"Image {stock_image} retrieved successfully.")
                            # Convert the image to a base64 string
                            encoded_image = base64.b64encode(download_response).decode("utf-8")
                            # Attach the base64-encoded image string to the stock item
                            stock_item["image_data"] = encoded_image
                        else:
                            print(f"Failed to retrieve image {stock_image}")
                            stock_item["image_data"] = None  # Indicate no image found or error
                    else:
                        print(f"Failed to retrieve service role key for image {stock_image}")
                        stock_item["image_data"] = None
                else:
                    print(f"No image found for stock item: {stock_item.get('Item name')}")
                    stock_item["image_data"] = None  # If no image field is present

                stock_with_images.append(stock_item)  # Add stock item with image data

            print("Stocks for PO fetched successfully with images.")
            return {"success": True, "data": stock_with_images}
        else:
            print("No stocks found.")
            return {"success": False, "message": "No stocks available."}

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
            f'rm/{file_name1}',
            receiving_memo.read(),
            {"content-type": mime_type1}
        )

        # Process and upload Delivery Receipt
        file_name2 = delivery_receipt.name
        mime_type2 = mimetypes.guess_type(file_name2)[0]

        if not mime_type2:
            return {"success": False, "message": "Unable to determine MIME type for the delivery receipt file."}

        bucket.storage.from_("purchasing").upload(
            f'dr/{file_name2}',
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
        # Retrieve service role key from Supabase
        response = supabase.rpc("service_role").execute()

        if response.data:
            print("Connecting to Supabase...")
            # Initialize Supabase client with service role key
            new_url = "https://hdlyxlxptyiblqssufxu.supabase.co"  # Supabase URL
            new_key = response.data["service_role_key"]  # Supabase API key
            bucket = create_client(new_url, new_key)

            # Fetch the image from the bucket
            print(f"Fetching file from bucket: dr/{file_name}")
            download_response = bucket.storage.from_("purchasing").download(f"dr/{file_name}")
            if download_response:
                print("File download response type:", type(download_response))
                if isinstance(download_response, bytes):
                    print("File retrieved successfully.")
                    return {"success": True, "file": io.BytesIO(download_response)}
            print("File not found or unexpected response:", download_response)
            return {"success": False, "message": "File not found or unexpected response."}
        else:
            return {"success": False, "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}
    
def get_receiving_memo_image(file_name: str):
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
            print(f"Fetching file from bucket: rm/{file_name}")
            download_response = bucket.storage.from_("purchasing").download(f"rm/{file_name}")
            if download_response:
                print("File download response type:", type(download_response))
                if isinstance(download_response, bytes):
                    print("File retrieved successfully.")
                    return {"success": True, "file": io.BytesIO(download_response)}
            print("File not found or unexpected response:", download_response)
            return {"success": False, "message": "File not found or unexpected response."}
        else:
            return {"success": False, "message": "Failed to retrieve service role key."}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"success": False, "message": str(e)}
 