from django.db import models
from authentication.models import CustomUser

# Create your models here.
class Bet(models.Model):
    name = models.CharField(max_length = 100)
    author = models.ForeignKey(CustomUser, related_name='author', null=True, on_delete = models.CASCADE)
    
    def __str__(self):
        return self.name
    
class Option(models.Model):
    text = models.CharField(max_length = 100)
    bet = models.ForeignKey(Bet, related_name='options', on_delete = models.CASCADE)
