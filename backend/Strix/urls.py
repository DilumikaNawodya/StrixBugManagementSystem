from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [

    # Login and Forgot password
    path('createcustomer/',views.CustomerCreation.as_view()),
    path('login/',views.Login.as_view()),
    path('logout/',views.Logout.as_view()),

    path('emailconfirmation/',views.EmailConfirmation.as_view()),
    path('passconfirmation/',views.PasswordConfirmation.as_view()),
    path('resetpassword/',views.ResetPassword.as_view()),

]



''' 
EndPoint 

1. login/
2. logout/
3. resetpassword/


'''



