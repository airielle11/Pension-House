from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialize here
        model = User
        fields = ["id", "username", "password"]
        # Accept password when creating a new user but,
        # Password will not be return when giving information about a user
        extra_kwargs = {"password": {"write_only": True}}
        
    # Implement a method that will be called when creating a new version of a user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}