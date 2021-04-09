from rest_framework import serializers
from .models import * 

from django.utils import timezone
to_tz = timezone.get_default_timezone()
from collections import OrderedDict

class UserSerializer(serializers.ModelSerializer):

    role = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    ticket_count = serializers.SerializerMethodField()
    project_count = serializers.SerializerMethodField()

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

    def get_ticket_count(self, obj):
        return Ticket.objects.filter(externaluser=obj.id).count()

    def get_project_count(self, obj):
        return Project.objects.filter(userlist=obj.id).count()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined', 'role', 'color', 'ticket_count', 'project_count']


class BlockedUserSerializer(serializers.ModelSerializer):


    role = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    prev_role = serializers.SerializerMethodField()
    prev_role_color = serializers.SerializerMethodField()
    ticket_count = serializers.SerializerMethodField()
    project_count = serializers.SerializerMethodField()

    def get_role(self, obj):
        return "Block"
    
    def get_color(self, obj):
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

    def get_ticket_count(self, obj):
        return Ticket.objects.filter(externaluser=obj.id).count()

    def get_project_count(self, obj):
        return Project.objects.filter(userlist=obj.id).count()

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined', 'role', 'color', 'prev_role', 'prev_role_color', 'groups', 'ticket_count', 'project_count']


class ProjectSerializer(serializers.ModelSerializer):

    ticket_count = serializers.SerializerMethodField()
    user_count = serializers.SerializerMethodField()

    def get_ticket_count(self, obj):
        return Ticket.objects.filter(project=obj.id).count()
    
    def get_user_count(self, obj):
        return obj.userlist.count()

    class Meta:
        model = Project
        fields = ['id', 'projectname', 'description', 'ticket_count', 'user_count']


class AccessListSerializer(serializers.ModelSerializer):

    userlist = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = ['id', 'projectname', 'userlist']



class CommentSerializer(serializers.ModelSerializer):

    datetime = serializers.SerializerMethodField()
    commented_user = UserSerializer(source='commentedby')

    def get_datetime(self, obj):
        return str(obj.date.astimezone(to_tz).strftime("%Y-%M-%d %H:%M:%S"))

    class Meta:
        model = Comment
        fields = ['id', 'message', 'ticket', 'commentmedia', 'datetime', 'commented_user']

##################################################################################


class BugTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = BugType
        fields = '__all__'

class PrioritySerializer(serializers.ModelSerializer):

    color = serializers.SerializerMethodField()

    def get_color(self, obj):
        if obj.id == 1:
            return "danger"
        elif obj.id == 2:
            return "warning"
        elif obj.id == 3:
            return "success"
        elif obj.id == 4:
            return "primary"

    class Meta:
        model = Priority
        fields = ['id', 'priority', 'level', 'color']

class SeveritySerializer(serializers.ModelSerializer):
    
    color = serializers.SerializerMethodField()

    def get_color(self, obj):
        if obj.id == 1:
            return "danger"
        elif obj.id == 2:
            return "warning"
        elif obj.id == 3:
            return "success"
        elif obj.id == 4:
            return "primary"

    class Meta:
        model = Severity
        fields = ['id', 'severity', 'level', 'color']

class WorkStateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workstate
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketMedia
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):

    BugType = BugTypeSerializer(source="bugtype")
    Workstate = WorkStateSerializer(source="workstate")
    Priority = PrioritySerializer(source='priority')
    Severity = SeveritySerializer(source='severity')

    class Meta:
        model = Ticket
        fields = [
            'id',
            'issuename',
            'issuedescription',
            'date',
            'bspstatus',
            'approval',
            'totaleffort',
            'project',
            'externaluser',
            'review',
            'Workstate',
            'BugType',
            'Priority',
            'Severity'
        ]


###########################################################################

class SprintSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sprint
        fields = '__all__'


class PinnedSprintSerialzer(serializers.ModelSerializer):

    sprint_id = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    path = serializers.SerializerMethodField()

    def get_sprint_id(self, obj):
        return obj.sprint.id
    def get_name(self, obj):
        return obj.sprint.name
    def get_path(self, obj):
        return '/kanbanboard/' + str(obj.sprint.id)

    class Meta:
        model = Pinned
        fields= ['sprint_id', 'name', 'path']


###########################################################################

class DeveloperPerformanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeveloperTicket
        fields = '__all__'

