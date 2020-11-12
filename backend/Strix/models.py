import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
# Create your models here.


class User(AbstractUser):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	createdby = models.ForeignKey('self',default=None,null=True,on_delete=models.DO_NOTHING)

	objects = CustomUserManager()

	def __str__(self):
		return self.username


class Project(models.Model):
	projectname = models.CharField(max_length=50)
	description = models.CharField(max_length=255)
	adminid = models.ForeignKey('User', on_delete=models.DO_NOTHING,related_name="adminid")
	userlist = models.ManyToManyField('User',related_name="userlist")

	def __str__(self):
		return self.projectname

class Workstate(models.Model):
	workstatename = models.CharField(max_length=50)

	def __str__(self):
		return self.workstatename
 
################################# Tag Choices ##########################################
'''
type: syntax error,  
status: open / in progress / review / done
priority: low, medium, high, urgent

'''

######################################################################################

class Ticket(models.Model):
	issuename = models.CharField(max_length=50)
	issuedescription = models.CharField(max_length=1000)
	#date = models.DateField(auto_now_add=True)
	video = models.URLField()
	# bugtype = models.models.CharField(max_length=50,choices=BUGTYPE_METHODS)
	# priority = models.CharField(max_length=50,choices=PRIORITY_METHODS)
	# severity = models.CharField(max_length=50,choices=SEVERITY_METHODS)
	bspstatus = models.BooleanField(default=False)
	approval = models.BooleanField(default=False)
	totaleffort = models.IntegerField()
	project = models.ForeignKey('Project',on_delete=models.DO_NOTHING)
	workstate = models.ForeignKey('Workstate',on_delete=models.DO_NOTHING)
	externaluser = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	review = models.BooleanField(default=False)

	def __str__(self):
		return self.issuename


'''
approval,bspstatus
F,F
T,F
F,T

T,T - NO

'''


class Sprint(models.Model):
	name = models.CharField(max_length=50)
	status = models.BooleanField(default=False)
	pinned = models.BooleanField(default=False)
	startdate = models.DateField(auto_now_add=True)
	enddate = models.DateField(auto_now_add=True)
	createdby = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticketlist = models.ManyToManyField('Ticket',blank=True)

	def __str__(self):
		return self.name

class Comment(models.Model):
	message = models.CharField(max_length=255)
	commentedby = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticket = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)

	def __str__(self):
		return self.commentedby + " comments on " + self.ticket


class DeveloperTicket(models.Model):
	user = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticket= models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	date = models.DateField(auto_now_add=True)
	dailyeffort = models.IntegerField()

	def __str__(self):
		return self.id

class QATicket(models.Model):
	initial = models.ForeignKey('User',null=True,blank=True,on_delete=models.DO_NOTHING,related_name="initial")
	done = models.ForeignKey('User',null=True,blank=True,on_delete=models.DO_NOTHING,related_name="done")
	ticket = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	date = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.id