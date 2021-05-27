from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import viewsets
import json
from django.core import serializers
from django.db.models import Avg
from django.contrib.postgres.aggregates.general import ArrayAgg
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate
from .models import * 
from .serializers import *
from .middlewares import *
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import default_token_generator
from .MailService import *
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import Group

from django.db.models import Avg, Count, Sum, Q
from django.db.models.functions import TruncMonth
from django.contrib.postgres.aggregates.general import ArrayAgg
from datetime import date,datetime, timedelta
from dateutil.relativedelta import relativedelta


#===================================================
#------------------Dilumika-----------------------
#===================================================

# Login
class Login(APIView):

    def post(self, request):

        data = json.loads(request.body)

        email = data['email']
        password = data['password']

        if User.objects.filter(email=email).exists():
            Username = User.objects.get(email=email).username
        else:
            return Response({"msg":"You are not a registered user try again"},status=404)
        
        user = authenticate(username=Username,password=password)

        if user is not None:
            auth.login(request,user)
            token,_ = Token.objects.get_or_create(user=user)
            role = User.objects.get(username=user).groups.values_list('name',flat=True)
            return Response(
                {
                    "Token": token.key,
                    "id": user.id,
                    "Role": role[0],
                    "Name": user.first_name + " " + user.last_name,
                    "Email": user.email 
                },status=200)
        else:
            return Response({"msg":"You are not a registered user try again"},status=404)

# Logout
class Logout(APIView):

    def post(self,request):
        if request.user.is_anonymous:
            return Response(False,status=404)
        else:
            auth.logout(request)
            return Response(True,status=200)

# Email Confirmation
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

# Password Confirmation
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

# Reset Password
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
                return Response({},status=200)
            else:
                return Response(True,status=404)
        else:
            return Response(False,status=404)

# Internal Users
class InternalUserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return User.objects.filter(groups__in=[3,4,2], is_active=True)

    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            email = body["email"]
            password = body["password"]
            firstname = body["firstname"]
            lastname = body["lastname"]
            role = body["role"]

            if EmailExists(email):
                return Response({"data":" Email is already taken !"},status=404)
            else:
                UserInstance = User.objects.create(
                    email=email, 
                    username=role+"-"+firstname,
                    first_name=firstname,
                    last_name=lastname,
                    createdby=createdby
                )
                UserInstance.groups.add(Group.objects.get(name=role))
                UserInstance.set_password(password)
                UserInstance.save()
                return Response({"data":"Successfully Created !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)


    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            email = body["email"]
            firstname = body["firstname"]
            lastname = body["lastname"]

            UserInstance = User.objects.get(id=pk)
            UserInstance.first_name = firstname
            UserInstance.last_name = lastname
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)
    
    def destroy(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            if UserExists(pk):
                selected_user = User.objects.get(id=pk)
                selected_user.is_active = False
                selected_user.save()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"User you are trying to delete does not exist"},status=404)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

# External Users
class ExternalUserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return User.objects.filter(groups=5, is_active=True)
    
    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            email = body["email"]
            password = body["password"]
            firstname = body["firstname"]
            lastname = body["lastname"]

            if EmailExists(email):
                return Response({"data":" Email is already taken !"},status=404)
            else:
                UserInstance = User.objects.create(
                    email=email, 
                    username="Customer-"+firstname,
                    first_name=firstname,
                    last_name=lastname,
                    createdby=createdby
                )
                UserInstance.groups.add(Group.objects.get(id=5))
                UserInstance.set_password(password)
                UserInstance.save()
                return Response({"data":"Successfully Created !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)


    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            email = body["email"]
            firstname = body["firstname"]
            lastname = body["lastname"]

            UserInstance = User.objects.get(id=pk)
            UserInstance.first_name = firstname
            UserInstance.last_name = lastname
            UserInstance.email = email
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)
    
    
    def destroy(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            if UserExists(pk):
                selected_user = User.objects.get(id=pk)
                selected_user.is_active = False
                selected_user.save()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"User you are trying to delete does not exist"},status=404)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)


