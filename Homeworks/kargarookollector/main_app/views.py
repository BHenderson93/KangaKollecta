from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
from .models import Roo

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
    print("i am in the server")
    return render(request , 'roo_central/roo_deets.html', {'kanga' : roo})