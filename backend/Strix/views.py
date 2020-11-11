from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.contrib.auth.mixins import PermissionRequiredMixin,LoginRequiredMixin
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from .models import * 

from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from .MailService import *
from django.utils.http import urlsafe_base64_decode


class CustomerCreation(PermissionRequiredMixin,APIView):

    permission_required = ('auth.add_user')

    def post(self,request):
        data = json.loads(request.body)
        return Response(data=data, status=200)


class Login(APIView):

    def post(self, request, format=None):

        data = json.loads(request.body)

        email = data['email']
        password = data['password']
        if User.objects.filter(email=email.lower()).exists():
            Username = User.objects.get(email=email.lower()).username
        else:
            return Response({"msg":"You are not a registered user try again"},status=404)

        user = authenticate(username=Username,password=password)

        if user is not None:
            auth.login(request,user)
            token,_ = Token.objects.get_or_create(user=user)
            role = User.objects.get(username=user).role
            return Response(
                {
                    "Token": token.key,
                    "Role": role
                },status=200)
        else:
            return Response({"msg":"You are not a registered user try again"},status=404)


class Logout(APIView):
    
    def post(self,request):
        print(request.user)
        if request.user.is_anonymous:
            return Response(False,status=404)
        else:
            auth.logout(request)
            return Response(True,status=200)



###############################################################################################


class EmailConfirmation(APIView):

    token_generator = default_token_generator

    def post(self,request):

        data = json.loads(request.body)
        email = data['email']

        opts = {
            'request': self.request,
            'email': email,
            'token_generator': self.token_generator
        }
        
        if(EmailSend.send(self,**opts)):
            return Response({"key": "Done"},status=200)
        else:
            return Response({"key": "Not Done"},status=404)

class PasswordConfirmation(APIView):

    token_generator = default_token_generator

    def post(self,request):

        data = json.loads(request.body)

        uid = data['uid']
        token = data['token']

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
            user = None
        
        if self.token_generator.check_token(user,token):
            return Response({"uid":uid,"token":token},status=200)
        else:

            return Response(False,status=404)


class ResetPassword(APIView):
    
    token_generator = default_token_generator

    def post(self,request):
        
        data = json.loads(request.body)
        password = data['password']
        retypedPass = data['retypedPass']
        confirm = data['confirm']

        uid = confirm['uid']
        token = confirm['token']

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
            user = None
        
        if self.token_generator.check_token(user,token):
            if password==retypedPass:
                user.set_password(password)
                user.save()
                # print("I am here")
                return Response({},status=200)
            else:
                return Response(True,status=404)
        else:
            return Response(False,status=404)