from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from .models import Roo, Species, Ride
from .forms import RidingForm, SpeciesForm


# Create your views here.
def home(request):
    return redirect('about')

def about(request):
    return render(request,'about.html')

def roo_list(request):
    kangas = Roo.objects.all()
    return render(request , 'roo_central/hoppy_bois_and_girls_list.html' , {'hoppy_bois_and_girls': kangas})

def roo_detail(request , roo_id):
    roo = Roo.objects.get(id=roo_id)
    r = Ride.objects.filter(roo = roo)
    rider_species = set()
    for ride in r:
        rider_species.add(ride.species.name)
    rider_species = list(rider_species)
    rest = list(Species.objects.all())
    restofthem = []
    for item in rest:
        if item.name not in rider_species:
            restofthem.append(item.name)

    print(f"rider, rest {rider_species} and {restofthem}")
    return render(request , 'roo_central/roo_deets.html', {'kanga' : roo , 'riding_form': RidingForm() , 'rider_species' : rider_species , 'restofthem':restofthem})

class RooChipped(CreateView):
    model = Roo
    fields = '__all__'

class RooUpdate(UpdateView):
    model = Roo
    fields = ['name' , 'height' , 'age' , 'description' , 'favorite_species_to_kick']

class RooDelete(DeleteView):
    model = Roo
    success_url = '/roo-list'

def ride_create(request , roo_id):
    print(f"in ride create with {request.POST}") 
    roo = Roo.objects.get(id=roo_id)
    species = Species.objects.get(id=request.POST['species'])
    new_ride = Ride(
        roo=roo,
        species=species,
        duration=request.POST['duration'],
        notes=request.POST['notes']
    )
    new_ride.save()
    return redirect('detail' , roo_id = roo_id)

def species(request):
    specs = Species.objects.all()
    return render(request, 'species/species_index.html' , {'species': specs , 'species_form':SpeciesForm()} )

def species_create(request):
    form = SpeciesForm(request.POST)
    if form.is_valid():
        form.save()
    else:
        print("Couldn't save that for some reason...")
    return redirect('species')