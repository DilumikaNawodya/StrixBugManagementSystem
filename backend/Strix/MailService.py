from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from .models import *
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

class EmailSend():

    def send_mail(self,context, to_email, from_email=None):

        subject = "Password Verification"
        subject = ''.join(subject.splitlines())

        body = 'http://localhost:3000/passconfirmation/'+ context['uid'] +'/'+ context['token'] +'/'

        html_content = render_to_string('email_template.html', {'content': body})
        text_content = strip_tags(html_content)

        email_message = EmailMultiAlternatives(
            subject, 
            text_content, 
            settings.EMAIL_HOST_USER, 
            [to_email]
        )
        email_message.attach_alternative(html_content, 'text/html')
        email_message.send()

        return True

    def send(self,request,email,token_generator):

        if User.objects.filter(email=email.lower()).exists():
            user = User.objects.get(email=email.lower())
            user_email = User.objects.get(email=email.lower()).email
        else:
            return False

        context = {
            'email': user_email,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': token_generator.make_token(user),
        }

        return(EmailSend.send_mail(self,context,user_email))
