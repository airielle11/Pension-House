from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .services import create_purchase_order, get_purchase_orders, get_purchase_items, mark_po_as_completed, upload_po_with_quotations, get_po_quotations_image
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

# def upload_purchase_order_quotations_view(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             purchase_order_id = data.post("purchase_order_id", None)
#             # Parse purchase_order_id from the request
#             # purchase_order_id = request.POST.get("purchase_order_id")
#             if not purchase_order_id:
#                 return JsonResponse(
#                     {"success": False, "message": "Missing 'purchase_order_id'."},
#                     status=400
#                 )

#             # Ensure files are included in the request
#             rm_image = request.FILES.get("rm_image")  # Receiving Memo image
#             dr_image = request.FILES.get("dr_image")  # Delivery Receipt image

#             if not rm_image or not dr_image:
#                 return JsonResponse(
#                     {"success": False, "message": "Both 'rm_image' and 'dr_image' are required."},
#                     status=400
#                 )

#             # Save the files temporarily to process
#             rm_image_path = default_storage.save(rm_image.name, ContentFile(rm_image.read()))
#             dr_image_path = default_storage.save(dr_image.name, ContentFile(dr_image.read()))

#             # Call the service function with the file paths
#             result = upload_purchase_order_quotations(
#                 purchase_order_id=int(purchase_order_id),
#                 rm_image_path=rm_image_path,
#                 dr_image_path=dr_image_path
#             )

#             # Check the result of the service function
#             if result["success"]:
#                 return JsonResponse({"success": True, "message": "Files uploaded and processed successfully."}, status=200)
#             else:
#                 return JsonResponse({"success": False, "message": result.get("message", "Failed to upload files.")}, status=400)

#         except ValueError:
#             return JsonResponse({"success": False, "message": "'purchase_order_id' must be an integer."}, status=400)
#         except Exception as e:
#             return JsonResponse({"success": False, "message": f"An unexpected error occurred: {str(e)}"}, status=500)
#     else:
#         return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)