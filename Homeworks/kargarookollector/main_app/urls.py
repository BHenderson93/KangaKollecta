from django.urls import path
from . import views

urlpatterns = [
    path('' , views.home , name='home' ),
    path('about' , views.about , name='about'),
    path('roo-list', views.roo_list, name='hoppys')
]