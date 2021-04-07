import uuid
from django.db import models
import datetime
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
	description = models.CharField(max_length=5000)
	adminid = models.ForeignKey('User', on_delete=models.DO_NOTHING,related_name="adminid")
	userlist = models.ManyToManyField('User',related_name="userlist")
	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return self.projectname


class Workstate(models.Model):
	workstatename = models.CharField(max_length=50)

	def __str__(self):
		return self.workstatename
 
################################# Tag Choices ##########################################

class BugType(models.Model):
	bugtype = models.CharField(max_length=50)

	def __str__(self):
		return self.bugtype

class Priority(models.Model):
	priority = models.CharField(max_length=50)
	level = models.IntegerField(default=1)

	def __str__(self):
		return self.priority

class Severity(models.Model):
	severity = models.CharField(max_length=50)
	level = models.IntegerField(default=1)

	def __str__(self):
		return self.severity


######################################################################################

class Ticket(models.Model):
	issuename = models.CharField(max_length=50)
	issuedescription = models.CharField(max_length=1000)
	date = models.DateField(auto_now_add=True)
	bugtype = models.ForeignKey('BugType', default=1, on_delete=models.DO_NOTHING)
	priority = models.ForeignKey('Priority', default=1, on_delete=models.DO_NOTHING)
	severity = models.ForeignKey('Severity', default=1, on_delete=models.DO_NOTHING)
	bspstatus = models.BooleanField(default=False)
	approval = models.BooleanField(default=False)
	totaleffort = models.IntegerField()
	project = models.ForeignKey('Project',on_delete=models.DO_NOTHING)
	workstate = models.ForeignKey('Workstate',on_delete=models.DO_NOTHING)
	externaluser = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	review = models.BooleanField(default=False)
	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return self.issuename


class TicketMedia(models.Model):
	issuename = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	files= models.FileField(null=True)
	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return str(self.issuename)


class Sprint(models.Model):
	name = models.CharField(max_length=50)
	status = models.BooleanField(default=True)
	startdate = models.DateField(auto_now_add=True)
	intialenddate = models.DateField(auto_now_add=True, null=True)
	enddate = models.DateField(auto_now_add=True)
	createdby = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticketlist = models.ManyToManyField('Ticket', blank=True)
	project = models.ForeignKey('Project', on_delete=models.DO_NOTHING)
	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return self.name


class Pinned(models.Model):
	sprint = models.ForeignKey('Sprint',on_delete=models.DO_NOTHING)
	pinnedby = models.ForeignKey('User',on_delete=models.DO_NOTHING)

	def __str__(self):
		return "Sprint - " + str(self.id)


class Comment(models.Model):
	message = models.CharField(null=True, max_length=255)
	date = models.DateTimeField(auto_now_add=True, null=True)
	commentedby = models.ForeignKey('User', related_name="commentedby", on_delete=models.DO_NOTHING)
	ticket = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	commentmedia = models.FileField(null=True, blank=True)
	is_deleted = models.BooleanField(default=False)

	def __str__(self):
		return str(self.commentedby) + " comments on " + str(self.ticket)


class DeveloperTicket(models.Model):
	user = models.ForeignKey('User',on_delete=models.DO_NOTHING)
	ticket = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	date = models.DateField(auto_now_add=True)
	dailyeffort = models.IntegerField()

	def __str__(self):
		return " effort " + str(self.id)


class QATicket(models.Model):
	initial = models.ForeignKey('User',null=True,blank=True,on_delete=models.DO_NOTHING,related_name="initial")
	done = models.ForeignKey('User',null=True,blank=True,on_delete=models.DO_NOTHING,related_name="done")
	ticket = models.ForeignKey('Ticket',on_delete=models.DO_NOTHING)
	date = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.id