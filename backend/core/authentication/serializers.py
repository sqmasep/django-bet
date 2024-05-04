from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser
from bet.models import Bet
from bet.serializers import UserBetSerializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

  
        return token

    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super().validate(attrs)
        
        # Custom data you want to include
        data.update({'user': {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'balance': self.user.balance,
            # Include any other fields from the user model
        }})
        return data

    
class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    user_bets = UserBetSerializer(many=True, read_only=True)
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'balance', 'user_bets')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance