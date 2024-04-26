from django.shortcuts import render
from rest_framework import viewsets
from.serializers import BetSerializer, UserBetSerializer
from.models import Bet
from rest_framework import generics
from rest_framework import permissions, status, views
from rest_framework.response import Response
from .models import Bet, CustomUser

# Create your views here.


class BetViewSet(viewsets.ModelViewSet):
    serializer_class = BetSerializer
    queryset = Bet.objects.all()


class UserBetsView(generics.ListAPIView):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Bet.objects.filter(users=user)


class CreateBetView(generics.CreateAPIView):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class SignUpForBetView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, signup_code):
        try:
            bet = Bet.objects.get(signup_code=signup_code)
        except Bet.DoesNotExist:
            return Response({'detail': 'Invalid signup code.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user in bet.users.all():
            return Response({'detail': 'You are already signed up for this bet.'}, status=status.HTTP_400_BAD_REQUEST)
        
        bet.users.add(request.user)
        return Response({'detail': 'Signed up successfully.'}, status=status.HTTP_200_OK)



class CastBetView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserBetSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            # Check if the user is signed up for the bet
            bet_id = serializer.validated_data['bet'].id
            if not Bet.objects.filter(id=bet_id, users=request.user).exists():
                return Response({'detail': 'You are not signed up for this bet.'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)