# Blocked Users
class BlockedUserList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            UserInstance = User.objects.get(id=pk)
            UserInstance.is_blocked = not UserInstance.is_blocked
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

# Projects
class ProjectList(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        user = self.request.user
        role = User.objects.get(username=user).groups.values_list('name',flat=True)
        if role[0]=='Admin':
            return(Project.objects.filter(adminid=user, is_deleted=False))
        else:
            return(Project.objects.filter(userlist=user, is_deleted=False))

    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            projectname = body["projectname"]
            description = body["description"]

            ProjectInstance = Project.objects.create(
                projectname=projectname,
                description=description,
                adminid=createdby
            )
            ProjectInstance.save()
            return Response({"data":"Successfully Created !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)

            projectname = body["projectname"]
            description = body["description"]

            ProjectInstance = Project.objects.get(id=pk)
            ProjectInstance.projectname = projectname
            ProjectInstance.description = description
            ProjectInstance.save()

            return Response({"data":"Successfully Updated !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

    
    def destroy(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            if ProjectExists(pk):
                selected_project = Project.objects.get(id=pk)
                selected_project.is_deleted = True
                selected_project.save()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"Project you are trying to delete does not exist"},status=404)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)


class AccessList(viewsets.ModelViewSet):
    serializer_class = AccessListSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        user = self.request.user
        role = User.objects.get(username=user).groups.values_list('name',flat=True)
        if role[0]=='Admin':
            return(Project.objects.filter(adminid=user, is_deleted=False))

    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            data = json.loads(request.body)
            select = data['select']
            pid = data['pid']

            selected_users = User.objects.filter(id__in=select)
            selected_project = Project.objects.get(id=pid)

            selected_project.userlist.add(*selected_users)

            return Response({"data":"Successfully Added Users !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            data = json.loads(request.body)
            update = data['update']

            selected_users = User.objects.filter(id__in=update)
            selected_project = Project.objects.get(id=pk)

            selected_project.userlist.remove(*selected_users)

            return Response({"data":"Successfully Deleted Users !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

class AllUserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        user = self.request.user
        pid = self.request.query_params.get('pid')[0]
        projectlist = Project.objects.get(id=pid, adminid=user,  is_deleted=False)

        return(User.objects.filter(~Q(id__in=projectlist.userlist.all()), is_active=True))


class CommentList(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        user = self.request.user
        tid = self.request.query_params.get('tid')

        return Comment.objects.filter(ticket=tid, is_deleted=False)
        

    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):

            message = request.POST['message']
            tid = request.POST['tid']

            if request.FILES:
                image = request.FILES['commentmedia']
            else:
                image = None
            
            commentinstance = Comment.objects.create(
                message = message,
                commentmedia = image,
                commentedby = createdby,
                ticket = Ticket.objects.get(id=tid)
            )
            commentinstance.save()
            return Response({},status=200)
        else:
            return Response({},status=404)


    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):

            message = request.POST['message']

            if request.FILES:
                image = request.FILES['commentmedia']
            else:
                image = None
            
            commentinstance = Comment.objects.get(id=pk)
            commentinstance.message = message
            commentinstance.commentmedia = image
            commentinstance.save()
            return Response({},status=200)
        else:
            return Response({},status=404)


    def destroy(self, request, pk, *args, **kwargs):

        createdby = request.user

        if UserValidation(createdby):
            if CommentExists(pk):
                selected_comment = Comment.objects.get(id=pk)
                selected_comment.is_deleted = True
                selected_comment.save()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"Comemnt you are trying to delete does not exist"},status=404)
        else:
            return Response({"data":"You do not have permission to delete comment !"},status=404)


#===================================================
#------------------Dilshani-----------------------
#===================================================


class Filters(APIView):

    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get(self,request):

        Filters = {
            "review": {
                "true":"Reviewed",
                "false":"Not Reviewed"
            },
            "severity": {
                1:"Critical",
                2:"High",
                3:"Medium",
                4:"Low"
            },
            "priority": {
                1:"Urgent",
                2:"High",
                3:"Medium",
                4:"Low"
            },
            "bugtype": {
                1:"Functional",
                2:"Performance",
                3:"Usability",
                4:"Compatibility",
                5:"Security"
            },
            "status": {
                1:"Open",
                2:"In Progress",
                3:"Review",
                4:"Done"
            }
        }

        return Response(Filters,status=200)

class TicketList(viewsets.ModelViewSet):

    serializer_class = BMSTicketSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]
    
    def get_queryset(self):
        return Ticket.objects.filter(project=self.request.query_params.get("pid"))

    def UpdateByManager(self, totaleffort, pk):
        selected_ticket = Ticket.objects.get(id=pk)
        selected_ticket.totaleffort = totaleffort
        selected_ticket.save()

    def UpdateByQA(self, data, pk):
        selected_ticket = Ticket.objects.get(id=pk)
        selected_ticket.severity = Severity.objects.get(id=data['severity'])
        selected_ticket.priority = Priority.objects.get(id=data['priority'])
        selected_ticket.bugtype = BugType.objects.get(id=data['bugtype'])
        selected_ticket.review = True if data['review'] == "true" else False
        selected_ticket.save()

    def UpdateByDev(self, createdby, dailyeffort, pk):
        selected_ticket = Ticket.objects.get(id=pk)
        DevTicketInstance = DeveloperTicket.objects.create(
            user = createdby,
            ticket = selected_ticket,
            dailyeffort = dailyeffort
        )
        DevTicketInstance.save()


    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):
            data = json.loads(request.body)
            if "1" == self.request.query_params.get("type"):
                self.UpdateByManager(data['totaleffort'], pk)
            elif "2" == self.request.query_params.get("type"):
                self.UpdateByQA(data, pk)
            elif "3" == self.request.query_params.get("type"):
                self.UpdateByDev(createdby, data['dailyeffort'], pk)
            return Response({"data":"Succefully Changed !"},status=200)
        else:         
            return Response({"data":"You do not have permission !"},status=404)


class BSPTicketList(viewsets.ModelViewSet):
    serializer_class = BMSTicketSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):

        pid = self.request.query_params.get("pid")
        statusid = self.request.query_params.get("statusid")

        print(pid, statusid)

        if statusid == "1":
            return Ticket.objects.filter(project=pid, bspstatus=True, approval=False)
        elif statusid == "2":
            return Ticket.objects.filter(project=pid, bspstatus=False, approval=True)
    
    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):

            data = json.loads(request.body)
            approval = data['approval']
            bspstatus = data['bspstatus']
            
            ticket_instance = Ticket.objects.get(id=pk)
            ticket_instance.approval = approval
            ticket_instance.bspstatus = bspstatus
            ticket_instance.save()
            return Response({"data":"Succefully Changed !"},status=200)
            
        else:
            return Response({"data":"You do not have permission !"},status=404)


