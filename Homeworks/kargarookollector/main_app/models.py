from django.db import models
from django.urls import reverse



# Create your models here.

class Species(models.Model):
    name = models.CharField(max_length = 100)
    def __str__(self):
        return self.name

class Roo(models.Model):
    name = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField(max_length=250)
    favorite_species_to_kick = models.CharField(max_length=100)
    ridden_by = models.ManyToManyField(Species) # Please ignore this line. Many to many is actually accomplished through the Ride's model. Many Roo's to Many Species through Rides.
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('detail', kwargs={'roo_id': self.id})


def species_list():
    specList = []
    for s in Species.objects.all():
        specList.append((s.id , s.name))
    # print(species_list)
    if not species_list:
        specList.append( ('Fail' , 'Upload some species first in New Rider Species!'))

    return specList

class Ride(models.Model):
    roo = models.ForeignKey(Roo, on_delete=models.CASCADE)
    species = models.ForeignKey(Species, on_delete=models.CASCADE , choices=species_list())
    duration = models.IntegerField()
    notes = models.TextField(max_length = 500)

    class Meta:
        ordering = ['-duration']

    def __str__(self):
        return f"Ride involing {self.species} riding the Roo named {self.roo}."

