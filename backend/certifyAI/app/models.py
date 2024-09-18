from django.db import models
from datetime import date

# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=16)

    def __str__(self):
        return self.email

class UserDetails(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    mobile = models.CharField(max_length=11)
    address = models.CharField(max_length=100)
    role = models.CharField(max_length=30)

    def __str__(self):
        return self.user.email

class Thread(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = False, blank=False)
    thread_id = models.CharField(unique=True) #gpt id
    creation_timestamp = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.thread_id

class Message(models.Model):
    MESSAGE_TYPE = [
        ('user','User'),
        ('bot', 'Bot')
    ]
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    content = models.TextField()
    type = models.CharField(choices=MESSAGE_TYPE)
    creation_timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.content} \n {self.thread}'

class Skillset(models.Model):
    PROFICIENCY=[
        ('beginner' , 'Beginner'),
        ('intermediate', 'Intemediate'),
        ('expert', 'Expert')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    proficiency_level = models.CharField(choices=PROFICIENCY)

    def __str__(self):
        return f'{self.name} \n {self.user}'

class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    institute_name = models.CharField(max_length=70)
    degree = models.CharField(max_length=100)
    end_year = models.CharField(max_length=4)

    def __str__(self):
        return f'{self.degree} \n {self.user}'

class Certification(models.Model):
    name = models.CharField(max_length=70, unique=True)
    image = models.ImageField(upload_to='certification/', null= True)

    def __str__(self):
        return f'{self.name}'

class UserCertification(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    certification = models.ForeignKey(Certification,on_delete=models.CASCADE)
    certificate = models.ImageField(upload_to='certificates/', null=True)
    completion_date = models.DateField(default=date.today)

    class Meta:
        unique_together = ('user', 'certification')

    def __str__(self) -> str:
        return self.certification.name

class Quiz(models.Model):
    certification = models.ForeignKey(Certification,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    marks_obt = models.DecimalField(default=0, decimal_places=2,max_digits=4)
    name = models.CharField(default="")
    details = models.CharField(default="")
    difficulty = models.CharField(default="")
    status = models.CharField(default='notattempted')
    score = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.certification} \n {self.marks_obt}'


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete= models.CASCADE)
    statement = models.TextField()
    choices = models.TextField()
    user_option = models.TextField(default='')
    correct_option = models.TextField()

    def __str__(self):
        return f'{self.statement}'