class TicketMediaList(viewsets.ModelViewSet):
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return TicketMedia.objects.filter(issuename=self.request.query_params.get("tid"))

class CustomeDataList(viewsets.ModelViewSet):

    def get_queryset(self):
        if "1" == self.request.query_params.get("customeid"):
            return BugType.objects.all()
        elif "2" == self.request.query_params.get("customeid"):
            return Priority.objects.all()
        elif "3" == self.request.query_params.get("customeid"):
            return Severity.objects.all()
        elif "4" == self.request.query_params.get("customeid"):
            return Workstate.objects.all()

    def get_serializer_class(self):
        if "1" == self.request.query_params.get("customeid"):
            return BugTypeSerializer
        elif "2" == self.request.query_params.get("customeid"):
            return PrioritySerializer
        elif "3" == self.request.query_params.get("customeid"):
            return SeveritySerializer
        elif "4" == self.request.query_params.get("customeid"):
            return WorkStateSerializer

#===================================================
#------------------Dinithi-----------------------
#===================================================

class SprintList(viewsets.ModelViewSet):

    serializer_class = SprintSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return Sprint.objects.filter(project=self.request.query_params.get("pid"), is_deleted=False)


    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Manager":
            data = json.loads(request.body)   
            new = Sprint.objects.create(
                name=data['sprintname'],
                project=Project.objects.get(id=data['project']),
                createdby=createdby
            )

            new.intialenddate = datetime.now() + timedelta(days=int(data['enddate']))
            new.enddate = datetime.now() + timedelta(days=int(data['enddate']))
            new.save()
            return Response({"data":"Succefully Created !"},status=200)
        else:
            return Response({"data":"You do not have permission !"},status=404)

