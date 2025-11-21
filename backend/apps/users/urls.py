from django.urls import path
from .views import *

urlpatterns = [
    path("csrf/", csrf, name="csrf"),
    path("post-login/", post_login, name="post_login"),
    path("post-logout/", post_logout, name="post_logout"),
    path("get-home/", get_home, name="get_home"),
]