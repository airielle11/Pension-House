from datetime import date
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from .WMA import WeightedMovingAverage
from .services import generate_report_v2, predict_demand_v1

def calculate_wma_view(request):
    if request.method == 'POST':
        # Parse JSON data from the React request
        data = json.loads(request.body)

        # Example expected data format
        data_points = data.get('data_points')  # { "2021-01": 100, "2021-02": 120, ... }
        weighted_period = data.get('weighted_period')  # e.g., 3
        weights = data.get('weights')  # e.g., [0.5, 0.3, 0.2]

        if not data_points or not weighted_period or not weights:
            return JsonResponse({'error': 'Invalid input data'}, status=400)

        # Initialize the WeightedMovingAverage class
        wma = WeightedMovingAverage(data_points, weighted_period, *weights)
        forecasted_val, mad, mse, mape = wma.weighted_moving_averages()

        # Return results to the frontend
        return JsonResponse({
            'forecasted_value': forecasted_val,
            'mad': mad,
            'mse': mse,
            'mape': mape,
        })
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# View to generate the item demand report
@csrf_exempt
def generate_report_v2_view(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body) 
             # Retrieve start_date and end_date
            p_start_date = body.get("start_date")
            p_end_date = body.get("end_date") 

            if not p_start_date or not p_end_date:
                return JsonResponse({"error": "Missing start_date or end_date."}, status=400)

            p_start_date = date.fromisoformat(p_start_date)
            p_end_date = date.fromisoformat(p_end_date)

            # Call the function from services.py
            response = generate_report_v2(request, p_start_date, p_end_date)
            return response

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)

# @csrf_exempt
# def generate_report_v2_view(request):
#     if request.method == "POST":
#         try:
#             # Parse JSON body
#             body = json.loads(request.body)

#             # Retrieve start_date and end_date
#             p_start_date = body.get("start_date")
#             p_end_date = body.get("end_date")

#             if not p_start_date or not p_end_date:
#                 return JsonResponse({"error": "Missing start_date or end_date."}, status=400)

#             # Convert to date objects
#             p_start_date = date.fromisoformat(p_start_date)
#             p_end_date = date.fromisoformat(p_end_date)

#             # Call the function from services.py
#             response = generate_report_v2(request, p_start_date, p_end_date)
#             return response

#         except ValueError as ve:
#             # Handle invalid date format
#             return JsonResponse({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

#         except json.JSONDecodeError:
#             # Handle invalid JSON
#             return JsonResponse({"error": "Invalid JSON payload."}, status=400)

#         except Exception as e:
#             # Catch all other exceptions
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)

# Use code if there's already frontend
@csrf_exempt
def predict_demand_v1_view(request):
    if request.method == "POST":
        try:
            p_item_id = request.POST.get("item_id")

            if not p_item_id:
                return JsonResponse({"error": "Missing item_id."}, status=400)

            p_item_id = int(p_item_id)

            # Call the function from services.py
            forecast, mad, mse, mape = predict_demand_v1(p_item_id)

            return JsonResponse({
                "forecasted_value": forecast,
                "mad": mad,
                "mse": mse,
                "mape": mape
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)

# Use code for backend testing
# @csrf_exempt
# def predict_demand_v1_view(request):
#     if request.method == "POST":
#         try:
#             # Parse JSON body
#             body = json.loads(request.body)
#             p_item_id = body.get("item_id")

#             if not p_item_id:
#                 return JsonResponse({"error": "Missing item_id."}, status=400)

#             p_item_id = int(p_item_id)

#             # Call the function from services.py
#             forecast, mad, mse, mape = predict_demand_v1(p_item_id)

#             return JsonResponse({
#                 "forecasted_value": forecast,
#                 "mad": mad,
#                 "mse": mse,
#                 "mape": mape
#             })

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#     return JsonResponse({"error": "Invalid HTTP method. Use POST."}, status=405)
