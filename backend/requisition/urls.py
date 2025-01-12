from django.urls import path
from . import views

urlpatterns = [
    
    # path("employees/", views.view_active_employees_view, name="employees"),
    # path("add_employee/", views.add_employee_account_view, name="add_employee"),
    path("get-rooms/", views.get_rooms_view, name="get_rooms_view"),
    path("get-priority-levels/", views.get_priority_levels_view, name="get_priority_levels_view"),
    path("create-requisition/", views.create_requisition_service_view, name="create_requisition_service_view"),
    path("get-item-requisitions/", views.get_item_requisitions_view, name="get_item_requisitions_view"),
    path("get-job-requisitions/", views.get_job_requisitions_view, name="get_job_requisitions_view"),
    path("requisitions-attach-items/", views.requisition_attach_items_view, name="requisition_attach_items_view"),
    path("requisitions-attach-job/", views.requisition_attach_job_view, name="requisition_attach_job_view"),
    path("approve-decline-item/", views.approve_or_decline_item_view, name="approve_or_decline_item_view"),
    path("approve-decline-job/", views.approve_or_decline_job_view, name="approve_or_decline_job_view"),
    path("get-attached-items/", views.get_attached_items_view, name="get_attached_items_view"),
    path("get-item-image/", views.get_item_image_view, name="get_item_image_view"),
    path("get-attached-job/", views.get_attached_job_view, name="get_attached_job_view"),
    path("accept-job/", views.accept_job_view, name="accept_job_view"), 
    path("accept-and-mark-item-available/", views.accept_and_mark_item_as_available_view, name="accept_and_mark_item_as_available_view"),
    path("accept-and-mark-item-unavailable/", views.accept_and_mark_item_as_unavailable_view, name="accept_and_mark_item_as_unavailable_view"),
    path("mark-item-as-completed/", views.mark_item_as_completed_view, name="mark_item_as_completed_view"),
    path("get-stocks/", views.get_stocks_view, name="get_stocks_view"), #walay e return
    path("get-ar-image/", views.get_ar_image_view, name="get_ar_image_view"),#object not found
    
     
]   