from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import viewsets
import json
import datetime
from django.core import serializers
from django.db.models import Avg
from django.contrib.postgres.aggregates.general import ArrayAgg
from django.contrib.auth.mixins import PermissionRequiredMixin,LoginRequiredMixin
from .mixins import RoleRequiredMixin
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
                    "Role": role[0],
                    "Name": user.first_name + " " + user.last_name 
                },status=200)
        else:
            return Response({"msg":"You are not a registered user try again"},status=404)

# Logout
class Logout(APIView):

    def post(self,request):
        print(request.user)
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

    def get_queryset(self):
        return User.objects.filter(groups__in=[3,4,2])

    def create(self, request, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
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

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
            body = json.loads(request.body)

            email = body["email"]
            role = body["role"]
            firstname = body["firstname"]
            lastname = body["lastname"]

            UserInstance = User.objects.get(id=pk)
            UserInstance.first_name = firstname
            UserInstance.last_name = lastname
            if role!="Block":
                UserInstance.username = role + '-' + firstname
            UserInstance.email = email

            group_name = UserInstance.groups.get()
            if role != group_name:
                UserInstance.groups.remove(Group.objects.get(name=group_name))
                UserInstance.groups.add(Group.objects.get(name=role))  
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)

    
    def destroy(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
            if UserExists(pk):
                User.objects.get(id=pk).delete()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"User you are trying to delete does not exist"},status=404)

