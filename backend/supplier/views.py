from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .services import add_new_supplier, add_new_brand, get_all_suppliers, get_brands

from django.http import HttpResponse




@csrf_exempt
def add_supplier_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming JSON body data
            data = json.loads(request.body)  # Correct way to parse JSON data
            
            # Get data from the POST request body
            p_splr_name = data.get('p_splr_name')
            p_cont_p = data.get('p_cont_p')
            p_email = data.get('p_email')
            p_phone = data.get('p_phone')
            p_website = data.get('p_website')
            p_landline = data.get('p_landline')
            p_splr_descr = data.get('p_splr_descr')
            p_st_no = data.get('p_st_no')
            p_st_name = data.get('p_st_name')
            p_unit_no = data.get('p_unit_no')
            p_city = data.get('p_city')
            p_state = data.get('p_state')
            p_zip = data.get('p_zip')
            p_country = data.get('p_country')

            # Call the service function to add the supplier
            result = add_new_supplier(
                p_splr_name, p_cont_p, p_email, p_phone, p_website,
                p_landline, p_splr_descr, p_st_no, p_st_name, p_unit_no,
                p_city, p_state, p_zip, p_country
            )

            # Return a success message
            return JsonResponse({"message": result}, status=201)

        except Exception as e:
            # Handle unexpected errors during the process
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods (if the method is not POST)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)



@csrf_exempt
def add_brand_view(request):
    if request.method == "POST":
        try:
            # Get data from the POST request body
            data = request.POST
            new_brand_name = data.get('new_brand_name')

            # Call the service function to add the brand
            add_new_brand(new_brand_name)
            return JsonResponse({"message": "Brand added successfully"}, status=201)

        except Exception as e:
            # Handle unexpected errors during the process
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods (if the method is not POST)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)


"""
@csrf_exempt
def add_supplier_view(request):
    if request.method == "POST":
        try:
            # Get data from the POST request body
            data = json.loads(request.body)

            # Log the received data for debugging purposes
            print("Received data:", data)

            p_cont_p = data.get('p_cont_p')
            if not p_cont_p or p_cont_p.strip() == "":
                return JsonResponse({"error": "Contact person cannot be empty."}, status=400)

            p_splr_name = data.get('p_splr_name')
            p_email = data.get('p_email')
            p_phone = data.get('p_phone')
            p_website = data.get('p_website')
            p_landline = data.get('p_landline')
            p_splr_descr = data.get('p_splr_descr')
            p_st_no = data.get('p_st_no')
            p_st_name = data.get('p_st_name')
            p_unit_no = data.get('p_unit_no')
            p_city = data.get('p_city')
            p_state = data.get('p_state')
            p_zip = data.get('p_zip')
            p_country = data.get('p_country')

            # Call the service function to add the supplier
            result = add_new_supplier(
                p_splr_name, p_cont_p, p_email, p_phone, p_website,
                p_landline, p_splr_descr, p_st_no, p_st_name, p_unit_no,
                p_city, p_state, p_zip, p_country
            )

            return JsonResponse({"message": result}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format in request body"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods (if the method is not POST)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    """

""" new old
@csrf_exempt
def suppliers_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get suppliers (without passing request)
            result = get_all_suppliers()  # Just call the function without passing the request
            
            if result["success"]:
                return JsonResponse({"suppliers": result["suppliers"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No suppliers found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)
    """


@csrf_exempt
def suppliers_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get suppliers (without passing request)
            result = get_all_suppliers()  # Just call the function without passing the request
            
            if result["success"]:
                return JsonResponse({"suppliers": result["suppliers"]}, status=200)
            else:
                # If there are no suppliers or a failure in the service function
                return JsonResponse({"error": result}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
    # Handle invalid HTTP methods (POST, PUT, etc.)
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)




@csrf_exempt
def get_brands_see(request):
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