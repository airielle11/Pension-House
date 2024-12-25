from django.urls import path
from . import views

urlpatterns = [
    path("employees/", views.view_active_employees_view, name="employees"),
    path("add_employee/", views.add_employee_account_view, name="add_employee"),
    path("delete_employee/", views.delete_employee_account_view, name="delete_employee")
]