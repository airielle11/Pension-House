from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("reset_password_with_email/", views.request_reset_email_view, name="reset_password_with_email"),
    path("reset_password/", views.reset_password_view, name="reset_password")
]
