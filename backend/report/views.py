from datetime import datetime
from django.http import HttpResponse, JsonResponse
from .services import generate_report_v3

def generate_report_view(request):
    try:
        # Extract query parameters
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")

        if not start_date or not end_date:
            return JsonResponse({"error": "start_date and end_date are required."}, status=400)

        # Convert query parameters to date objects
        try:
            p_start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            p_end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except ValueError:
            return JsonResponse({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

        # Call the service function
        response = generate_report_v3(p_start_date, p_end_date)
        return response  # Return the HTTPResponse from the service function
    except Exception as e:
        return JsonResponse({"error": f"An error occurred: {e}"}, status=500)


