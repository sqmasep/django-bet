from django.shortcuts import render
from rest_framework import viewsets
from.serializers import BetSerializer, UserBetSerializer
from.models import Bet, UserBet, Option
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
            bet_id = serializer.validated_data['bet'].id
            # Bet que si inscrit
            if not Bet.objects.filter(id=bet_id, users=request.user).exists():
                return Response({'detail': 'You are not signed up for this bet.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Pas 2 fois le même  bet
            if UserBet.objects.filter(bet_id=bet_id, user=request.user).exists():
                return Response({'detail': 'You have already placed a bet on this bet.'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class GetBetView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, signup_code):  # Add signup_code as an argument
        try:
            bet = Bet.objects.get(signup_code=signup_code)
        except Bet.DoesNotExist:
            return Response({'detail': 'Bet not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BetSerializer(bet)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class EndBetView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, signup_code):
        try:
            bet = Bet.objects.get(signup_code=signup_code)
        except Bet.DoesNotExist:
            return Response({'detail': 'Bet not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if bet.author!= request.user:
            return Response({'detail': 'You are not the owner of this bet.'}, status=status.HTTP_403_FORBIDDEN)
        
        if bet.is_ended:
            return Response({'detail': 'This bet has already ended.'}, status=status.HTTP_400_BAD_REQUEST)
        
        winning_option_id = request.data.get('winning_option_id')
        try:
            winning_option = Option.objects.get(id=winning_option_id)
        except Option.DoesNotExist:
            return Response({'detail': 'Winning option not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        bet.end_bet(winning_option)

        return Response({'detail': 'Bet ended.'}, status=status.HTTP_200_OK)
