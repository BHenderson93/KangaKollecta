from django.shortcuts import render

# Add the following import
from django.http import HttpResponse
from .models import Cat

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

# Define the home view
def home(request):
  return HttpResponse('<h1>Hello /ᐠ｡‸｡ᐟ\ﾉ</h1>')


def about(request):
  return render(request, 'about.html')

  # Add new view
def cats_index(request):
  cats = Cat.objects.all()
  return render(request, 'cats/index.html', { 'cats': cats })

def cats_detail(request, cat_id):
  cat = Cat.objects.get(id=cat_id)
  return render(request, 'cats/detail.html', { 'cat': cat })