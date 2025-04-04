from django.urls import path
from . import views


urlpatterns = [
    path("generate-report/", views.generate_report_view, name="generate_report_view"),
]
