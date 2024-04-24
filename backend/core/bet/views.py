from django.shortcuts import render
from rest_framework import viewsets
from.serializers import BetSerializer
from.models import Bet

# Create your views here.


class BetViewSet(viewsets.ModelViewSet):
    serializer_class = BetSerializer
    queryset = Bet.objects.all()