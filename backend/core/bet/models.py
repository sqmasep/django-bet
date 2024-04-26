from django.db import models
from authentication.models import CustomUser

# Create your models here.
class Bet(models.Model):
    name = models.CharField(max_length = 100)
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    
    def __str__(self):
        return self.name
    

    