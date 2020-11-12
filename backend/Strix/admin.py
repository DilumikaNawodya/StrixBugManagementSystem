from django.contrib import admin
from django.contrib.auth.models import Permission 
from . import models

from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = models.User
        fields = '__all__'

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):

    password = ReadOnlyPasswordHashField()

    class Meta:
        model = models.User
        fields = '__all__'

    def clean_password(self):
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('username','email', 'is_superuser')
    list_filter = ('username','email', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password','username','first_name','last_name','is_staff','is_superuser','is_active',)}),
        ('Role / Permission', {'fields': ('groups','user_permissions',)}),
        ('Creation', {'fields': ('createdby',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1','password2','username','first_name','last_name','is_staff','is_superuser','is_active','groups','user_permissions','createdby',)}
        ),
    )
    search_fields = ('username',)
    ordering = ('username',)
    filter_horizontal = ()

modelsArray = [models.Project,models.Workstate,models.Ticket,models.Sprint,
                models.Comment,models.DeveloperTicket,models.QATicket,Permission]


# Register your models here.
admin.site.register(models.User, UserAdmin)
admin.site.register(modelsArray)