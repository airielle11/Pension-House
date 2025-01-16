from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .services import get_stocks, get_defective_items, get_categories, get_brands, get_suppliers, get_containers, get_units, add_new_item, add_defective_items, mark_defect_as_returned, update_stock, update_defect_qty, add_new_item_v3
 # Commented out other unused imports for now
# from .services import (
#     get_categories,
#     get_brands,
#     get_suppliers,
#     get_containers,
#     get_units,
#     add_new_item,
#     add_defective_items,
#     mark_defect_as_returned,
#     update_stock,
#     update_defect_qty
# )
from django.http import HttpResponse

from django.conf import settings
import os




@csrf_exempt
def get_stocks_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get stocks
            result = get_stocks()  # Fetch the stock data
            
            if result:  # Check if the result is not empty
                return JsonResponse({"stocks": result}, status=200)
            else:
                return JsonResponse({"error": "No stocks found."}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

    
""" old
@csrf_exempt
def get_stocks_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get stocks
            result = get_stocks()  # Make sure the function is called
            
            if result["success"]:
                return JsonResponse({"stocks": result["stocks"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No stocks found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

             # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
"""




@csrf_exempt
def get_defective_items_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get defective items
            result = get_defective_items()  # Call the get_defective_items function
            
            if result["success"]:
                return JsonResponse({"defective_items": result["defective_items"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No defective items found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def get_categories_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get categories
            result = get_categories()  # Call the get_categories function
            
            if result["success"]:
                return JsonResponse({"categories": result["categories"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No categories found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)



@csrf_exempt
def get_brands_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get brands
            result = get_brands()  # Call the get_brands function
            
            if result["success"]:
                return JsonResponse({"brands": result["brands"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No brands found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)



@csrf_exempt
def get_suppliers_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get suppliers
            result = get_suppliers()  # Call the get_suppliers function
            
            if result["success"]:
                return JsonResponse({"suppliers": result["suppliers"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No suppliers found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def get_containers_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get containers
            result = get_containers()  # Call the get_containers function
            
            if result["success"]:
                return JsonResponse({"containers": result["containers"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No containers found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def get_units_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get units
            result = get_units()  # Call the get_units function
            
            if result["success"]:
                return JsonResponse({"units": result["units"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No units found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)






# Folder where the images will be stored temporarily inside the 'inventory' folder
ITEMS_IMAGES_FOLDER = os.path.join(settings.BASE_DIR, 'inventory/itemsImages')
print(f"Items images folder: {ITEMS_IMAGES_FOLDER}")

# Ensure the folder exists
os.makedirs(ITEMS_IMAGES_FOLDER, exist_ok=True)

@csrf_exempt
def add_new_item_view(request):
    if request.method == "POST":
        # Extract data from the form submission
        try:
            item_name = request.POST.get('item_name')
            item_descr = request.POST.get('item_descr')
            scat_id = request.POST.get('scat_id')
            br_id = request.POST.get('br_id')
            splr_id = request.POST.get('splr_id')
            net_volqty = request.POST.get('net_volqty')
            in_stock = request.POST.get('in_stock')
            rol = request.POST.get('rol')
            pk_descr = request.POST.get('pk_descr')
            cont_id = request.POST.get('cont_id')
            ut_id = request.POST.get('ut_id')

            # Handle the uploaded image (if present)
            image = request.FILES.get('image')  # The image file from the form
            uploaded_image = None

            if image:
                # Define the path where the image will be saved
                image_name = image.name
                uploaded_image = os.path.join(ITEMS_IMAGES_FOLDER, image_name)

                # Save the uploaded image to the folder
                with open(uploaded_image, 'wb') as f:
                    for chunk in image.chunks():
                        f.write(chunk)
                print(f"Image uploaded successfully: {image_name}")

            # You can now proceed to call your service to add the item
            response = add_new_item(
                p_item_name=item_name,
                p_item_descr=item_descr,
                p_scat_id=scat_id,
                p_br_id=br_id,
                p_splr_id=splr_id,
                p_net_volqty=net_volqty,
                p_in_stock=in_stock,
                p_rol=rol,
                p_pk_descr=pk_descr,
                p_cont_id=cont_id,
                p_ut_id=ut_id,
                uploaded_image=uploaded_image if uploaded_image else None
            )

            if response["success"]:
                print("Item added successfully")
                return JsonResponse({"success": True, "message": "Item added successfully."})
            else:
                print(f"Error adding item: {response.get('message', 'Unknown error')}")
                return JsonResponse({"success": False, "message": response.get("message", "Error adding item.")})

        except Exception as e:
            print(f"Error dfs request: {str(e)}")
            return JsonResponse({"success": False, "message": f"Error: {str(e)}"})
    else:
        print("Invalid request method. Only POST is allowed.")
        return JsonResponse({"success": False, "message": "Invalid request method."})



"""
@csrf_exempt
def add_new_item_view(request):
    if request.method == "POST":
        try:
            # Ensure the request body isn't empty
            if not request.body:
                return JsonResponse({"error": "Request body is empty."}, status=400)
            
            # Parse the JSON body
            data = json.loads(request.body)
            
            # Check if the required fields are provided in the data
            required_fields = [
                'item_name', 'item_descr', 'image', 'scat_id', 'br_id', 'splr_id',
                'emp_id', 'net_volqty', 'in_stock', 'rol', 'pk_descr', 'cont_id', 'ut_id'
            ]
            
            # Check for missing fields
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({"error": f"Missing required fields: {', '.join(missing_fields)}"}, status=400)

            # Retrieve data from the request
            p_item_name = data.get('item_name', '')
            p_item_descr = data.get('item_descr', '')
            p_image = data.get('image', '')
            p_scat_id = data.get('scat_id', 0)
            p_br_id = data.get('br_id', 0)
            p_splr_id = data.get('splr_id', 0)
            p_emp_id = data.get('emp_id', 0)
            p_net_volqty = data.get('net_volqty', 0.0)
            p_in_stock = data.get('in_stock', 0)
            p_rol = data.get('rol', 0)
            p_pk_descr = data.get('pk_descr', '')
            p_cont_id = data.get('cont_id', 0)
            p_ut_id = data.get('ut_id', 0)

            # Call the add_new_item function (passing the necessary parameters)
            result = add_new_item(
                p_item_name=p_item_name,
                p_item_descr=p_item_descr,
                p_image=p_image,
                p_scat_id=p_scat_id,
                p_br_id=p_br_id,
                p_splr_id=p_splr_id,
                p_emp_id=p_emp_id,
                p_net_volqty=p_net_volqty,
                p_in_stock=p_in_stock,
                p_rol=p_rol,
                p_pk_descr=p_pk_descr,
                p_cont_id=p_cont_id,
                p_ut_id=p_ut_id
            )
            
            # If the result was successful, return a success response
            if result:
                return JsonResponse({"message": "Item added successfully!"}, status=200)
            else:
                return JsonResponse({"error": "Failed to add item."}, status=400)
        
        except json.JSONDecodeError:
            # Handle invalid JSON in the request
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            # Handle unexpected errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    else:
        # If the request is not POST, return an error
        return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)
"""



@csrf_exempt
def add_defective_items_view(request):
    if request.method == "POST":
        try:
            # Check if the request body is empty or malformed
            if not request.body:
                return JsonResponse({"error": "Request body is empty."}, status=400)
            
            # Attempt to parse the JSON body
            try:
                defectives = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON format."}, status=400)
            
            # Check if the list is not empty
            if len(defectives) == 0:
                return JsonResponse({"error": "Defective items list cannot be empty."}, status=400)
            
            # Call the service function to process the defective items
            result = add_defective_items(defectives)
            

            # Return success or failure response based on the result of the function call
            if result:
                return JsonResponse({"message": result}, status=200)
               
            #else:
             #   return JsonResponse({"error": "Failed to add defective items."}, status=400)
                
        except Exception as e:
            # Generic exception handling in case something unexpected happens
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)



"""
@csrf_exempt
def add_defective_items_view(request):
    if request.method == "POST":
        try:
            # Check if the request body is empty or malformed
            if not request.body:
                return JsonResponse({"error": "Request body is empty."}, status=400)
            
            # Attempt to parse the JSON body
            try:
                defectives = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON format."}, status=400)
            
            # Validate if defectives is a list
            if not isinstance(defectives, list):
                return JsonResponse({"error": "Defective items should be a list."}, status=400)
            
            # Check if the list is not empty
            if len(defectives) == 0:
                return JsonResponse({"error": "Defective items list cannot be empty."}, status=400)
            
            # Call the service function to process the defective items
            result = add_defective_items(defectives)
            
            # Return success or failure response based on the result of the function call
            if result:
                return JsonResponse({"message": "Defective items added successfully!"}, status=200)
            else:
                return JsonResponse({"error": "Failed to add defective items."}, status=400)
        
        except Exception as e:
            # Generic exception handling in case something unexpected happens
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)
"""
    
""" old
@csrf_exempt
def add_defective_items_view(request):
    if request.method == "POST":
        try:
            # Check if the request body is not empty
            if not request.body:
                return JsonResponse({"error": "Request body is empty."}, status=400)

            # Parse the JSON body
            defectives = json.loads(request.body)
            
            # Validate if the defectives list is provided
            if not isinstance(defectives, list):
                return JsonResponse({"error": "Defective items should be a list."}, status=400)

            # Call the add_defective_items function from services.py
            result = add_defective_items(defectives)
            
            if result:
                return JsonResponse({"message": "Defective items added successfully!"}, status=200)
            else:
                return JsonResponse({"error": "Failed to add defective items."}, status=400)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)
"""


@csrf_exempt
def mark_defect_as_returned_replaced_view(request):
    if request.method == "POST":
        try:
            # Extract item ID from the request body
            data = json.loads(request.body)
            defect_item_id = data.get("defect_item_id")

            if not defect_item_id:
                return JsonResponse({"error": "Defect item ID is required."}, status=400)

            # Call the service function to mark the defect as returned
            result = mark_defect_as_returned(defect_item_id, True)

            # Return the appropriate response based on the result
            if result["success"]:
                return JsonResponse({"success": True, "message": result["message"]}, status=200)

        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


@csrf_exempt
def mark_defect_as_returned_refunded_view(request):
    if request.method == "POST":
        try:
            # Extract item ID from the request body
            data = json.loads(request.body)
            defect_item_id = data.get("defect_item_id")

            if not defect_item_id:
                return JsonResponse({"error": "Defect item ID is required."}, status=400)

            # Call the service function to mark the defect as returned
            result = mark_defect_as_returned(defect_item_id, False)

            # Return the appropriate response based on the result
            if result["success"]:
                return JsonResponse({"success wh": True, "message": result["message"]}, status=200)

        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


@csrf_exempt
def update_stock_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming request body (ensure it's JSON formatted)
            data = json.loads(request.body)

            # Extract parameters from the request body
            item_id = data.get("item_id")
            new_stock = data.get("new_stock")

            # Validate input
            if item_id is None or new_stock is None:
                return JsonResponse({"error": "Item ID and new stock quantity are required."}, status=400)

            # Call the service function to update stock
            result = update_stock(item_id, new_stock)

            # Return appropriate response based on the result
            if result["success"]:
                return JsonResponse({"message": result["message"], "data": result["data"]}, status=200)
            else:
                # Check if there's a specific error message in the result
                error_message = result.get("error", "Failed to update stock.")
                return JsonResponse({"error": error_message}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            # Log the exception and return a generic error message
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)


    
"""
@csrf_exempt
def update_stock_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming request body (ensure it's JSON formatted)
            data = json.loads(request.body)

            # Extract parameters from the request body
            item_id = data.get("item_id")
            new_stock = data.get("new_stock")

            # Validate input
            if item_id is None or new_stock is None:
                return JsonResponse({"error": "Item ID and new stock quantity are required."}, status=400)

            # Call the service function to update stock
            result = update_stock(item_id, new_stock)

            # Return appropriate response based on the result
            if result["success"]:
                return JsonResponse({"message": result["message"], "data": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result["message"]}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)
"""

@csrf_exempt
def update_defect_qty_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming request body (ensure it's in JSON format)
            data = json.loads(request.body)

            # Extract parameters from the request body
            defect_item_id = data.get("defect_item_id")
            new_qty = data.get("new_qty")

            # Validate input
            if defect_item_id is None or new_qty is None:
                return JsonResponse({"error": "Defective item ID and new quantity are required."}, status=400)

            # Call the service function to update defect quantity
            result = update_defect_qty(defect_item_id, new_qty)

            # Return appropriate response based on the result
            if result["success"]:
                return JsonResponse({"message": result["message"], "data": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result["message"]}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)


"""
@csrf_exempt
def add_new_item2(request):
    
    View to handle adding a new item using the add_new_item_v2 function.
    Expects a POST request with item details.
    
    if request.method == "POST":
        try:
            # Ensure the request content type is JSON
            if request.content_type != 'application/json':
                return JsonResponse({"error": "Content-Type must be application/json"}, status=400)

            # Extract data from the incoming JSON request
            data = json.loads(request.body)

            # Extract the fields
            p_item_name = data.get("item_name")
            p_item_descr = data.get("item_descr")
            p_image = data.get("item_image")
            p_scat_id = data.get("scat_id")
            p_br_id = data.get("br_id")
            p_splr_id = data.get("splr_id")
            p_net_volqty = data.get("net_volqty")
            p_in_stock = data.get("in_stock")
            p_rol = data.get("rol")
            p_pk_descr = data.get("pk_descr")
            p_cont_id = data.get("cont_id")
            p_ut_id = data.get("ut_id")

            # Check if all required fields are provided
            missing_fields = [field for field in ["item_name", "item_descr", "scat_id", "br_id", "splr_id",
                                                  "net_volqty", "in_stock", "rol", "pk_descr", "cont_id", "ut_id"]
                              if not data.get(field)]
            if missing_fields:
                return JsonResponse({"error": f"Missing required fields: {', '.join(missing_fields)}"}, status=400)

            # Call the service function to add the new item
            response_data = add_new_item_v2(
                p_item_name, p_item_descr, p_scat_id, p_br_id, p_splr_id, p_net_volqty,
                p_in_stock, p_rol, p_pk_descr, p_cont_id, p_ut_id
            )

            # Return appropriate response based on the result
            if response_data:
                return JsonResponse({"success": True, "data": response_data}, status=201)
            else:
                return JsonResponse({"error": response_data}, status=500)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            # Handle any other errors during the request
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed."}, status=405)
"""




@csrf_exempt
def add_new_item_view3(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)

            # Print the incoming data to the terminal (console/log)
            print("Received POST data:", data)

            # Extract fields from the parsed JSON data
            p_item_name = data.get('p_item_name')
            p_item_descr = data.get('p_item_descr')
            p_scat_id = data.get('p_scat_id')
            p_br_id = data.get('p_br_id')
            p_splr_id = data.get('p_splr_id')
            p_net_volqty = data.get('p_net_volqty')
            p_in_stock = data.get('p_in_stock')
            p_rol = data.get('p_rol')
            p_pk_descr = data.get('p_pk_descr')
            p_cont_id = data.get('p_cont_id')
            p_ut_id = data.get('p_ut_id')

            # Ensure required fields are provided and are not None
            if not all([p_item_name, p_item_descr, p_scat_id, p_br_id, p_splr_id, p_net_volqty, p_in_stock, p_rol, p_pk_descr, p_cont_id, p_ut_id]):
                return JsonResponse({"success": False, "error": "Missing required fields", "data": data})

            # Convert values to the correct types, adding error handling for invalid conversions
            try:
                p_scat_id = int(p_scat_id)
                p_br_id = int(p_br_id)
                p_splr_id = int(p_splr_id)
                p_net_volqty = float(p_net_volqty)
                p_in_stock = int(p_in_stock)
                p_rol = int(p_rol)
                p_cont_id = int(p_cont_id)
                p_ut_id = int(p_ut_id)
            except ValueError as e:
                return JsonResponse({"success": False, "error": f"Invalid data type: {str(e)}", "data": data})

            # Call your service function
            result = add_new_item_v3(
                p_item_name, p_item_descr, p_scat_id, p_br_id, p_splr_id,
                p_net_volqty, p_in_stock, p_rol, p_pk_descr, p_cont_id, p_ut_id
            )
            
            # Ensure the result contains a success key
            return JsonResponse({
                "success": True,
                "message": result
            })

            """
            # Return the response as JSON
            return JsonResponse(result)
            """
        except Exception as e:
            # Catch all exceptions and print detailed error info
            return JsonResponse({"success": False, "error": f"An unexpected error occurred: {str(e)}", "data": data})
    
    
    else:
        # If the method is not POST, return a bad request response
        return JsonResponse({"success": False, "error": "Invalid request method, only POST allowed."})
