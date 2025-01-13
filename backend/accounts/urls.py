from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.view_active_employees_view, name="employees"),
    path("inactive_employees/", views.view_deleted_employees_view, name="inactive_employees"),
    path("add_employee/", views.add_employee_account_view, name="add_employee"),
    path("delete_employee/", views.delete_employee_account_view, name="delete_employee"),
    path("update_employee/", views.update_employee_account_view, name="update_employee"),
    path("recover_employee/", views.recover_employee_account_view, name="recover_employee"),
    path("positions/", views.get_positions_view, name="positions"),
    path("update_general_info/", views.update_employee_name_view, name="update_general_info"),
    path("update_address_info/", views.update_employee_address_view, name="update_address_info"),
    path("update_contact_info/", views.update_employee_phone_view, name="update_contact_info")

]