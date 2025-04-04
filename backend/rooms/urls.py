from django.urls import path
from . import views

urlpatterns = [
        path("add-new-room-type/", views.add_new_room_type_view, name="add_new_room_type_view"),
        path("add-new-room/", views.add_new_room_view, name="add_new_room_view"),
        path("get-room-types/", views.get_room_types_view, name="get_room_types_view"),
        path("sign-in/", views.sign_in_view, name="sign_in_view"),
        
]