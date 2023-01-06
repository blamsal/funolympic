from rest_framework import serializers 

from .models import VideoStream, Subscription

class VideoStreamSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VideoStream
        fields = ('id','title','description','stream_key', 'start_time', 'created')

