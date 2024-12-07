from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services import register_user, login_user, request_reset_email, reset_password
from django.http import HttpResponse

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
def login_view(request): 
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            if not email or not password:
                return JsonResponse({"error": "Email and password are required"}, status=400)

            # Call login_user
            token, user = login_user(email, password)
            
            # Successful login response
            return JsonResponse({
                "message": "Login successful",
                "token": token,
                "user": user.email
            }, status=200)

        except ValueError as ve: 
            return JsonResponse({"error": str(ve)}, status=400)

        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt
def request_reset_email_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            if not email:
                return JsonResponse({"error": "Email is required."}, status=400)
 
            result = request_reset_email(email)

            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result["error"]}, status=400)

        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=400)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

# @csrf_exempt
# def reset_password_view(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             email = data.get("email"),
#             token = data.get("otp"),
#             type = data.get("recovery")
            
#             result = reset_password(email, token, type)
            
#             if result["success"]:
#                 return JsonResponse({"message": result["message"]}, status=200)
#             else:
#                 return JsonResponse({"error": result["error"]}, status=400)
#         except Exception as e:
#            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=400)

#     return JsonResponse({"error": "Invalid HTTP method"}, status=405)
 
@csrf_exempt
def reset_password_view(request):
    if request.method == "POST":
        try:
            # Parse JSON body
            data = json.loads(request.body)
            email = data.get("email")  # Ensure this is not a tuple
            token = data.get("otp")      # Ensure this is not a tuple
            new_password = data.get("new_password")  # Get new_password from the request

            if not email or not token or not new_password:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # Call the service function to reset the password
            result = reset_password(email, token, new_password)

            if result["success"]:
                return JsonResponse({"message": result["message"]}, status=200)
            else:
                return JsonResponse({"error": result["error"]}, status=400) 
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

