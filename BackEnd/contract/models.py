from django.db import models

# Create your models here.

class Contract(models.Model):
    user = models.ForeignKey('auth.User',on_delete=models.SET_NULL,null=True,related_name='contracts')
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=50,blank=True,null=True)
    email = models.EmailField(blank=True,null=True)
    country = models.CharField(max_length=50,blank=True,null=True)
    city = models.CharField(max_length=50,blank=True,null=True)
    birthDate = models.DateField(blank=True,null=True)
    contractStartDate = models.DateField(blank=True,null=True)
    contractEndDate = models.DateField(blank=True,null=True)
    status = models.BooleanField(default=False)