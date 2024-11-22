from django.urls import path 
from . import views

urlpatterns = [
    path('', views.index_view, name=''),
    path("update-product/<str:pk>/", views.update_view, name="update-product"),
    path("delete-product/<str:pk>/", views.delete_view, name="delete-product"),
]
