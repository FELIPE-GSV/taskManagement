from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import User, Task
from .serializers import UserSerializer, TaskSerializer

import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_token(request):
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    }
    return Response(user_data)


@api_view(['POST'])
def create_superuser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username and password:
        try:
            User.objects.create_superuser(username=username, password=password)
            return Response({'message': 'Superusuário criado com sucesso.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Username e password são necessários.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_superusers(request):
    superusers = User.objects.filter(is_superuser=True)
    superusers_data = [{'username': user.username,
                        'email': user.email} for user in superusers]
    return Response(superusers_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_Tasks(request):

    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_task_by_id(request, identifier):
    if request.method == 'GET':
        task = Task.objects.get(pk=identifier)
        serializer = TaskSerializer(task, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "Id nao encontrado."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task_by_id(request, identifier):
    if request.method == 'DELETE':
        task_to_delete = Task.objects.get(pk=identifier)
        task_to_delete.delete()
        return Response({"message": "Deletado com sucesso"}, status=status.HTTP_202_ACCEPTED)
    return Response({"message": "Id nao encontrado."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_task(request):

    if (request.method) == "POST":
        new_task = request.data
        serializer = TaskSerializer(data=new_task)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST,)
