from django.urls import path
from .views import *

urlpatterns = [
    path("pinhole-data/", pinhole_data),
]