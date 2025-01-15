from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .services import get_rooms
from .services import get_priority_levels
from .services import create_requisition_service
from .services import get_item_requisitions
from .services import get_job_requisitions
from .services import requisition_attach_items
from .services import requisition_attach_job
from .services import approve_or_decline_item
from .services import approve_or_decline_job
from .services import get_attached_items
from .services import get_attached_job
from .services import get_item_image
from .services import accept_job
from .services import accept_and_mark_item_as_available
from .services import accept_and_mark_item_as_unavailable
from .services import mark_item_as_completed
from .services import get_ar_image
from .services import get_stocks
from .services import identify_view_more
from django.http import HttpResponse
import os
@csrf_exempt
def get_rooms_view(request):
    if request.method == 'GET':
        try:
            # Call the service function to get stocks
            result = get_rooms()  # Make sure the function is called
            
            if result["success"]:
                return JsonResponse({"rooms": result["rooms"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No stocks found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

             # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def get_priority_levels_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get stocks
            result = get_priority_levels()  # Make sure the function is called
            
            if result["success"]:
                return JsonResponse({"priority_levels": result["priority_levels"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No stocks found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

             # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def create_requisition_service_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON body
            body = json.loads(request.body)
            room_id = body.get("room_id")
            priority_id = body.get("priority_id")
            requisition_type = body.get("requisition_type")

            # Ensure all required parameters are present
            if not room_id or not priority_id or not requisition_type:
                return JsonResponse({"error": "Missing required parameters."}, status=400)

            # Call the service function to create requisition
            response_data = create_requisition_service(room_id, priority_id, requisition_type)

            # Return the successful response
            return JsonResponse({"data": response_data}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method."}, status=405)


@csrf_exempt
def get_item_requisitions_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get requisitions
            item_requisition = get_item_requisitions()  # This returns a list or None
            
            if item_requisition is None:
                # Handle the case where an error occurred
                return JsonResponse({"error": "Failed to fetch requisitions."}, status=500)
            elif not item_requisition:
                # Handle the case where no requisitions are found
                return JsonResponse({"message": "No requisitions found."}, status=404)
            else:
                # Return the list of requisitions as JSON
                return JsonResponse({"requisition": item_requisition}, status=200)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def get_job_requisitions_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get requisitions
            requisition = get_job_requisitions()  # This returns a list or None
            
            if requisition is None:
                # Handle the case where an error occurred
                return JsonResponse({"error": "Failed to fetch requisitions."}, status=500)
            elif not requisition:
                # Handle the case where no requisitions are found
                return JsonResponse({"message": "No requisitions found."}, status=404)
            else:
                # Return the list of requisitions as JSON
                return JsonResponse({"requisition": requisition}, status=200)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


@csrf_exempt
def requisition_attach_items_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)

            # Extract the item requisition ID and items list from the request body
            item_requisition_id = data.get("item_requisition_id")
            items = data.get("items")

            # Check if the necessary parameters are provided
            if not item_requisition_id or not items:
                return JsonResponse({"error": "Missing 'item_requisition_id' or 'items' in request."}, status=400)

            # Call the service function to attach items
            result = requisition_attach_items(item_requisition_id, items)

            # Return the result as a JSON response
            return JsonResponse(result, status=200 if result.get("success") else 400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An unexpected error occurred", "details": str(e)}, status=500)

    # Handle invalid HTTP methods (only POST is allowed)
    return JsonResponse({"error": "Invalid HTTP method. Only POST requests are allowed."}, status=405)

    

@csrf_exempt
def requisition_attach_job_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)

            # Extract the job requisition ID and job description from the request body
            job_requisition_id = data.get("job_requisition_id")
            job_description = data.get("job_description")

            # Check if the necessary parameters are provided
            if not job_requisition_id or not job_description:
                return JsonResponse({"error": "Missing 'job_requisition_id' or 'job_description' in request."}, status=400)

            # Call the service function to attach job
            result = requisition_attach_job(job_requisition_id, job_description)

            # Return the result as a JSON response
            return JsonResponse(result, status=200 if result.get("error") is None else 400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An unexpected error occurred", "details": str(e)}, status=500)

    # Handle invalid HTTP methods (only POST is allowed)
    return JsonResponse({"error": "Invalid HTTP method. Only POST requests are allowed."}, status=405)

    
    
@csrf_exempt
def approve_or_decline_item_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)

            # Extract necessary parameters from the request body
            action_type = data.get("action_type")
            item_requisition_id = data.get("item_requisition_id")
            p_rejection_note = data.get("p_rejection_note", None)  # Optional parameter

            # Validate the required parameters
            if not action_type or not item_requisition_id:
                return JsonResponse({"error": "Missing 'action_type' or 'item_requisition_id' in request."}, status=400)

            # Call the service function to approve or decline the item
            result = approve_or_decline_item(action_type, item_requisition_id, p_rejection_note)

            # Determine the HTTP status and response
            if "error" in result:
                return JsonResponse(result, status=400)  # Bad request
            else:
                return JsonResponse(result, status=200)  # Success

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An unexpected error occurred", "details": str(e)}, status=500)

    # Handle invalid HTTP methods (only POST is allowed)
    return JsonResponse({"error": "Invalid HTTP method. Only POST requests are allowed."}, status=405)


@csrf_exempt
def approve_or_decline_item_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)

            # Extract necessary parameters from the request body
            action_type = data.get("action_type")
            item_requisition_id = data.get("item_requisition_id")
            p_rejection_note = data.get("p_rejection_note", None)  # Optional parameter

            # Validate the required parameters
            if not action_type or not item_requisition_id:
                return JsonResponse({"error": "Missing 'action_type' or 'item_requisition_id' in request."}, status=400)

            # Call the service function to approve or decline the item
            result = approve_or_decline_item(action_type, item_requisition_id, p_rejection_note)

            # Determine the HTTP status and response
            if "error" in result:
                return JsonResponse(result, status=400)  # Bad request
            else:
                return JsonResponse(result, status=200)  # Success

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An unexpected error occurred", "details": str(e)}, status=500)

    # Handle invalid HTTP methods (only POST is allowed)
    return JsonResponse({"error": "Invalid HTTP method. Only POST requests are allowed."}, status=405)


@csrf_exempt
def approve_or_decline_job_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)

            # Extract necessary parameters from the request body
            action_type = data.get("action_type")
            job_requisition_id = data.get("job_requisition_id")
            p_rejection_note = data.get("p_rejection_note", None)  # Optional parameter

            # Validate the required parameters
            if not action_type or not job_requisition_id:
                return JsonResponse({"error": "Missing 'action_type' or 'job_requisition_id' in request."}, status=400)

            # Call the service function to approve or decline the item
            result = approve_or_decline_job(action_type, job_requisition_id, p_rejection_note)

            # Determine the HTTP status and response
            if "error" in result:
                return JsonResponse(result, status=400)  # Bad request
            else:
                return JsonResponse(result, status=200)  # Success

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": "An unexpected error occurred", "details": str(e)}, status=500)

    # Handle invalid HTTP methods (only POST is allowed)
    return JsonResponse({"error": "Invalid HTTP method. Only POST requests are allowed."}, status=405)


@csrf_exempt
def get_attached_items_view(request):
    if request.method == "GET":
        try:
            item_requisition_id = request.GET.get("item_requisition_id")
            print("Received item_requisition_id:", item_requisition_id)  # Debug log

            if not item_requisition_id:
                return JsonResponse({"error": "Missing required parameter: item_requisition_id."}, status=400)

            try:
                item_requisition_id = int(item_requisition_id)
            except ValueError:
                return JsonResponse({"error": "Invalid item_requisition_id format. Must be an integer."}, status=400)

            result = get_attached_items(item_requisition_id)
            print("Attached Items Result:", result)  # Debug log

            if isinstance(result, str):
                return JsonResponse({"message": result}, status=404)
            else:
                return JsonResponse({"data": result}, status=200)

        except Exception as e:
            print("Unexpected Error:", str(e))  # Debug log
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use GET."}, status=405)


@csrf_exempt
def get_item_image_view(request):
    if request.method == "GET":
        try:
            # Extract file_name from query parameters
            file_name = request.GET.get("file_name")

            if not file_name:
                return JsonResponse({"error": "Missing required parameter: file_name."}, status=400)

            # Call the service function with the provided file name
            image_data = get_item_image(file_name)

            if image_data:
                # Respond with success if the image is retrieved
                return JsonResponse({"message": "Image retrieved successfully.", "file_name": file_name}, status=200)
            else:
                # Respond with error if the image was not found or could not be retrieved
                return JsonResponse({"error": "Failed to retrieve the image."}, status=404)

        except Exception as e:
            # Handle unexpected errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Return error for invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method. Use GET."}, status=405)

@csrf_exempt
def get_attached_job_view(request):
    if request.method == "GET":
        try:
            # Extract job_requisition_id from query parameters
            job_requisition_id = request.GET.get("job_requisition_id")

            # Validate the parameter
            if not job_requisition_id:
                return JsonResponse({"error": "Missing required parameter: job_requisition_id."}, status=400)

            try:
                # Convert job_requisition_id to integer
                job_requisition_id = int(job_requisition_id)
            except ValueError:
                return JsonResponse({"error": "Invalid job_requisition_id format. Must be an integer."}, status=400)

            # Call the service function to get attached job details
            result = get_attached_job(job_requisition_id)

            # Return the response based on the result
            if isinstance(result, dict) and "error" in result:
                return JsonResponse({"error": result["error"]}, status=500)
            elif isinstance(result, dict) and "message" in result:
                return JsonResponse({"message": result["message"]}, status=404)
            else:
                return JsonResponse({"data": result}, status=200)

        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Return error for invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method. Use GET."}, status=405)

@csrf_exempt
def accept_job_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON body of the request
            data = json.loads(request.body)

            # Extract the job_requisition_id from the request data
            job_requisition_id = data.get("job_requisition_id")

            # Validate the parameter
            if not job_requisition_id:
                return JsonResponse({"error": "Missing required parameter: job_requisition_id."}, status=400)

            # Call the accept_job function from your service
            result = accept_job(job_requisition_id)

            # Return the result (either success or error message)
            return JsonResponse(result, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


@csrf_exempt
def accept_and_mark_item_as_available_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON body of the request
            data = json.loads(request.body)

            # Extract item_requisition_id from the request data
            item_requisition_id = data.get("item_requisition_id")

            # Validate the parameter
            if not item_requisition_id:
                return JsonResponse({"error": "Missing required parameter: item_requisition_id."}, status=400)

            # Call the accept_and_mark_item_as_available function
            result = accept_and_mark_item_as_available(item_requisition_id)

            # Return the result (either success or error message)
            return JsonResponse(result, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


@csrf_exempt
def accept_and_mark_item_as_unavailable_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON body of the request
            data = json.loads(request.body)

            # Extract item_requisition_id from the request data
            item_requisition_id = data.get("item_requisition_id")

            # Validate the parameter
            if not item_requisition_id:
                return JsonResponse({"error": "Missing required parameter: item_requisition_id."}, status=400)

            # Call the accept_and_mark_item_as_unavailable function
            result = accept_and_mark_item_as_unavailable(item_requisition_id)

            # Return the result (either success or error message)
            return JsonResponse(result, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)

@csrf_exempt
def mark_item_as_completed_view(request):
    if request.method == "POST":
        try:
            # Retrieve the file and item_requisition_id from the request
            file = request.FILES.get("file")
            item_requisition_id = request.POST.get("item_requisition_id")

            # Validate the parameters
            if not file:
                return JsonResponse({"error": "Missing file."}, status=400)
            if not item_requisition_id:
                return JsonResponse({"error": "Missing required parameter: item_requisition_id."}, status=400)

            # Log received data for debugging
            print(f"Received item_requisition_id: {item_requisition_id}")
            print(f"Received file: {file.name}")

            # Read file content
            file_content = file.read()

            # Call the updated mark_item_as_completed function
            result = mark_item_as_completed(int(item_requisition_id), file_content, file.name)

            # Return the result to the client
            if result.get("status") == "success":
                return JsonResponse({"message": "Item marked as completed successfully."}, status=200)
            else:
                return JsonResponse(result, status=400)

        except Exception as e:
            print(f"Error: {str(e)}")
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)


from io import BytesIO
from PIL import Image

@csrf_exempt
def get_ar_image_view(request):
    if request.method == "GET":
        # Extract the file_name from query parameters
        file_name = request.GET.get("file_name")

        if not file_name:
            return JsonResponse({"error": "Missing required parameter: file_name."}, status=400)

        try:
            # Call the function to retrieve the image
            image = get_ar_image(file_name)

            if isinstance(image, Image.Image):
                # If image is returned, convert it to bytes and return as HTTP response
                response = HttpResponse(content_type="image/png")
                image.save(response, "PNG")
                return response
            else:
                # If an error message is returned, respond with the error
                return JsonResponse(image, status=500)

        except Exception as e:
            # Handle any unexpected errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    else:
        return JsonResponse({"error": "Invalid HTTP method. Use GET."}, status=405)
    


@csrf_exempt
def get_stocks_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get stock data
            result = get_stocks()

            if result:  # Check if the result is not empty
                return JsonResponse({"stocks": result}, status=200)
            else:
                return JsonResponse({"error": "No stocks found."}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def identify_view_more_view(request):
    """
    View to handle requests for identify_view_more.
    """
    if request.method == "GET":
        try:
            result = identify_view_more()  # Call the function
            return JsonResponse({"status": "success", "data": result}, status=200)
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": f"An unexpected error occurred: {str(e)}"},
                status=500,
            )
    return JsonResponse({"status": "error", "message": "Invalid HTTP method. Use GET."}, status=405)