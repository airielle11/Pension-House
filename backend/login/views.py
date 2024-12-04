from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services import register_user, login_user
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