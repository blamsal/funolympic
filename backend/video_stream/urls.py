from django.urls import path
from .views import VideoStreamListCreateAPIView, VideoStreamDetailAPIView, VideoStreamUpdateAPIView, VideoStreamDeleteAPIView

urlpatterns = [
    path('', VideoStreamListCreateAPIView.as_view()),
    path('<int:pk>/', VideoStreamDetailAPIView.as_view()),
    path('<int:pk>/update/', VideoStreamUpdateAPIView.as_view()),
    path('<int:pk>/delete/', VideoStreamDeleteAPIView.as_view()),
]