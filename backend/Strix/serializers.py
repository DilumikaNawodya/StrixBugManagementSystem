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
            return "QA"
        elif id == 4:
            return "Developer"
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
            return "info"
        elif id == 4:
            return "warning"
        elif id == 5:
            return "success"
        else:
            return "danger"

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'date_joined', 'role', 'color']

class ProjectSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Project
        fields = ['id', 'projectname', 'description']

class CreateSprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ('id','name','status','createdby','ticketlist')