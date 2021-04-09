from .models import * 

def UserExists(userid):

    if User.objects.filter(id=userid).exists():
        return True
    else:
        return False

def EmailExists(email):

    if User.objects.filter(email=email).exists():
        return True
    else:
        return False

def UserValidation(user):

    if user.is_anonymous:
        return False
    else:
        return True

def ProjectExists(pid):

    if Project.objects.filter(id=pid).exists():
        return True
    else:
        return False

def CommentExists(cid):

    if Comment.objects.filter(id=cid).exists():
        return True
    else:
        return False

def UserRole(user):
    return(user.groups.values_list('name',flat=True)[0])
