from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Cat
# Add the following import
from django.http import HttpResponse
from .models import Cat
from .forms import FeedingForm

# Add the Cat class & list and view function below the imports
""" class Cat:  # Note that parens are optional if not inheriting from another class
  def __init__(self, name, breed, description, age):
    self.name = name
    self.breed = breed
    self.description = description
    self.age = age

cats = [
  Cat('Lolo', 'tabby', 'foul little demon', 3),
  Cat('Sachi', 'tortoise shell', 'diluted tortoise shell', 0),
  Cat('Raven', 'black tripod', '3 legged cat', 4)
] """

class CatCreate(CreateView):
  model = Cat
  fields = '__all__'
  # or fields = ['name', 'breed', 'description', 'age']
  # success_url = '/cats/'

class CatUpdate(UpdateView):
  model = Cat
  # Let's disallow the renaming of a cat by excluding the name field!
  fields = ['breed', 'description', 'age']

class CatDelete(DeleteView):
  model = Cat
  success_url = '/cats/'

# Define the home view
def home(request):
  return render(request,'base.html')

def about(request):
  return render(request, 'about.html')

  # Add new view
def cats_index(request):
  cats = Cat.objects.all()
  return render(request, 'cats/index.html', { 'cats': cats })

def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  # instantiate FeedingForm to be rendered in the template
  feeding_form = FeedingForm()
  return render(request, 'cats/detail.html', {
    # include the cat and feeding_form in the context
    'cat': cat, 'feeding_form': feeding_form
  })

def add_feeding(request, cat_id):
    # create a ModelForm instance using the data in request.POST
  form = FeedingForm(request.POST)
  # validate the form
  if form.is_valid():
    # don't save the form to the db until it
    # has the cat_id assigned
    new_feeding = form.save(commit=False)
    new_feeding.cat_id = cat_id
    new_feeding.save()

  return redirect('detail', cat_id=cat_id)