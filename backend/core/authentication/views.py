from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import RetrieveAPIView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    # get the user associated with the token
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)
    
class Me(RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
    

class AddToBalanceView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CustomUserSerializer
    
    def post(request):
        amount = request.data.get('amount', 0)
        user = request.user
        if amount <= 0:
            return Response({'detail': 'Invalid Amount'},status=status.HTTP_400_BAD_REQUEST)
        user.balance += amount
        user.save(update_fields=['balance'])
        user.refresh_from_db()
        return Response({'balance': user.balance},status=status.HTTP_200_OK)

