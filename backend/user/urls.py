from django.urls import path
from .views import  UserDestroyAPIView, UserDetailAPIView, UserListCreateAPIView, UserUpdateAPIView

urlpatterns = [
    path('', UserListCreateAPIView.as_view()),
    path('<int:pk>/', UserDetailAPIView.as_view()),
    path('<int:pk>/update/', UserUpdateAPIView.as_view()),
    path('<int:pk>/delete/', UserDestroyAPIView.as_view()),
]
