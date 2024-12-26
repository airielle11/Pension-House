
from django.urls import path
from . import views

urlpatterns = [
# Stock Inventory Routes
    path("stocks/", views.get_stocks_view, name="get_stocks_view"),
    path("add/", views.add_stock_item_view, name="add_stock_item"),
    path("update/", views.update_stock_item_view, name="update_stock_item"),
    path("delete/", views.delete_stock_item_view, name="delete_stock_item")
]