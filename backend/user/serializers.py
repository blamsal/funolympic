from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    """serializes a user profile object"""

    class Meta:
        model = UserProfile
        fields = ('id','email','name','password')
        extra_kwargs = {
            'password':{
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }


    #overwrite the default create function
    #so that password field will be encrypted instead of plain text
    def create(self,validated_data):
        """Create and return a new user"""
        user = UserProfile.objects.create_user(
            email = validated_data['email'],
            name = validated_data['name'],
            password = validated_data['password']
        )

        return user

    def update(self, instance, validated_data):
        user = self.context['request'].user
        user.name = validated_data.get("name", instance.name)
        user.email = validated_data.get("email", instance.email)
        user.set_password(validated_data.get("password", instance.password))
        user.save()
        return user


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """serializes a user profile object"""

    class Meta:
        model = UserProfile
        fields = ('id','email','name','password')
        extra_kwargs = {
            'password':{
                'write_only':True,
                'style':{'input_type':'password'}
            }
        }


    #overwrite the default create function
    #so that password field will be encrypted instead of plain text
    def create(self,validated_data):
       pass

    def update(self, instance, validated_data):
        user = self.context['request'].user
        user.name = validated_data.get("name", instance.name)
        user.email = validated_data.get("email", instance.email)
        user.set_password(validated_data.get("password", instance.password))
        user.save()
        return user