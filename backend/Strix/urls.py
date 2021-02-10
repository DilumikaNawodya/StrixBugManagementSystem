from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from . import views
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'internaluserlist', views.InternalUserList, basename='InternalUser')
router.register(r'externaluserlist', views.ExternalUserList, basename='ExternalUser')
router.register(r'projectlist', views.ProjectList, basename='ProjectList')


urlpatterns = [

    # Login and Forgot password
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),

    path('ticketlist/',views.GetTickets.as_view()),
    path('filters/',views.Filters.as_view()),

    path('', include(router.urls)),
]


