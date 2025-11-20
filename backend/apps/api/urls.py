from django.urls import path
from .views import *

urlpatterns = [
    path("get-pinhole-data/", get_pinhole_data),
]