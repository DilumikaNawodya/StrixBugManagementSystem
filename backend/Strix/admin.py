from django.contrib import admin
from . import models

modelsArray = [models.User,models.Project,models.Workstate,models.Ticket,models.Sprint,
                models.Comment,models.DeveloperTicket,models.QATicket]

# Register your models here.
admin.site.register(modelsArray)