from django.db import models
from user.models import UserProfile


class VideoStream(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    stream_key = models.CharField(max_length=50, default="4nZmRBG9ZDio8dBHyJL2A2imZ98Qk7mPRWM7XQGedBNH")
    start_time  = models.DateTimeField()
    thumbnail = models.CharField(max_length=200, default="https://dummyimage.com/720x600/ababab/ffffff&text=Stream")
    created = models.DateTimeField(auto_now_add=True)
    # subscribed_by = models.ManyToManyField(User)

    def __str__(self) -> str:
        return self.title


class Subscription(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True)
    video_stream = models.ForeignKey(VideoStream, on_delete=models.CASCADE)


    def __str__(self) -> str:
        return str(self.video_stream) + " --- " + str(self.user)