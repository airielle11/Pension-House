from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from .services import register_user, sign_in, request_reset_password, reset_passwordv2

# This decorator marks a view as being exempt from the protection ensured by the middleware
@csrf_exempt
def register_view(request): 
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"error": "Email and password must be filled in!"}, status=400)

            # Attempt to register the user
            result = register_user(email, password)

            if result["success"]:
                return JsonResponse({"message": f"Employee successfully added. User: {result['user_email']}"}, status=201)
            else:
                return JsonResponse({"error": result["error"]}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
 
@csrf_exempt
def sign_in_view(request):
    """
    View for signing in a user with email and password.
    """
    if request.method == "POST":
        try:
            # Parse JSON body
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Validate input fields
            if not email or not password:
                return JsonResponse({"success": False, "error": "Email and password are required"}, status=400)

            # Call the sign_in function from services.py
            result = sign_in(email, password)

            # Return the response back to the client
            if result.get("success"):
                return JsonResponse({
                    "success": True,
                    "message": result["message"],
                    "user_details": result["user_details"],
                    "token": result["token"]
                }, status=200)
            else:
                return JsonResponse({
                    "success": False,
                    "auth_id": result.get("auth_id", "no auth_id okie"),
                    "error": result.get("error", "Login failed")
                }, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "error": "Invalid JSON input"}, status=400)

        except Exception as e:
            return JsonResponse({"success": False, "error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"success": False, "error": "Invalid HTTP method"}, status=405)
# @csrf_exempt
# def sign_in_view(request): 
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             email = data.get("email")
#             password = data.get("password")

#             if not email or not password:
#                 return JsonResponse({"error": "Email and password are required"}, status=400)

#             # Call login_user
#             token, user = sign_in(email, password)
            
#             # Successful login response
#             return JsonResponse({
#                 "message": "Login successful",
#                 "token": token,
#                 "user": user.email
#             }, status=200)

#         except ValueError as ve: 
#             return JsonResponse({"error": str(ve)}, status=400)

#         except Exception as e:  
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def request_reset_password_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"error": "Email is required."}, status=400)
 
            result = request_reset_password(email)

            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result["error"]}, status=400)

        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
 
@csrf_exempt  
def reset_password_view(request):
    if request.method == "POST":
        try:
            # Parse request body
            data = json.loads(request.body)
            token = data.get("token", "").strip()
            new_password = data.get("new_password", "").strip()
            confirmed_password = data.get("confirmed_password", "").strip()

            # Validate required fields
            if not token or not new_password or not confirmed_password:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # Call the reset_passwordv2 function
            result = reset_passwordv2(new_password, confirmed_password)

            # Return response based on the result
            if result.get("success"):
                return JsonResponse({"message": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Password reset failed")}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

