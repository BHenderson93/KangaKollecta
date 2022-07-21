from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from .models import Roo, Species, Ride
from .forms import RidingForm

# Create your views here.
def home(request):
    return render(request,'home.html')

def about(request):
    return render(request,'about.html')

def roo_list(request):
    kangas = Roo.objects.all()
    return render(request , 'roo_central/hoppy_bois_and_girls_list.html' , {'hoppy_bois_and_girls': kangas})

def roo_detail(request , roo_id):
    roo = Roo.objects.get(id=roo_id)
    return render(request , 'roo_central/roo_deets.html', {'kanga' : roo , 'riding_form': RidingForm()})

class RooChipped(CreateView):
    model = Roo
    fields = '__all__'

class RooUpdate(UpdateView):
    model = Roo
    fields = '__all__'

class RooDelete(DeleteView):
    model = Roo
    success_url = '/roo-list'

def ride_create(request , roo_id):
    print(f"in ride create")
    form = RidingForm(request.POST)
    roo = Roo.objects.get(id=roo_id)
    if form.is_valid():
        new_ride = form.save(commit=False)
        new_ride.roo = roo
        new_ride.species = 'Null for now'
        new_ride.save()
    return redirect('detail' , roo_id = roo_id)
