from rest_framework import serializers
from .models import Bet, Option, UserBet



class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'total_amount', 'number_of_bets']
        read_only_fields = ['total_amount', 'number_of_bets']

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance



class UserBetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBet
        fields = ['id', 'user', 'bet', 'amount', 'option', 'date_placed']
        read_only_fields = ['user', 'date_placed']

    def create(self, validated_data):
        # Get the current user from the request context
        user = self.context['request'].user
        # Add the user to the validated_data
        validated_data['user'] = user
        # Create a new UserBet instance
        user_bet = UserBet(**validated_data)
        # Save the UserBet instance using the model's save method to handle validation and updating totals
        user_bet.save()
        return user_bet
    

class BetSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)
    user_bets = UserBetSerializer(many=True, required=False)

    class Meta:
        model = Bet
        fields = ['is_ended','id', 'name', 'author', 'users', 'signup_code', 'options', 'user_bets']
        read_only_fields = ['author', 'signup_code']

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        bet = Bet.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(bet=bet, **option_data)
        return bet
    