# External Users
class ExternalUserList(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(groups=5)
    
    def create(self, request, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
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

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
            body = json.loads(request.body)

            email = body["email"]
            role = body["role"]
            firstname = body["firstname"]
            lastname = body["lastname"]

            UserInstance = User.objects.get(id=pk)
            UserInstance.first_name = firstname
            UserInstance.last_name = lastname
            UserInstance.email = email

            group_name = UserInstance.groups.get()
            if role != group_name:
                UserInstance.groups.remove(Group.objects.get(name=group_name))
                UserInstance.groups.add(Group.objects.get(name=role))  
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)

    
    def destroy(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
            if UserExists(pk):
                User.objects.get(id=pk).delete()
                return Response({"data":"Successfully Deleted !"},status=200)
            else:
                return Response({"data":"User you are trying to delete does not exist"},status=404)


# Blocked Users

class BlockedUserList(viewsets.ModelViewSet):
    serializer_class = BlockedUserSerializer

    def get_queryset(self):
        return User.objects.filter(groups=6)

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user
        if UserValidation(createdby) and createdby=="!Admin":
            return Response({"data":"You do not have permission to create users !"},status=404)
        else:
            body = json.loads(request.body)
            role = body["role"]

            UserInstance = User.objects.get(id=pk)

            group_name = UserInstance.groups.get()
            if role != group_name:
                UserInstance.groups.remove(Group.objects.get(name=group_name))
                UserInstance.groups.add(Group.objects.get(name=role))  
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)


# Projects
class ProjectList(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = self.request.user
        role = User.objects.get(username=user).groups.values_list('name',flat=True)
        if role[0]=='Admin':
            return(Project.objects.filter(adminid=user))
        else:
            return(Project.objects.filter(userlist=user))



class Filters(APIView):

    def get(self,request):

        print(request.user)

        SEVERITY = {}
        for i in  SEVERITY_METHODS:
            SEVERITY[i[0]] = i[1]

        BUGTYPE = {}
        for i in  BUGTYPE_METHODS:
            BUGTYPE[i[0]] = i[1]

        PRIORITY = {}
        for i in PRIORITY_METHODS:
            PRIORITY[i[0]] = i[1]

        Filters = {
            "review": {
                "Reviewed":"Reviewed",
                "Not Reviewed":"Not Reviewed"
            },
            "severity": SEVERITY,
            "priority": PRIORITY,
            "bugtype": BUGTYPE,
            "status": {
                "Open":"Open",
                "In Progress":"In Progress",
                "Review":"Review",
                "Done":"Done"
            }
        }

        return Response(Filters,status=200)


class GetTickets(APIView):

    def post(self,request):

        body = json.loads(request.body)

        tickets = Ticket.objects.filter(project_id=body["pid"])
        
        Tickets = []

        for ticket in tickets:

            data = {
                "id": ticket.id,
                "issuename": ticket.issuename,
                "issuedescription": ticket.issuedescription,
                "date": ticket.date,
                "bugtype": ticket.bugtype,
                "priority": ticket.priority,
                "severity": ticket.severity,
                "bspstatus": "Included" if ticket.bspstatus else "Not Included",
                "approval": "Approved" if ticket.approval else "Rejected",
                "totaleffort": ticket.totaleffort,
                "project": Project.objects.get(id=ticket.project_id).projectname,
                "workstate": Workstate.objects.get(id=ticket.workstate_id).workstatename,
                "externaluser_id": ticket.externaluser_id,
                "review": "Reviewed" if ticket.review else "Not Reviewed"
            }

            Tickets.append(data)


        return Response({"Tickets":Tickets},status=200)

        
###############################################################################################


# class ProjectList(APIView):

#     def get(self,request):
#         user = request.user

#         if user.is_anonymous:
#             return Response("Thota pissuda",status=404)
#         else:
#             role = User.objects.get(username=user).groups.values_list('name',flat=True)
#             if role[0]=='Admin':
#                 projects = self.Admin(user)
#             else:
#                 projects = self.OtherUser(user)

#         return Response(projects.values(),status=200)

#     def Admin(self,user):
#         return(Project.objects.filter(adminid=user))
        
#     def OtherUser(self,user):
#         return(Project.objects.filter(userlist=user))


#     def post(self,request):
#         data = json.loads(request.body)
#         project = Project.objects.filter(id=data['pid'])

#         return Response(project.values(),status=200)



# class DeveloperPerformance(viewsets.ModelViewSet):
#     serializer_class = DeveloperPerformanceSerializer

#     def get_queryset(self):
#         return(DeveloperTicket.objects.filter(date__month=2))

#     def create(self, request, *args, **kwargs):

#         body = json.loads(request.body)

#         project = body["projectid"]
#         year = body["year"]
#         start_date = body["to"]
#         end_date = body["from"]

#         if(project):
#             pro_tickets = Ticket.objects.filter(project=project)        
#         else:
#             pro_tickets = Ticket.objects.all()

#         dev_tickets = DeveloperTicket.objects.filter(date__year=year, date__range=[start_date, end_date], ticket__in=pro_tickets)
#         month_tickets = dev_tickets.values('date__month').annotate(Avg('dailyeffort'), ticket_list=ArrayAgg('ticket_id'))

#         for month in month_tickets:
#             total_assigned = 0
#             resolved = 0
#             in_progress = 0
#             for ticket in month['ticket_list']:
#                 temp_workstate = Ticket.objects.get(id=ticket).workstate.id

#                 if(temp_workstate==2 or temp_workstate==3 or temp_workstate==4):
#                     total_assigned += 1
#                 if(temp_workstate==4):
#                     resolved += 1
#                 if(temp_workstate==2 or temp_workstate==3):
#                     in_progress += 1

#             month["total_assigned"] = total_assigned
#             month["resolved"] = resolved
#             month["in_progress"] = in_progress

#         return Response({"data":month_tickets}, status=200)


# class Test(viewsets.ModelViewSet):

#     serializer_class = TicketSerializer

#     def create(self, request, *args, **kwargs):

#         data = json.loads(request.body)

#         ticket_current = Ticket.objects.create(
#             issuename = data['issuename'],
#             issuedescription = data['issuedescription'],
#             bugtype = data['bugtype'],
#             priority = data['priority'],
#             severity = data['severity'],
#             bspstatus = False,
#             approval = False,
#             totaleffort = data['totaleffort'],
#             review = False,
#             project = Project.objects.get(id=data['project']),
#             workstate = Workstate.objects.get(id=data['workstate']),
#             externaluser = User.objects.get(id=data['externaluser'])
#         )

#         ticket_current.save()
        
        

#         ticket_media = data['ticketMedia']
        
#         for media in ticket_media:
#             MediaInstance = TicketMedia.objects.create(
#                 issuename = ticket_current,
#                 files = media
#             )

#             MediaInstance.save()

#         serializer = TicketSerializer(ticket_current)
#         return Response({"data":serializer.data}, status=200)



class GetSprints(APIView):

    def post(self,request):
        data = json.loads(request.body)

        tickets = Ticket.objects.filter(project_id=data["pid"])

        #sprints = Sprint.objects.filter(ticketlist__in=tickets).distinct('id')
        sprints = Sprint.objects.all()

        Sprints=[]

        for sprint in sprints:
            datatemp = {
                "id":sprint.id,
                "name":sprint.name,
                "status":sprint.status,
                "startdate":sprint.startdate,
                "enddate":sprint.enddate,
                "createdby":User.objects.get(username=sprint.createdby).username
            }
            Sprints.append(datatemp)
        return Response({"Sprints":Sprints},status=200)


def code_generator():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Sprints.objects.filter(name=code).count() == 0:
            break
    return code


class CreateSprintView(APIView):
    serializer_class = CreateSprintSerializer

    def post(self,request):
        name = 'test1'
        status = True
        createdby = User.objects.get(username=request.user)      
        new = Sprint(name=name, status=status,createdby=createdby)
        new.save()

        return Response(True, status=200)