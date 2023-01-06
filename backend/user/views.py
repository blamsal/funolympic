from rest_framework import generics, permissions, status
from rest_framework import filters

from user import serializers, models, permissions as user_permissions


class UserListCreateAPIView(generics.ListCreateAPIView):
    """handle creating and upating user profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    permission_classes = [permissions.IsAdminUser]

    filter_backends = (filters.SearchFilter,)
    search_fields = ('name','email',)



class UserDetailAPIView(generics.RetrieveAPIView):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    permission_classes = [user_permissions.IsOwnProfile]

class UserDestroyAPIView(generics.DestroyAPIView):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    permission_classes = [permissions.IsAdminUser,]


class UserUpdateAPIView(generics.UpdateAPIView):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    permission_classes = [user_permissions.IsOwnProfile]