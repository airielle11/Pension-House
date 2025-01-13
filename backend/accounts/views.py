from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services import get_user_auth_info, view_active_employees, view_deleted_employees, add_employee_account, delete_employee_account, update_employee_account, recover_employee_account, get_positions, update_employee_name_wrapper, update_employee_address, update_employee_phone_wrapper

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
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)

def view_deleted_employees_view(request):
    if request.method == "GET":
        try: 
            result = view_deleted_employees()

            if result["success"]:
                return JsonResponse({"inactive_employees": result["inactive_employees"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No deleted employees found.")}, status=400)
        except Exception as e: 
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)

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
                return JsonResponse({"message": result["data"], "temp_password": result["temp_password"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to add employee!")}, status=400)
 
        except Exception as e: 
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)
    
def delete_employee_account_view(request):
    if request.method == "GET":   
        try: 
            p_emp_id = request.GET.get('p_emp_id')
 
            if not p_emp_id:
                return JsonResponse({"error": "Employee ID is required."}, status=400)

            # Call the delete_account service function
            result = delete_employee_account(p_emp_id)

            if result["success"]:
                return JsonResponse({"message": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to delete employee!")}, status=400)
     
        except Exception as e: 
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else: 
        return JsonResponse({"error": "Invalid request method!"}, status=405)

@csrf_exempt
def update_employee_account_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            required_fields = [
                "p_emp_id", "p_new_lname", "p_new_fname", "p_new_mname",
                "p_st_no", "p_st_name", "p_unit_no", "p_city",
                "p_state", "p_zip", "p_country", "p_phone",
            ]

            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return JsonResponse({"error": f"Missing field: {field}"}, status=400)

            result = update_employee_account(
                p_emp_id=data["p_emp_id"],
                p_new_lname=data["p_new_lname"],
                p_new_fname=data["p_new_fname"],
                p_new_mname=data["p_new_mname"],
                p_st_no=data["p_st_no"],
                p_st_name=data["p_st_name"],
                p_unit_no=data["p_unit_no"],
                p_city=data["p_city"],
                p_state=data["p_state"],
                p_zip=data["p_zip"],
                p_country=data["p_country"],
                p_phone=data["p_phone"],
            )

            if result["success"]:
                return JsonResponse({"message": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to edit employee!")}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)

def recover_employee_account_view(request):
    if request.method == "GET":
        try: 
            # p_emp_id = request.GET.get('p_emp_id')
            data = json.loads(request.body)
            p_emp_id = data.get('p_emp_id')
            
            if not p_emp_id:
                return JsonResponse({"error": "Employee ID is required!"}, status=400)
            
            result = recover_employee_account(p_emp_id)
            
            if result["success"]:
                return JsonResponse({"message": result["data"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "Unable to recover account!")}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occured: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)
    
@csrf_exempt
def get_positions_view(request):
    if request.method == "GET":
        try:
            # Call the service to fetch positions
            positions = get_positions()

            if positions is not None:  # Ensure positions is not None
                if len(positions) > 0:  # Check if there are any positions
                    return JsonResponse({
                        "success": True,
                        "data": positions
                    }, status=200)
                else:
                    return JsonResponse({
                        "success": True,
                        "data": [],
                        "message": "No positions found."
                    }, status=200)
            else:
                return JsonResponse({
                    "success": False,
                    "message": "Unable to fetch positions. Please try again later."
                }, status=500)
        except Exception as e:
            # Handle unexpected errors
            return JsonResponse({
                "success": False,
                "message": f"An error occurred: {str(e)}"
            }, status=500)
            
@csrf_exempt
def update_employee_name_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON payload from the request
            data = json.loads(request.body)

            # Extract required fields from the payload
            p_new_lname = data.get("p_new_lname")
            p_new_fname = data.get("p_new_fname")
            p_new_mname = data.get("p_new_mname")

            # Validate required fields
            if not all([p_new_lname, p_new_fname, p_new_mname]):
                return JsonResponse({"error": "Missing required fields."}, status=400)

            # Call the service function to update the employee name
            update_employee_name_wrapper(p_new_lname, p_new_fname, p_new_mname)

            # Respond to the client
            return JsonResponse({"message": "Employee name updated successfully."}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)

@csrf_exempt
def update_employee_address_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON payload from the request
            data = json.loads(request.body)

            # Extract required fields from the payload
            p_st_no = data.get("p_st_no")
            p_st_name = data.get("p_st_name")
            p_unit_no = data.get("p_unit_no")
            p_city = data.get("p_city")
            p_state = data.get("p_state")
            p_zip = data.get("p_zip")
            p_country = data.get("p_country")

            # Validate required fields
            if not all([p_st_no, p_st_name, p_city, p_state, p_zip, p_country]):
                return JsonResponse({"error": "Missing required fields."}, status=400)

            # Call the service function to update the employee address
            update_employee_address(p_st_no, p_st_name, p_unit_no, p_city, p_state, p_zip, p_country)

            # Respond to the client
            return JsonResponse({"message": "Employee address updated successfully."}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)

@csrf_exempt
def update_employee_phone_view(request):
    if request.method == "POST":
        try:
            # Parse the JSON payload from the request
            data = json.loads(request.body)

            # Extract required fields from the payload
            p_phone = data.get("p_phone")

            # Validate required fields
            if not p_phone:
                return JsonResponse({"error": "Missing required field: p_phone."}, status=400)

            # Call the service function to update the employee phone number
            update_employee_phone_wrapper(p_phone)

            # Respond to the client
            return JsonResponse({"message": "Employee phone number updated successfully."}, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method!"}, status=405)