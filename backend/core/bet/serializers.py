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


class BetSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)

    class Meta:
        model = Bet
        fields = ['id', 'name', 'author', 'users', 'signup_code', 'options']
        read_only_fields = ['author', 'signup_code']

    def create(self, validated_data):
        options_data = validated_data.pop('options', [])
        bet = Bet.objects.create(**validated_data)
        for option_data in options_data:
            Option.objects.create(bet=bet, **option_data)
        return bet
    

class UserBetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBet
        fields = ['id', 'user', 'bet', 'amount', 'option', 'date_placed']
        read_only_fields = ['user', 'date_placed']

    def create(self, validated_data):
        # Get the option instance
        option = validated_data.get('option')
        # Update the total_amount and number_of_bets on the option
        option.total_amount += validated_data.get('amount')
        option.number_of_bets += 1
        option.save()
        return super().create(validated_data)