class EndSprint(viewsets.ModelViewSet):
    serializer_class = SprintSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def update(self, request, pk, *args, **kwargs):
        Sprint.objects.filter(id=pk).update(enddate=date.today(), status=False)
        return Response("Sprint deleted successfully",status=200)

class SprintData(viewsets.ModelViewSet):
    serializer_class = SprintSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return Sprint.objects.filter(id=self.request.query_params.get("sid")) 

class AddToSprint(viewsets.ModelViewSet):
    serializer_class= SprintSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user
        data = json.loads(request.body)

        if UserValidation(createdby):
            ticketobj = Ticket.objects.filter(id=data["tid"])
            sprintobj = Sprint.objects.get(id=pk)
            sprintobj.ticketlist.add(*ticketobj)
            return Response("Ticket added to sprint successfully", status=200)
        else:
            return Response({"data":"You do not have permission !"},status=404)

class PinnedSpintList(viewsets.ModelViewSet):

    serializer_class = PinnedSprintSerialzer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        createdby = self.request.user
        return Pinned.objects.filter(pinnedby=createdby, sprint__project=self.request.query_params.get("pid"))

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):
            if Pinned.objects.filter(pinnedby=createdby, sprint=pk).exists():
                Pinned.objects.filter(pinnedby=createdby, sprint=pk).delete()
            else:
                pinned_instance = Pinned.objects.create(
                    sprint=Sprint.objects.get(id=pk),
                    pinnedby=createdby
                )
                pinned_instance.save()
                
            return Response({"data":"Succefully Changed !"},status=200)
        else:
            return Response({"data":"You do not have permission !"},status=404)


class KanbanTicketsList(viewsets.ModelViewSet):
    
    permission_classes = [IsAuthenticated, IsBlockorDelete]


    def get_queryset(self):
        queryset_temp = Sprint.objects.get(id=self.request.query_params.get("sid"), is_deleted=False)
        return queryset_temp.ticketlist

    def get_serializer_class(self):
        
        if "1"==self.request.query_params.get("type"):
            return KanbanTestSerializerFirst
        else:
            return KanbanTestSerializerSecond

    
    def update(self, request, pk, *args, **kwargs):
        
        createdby = request.user

        if UserValidation(createdby):
            data = json.loads(request.body)
            workstate_id = data['destid'].split('-')[1]
            ticket_instance = Ticket.objects.get(id=pk)

            ticket_instance.workstate = Workstate.objects.get(id=workstate_id)

            ticket_instance.save()
            
            return Response({}, status=200)
        else:
            return Response({}, status=404)


#===================================================
#------------------Chandeepa-----------------------
#===================================================

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class =  UserReportSerializer 
    permission_classes = [IsAuthenticated, IsBlockorDelete]

class DevViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(groups=3)
    serializer_class = DevUserSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]
    
class DevTicketsViewSet(viewsets.ModelViewSet):
    queryset = DeveloperTicket.objects.all()
    serializer_class = UserDevTicketSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

class BugSummaryStatViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = BugSummaryStatSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

