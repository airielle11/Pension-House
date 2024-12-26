
from gotrue.errors import AuthApiError
import tkinter as tk
from tkinter import filedialog
import mimetypes

from supabase_client import supabase


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
            return {"success": False, "message": "No stocks found"}

    except Exception as e:
       # print(f"An error occurred: {e}")
        #return []  # Return an empty list if an error occurs

        return {"success": False, "error": f"An error occurred: {str(e)}"}











"""

def get_defective_items():
  try:
    response = supabase.rpc("get_defective_items").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Image:", column.get("image", "N/A"))
        print("Item name:", column.get("Item name", "N/A"))
        print("SKU:", column.get("sku", "N/A"))
        print("Category:", column.get("Category", "N/A"))
        print("Brand:", column.get("brand", "N/A"))
        print("Added by:", column.get("Added by", "N/A"))
        print("Net Vol/Qty.:", column.get("Net Vol/Qty.", "N/A"))
        print("Defect Quantity:", column.get("Defect Quantity", "N/A"))
        print("Supplier:", column.get("supplier", "N/A"))
        print("Status:", column.get("status", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")

def get_categories():
  try:
    response = supabase.rpc("get_categories").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Category:", column.get("category", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")


def get_brands():
  try:
    response = supabase.rpc("get_brands").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Brand:", column.get("brand", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")


def get_suppliers():
  try:
    response = supabase.rpc("get_suppliers").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Supplier:", column.get("supplier", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")


def get_containers():
  try:
    response = supabase.rpc("get_containers").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Container:", column.get("container", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")


def get_units():
  try:
    response = supabase.rpc("get_units").execute()

    if response.data:
      # Iterate through each record and print its details
      for column in response.data:
        print("ID:", column.get("id", "N/A"))
        print("Unit:", column.get("unit", "N/A"))
        print("-" * 50)  # Separator between
    else:
      print("No active employees found.")
  except Exception as e:
    print(f"An error occurred: {e}")




def add_new_item(
  p_item_name: str,
  p_item_descr: str,
  p_image: str,
  p_scat_id: int,
  p_br_id: int,
  p_splr_id: int,
  p_emp_id: int,
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

      # Create a hidden tkinter window for sample file selection
      root = tk.Tk()
      root.withdraw()

      # Ask the user to select an image file
      file_path = filedialog.askopenfilename(
        title="Select an Image to Upload",
        filetypes=[("Image Files", "*.png *.jpg *.jpeg")]
      )

      # Check if a file was selected
      if not file_path:
        print("No file selected. Exiting.")
        return

      # Extract the file name from the path
      file_name = file_path.split("/")[-1]
      print("file name is .", file_name)

      # Determine the MIME type of the selected file
      mime_type, _ = mimetypes.guess_type(file_path)
      if not mime_type:
        print("Unable to determine the MIME type. Exiting.")
        return
      print(f"Detected MIME type: {mime_type}")

      try:
        # Open the file and upload it to the bucket
        with open(file_path, "rb") as file:
          upload_response = bucket.storage.from_("item").upload(
            file_name,
            file,
            {"content-type": mime_type}  # Explicitly set the MIME type
          )
        if upload_response:
          print("Connecting to database..")
          try:
            print("Adding new item...")
            params = {
              "p_item_name" : p_item_name,
              "p_item_descr": p_item_descr,
              "p_image": p_image,
              "p_scat_id" : p_scat_id,
              "p_br_id" : p_br_id,
              "p_splr_id" : p_splr_id,
              "p_emp_id" : p_emp_id,
              "p_net_volqty" : p_net_volqty,
              "p_in_stock" : p_in_stock,
              "p_rol": p_rol,
              "p_pk_descr" : p_pk_descr,
              "p_cont_id" : p_cont_id,
              "p_ut_id" : p_ut_id}
            db = supabase.rpc("add_new_item_wrapper", params).execute()

            print(db.data)
          except Exception as e:
            print(e.message)
        else:
          print("File upload failed.")
      except Exception as e:
        print(e)
    else:
      print("Failed to retrieve service role key.")
  except Exception as e:
    print(f"Failed. {e}")


def add_defective_items(defectives):

  try:
    # Convert the list of dictionaries into a JSON string
    function_params = {
      "items": defectives  # Pass the list directly; Supabase will serialize it to JSONB
    }

    # Call the Supabase function
    print("Marking defective item as returned...")
    response = supabase.rpc("add_defective_items_wrapper", function_params).execute()

    print(response.data)
  except Exception as e:
    print("Exception occurred:", str(e))


def mark_defect_as_returned(defect_item_id: int):

  try:
    # Convert the list of dictionaries into a JSON string
    function_params = {
      "p_item_id": defect_item_id  # Pass the list directly; Supabase will serialize it to JSONB
    }

    # Call the Supabase function
    print("Adding defective items...")
    response = supabase.rpc("mark_defect_as_returned_wrapper", function_params).execute()

    print(response.data)
  except Exception as e:
    print("Exception occurred:", str(e))


def update_stock(item_id: int, new_stock: int):

  try:
    # Convert the list of dictionaries into a JSON string
    function_params = {
      "p_item_id": item_id,  # Pass the list directly; Supabase will serialize it to JSONB
      "new_stock": new_stock
    }

    # Call the Supabase function
    print("Updating stock...")
    response = supabase.rpc("update_stock_wrapper", function_params).execute()

    print(response.data)
  except Exception as e:
    print("Exception occurred:", str(e))


def update_defect_qty(defect_item_id: int, new_qty: int):

  try:
    # Convert the list of dictionaries into a JSON string
    function_params = {
      "p_item_id": defect_item_id,  # Pass the list directly; Supabase will serialize it to JSONB
      "new_qty": new_qty
    }

    # Call the Supabase function
    print("Updating stock...")
    response = supabase.rpc("update_defect_qty_wrapper", function_params).execute()

    print(response.data)
  except Exception as e:
    print("Exception occurred:", str(e))

"""

# add_new_item(
#     p_item_name="Lay's Chips",
#     p_item_descr="nack pack for guests, available in various flavors",
#     p_image="image.png",
#     p_scat_id=20,
#     p_br_id=10, # lay's brand
#     p_splr_id=8,
#     p_emp_id=49,
#     p_net_volqty=28.3,
#     p_in_stock=100,
#     p_rol=20,
#     p_pk_descr="snack bag",
#     p_cont_id=12,
#     p_ut_id=2
# )


# get_stocks()
# get_categories()
# get_brands()
# get_suppliers()
# get_containers()
# get_units()



# Example usage
# defective_items = [
#   {"item_id": 14, "qty": 5},
# ]
# add_defective_items(defective_items)

# get_defective_items()
# mark_defect_as_returned(2)
# update_defect_qty(2, 6)



# update_stock(14,90)



