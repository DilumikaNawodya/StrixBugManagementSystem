from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from . import views
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
router = DefaultRouter()
# Dilumika
router.register(r'internaluserlist', views.InternalUserList, basename='InternalUser')
router.register(r'externaluserlist', views.ExternalUserList, basename='ExternalUser')
router.register(r'blockeduserlist', views.BlockedUserList, basename='BlockedUser')
router.register(r'projectlist', views.ProjectList, basename='ProjectList')
router.register(r'accesslist', views.AccessList, basename='AccessList')
router.register(r'alluserlist', views.AllUserList, basename='AllUserList')
router.register(r'commentlist', views.CommentList, basename='CommentList')


# Dilshani
router.register(r'ticketlist',views.TicketList,basename='TicketList')
router.register(r'bspticketlist',views.BSPTicketList,basename='BSPTicketList')
router.register(r'ticketmedia',views.TicketMediaList,basename='TicketMediaList')
router.register(r'customedatalist',views.CustomeDataList,basename='CustomeDataList')

# Dinithi
router.register(r'sprintlist',views.SprintList,basename='SprintList')
router.register(r'pinnedsprintlist',views.PinnedSpintList,basename='PinnedSpintList')
router.register(r'kanbantickets',views.KanbanTicketsList,basename='KanbanTicketsList')


router.register(r'test',views.Test,basename='Test')


# Chandeepa

router.register('User',views.UserViewset)
router.register('Dev_Users',views.DevViewSet)
router.register('Dev_Table',views.DevTicketsViewSet)
router.register('Projects',views.ViewProjectViewsets)
router.register('Dev_timesheet', views.ProjectDevTimeSheet,basename='Dev_timesheet')
router.register('BugSummary', views.BugSummaryStatViewSet)
router.register('DeveloperPerformance', views.DeveloperPerformance, basename='DeveloperPerformance')
router.register('ProjectBugDevelopment',views.ProjectBugDevelopmentViewSet, basename='ProjectBugDevelopment')
router.register('MonthBugDevelopment',views.MonthBugDevelopementViewset, basename='MonthBugDevelopment')


urlpatterns = [

    # Login and Forgot password
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),
    path('filters/',views.Filters.as_view()),

    path('', include(router.urls)),
]


