from django.urls import path
from .views import *

urlpatterns = [
    path("csrf/", csrf, name="csrf"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("home/", home, name="home"),
]