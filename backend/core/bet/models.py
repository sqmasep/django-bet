from django.db import models, transaction
import string
from authentication.models import CustomUser
from django.db.models import Sum
from django.core.exceptions import ValidationError
import random
from decimal import Decimal
# import sum module


# Create your models here.

def generate_random_code():
   
    code = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
    if Bet.objects.filter(signup_code=code).exists():
        return generate_random_code()
    return code


class Bet(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(CustomUser, related_name='author', null=True, on_delete=models.CASCADE)
    users = models.ManyToManyField(CustomUser, related_name='users', blank=True)
    is_ended = models.BooleanField(default=False)
    winning_option = models.ForeignKey('Option', related_name='winning_option', null=True, blank=True, on_delete=models.CASCADE)
    signup_code = models.CharField(max_length=5, default=generate_random_code, editable=False, unique=True)
    
    def __str__(self):
        return self.name
    
    def redistribute_winnings(self):
      
        total_bet_amount = self.user_bets.aggregate(total=Sum('amount'))['total']
        winning_bets = UserBet.objects.filter(option=self.winning_option)

        for bet in winning_bets:
            user_share = bet.amount / self.winning_option.total_amount
            winnings = user_share * total_bet_amount
            bet.user.balance += winnings
            bet.user.save()

    def end_bet(self, winning_option):
        self.is_ended = True    
        self.winning_option = winning_option
        self.save()
        self.redistribute_winnings()


class Option(models.Model):
    text = models.CharField(max_length=100)
    bet = models.ForeignKey(Bet, related_name='options', on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    number_of_bets = models.PositiveIntegerField(default=0)
    

    def update_totals(self):
        self.total_amount = self.user_bets.aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
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

    def save(self, *args, **kwargs):
        # Start a transaction
        with transaction.atomic():
            # Check if the user has sufficient balance
            if self.user.balance < self.amount:
                # If not, raise a ValidationError, which should roll back the transaction
                raise ValidationError("Insufficient balance to place this bet.")
            else:
                # Deduct the bet amount from the user's balance
                self.user.balance -= self.amount
                self.user.save()
                # Save the UserBet instance
                super(UserBet, self).save(*args, **kwargs)
                # Schedule the update_totals to be called after the transaction is committed
                transaction.on_commit(lambda: self.option.update_totals())