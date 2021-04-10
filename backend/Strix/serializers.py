from rest_framework import serializers
from .models import * 
from django.utils import timezone
from collections import OrderedDict

#===================================================
#------------------Dilumika-----------------------
#===================================================

to_tz = timezone.get_default_timezone()

class UserSerializer(serializers.ModelSerializer):

    role = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    ticket_count = serializers.SerializerMethodField()
    project_count = serializers.SerializerMethodField()

    def get_role(self, obj):
        if obj.is_blocked:
            return "Block"
        else:
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
        if obj.is_blocked:
            return "danger"
        else:
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

#===================================================
#------------------Dilshani-----------------------
#===================================================


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

class BMSTicketSerializer(serializers.ModelSerializer):

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


#===================================================
#------------------Dinithi-----------------------
#===================================================

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
#===================================================

class UserReportSerializer(serializers.ModelSerializer):
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



#######################################################YR#####################################
class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketMedia
        fields = "__all__"

class UserSerializerBCL((serializers.ModelSerializer)):
    fullname = serializers.SerializerMethodField('full_name')

    def full_name(self, obj):
        name = obj.first_name + " " + obj.last_name
        return name

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'fullname']


class TicketSerializer(serializers.Serializer):
    id=serializers.IntegerField()
    issuename=serializers.CharField()
    issuedescription=serializers.CharField()
    date = serializers.DateField()
    project=serializers.SerializerMethodField()
    workstate=serializers.SerializerMethodField()
    ticketMedia = MediaSerializer(source='ticketmedia_set', many=True)
    createdby = UserSerializerBCL(read_only=True, source='externaluser')
    workstatetext = serializers.StringRelatedField(source='workstate')
    priority = serializers.SerializerMethodField()
    severity=serializers.SerializerMethodField()
    bugtype=serializers.SerializerMethodField()
    workstatetext= serializers.SerializerMethodField()

    def get_priority(self,obj):
        return(obj.priority.priority)
    def get_severity(self,obj):
        return(obj.severity.severity)
    def get_bugtype(self,obj):
        return(obj.bugtype.bugtype)
    def get_workstatetext(self,obj):
        return(obj.workstate.workstatename)
    def get_project(self,obj):
        return(obj.project.id)
    def get_workstate(self,obj):
        return(obj.workstate.id)
    

    def create(self, validated_data):
        ticketMedia = validated_data.pop('ticketMedia')
        ticket = Ticket.objects.create(**validated_data)
        for media in ticketMedia:
            TicketMedia.objects.create(**media, issuename=ticket)
        return ticket
    
        
class SprintSummarySerializer(serializers.Serializer):

    finished = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    active = serializers.SerializerMethodField()
    estimated_hours = serializers.SerializerMethodField()
    actual_hours = serializers.SerializerMethodField()
    ticketlist=TicketSerializer(many=True,read_only=True)

    def get_finished(self, obj):
        y = 0
        for x in obj.ticketlist.all():
            if(x.workstate.id == 4 ):
                y += 1
        return (y)

    def get_total(self, obj):
        return(obj.ticketlist.all().count())

    def get_active(self, obj):
        y = 0
        for x in obj.ticketlist.all():
            if(x.workstate.id != 4):
                y += 1
        return(y)

    def get_estimated_hours(self, obj):
        enddate = obj.intialenddate
        startdate = obj.startdate
        return((enddate-startdate)/3600)

    def get_actual_hours(self, obj):
        startdate = obj.startdate
        enddate = obj.enddate
        if (enddate is not None and (enddate-startdate) is not None ):
            return((enddate-startdate)/3600)
        else:
            return('Sprint is not finished')

    name=serializers.CharField(max_length=50)
    startdate = serializers.DateField(read_only=True)
    intialenddate = serializers.DateField(read_only=True)
    enddate=serializers.DateField(read_only=True)
    id=serializers.IntegerField(read_only=True)