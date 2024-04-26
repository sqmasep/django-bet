from django.db import models
from authentication.models import CustomUser

# Create your models here.
class Bet(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(CustomUser, related_name='author', null=True, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    def redistribute_winnings(self):
        winning_option = self.get_winning_option()
        total_bet_amount = self.user_bets.aggregate(total=Sum('amount'))['total']
        winning_bets = UserBet.objects.filter(option=winning_option)

        for bet in winning_bets:
            user_share = bet.amount / winning_option.total_amount
            winnings = user_share * total_bet_amount
            bet.user.balance += winnings
            bet.user.save()

    def get_winning_option(self):
        return self.options.first()

class Option(models.Model):
    text = models.CharField(max_length=100)
    bet = models.ForeignKey(Bet, related_name='options', on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    number_of_bets = models.PositiveIntegerField(default=0)

    def update_totals(self):
        self.total_amount = self.user_bets.aggregate(total=Sum('amount'))['total'] or 0
        self.number_of_bets = self.user_bets.count()
        self.save()

class UserBet(models.Model):
    user = models.ForeignKey(CustomUser, related_name='user_bets', on_delete=models.CASCADE)
    bet = models.ForeignKey(Bet, related_name='user_bets', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    option = models.ForeignKey(Option, related_name='user_bets', on_delete=models.CASCADE)
    date_placed = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} placed {self.amount} on {self.option.text}"
