from django.contrib import admin
from django.urls import include, path
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register", CreateUserView.as_view(), name="register"),
    path("api-auth/", include("rest_framework.urls")),
    
    # Take everything that starts with the "api/"
    path("api/", include("api.urls")),
    
    # JWT Authentication Views
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    
     # Login app
     path("", include("login.urls")), 
     path("", include("accounts.urls")),
     
     # puchasing and delivery app
     path("", include("purchasing_delivery.urls")),
     path("", include("accounts.urls")),
     path("", include("requisition.urls")),
     path("", include("rooms.urls")),
     path("", include("report.urls")),
     
     #inventory
     path("", include("inventory.urls")),

     path("", include("supplier.urls")),
]
