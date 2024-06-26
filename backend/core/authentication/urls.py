from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, HelloWorldView, Me, AddToBalanceView


urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),  
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('me/', Me.as_view(), name='me'),
    path('add-to-balance/', AddToBalanceView.as_view(), name='add_to_balance'),
]