from django.db import models
from django.contrib.auth.models import User
import uuid


class Task(models.Model):
    user = models.ForeignKey(
    User, on_delete=models.CASCADE, related_name='tasks')
    identifier = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(blank=True, null=True)
    finish_at = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
