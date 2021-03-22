from rest_framework import serializers
from .models import * 

class UserSerializer(serializers.ModelSerializer):

    role = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()

    def get_role(self, obj):
        id = obj.groups.get().id
        if id == 1:
            return "Admin"
        elif id == 2:
            return "Manager"
        elif id == 3:
            return "Developer"
        elif id == 4:
            return "QA"
        elif id == 5:
            return "Customer"
        else:
            return "Block"

    def get_color(self, obj):
        id = obj.groups.get().id
        if id == 1:
            return "dark"
        elif id == 2:
            return "primary"
        elif id == 3:
            return "warning"
        elif id == 4:
            return "info"
        elif id == 5:
            return "success"
        else:
            return "danger"

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined', 'role', 'color', 'groups']


class BlockedUserSerializer(serializers.ModelSerializer):


    role = serializers.SerializerMethodField()
    role_color = serializers.SerializerMethodField()
    prev_role = serializers.SerializerMethodField()
    prev_role_color = serializers.SerializerMethodField()


    def get_role(self, obj):
        return "Block"
    
    def get_role_color(self, obj):
        return "danger"
    
    def get_prev_role(self, obj):
        name = obj.username
        return name.split('-')[0]

    def get_prev_role_color(self, obj):
        name = obj.username.split('-')[0]
        if name == "Admin":
            return "dark"
        elif name == "Manager":
            return "primary"
        elif name == "Developer":
            return "warning"
        elif name == "QA":
            return "info"
        elif name == "Customer":
            return "success"

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined', 'role', 'role_color', 'prev_role', 'prev_role_color', 'groups']


class ProjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Project
        fields = ['id', 'projectname', 'description']

class TicketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ticket
        fields = '__all__'

        
class CreateSprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ('id','name','status','createdby','ticketlist')