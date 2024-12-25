from django.urls import path
from . import views

# The frontend will send request to the backend and handle response using axios
# This is where you should put the backend paths to be access from the frontend
urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("login/", views.sign_in_view, name="login"),
    path("request_reset_password/", views.request_reset_password_view, name="request_reset_password"),
    path("reset_password/", views.reset_password_view, name="reset_password"),
]
