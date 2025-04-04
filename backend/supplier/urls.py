
from django.urls import path
from . import views

urlpatterns = [
    path('add-supplier/', views.add_supplier_view, name='add_supplier'),
    path('add-brand/', views.add_brand_view, name='add_brand'),
    path('all-suppliers/', views.suppliers_view, name='all_suppliers'),
    path("brands/", views.get_brands_see, name="get_brands_see"),
]