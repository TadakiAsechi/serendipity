from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.send_answer, name='send_answer'),
]