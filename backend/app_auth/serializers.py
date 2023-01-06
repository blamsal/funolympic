from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from user.models import UserProfile

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['name'] = user.name

        return token


# class RegistrationSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)
#     name = serializers.CharField(max_length=250, required=True)
#     password = serializers.CharField(max_length=250, required=True)

#     def validate(self, attrs):
#         email = attrs.get('email', None)
#         if UserProfile.objects.filter(email=email).exists():
#             raise serializers.ValidationError("email already exists")

#         return super().validate(attrs)


#     def create(self, validated_data):
#         user = UserProfile.objects.create_user(
#             email = validated_data['email'],
#             name = validated_data['name'],
#             password = validated_data['password']
#         )

#         return user
