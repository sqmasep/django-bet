from rest_framework import serializers
from .models import Bet, Option



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