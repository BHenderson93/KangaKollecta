from django.db import models
from django.urls import reverse

# Create your models here.
class Roo(models.Model):
    name = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField(max_length=250)
    favorite_species_to_kick = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('detail', kwargs={'roo_id': self.id})

class Species(models.Model):
    name = models.CharField(max_length = 100)

class Ride(models.Model):
    roo = models.ForeignKey(Roo, on_delete=models.CASCADE)
    species = models.CharField(max_length = 100)
    duration = models.IntegerField()
    notes = models.TextField(max_length = 500)

    class Meta:
        ordering = ['-duration']

    def __str__(self):
        return f"Ride involing {self.species} riding the Roo named {self.roo}."

