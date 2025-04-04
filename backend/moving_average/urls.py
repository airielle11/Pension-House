from django.urls import path
from . import views

urlpatterns = [
    path('generate_report/', views.generate_report_v2_view, name='generate_report'),
    path('predict_demand/', views.predict_demand_v1_view, name='predict_demand'),
]