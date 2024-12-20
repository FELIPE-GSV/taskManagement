from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    # task
    path('findTasks/', views.get_Tasks, name="get_all_tasks"),
    path('createTask/', views.post_task, name="post_task"),
    path('putTask/<str:identifier>', views.put_task_by_id, name="put_task"),
    path('findTaskById/<str:identifier>',
         views.get_task_by_id, name="get_task_by_id"),
    path('deleteTaskById/<str:identifier>',
         views.delete_task_by_id, name="delete_task_by_id"),
    path('deleteAllTasks/', views.delete_all_tasks, name="delete_all_tasks"),
    path('findUserByToken/', views.get_user_by_token, name="get_user_by_token"),

    # user
    path('listUsers/', views.list_superusers, name="list_users"),

    # login
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
