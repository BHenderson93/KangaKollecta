from django.db import models

# Create your models here.
class Roo(models.Model):
    name = models.CharField(max_length=100)
    height = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField(max_length=250)
    favorite_species_to_kick = models.CharField(max_length=100)

    def __str__(self):
        return self.name