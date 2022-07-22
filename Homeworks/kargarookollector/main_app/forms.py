from django.forms import ModelForm
from .models import Ride, Species

class RidingForm(ModelForm):
  class Meta:
    model = Ride
    fields = ['duration' , 'species' , 'notes']


class SpeciesForm(ModelForm):
  class Meta:
    model = Species
    fields = '__all__'