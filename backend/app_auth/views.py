from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics

from .serializers import CustomTokenObtainPairSerializer
from user import permissions as user_permissions, models as user_models, serializers as user_serializers

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# class RegisterAPIView(generics.CreateAPIView):
#     queryset = user_models.UserProfile.objects.all()
#     serializer_class = RegistrationSerializer
#     permission_classes = [user_permissions.IsNotAuthenticated,]

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if (serializer.is_valid(raise_exception=True)):
#             serializer.save()

#             print("Registered user:", serializer.data)



class RegisterAPIView(generics.CreateAPIView):
    serializer_class = user_serializers.UserProfileSerializer
    queryset = user_models.UserProfile.objects.all()
    permission_classes = [user_permissions.IsNotAuthenticated,]