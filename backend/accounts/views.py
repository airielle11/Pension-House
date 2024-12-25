from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services import get_user_auth_info, view_active_employees, add_employee_account, delete_employee_account, update_employee_account
from django.http import HttpResponse

# This decorator marks a view as being exempt from the protection ensured by the middleware
@csrf_exempt
def get_user_auth_ifo_view(request):
    if request.method == "GET":
        try:
            data = json.loads(request.body)
            user_id = data.get(user_id)
            user_email = data.get(user_email)
            created_at = data.get(created_at)
            user_metadata = data.get(user_metadata)
            
            # Call the service funtion to get user info
            result = get_user_auth_info()
                        
        except Exception as e:
            return JsonResponse({"error": f"An error occured: {str(e)}"}, status=500)
        
@csrf_exempt
def view_active_employees_view(request): 
    if request.method == "GET":
        try:
            # Call the service function to fetch active employees
            result = view_active_employees()

            if result["success"]:
                return JsonResponse({"employees": result["employees"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No active employees found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

@csrf_exempt 
def add_employee_account_view(request): 
    if request.method == "POST":
        try:
            # Parse the JSON payload from the request
            data = json.loads(request.body)

            # Extract required fields from the payload
            email = data.get('email') 
            lname = data.get('lname')
            mname = data.get('mname')
            fname = data.get('fname')
            birth_date = data.get('birth_date')
            phone = data.get('phone')
            pos_id = data.get('pos_id')
            hired_date = data.get('hired_date')  # Optional

            # Validate required fields
            if not all([email, lname, fname, birth_date, phone, pos_id]):
                return JsonResponse({"error": "Missing required fields."}, status=400)

            # Call the service function to add the employee
            result = add_employee_account(
                email, 
                lname,
                mname,
                fname,
                birth_date,
                phone,
                pos_id,
                hired_date
            )

            # Handle the result and respond to the client
            if result["success"]:
                return JsonResponse({ 
                    "message": result["data"], 
                    "temp_password": result["temp_password"]
                }, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to add employee!")}, status=400)
 
        except Exception as e:
            # Handle any unexpected errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

    else:
        # Return a 405 Method Not Allowed response for non-POST requests
        return JsonResponse({"error": "Invalid request method!"}, status=405)
    
def delete_employee_account_view(request):
    if request.method == "GET":  # Use DELETE method as it's semantically correct for deletion
        try:
            # Parse JSON body to get the employee ID
            # data = json.loads(request.body)
            # p_emp_id = data.get('p_emp_id')
            p_emp_id = request.GET.get('p_emp_id')

            # Validate if employee ID is provided
            if not p_emp_id:
                return JsonResponse({"error": "Employee ID is required"}, status=400)

            # Call the delete_account service function
            result = delete_employee_account(p_emp_id)

            if result["success"]:
                return JsonResponse({"message": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to add employee!")}, status=400)
     
        except Exception as e:
            # Handle other errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        # Respond with 405 for invalid HTTP methods
        return JsonResponse({"error": "Invalid request method. Only DELETE is allowed."}, status=405)
    
def update_employee_account_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            p_new_lname = data.get('p_new_lname')
            p_new_fname = data.get('p_new_fname')
            p_new_mname = data.get('p_new_mname')
            p_st_no = data.get('p_st_no')
            p_st_name = data.get('p_st_name')
            p_unit_no = data.get('p_unit_no')
            p_city = data.get('p_city')
            p_state = data.get('p_state')
            p_zip = data.get('p_zip')
            p_country = data.get('p_country')
            p_phone = data.get('p_phone')
            
            result = update_employee_account(p_new_lname, p_new_fname, p_new_mname, p_st_no, p_st_name, p_unit_no, p_city, p_state, p_zip, p_country, p_phone)
            
            if result["success"]:
                    return JsonResponse({"message": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to edit employee!")}, status=400)
        except Exception as e:
            # Handle other errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        # Respond with 405 for invalid HTTP methods
        return JsonResponse({"error": "Invalid request method. Only DELETE is allowed."}, status=405)
            


# def delete_employee_account_view(request):
#     if request.method == "GET":
#         try:
#             # Get the employee ID from query parameters
#             p_emp_id = request.GET.get('p_emp_id')
#             print("EMP ID IS:", p_emp_id)  # Corrected console.log to print
            
#             if not p_emp_id:
#                 return JsonResponse({"error": "Employee ID is required"}, status=400)

#             # Call the service function
#             result = delete_employee_account(p_emp_id)

#             if result["success"]:
#                 return JsonResponse({"message": result["data"]}, status=200)
#             else:
#                 return JsonResponse({"error": result.get("message", "Unable to delete employee!")}, status=400)

#         except Exception as e:
#             return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
#     else:
#         return JsonResponse({"error": "Invalid request method!"}, status=405)
