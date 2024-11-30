from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from core.supabase_client import register_user, login_user

from django.http import HttpResponse

# This decorator marks a view as being exempt from the protection ensured by the middleware
@csrf_exempt
def register(request): 
    return HttpResponse("Register page here!")
    # try:
    #     if request.method == "POST":
    #         data = json.loads(request.body)
    #         email = data.get("email")
    #         password = data.get("password")
    #         if not email or not password:
    #             return JsonResponse({"error": "Email and password are required"}, status=400)

    #         user = register_user(email, password)
    #         return JsonResponse({"user": user}, status=201)

    #     return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=400)

def login(request):
    return HttpResponse("Login page here!")
    # try:
    #     if request.method == "POST":
    #         data = json.loads(request.body)
    #         email = data.get("email")
    #         password = data.get("password")
    #         if not email or not password:
    #             return JsonResponse({"error": "Email and password are required"}, status=400)

    #         token, user = login_user(email, password)
    #         return JsonResponse({"token": token, "user": user}, status=200)

    #     return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=400)