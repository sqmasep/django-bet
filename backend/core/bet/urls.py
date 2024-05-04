from django.urls import path, re_path
from .views import SignUpForBetView, UserBetsView, CreateBetView, CastBetView, GetBetView

urlpatterns = [
     re_path(r'bets/signup/(?P<signup_code>[A-Za-z0-9]{5})/$', SignUpForBetView.as_view(), name='signup-for-bet'),
     path('bets/user-bets/', UserBetsView.as_view(), name='user-bets'),
     path('bets/create/', CreateBetView.as_view(), name='create-bet'),
     re_path(r'bets/(?P<signup_code>[A-Za-z0-9]{5})/$', GetBetView.as_view(), name='get-bet'),
     path('bets/cast-userbet/', CastBetView.as_view(), name='cast-userbet'),
]