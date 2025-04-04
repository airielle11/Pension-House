from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .services import add_new_room_type
from .services import add_new_room
from .services import get_room_types
from .services import sign_in

@csrf_exempt
def sign_in_view(request):
    """
    Handle HTTP POST requests for user sign-in.
    """
    if request.method == "POST":
        try:
            # Parse JSON from the request body
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Validate input
            if not email or not password:
                return JsonResponse({"status": "error", "message": "Missing email or password"}, status=400)

            # Call the sign_in function
            sign_in_result = sign_in(email, password)

            # If sign_in returned data, send a success response
            return JsonResponse(
                {"status": "success", "message": "User signed in successfully.", "data": sign_in_result}, status=200
            )
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid HTTP method. Use POST."}, status=405)

@csrf_exempt
def add_new_room_type_view(request):
    """
    Handle HTTP POST requests to add a new room type.
    """
    if request.method == "POST":
        try:
            # Parse JSON from the request body
            data = json.loads(request.body)
            room_type_name = data.get("room_type_name")

            # Validate input
            if not room_type_name:
                return JsonResponse({"status": "error", "message": "Missing room_type_name"}, status=400)

            # Call the add_new_room_type function
            result = add_new_room_type(room_type_name)

            # Return the result from the function
            return JsonResponse(result, status=200 if result["status"] == "success" else 400)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid HTTP method. Use POST."}, status=405)

@csrf_exempt
def add_new_room_view(request):
    """
    Handle HTTP POST requests to add a new room.
    """
    if request.method == "POST":
        try:
            # Parse the JSON request body
            data = json.loads(request.body)
            room_number = data.get("room_number")
            room_type_id = data.get("room_type_id")

            # Validate input
            if not room_number or not room_type_id:
                return JsonResponse({"status": "error", "message": "Missing room_number or room_type_id"}, status=400)

            # Call the add_new_room function
            result = add_new_room(room_number, room_type_id)

            # Return the result from the function
            return JsonResponse(result, status=200 if result["status"] == "success" else 400)

        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid HTTP method. Use POST."}, status=405)
    

@csrf_exempt
def get_room_types_view(request):
    """
    Handle HTTP GET requests to retrieve all room types.
    """
    if request.method == "GET":
        try:
            # Call the get_room_types function
            result = get_room_types()

            # Return the result as a JSON response
            return JsonResponse(result, status=200 if result["status"] == "success" else 400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    else:
        return JsonResponse({"status": "error", "message": "Invalid HTTP method. Use GET."}, status=405)