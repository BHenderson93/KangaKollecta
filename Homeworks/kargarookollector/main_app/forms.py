from django.forms import ModelForm
from .models import Ride

class RidingForm(ModelForm):
  class Meta:
    model = Ride
    fields = ['duration' , 'notes']
