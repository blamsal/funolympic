from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework import permissions


class IsNotAuthenticated(BasePermission):
    """Permit only users that are NOT logged in!"""
    def has_permission(self, request, view):
        return request.user.is_anonymous


# class IsNotAuthenticatedOrAdminUser(BasePermission):
#     """Permit only users that are NOT logged in!"""
#     def has_permission(self, request, view):
#         if request.user.is_anonymous:
#             return True
#         else: 
#             return request.user.is_staff


class IsAdminUserOrReadOnly(BasePermission):
    """
    Ensures user is staff when creating or updating an user otherwise return a
    HTTP forbidden (403)
    """
    def has_permission(self, request, view):
        # safe methods are get, head, options
        return bool(
            request.method in SAFE_METHODS or
            (request.user and request.user.is_staff)
            )


class IsOwnProfile(permissions.BasePermission):
    """Allow user to update their status"""

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and obj.id == request.user.id
            )