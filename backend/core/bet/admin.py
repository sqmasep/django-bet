from django.contrib import admin
from .models import Bet
# Register your models here.

class BetAdmin(admin.ModelAdmin):
    list_display = ('name', 'bet_amount')
    
admin.site.register(Bet)