class ViewProjectViewsets(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ViewProjectsSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

class DeveloperPerformance(viewsets.ModelViewSet):
    serializer_class = DeveloperPerformanceSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def create(self, request, *args, **kwargs):

        body = json.loads(request.body)

        project = body["projectid"]
        start_date = body["to"]
        end_date = body["from"]
        status = body["status"]

        if status == 2:
            if(start_date is None and end_date is None and project=="None"):
                start_date = date.today() - relativedelta(months=12)
                end_date = date.today()
                pro_tickets = Ticket.objects.all()
                
            else:
                if(project != "All" and project != "None"):
                    pro_tickets = Ticket.objects.filter(project=project)        
                else:
                    pro_tickets = Ticket.objects.all()

                if(start_date is not None):
                    start_date = start_date[0:10]
                else:
                    start_date = "1970-01-01"

                if(end_date is not None):
                    end_date = end_date[0:10]
                else:
                    end_date = date.today()

            dev_tickets = DeveloperTicket.objects.filter( date__range=[start_date,end_date],  ticket__in=pro_tickets)
            month_tickets = dev_tickets.values('date__year','date__month').annotate(Avg('dailyeffort'), ticket_list=ArrayAgg('ticket_id'))

            for month in month_tickets:
                total_assigned = 0
                resolved = 0
                in_progress = 0
                
                for ticket in month['ticket_list']:
                    temp_workstate = Ticket.objects.get(id=ticket).workstate.id

                    if(temp_workstate==2 or temp_workstate==3 or temp_workstate==4):
                        total_assigned += 1
                    if(temp_workstate==4):
                        resolved += 1
                    if(temp_workstate==2 or temp_workstate==3):
                        in_progress += 1

                month["total_assigned"] = total_assigned
                month["resolved"] = resolved
                month["in_progress"] = in_progress
    
            return Response({"data":month_tickets}, status=200)

        else:
            
            today = date.today()
            dev_tickets = DeveloperTicket.objects.filter( date__range=[today -relativedelta(months=12) ,today] )
            month_tickets = dev_tickets.values('date__year','date__month').annotate(Avg('dailyeffort'), ticket_list=ArrayAgg('ticket_id'))
            
            for month in month_tickets:
                total_assigned = 0
                resolved = 0
                in_progress = 0
                notdone = 0
                for ticket in month['ticket_list']:
                    temp_workstate =Ticket.objects.get(id=ticket).workstate.id

                    if(temp_workstate==2 or temp_workstate==3 or temp_workstate==4):
                        total_assigned += 1
                    if(temp_workstate==4):
                        resolved += 1
                    if(temp_workstate==2 or temp_workstate==3):
                        in_progress += 1

                month["total_assigned"] = total_assigned
                month["resolved"] = resolved
                month["in_progress"] = in_progress
    
            return Response({"data":month_tickets}, status=200)

# Developer and Project  Timesheet Viewset
class ProjectDevTimeSheet(viewsets.ModelViewSet):
    serializer_class = ProjectDevTimeSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        return DeveloperTicket.objects.all()

    def create(self, request, *args, **kwargs):
            data = json.loads(request.body)

            projectid = data['projectid']
            devid = data['devid']
            start_date = data['from']
            end_date = data['to']

            if(len(devid) != 0):
                if(start_date is None and end_date is None and projectid == "None"):
                    start_date = "1970-01-01" 
                    end_date = date.today()
                    selected_tickets = DeveloperTicket.objects.filter(user__in=devid)
                    
                else:
                    if( projectid== "All" or projectid == "None"):
                        selected_tickets = DeveloperTicket.objects.filter(user__in=devid)       
                    else:
                        selected_tickets =DeveloperTicket.objects.filter(ticket__project=projectid,user__in=devid )

                    if(start_date is not None):
                        start_date = start_date[0:10]
                    else:
                        start_date = "1970-01-01"

                    if(end_date is not None):
                        end_date = end_date[0:10]
                    else:
                        end_date = date.today()
                
            else:
                if(start_date is None and end_date is None and projectid is "None" or projectid is "All"):
                    start_date = "1970-01-01" 
                    end_date = date.today()
                    selected_tickets = DeveloperTicket.objects.all()

                else:
                    if( projectid== "All" or projectid == "None"):
                        selected_tickets = DeveloperTicket.objects.all()    
                    else:
                        selected_tickets = DeveloperTicket.objects.filter(ticket__project=projectid)

                    if(start_date is not None):
                        start_date = start_date[0:10]
                    else:
                        start_date = "1970-01-01"

                    if(end_date is not None):
                        end_date = end_date[0:10]
                    else:
                        end_date = date.today()

            
            selected_tickets = selected_tickets.filter(date__range=[start_date, end_date])
            serialized_data = ProjectDevTimeSerializer(selected_tickets, many=True).data
        
            return Response({"data": serialized_data}, 200)



class ProjectBugDevelopmentViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectBugDevelopmentSerializer
    queryset = Ticket.objects.all()
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def create(self, request, *args, **kwargs):
        queryset_temp = Ticket.objects.all().values('project__projectname').annotate(total_bugs=Count('id'), in_progress = Count('workstate', filter=Q(workstate__id__in=[2, 3])), resolved = Count('workstate', filter=Q(workstate__id=4)),open = Count('workstate', filter=Q(workstate__id=1)))  
        return Response({"data": queryset_temp}, status=200)


class MonthBugDevelopementViewset(viewsets.ModelViewSet):
    serializer_class =  MonthBugDevelopmentSerializer
    queryset = Ticket.objects.all()
    permission_classes = [IsAuthenticated, IsBlockorDelete]
    
    def create(self, request, *args, **kwargs):
        queryset_temp = Ticket.objects.all().values('date__year','date__month').annotate(total_bugs = Count('id'), in_progress = Count('workstate', filter=Q(workstate__id__in=[2, 3])), resolved = Count('workstate', filter=Q(workstate__id=4)))
        return Response({"data": queryset_temp}, status=200) 


#===================================================
#------------------Yashith-----------------------
#===================================================

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):
        queryset = self.queryset
        filter_value = self.request.query_params.get('id', None)
        if filter_value is not None:
            queryset = queryset.filter(id=filter_value)
        return queryset


