from django.contrib import admin
from .models import Bet, Option
# Register your models here.


class OptionInline(admin.TabularInline):  # You can also use admin.StackedInline for a different layout
    model = Option
    extra = 1  # Number of empty forms to display

class BetAdmin(admin.ModelAdmin):
    list_display = ('name', 'author')
    inlines = [OptionInline,]
    
admin.site.register(Bet, BetAdmin)
admin.site.register(Option)