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


BUGTYPE_METHODS = (
	('Functional','Functional'),
	('Performance','Performance'),
	('Usability','Usability'),
	('Compatibility','Compatibility'),
	('Security','Security')
)

PRIORITY_METHODS = (
	('urgent','urgent'),
	('high','high'),
	('medium','medium'),
	('low','low')
)

SEVERITY_METHODS = (
	('critical','critical'),
	('high','high'),
	('medium','medium'),
	('low','low')
)

######################################################################################

class Ticket(models.Model):
	issuename = models.CharField(max_length=50)
	issuedescription = models.CharField(max_length=1000)
	date = models.DateField()
	bugtype = models.CharField(max_length=50,choices=BUGTYPE_METHODS,blank=True)
	priority = models.CharField(max_length=50,choices=PRIORITY_METHODS,blank=True)
	severity = models.CharField(max_length=50,choices=SEVERITY_METHODS,blank=True)
	bspstatus = models.BooleanField(default=False)
	approval = models.BooleanField(default=False)
	totaleffort = models.IntegerField()
	project = models.ForeignKey('Project',on_delete=models.DO_NOTHING)
	workstate = models.ForeignKey('Workstate',on_delete=models.DO_NOTHING)
	externaluser = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	review = models.BooleanField(default=False)

	def __str__(self):
		return self.issuename


class TicketMedia(models.Model):
	issuename = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	files= models.FileField(null=True)

	def __str__(self):
		return self.issuename


class Sprint(models.Model):
	name = models.CharField(max_length=50)
	status = models.BooleanField(default=False)
	startdate = models.DateField(auto_now_add=True)
	enddate = models.DateField(auto_now_add=True)
	createdby = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticketlist = models.ManyToManyField('Ticket',blank=True)

	def __str__(self):
		return self.name


class Pinned(models.Model):
	sprint = models.ForeignKey('Sprint',on_delete=models.DO_NOTHING)
	pinnedby = models.ForeignKey('User',on_delete=models.DO_NOTHING)

	def __str__(self):
		return self.sprint + " / " + self.pinnedby


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