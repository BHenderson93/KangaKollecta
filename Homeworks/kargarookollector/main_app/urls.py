from django.urls import path
from . import views

urlpatterns = [
    path('' , views.home , name='home' ),
    path('about' , views.about , name='about'),
    path('roo-list', views.roo_list, name='hoppys'),
    path('roo-details/<int:roo_id>', views.roo_detail, name='detail'),
    path('roo/chip' , views.RooChipped.as_view() , name='chip'),
    path('roo/<int:pk>/update/' , views.RooUpdate.as_view() , name='roo_update'),
    path('roo/<int:pk>/delete/' , views.RooDelete.as_view() , name='roo_delete'),
    path('ride/<int:roo_id>/create' , views.ride_create , name='ride_create'),
    path('roo-riding-species' , views.species , name='species'),
    path('roo-riding-species/create' , views.species_create , name='species_create'),
]