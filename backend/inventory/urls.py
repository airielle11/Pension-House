
from django.urls import path
from . import views

urlpatterns = [
# Stock Inventory Routes
    path("stocks/", views.get_stocks_view, name="get_stocks_view"),
    path("defective-items/", views.get_defective_items_view, name="get_defective_items_view"),
    path("categories/", views.get_categories_view, name="get_categories_view"),
    path("brands/", views.get_brands_view, name="get_brands_view"),
    path("suppliers/", views.get_suppliers_view, name="get_suppliers_view"),
    path("containers/", views.get_containers_view, name="get_containers_view"),
    path("units/", views.get_units_view, name="get_units_view"),
    path("add-new-item/", views.add_new_item_view, name="add_new_item"),
    path("add-defective-items/", views.add_defective_items_view, name="add_defective_items_view"),
    path("mark-defect-as-returned/", views.mark_defect_as_returned_view, name="mark_defect_as_returned_view"),
    path("update-stock/", views.update_stock_view, name="update_stock_view"),
    path("update-defect-qty/", views.update_defect_qty_view, name="update_defect_qty_view"),

    path("add-new-item2/", views.add_new_item2, name="add_new_item2"),

   # path("add/", views.add_stock_item_view, name="add_stock_item"),
    #path("update/", views.update_stock_item_view, name="update_stock_item"),
    #path("delete/", views.delete_stock_item_view, name="delete_stock_item")
]