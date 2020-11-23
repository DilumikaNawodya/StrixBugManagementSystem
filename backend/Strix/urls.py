from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from . import views

urlpatterns = [

    # Login and Forgot password
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),

    path('projectlist/',views.ProjectList.as_view()),
    path('ticketlist/',views.GetTickets.as_view()),
    path('filters/',views.Filters.as_view()),
]



''' 
EndPoint 

1. login/
2. logout/
3. resetpassword/


'''



