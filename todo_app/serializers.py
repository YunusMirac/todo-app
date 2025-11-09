from rest_framework import serializers
from .models import Todo

# Übersetzer zwischen Json und Python-Objekten
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'status']