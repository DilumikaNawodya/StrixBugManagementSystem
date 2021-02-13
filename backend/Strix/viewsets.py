from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
import json

class UserViewset(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class =  serializers.UserSerializer 

class DevViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.filter(groups=3)
    serializer_class = serializers.UserSerializer

# class DevViewSet(viewsets.ModelViewSet):
#     queryset = JoinDevTickets.objects.raw('Select user_id, ticket_id,unique_id, username, email, date_joined, date, dailyeffort from public."Strix_user" u inner join public."Strix_developerticket" dt on u.id = dt.user_id')
#     serializer_class =JoinDevTicketsSerializer

class DevTicketsViewSet(viewsets.ModelViewSet):
    print("OK")
    
    queryset = models.DeveloperTicket.objects.all()
    serializer_class = serializers.UserDevTicketSerializer

    
    def retrieve(self, request, *args, **kwargs):

        params =kwargs
        print(params['pk'])
        dateDev = json.loads(request.body)
        print(dateDev)
        start_date = dateDev['startDate']
        end_date = dateDev['endDate']
        start_date_n = start_date[0:10].split('T')
        end_date_n = end_date[0:10].split('T')
        filter_dev_ticket = DeveloperTicket.objects.filter(date__range=[start_date_n, end_date_n])
        final_dev = User.objects.filter(id__in = filter_dev_ticket['id'])
        return Response(filter_dev_ticket.data)



class FilterByDateViewSet(viewsets.ModelViewSet):
    queryset = models.DeveloperTicket.objects.filter(date__range=["2021-01-01", "2021-1-30"])
    serializer_class = serializers.UserDevTicketSerializer