class TicketMediaViewset(viewsets.ModelViewSet):
    queryset = TicketMedia.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):  # filter by id query
        queryset = self.queryset
        filter_value = self.request.query_params.get('project', None)
        if filter_value is not None:
            queryset = queryset.filter(project=filter_value)
        return queryset

    def create(self, request, *args, **kwargs):
        ticket_media = request.FILES.getlist('ticketMedia')

        data = request.POST

        ticket_current = Ticket.objects.create(
            issuename=data['issuename'],
            issuedescription=data['issuedescription'],
            bugtype=BugType.objects.get(id=data['bugtype']),
            priority=Priority.objects.get(id=data['priority']),
            severity=Severity.objects.get(id=data['severity']),
            bspstatus=False,
            approval=False,
            totaleffort=data['totaleffort'],
            review=False,
            project=Project.objects.get(id=data['project']),
            workstate=Workstate.objects.get(id=data['workstate']),
            externaluser=User.objects.get(id=data['externaluser'])
        )

        ticket_current.save()

        # print(data['ticketMedia'])
        # print(request.FILES.getlist('ticketMedia'))
        for media in ticket_media:
            MediaInstance = TicketMedia.objects.create(
                issuename=ticket_current,
                files=media
            )

            MediaInstance.save()

        return Response({"data": "success"}, status=200)


# Sprint summary View


class SprintSummary(viewsets.ModelViewSet):
    queryset = Sprint.objects.all()
    serializer_class = SprintSummarySerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    # def get_queryset(self):  # filter by id query
    #     queryset = self.queryset
    #     filter_value = self.request.query_params.get('id', None)
    #     if filter_value is not None:
    #         queryset = queryset.filter(id=filter_value)
    #     return queryset

    # def get_queryset(self):  # filter by id query
    #     queryset = self.queryset
    #     filter_value = self.request.query_params.get('project', None)
    #     if filter_value is not None:
    #         queryset = queryset.filter(project=filter_value)
    #     return queryset


class BugPerMonth(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, IsBlockorDelete]

    def get_queryset(self):  # filter by date
        queryset = self.queryset
        filter_value1 = self.request.query_params.get('date1', None)
        filter_value2 = self.request.query_params.get('date2', None)
        if filter_value1 and filter_value2 is not None:
            # queryset = queryset.filter(date__gte=filter_value1,date__lte=filter_value2)
            queryset = queryset.filter(date__month=filter_value1,date__year=filter_value2)
        return queryset