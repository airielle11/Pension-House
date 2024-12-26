"""
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .services import (
    get_stocks,
    get_defective_items,
    get_categories,
    get_brands,
    get_suppliers,
    get_containers,
    get_units,
    add_new_item,
    add_defective_items,
    mark_defect_as_returned,
    update_stock,
    update_defect_qty,
)
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .services import get_stocks
"""
    get_defective_items,
    get_categories,
    get_brands,
    get_suppliers,
    get_containers,
    get_units,
    add_new_item,
    add_defective_items,
    mark_defect_as_returned,
    update_stock,
    update_defect_qty
    """
from django.http import HttpResponse


@csrf_exempt
def get_stocks_view(request):
    if request.method == "GET":
        try:
            # Call the service function to get stocks
            result = get_stocks()  # Make sure the function is called
            
            if result["success"]:
                return JsonResponse({"stocks": result["stocks"]}, status=200)
            else:
                return JsonResponse({"error": result.get("message", "No stocks found.")}, status=404)
        except Exception as e:
            # Handle unexpected server errors
            return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

             # Handle invalid HTTP methods
    return JsonResponse({"error": "Invalid HTTP method"}, status=405)

"""
# View to display stocks
def stocks_view(request):
    try:
        stocks = get_stocks()  # Retrieve stock details
        return render(request, "stocks.html", {"stocks": stocks})
    except Exception as e:
        return render(request, "error.html", {"error": str(e)})

# View to display defective items
def defective_items_view(request):
    try:
        defective_items = get_defective_items()
        return render(request, "defective_items.html", {"defective_items": defective_items})
    except Exception as e:
        return render(request, "error.html", {"error": str(e)})

# View to display categories
def categories_view(request):
    try:
        categories = get_categories()
        return render(request, "categories.html", {"categories": categories})
    except Exception as e:
        return render(request, "error.html", {"error": str(e)})

# View to display brands
def brands_view(request):
    try:
        brands = get_brands()
        return render(request, "brands.html", {"brands": brands})
    except Exception as e:
        return render(request, "error.html", {"error": str(e)})

# View to display suppliers
def suppliers_view(request):
    try:
        suppliers = get_suppliers()
        return render(request, "suppliers.html", {"suppliers": suppliers})
    except Exception as e:
        return render(request, "error.html", {"error": str(e)})

# View to add a new item
def add_item_view(request):
    if request.method == "POST":
        try:
            # Extract data from the POST request
            item_name = request.POST.get("item_name")
            item_descr = request.POST.get("item_descr")
            image = request.POST.get("image")
            scat_id = int(request.POST.get("scat_id"))
            br_id = int(request.POST.get("br_id"))
            splr_id = int(request.POST.get("splr_id"))
            emp_id = int(request.POST.get("emp_id"))
            net_volqty = float(request.POST.get("net_volqty"))
            in_stock = int(request.POST.get("in_stock"))
            rol = int(request.POST.get("rol"))
            pk_descr = request.POST.get("pk_descr")
            cont_id = int(request.POST.get("cont_id"))
            ut_id = int(request.POST.get("ut_id"))

            # Call service to add the new item
            add_new_item(
                item_name,
                item_descr,
                image,
                scat_id,
                br_id,
                splr_id,
                emp_id,
                net_volqty,
                in_stock,
                rol,
                pk_descr,
                cont_id,
                ut_id,
            )
            return redirect("stocks_view")  # Redirect to stocks page
        except Exception as e:
            return render(request, "error.html", {"error": str(e)})
    return render(request, "add_item.html")

# View to update stock
def update_stock_view(request, item_id):
    if request.method == "POST":
        try:
            new_stock = int(request.POST.get("new_stock"))
            update_stock(item_id, new_stock)
            return JsonResponse({"success": True, "message": "Stock updated successfully"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    return render(request, "update_stock.html", {"item_id": item_id})

# View to mark a defect as returned
def mark_defect_as_returned_view(request, defect_item_id):
    if request.method == "POST":
        try:
            mark_defect_as_returned(defect_item_id)
            return JsonResponse({"success": True, "message": "Defect marked as returned"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    return render(request, "mark_defect.html", {"defect_item_id": defect_item_id})
"""