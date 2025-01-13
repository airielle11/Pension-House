import logging
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .services import create_purchase_order, get_purchase_orders, get_purchase_items, mark_po_as_completed, upload_po_with_quotations, get_po_quotations_image, get_delivery_receipt_image, get_receiving_memo_image, add_new_item_v2
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

@csrf_exempt
def create_purchase_order_view(request):
    print("View function accessed!")
    if request.method == "POST":
        try: 
            data = json.loads(request.body)
            items = data.get("items", None)
 
            if not items or not isinstance(items, list):
                return JsonResponse(
                    {"error": "Invalid or missing 'items' field. It must be a list."},
                    status=400
                )
            
            # Call the service function to create the purchase order
            result = create_purchase_order(items)
            
            if result["success"]:
                return JsonResponse({"message": result["data"]}, status=201)
            else:
                return JsonResponse({"error": result.get("message", "Unable to create purchase order.")}, status=400)

        except Exception as e: 
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else: 
        return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def get_purchase_orders_view(request):
    if request.method == "GET":
        try:
            # Call the service function to fetch purchase orders
            result = get_purchase_orders()

            if result["success"]:
                return JsonResponse({"success": True, "data": result["data"]}, status=200)
            else:
                return JsonResponse({"success": False, "message": result.get("message", "Failed to fetch purchase orders.")}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)
    
@csrf_exempt
def get_purchase_items_view(request, purchase_order_id):
    if request.method == "GET":
        try:
            if not purchase_order_id:
                return JsonResponse(
                    {"success": False, "message": "Missing 'purchase_order_id' in path parameters."},
                    status=400
                )

            # Call the service function
            result = get_purchase_items(purchase_order_id)

            if result["success"]:
                return JsonResponse({"success": True, "data": result["data"]}, status=200)
            else:
                return JsonResponse({"success": False, "message": result.get("message", "Failed to fetch purchase items.")}, status=404)
        except ValueError:
            return JsonResponse({"success": False, "message": "'purchase_order_id' must be an integer."}, status=400)
        except Exception as e:
            return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

@csrf_exempt
def mark_po_as_completed_view(request):
    print("Entering upload quotations...")
    if request.method == 'POST':
        try:
            # Extract data
            purchase_order_id = request.POST.get('purchase_order_id')
            print("Purchase order ID:", purchase_order_id)

            if not purchase_order_id:
                return JsonResponse({"success": False, "message": "Missing 'purchase_order_id'."}, status=400)

            try:
                purchase_order_id = int(purchase_order_id)
            except ValueError:
                return JsonResponse({"success": False, "message": "'purchase_order_id' must be an integer."}, status=400)

            # Validate files
            receiving_memo = request.FILES.get('receiving_memo')
            delivery_receipt = request.FILES.get('delivery_receipt')

            if not receiving_memo or not delivery_receipt:
                return JsonResponse({
                    "success": False,
                    "message": "Both 'receiving_memo' and 'delivery_receipt' files are required."
                }, status=400)

            # Call service function
            result = mark_po_as_completed(
                purchase_order_id,
                receiving_memo,
                delivery_receipt
            )

            if result["success"]:
                return JsonResponse({"success": True, "data": result.get("data", {})}, status=200)
            else:
                return JsonResponse({"success": False, "message": result["message"], "error": result.get("error")}, status=400)

        except Exception as e:
            return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)
    
@csrf_exempt
def upload_po_with_quotations_view(request):
    print("Entering upload quotations...")
    if request.method == 'POST':
        try:
            # Extract data
            purchase_order_id = request.POST.get('purchase_order_id')
            print("Purchase order ID:", purchase_order_id)

            if not purchase_order_id:
                return JsonResponse({"success": False, "message": "Missing 'purchase_order_id'."}, status=400)

            try:
                purchase_order_id = int(purchase_order_id)
            except ValueError:
                return JsonResponse({"success": False, "message": "'purchase_order_id' must be an integer."}, status=400)

            # Validate files
            file_obj = request.FILES.get('file_name')

            if not file_obj:
                return JsonResponse({
                    "success": False,
                    "message": "Filename quotation file is required!"
                }, status=400)

            # Call service function
            result = upload_po_with_quotations(
                purchase_order_id,
                file_obj
            )

            if result["success"]:
                return JsonResponse({"success": True, "data": result.get("data", {})}, status=200)
            else:
                return JsonResponse({"success": False, "message": result["message"], "error": result.get("error")}, status=400)

        except Exception as e:
            return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

@csrf_exempt
def get_po_quotations_image_view(request):
    if request.method == 'GET':
        try:
            # Extract file name from query params
            file_name = request.GET.get('file_name')
            if not file_name:
                return JsonResponse({"success": False, "message": "Missing 'file_name'."}, status=400)
 
            # Call service function
            result = get_po_quotations_image(file_name)

            if result["success"]:
                file = result["file"]
                return HttpResponse(file, content_type="image/png")  # Adjust MIME type as needed
            else:
                return JsonResponse({"success": False, "message": result["message"]}, status=404)

        except Exception as e:
            return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

@csrf_exempt
def delivery_receipt_image_view(request, file_name):
    if request == "GET":
        response = get_delivery_receipt_image(file_name)
        if response["success"]:
            return HttpResponse(response["file"], content_type="image/jpeg")
        else:
            return JsonResponse({"success": False, "message": response["message"]}, status=400)

# View for retrieving receiving memo image
def receiving_memo_image_view(request, file_name):
    response = get_receiving_memo_image(file_name)
    if response["success"]:
        return HttpResponse(response["file"], content_type="image/jpeg")
    else:
        return JsonResponse({"success": False, "message": response["message"]}, status=400)
   
@csrf_exempt
def add_new_item2_view(request):
    """
    View to handle adding a new item using the add_new_item_v2 function.
    Expects a POST request with item details.
    """
    if request.method == "POST":
        try:
            # Ensure the request content type is JSON
            if request.content_type != 'application/json':
                return JsonResponse({"error": "Content-Type must be application/json"}, status=400)

            # Get the JSON data from the request body
            data = json.loads(request.body)

            # Extract the fields from the data
            p_item_name = data.get("item_name")
            p_item_descr = data.get("item_descr")
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

            # Check if the response_data contains an error
            if "error" in response_data:
                return JsonResponse({"error": response_data["error"]}, status=500)

            # If it's a success response, return the data
            return JsonResponse({"success": True, "data": response_data["data"]}, status=201)

        except Exception as e:
            # Handle any errors during the request
            logging.error(f"Error occurred: {str(e)}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed."}, status=405)
