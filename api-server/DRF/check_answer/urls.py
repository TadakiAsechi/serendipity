from django.urls import path, include
from . import views

urlpatterns = [
    path('send_answer/', views.send_answer, name='send_answer'),
]