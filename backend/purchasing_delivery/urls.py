from django.urls import path
from . import views

urlpatterns = [
    path("create_purchase_order/", views.create_purchase_order_view, name="create_purchase_order"), 
    path("purchase_orders/", views.get_purchase_orders_view, name="purchase_orders"),
    # path("purchase_items/", views.get_purchase_items_view, name="purchase_items"),
    path("purchase_items/<int:purchase_order_id>/", views.get_purchase_items_view, name="purchase_items"),
    path("mark_po_as_complete/", views.mark_po_as_completed_view, name="mark_po_as_complete"),
    path("upload_po_with_quotations/", views.upload_po_with_quotations_view, name="upload_po_with_quotations"),
    path("quotations_image/", views.get_po_quotations_image_view, name="quotations_image")
]