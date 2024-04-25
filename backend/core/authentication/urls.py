
from django.urls import path
from.views import RegisterView, Loginview, LogoutView

urlpatterns = [
    path('register', RegisterView.as_view(), name="register"),
    path('login', Loginview.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name = "logout")
]