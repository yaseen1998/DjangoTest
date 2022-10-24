
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# Create your views here.

from rest_framework_simplejwt.tokens import RefreshToken 
from django.contrib.auth import authenticate

from django.contrib.auth.models import User

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class LoginView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username = username,password = password)
        if user:
            data = get_tokens_for_user(user)
            return Response(data,status=status.HTTP_200_OK)
        else:
            return Response({'error':'Username or Password does not matched.'},status=status.HTTP_400_BAD_REQUEST)
        
class RegisterNewUser(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        user = User.objects.create_user(username=username,password=password,email=email)
        user.save()
        data = get_tokens_for_user(user)
        return Response(data,status=status.HTTP_201_CREATED)