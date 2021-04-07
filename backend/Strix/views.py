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
from rest_framework.permissions import IsAuthenticated
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
from django.db.models import Q

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
    serializer_class = BlockedUserSerializer

    def get_queryset(self):
        return User.objects.filter(groups=6, is_active=True)

    def update(self, request, pk, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby) and UserRole(createdby) == "Admin":
            body = json.loads(request.body)
            role = body["role"]

            UserInstance = User.objects.get(id=pk)

            group_name = UserInstance.groups.get()
            if role != group_name:
                UserInstance.groups.remove(Group.objects.get(name=group_name))
                UserInstance.groups.add(Group.objects.get(name=role))  
            UserInstance.save()
            return Response({"data":"Successfully Updated !"},status=200)
        else:
            return Response({"data":"You do not have permission to update users !"},status=404)

# Projects
class ProjectList(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

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
    
    def get_queryset(self):
        user = self.request.user
        pid = self.request.query_params.get('pid')[0]
        projectlist = Project.objects.get(id=pid, adminid=user,  is_deleted=False)

        return(User.objects.filter(~Q(id__in=projectlist.userlist.all())))


class CommentList(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        user = self.request.user
        tid = self.request.query_params.get('tid')

        return Comment.objects.filter(ticket=tid, is_deleted=False)
        

    def create(self, request, *args, **kwargs):
        createdby = request.user

        if UserValidation(createdby):

            message = request.POST['message']
            tid = request.POST['tid']
            image = request.FILES['commentmedia']
            
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
            image = request.FILES['commentmedia']
            
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


###############################################################################################


class Filters(APIView):

    permission_classes = [IsAuthenticated]

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

    serializer_class = TicketSerializer
    
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
    serializer_class = TicketSerializer

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

    def get_queryset(self):
        return TicketMedia.objects.filter(issuename=self.request.query_params.get("tid"))

#################################################################################################

class SprintList(viewsets.ModelViewSet):

    serializer_class = SprintSerializer

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

            new.intialenddate = datetime.datetime.now() + datetime.timedelta(days=int(data['enddate']))
            new.enddate = datetime.datetime.now() + datetime.timedelta(days=int(data['enddate']))
            new.save()
            return Response({"data":"Succefully Created !"},status=200)
        else:
            return Response({"data":"You do not have permission !"},status=404)

class PinnedSpintList(viewsets.ModelViewSet):

    serializer_class = PinnedSprintSerialzer

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

#################################################################################################

# class GetTickets(APIView):

#     def post(self,request):

#         body = json.loads(request.body)

#         tickets = Ticket.objects.filter(project_id=body["pid"])
        
#         Tickets = []

#         for ticket in tickets:

#             data = {
#                 "id": ticket.id,
#                 "issuename": ticket.issuename,
#                 "issuedescription": ticket.issuedescription,
#                 "date": ticket.date,
#                 "bugtype": ticket.bugtype,
#                 "priority": ticket.priority,
#                 "severity": ticket.severity,
#                 "bspstatus": "Included" if ticket.bspstatus else "Not Included",
#                 "approval": "Approved" if ticket.approval else "Rejected",
#                 "totaleffort": ticket.totaleffort,
#                 "project": Project.objects.get(id=ticket.project_id).projectname,
#                 "workstate": Workstate.objects.get(id=ticket.workstate_id).workstatename,
#                 "externaluser_id": ticket.externaluser_id,
#                 "review": "Reviewed" if ticket.review else "Not Reviewed"
#             }

#             Tickets.append(data)


#         return Response({"Tickets":Tickets},status=200)





##############################################################################################





# class DeveloperPerformance(viewsets.ModelViewSet):
#     serializer_class = DeveloperPerformanceSerializer

#     def get_queryset(self):
#         return(DeveloperTicket.objects.filter(date__month=2))

#     # def create(self, request, *args, **kwargs):

#     #     body = json.loads(request.body)

#     #     project = body["projectid"]
#     #     start_date = body["to"]
#     #     end_date = body["from"]

#     #     years = range(int(start_date.split('-')[0]), int(end_date.split('-')[0]) + 1)

#     #     if(project):
#     #         pro_tickets = Ticket.objects.filter(project=project)        
#     #     else:
#     #         pro_tickets = Ticket.objects.all()

#     #     result = {}

#     #     for year in years:
#     #         dev_tickets = DeveloperTicket.objects.filter(date__year=year, date__range=[start_date, end_date], ticket__in=pro_tickets)
#     #         month_tickets = dev_tickets.values('date__year', 'date__month').annotate(Avg('dailyeffort'), ticket_list=ArrayAgg('ticket_id'))

#     #         for month in month_tickets:
#     #             total_assigned = 0
#     #             resolved = 0
#     #             in_progress = 0
#     #             for ticket in month['ticket_list']:
#     #                 temp_workstate = Ticket.objects.get(id=ticket).workstate.id

#     #                 if(temp_workstate==2 or temp_workstate==3 or temp_workstate==4):
#     #                     total_assigned += 1
#     #                 if(temp_workstate==4):
#     #                     resolved += 1
#     #                 if(temp_workstate==2 or temp_workstate==3):
#     #                     in_progress += 1

#     #             month["total_assigned"] = total_assigned
#     #             month["resolved"] = resolved
#     #             month["in_progress"] = in_progress

#     #         result[year] = month_tickets

#     #     return Response({"data":result}, status=200)

#     def create(self, request, *args, **kwargs):

#         body = json.loads(request.body)

#         project = body["projectid"]
#         start_date = body["to"]
#         end_date = body["from"]

#         pro_tickets = Ticket.objects.filter(project=project)        
#         dev_tickets = DeveloperTicket.objects.filter(date__range=[start_date,end_date], ticket__in=pro_tickets)
#         month_tickets = dev_tickets.values('date__year','date__month').annotate(Avg('dailyeffort'), ticket__list=ArrayAgg('ticket_id'))

#         for month in month_tickets:
#             total_assigned = 0
#             resolved = 0
#             in_progress = 0
#             notdone = 0
#             for ticket in month['ticket__list']:
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



# class TicketBspChange(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer

#     def get_queryset(self):
#         return Ticket.objects.all()

#     def update(self, request, pk, *args, **kwargs):
#         createdby = request.user
#         if not UserValidation(createdby):
#             return Response({"data":"You do not have permission to change status !"},status=404)
#         else:
#             data = json.loads(request.body)
#             approval = data['approval']
#             bspstatus = data['bspstatus']
        
#             selected_ticket = Ticket.objects.get(id=pk)

#             selected_ticket.approval = approval
#             selected_ticket.bspstatus = bspstatus

#             selected_ticket.save()

#             return Response({"data":"Succefully Chnaged !"},status=200)


'''
{
    projectid: 5,
    devid: 2,
    to: 2020-10-11,
    from: 2021-04-15
}
Columns should be [Project, Date, Developer (name), Issue Id, Issue Title, Effort)
'''



# class ProjectDevTimeSheet(viewsets.ModelViewSet):
#     serializer_class = ProjectDevTimeSerializer

#     def get_queryset(self):
#         return DeveloperTicket.objects.all()

#     def create(self, request, *args, **kwargs):
#         created_by = request.user
#         if UserValidation(created_by):

#             data = json.loads(request.body)

#             projectid = data['projectid']
#             devid = data['devid']
#             start_date = data['to']
#             end_date = data['from']
            
#             selected_tickets = DeveloperTicket.objects.filter(ticket__project=projectid, user=devid, date__range=[start_date, end_date])

#             serialized_data = ProjectDevTimeSerializer(selected_tickets, many=True).data

#             return Response({"data": serialized_data}, 200)

#         else:
#             return Response({"data":"You do not have permission !"},status=404)





# class bspTicketList(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer
    

#     def get_queryset(self):
#         return Ticket.objects.filter(project=self.request.query_params.get("pid"),bspstatus=True)


# class ApprovalTickets(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer
    

#     def get_queryset(self):
#         return Ticket.objects.filter(project=self.request.query_params.get("pid"),approval=True)
         
        
# class BMSTicketList(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer
    

#     def get_queryset(self):
#         return Ticket.objects.filter(project=self.request.query_params.get("pid")).order_by("id")
        


# class TicketStatusUpdate(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer

#     def get_queryset(self):
#         return Ticket.objects.all()

#     def update(self, request, pk, *args, **kwargs):
#         createdby = request.user                             #get current user
        
        
#         data = json.loads(request.body)        #python cannot read json data. convert into dictionaryType
#         approval = data['approval']
#         bspstatus = data['bspstatus']
        
#         selected_ticket = Ticket.objects.get(id=pk)

#         selected_ticket.approval = approval
#         selected_ticket.bspstatus = bspstatus

#         selected_ticket.save()

#         return Response({"data":"Succefully Chnaged !"},status=200)

        
#             #return Response({"data":"You do not have permission to change status !"},status=404)     #validate user in Uservalidation in mixing.py 
    



    
#################################################################################################



##################################################################################################

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



            
class Test(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        
        queryset_temp = Ticket.objects.filter(externaluser=6).count()
        # print(queryset_temp.ticket_set.all())

        return Response(queryset_temp, status=200)