class ProjectDevTimeSerializer(serializers.ModelSerializer):

    project_name = serializers.SerializerMethodField()
    developer_name = serializers.SerializerMethodField()
    issue_title = serializers.SerializerMethodField()

    def get_project_name(self, obj):
        return obj.ticket.project.projectname

    def get_developer_name(self, obj):
        return obj.user.username

    def get_issue_title(self, obj):
        return obj.ticket.issuename

    class Meta:
        model = DeveloperTicket
        fields = ['id','developer_name','project_name', 'issue_title','date','dailyeffort','ticket']


############################################################################

class CustomKanbanTasksSerializerFirst(serializers.ListSerializer):

    def to_representation(self, data):
        iterable = data.all()
        tasks = {}

        for item in iterable:
            child_rep = self.child.to_representation(item)
            k, v = list(child_rep.items()).pop()
            tasks[k] = v

        return(
            [tasks]
        )

class KanbanTestSerializerFirst(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'
        list_serializer_class = CustomKanbanTasksSerializerFirst

    def to_representation(self, instance):
        return {
            str(instance.id):{
                "id": str(instance.id),
                "content": instance.issuename,
                "bugtype": instance.bugtype.bugtype,
                "priority": instance.priority.priority,
                "severity": instance.severity.severity
            }   
        }

class CustomKanbanTasksSerializerSecond(serializers.ListSerializer):

    def to_representation(self, data):
        iterable = data.all()
        tasks = {}

        for item in iterable:
            child_rep = self.child.to_representation(item)
            k, v = list(child_rep.items()).pop()
            if k in tasks.keys():
                tasks[k].append(v[0])
            else:
                tasks[k] = []
                tasks[k].append(v[0])

        

        data = {
            "column-1": {
                "id": "column-1",
                "title": "Open",
                "taskIds": tasks[1] if 1 in tasks else [],
            },
            "column-2": {
                "id": "column-2",
                "title": "In-Progress",
                "taskIds": tasks[2] if 2 in tasks else [],
            },
            "column-3": {
                "id": "column-3",
                "title": "Review",
                "taskIds": tasks[3] if 3 in tasks else [],
            },
            "column-4": {
                "id": "column-4",
                "title": "Completed",
                "taskIds": tasks[4] if 4 in tasks else [],
            }
        }

        return(
            [data]
        )


class KanbanTestSerializerSecond(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'
        list_serializer_class = CustomKanbanTasksSerializerSecond

    def to_representation(self, instance):
        return {
            instance.workstate.id:[str(instance.id)]   
        }



#===================================================
#------------------Chandeepa-----------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'


class DevUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =('id', 'username')




class UserDevTicketSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    firstname = serializers.CharField(source='user.first_name')
    issuename =  serializers.CharField(source='ticket.issuename')
    project_id = serializers.IntegerField(source='ticket.project_id')
 
    class Meta:
        model = DeveloperTicket
        fields =('user_id','project_id','username','firstname','date','dailyeffort','ticket_id','issuename')

#--------Bug Summary-------------

class BugSummaryStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields =('id','workstate_id','project_id')



class ViewProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields =('id','projectname')


class DeveloperPerformanceSerializer(serializers.ModelSerializer):
    workstate_id = serializers.IntegerField(source='ticket.workstate_id')
    date = serializers.DateField(format='%B')
    project_id = serializers.IntegerField(source='ticket.project_id')

    class Meta:
        model = DeveloperTicket
        fields =('user_id','date','dailyeffort','workstate_id','project_id')


class ProjectDevTimeSerializer(serializers.ModelSerializer):

    project_name = serializers.SerializerMethodField()
    developer_name = serializers.SerializerMethodField()
    issue_title = serializers.SerializerMethodField()

    def get_project_name(self, obj):
        return obj.ticket.project.projectname

    def get_developer_name(self, obj):
        return obj.user.username

    def get_issue_title(self, obj):
        return obj.ticket.issuename

    class Meta:
        model = DeveloperTicket
        fields = ['id','developer_name','project_name', 'issue_title','date','dailyeffort','ticket']


class ProjectBugDevelopmentSerializer(serializers.ModelSerializer):
    project_name = serializers.SerializerMethodField()
  
    def get_project_name(self, obj):
        return obj.project.projectname

    class Meta:
        model = Ticket
        fields = ['id','project_id','project_name', 'workstate_id']

class MonthBugDevelopmentSerializer(serializers.ModelSerializer):
   
    class Meta:
        model =  Ticket
        fields = ['id','issuename', 'date','workstate_id']