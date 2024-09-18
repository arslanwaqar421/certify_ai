from django.urls import include, path
from .views import *


urlpatterns = [
    path('users', UserApis.as_view()),
    path('users/<int:id>', UserApis.as_view()),
    path('users/<int:id>/details', UserDetailsApis.as_view()), # get user details
    path('details', UserDetailsApis.as_view()), # create user detials
    path('details/<int:id>', UserDetailsApis.as_view()), # update user details
    path('threads',ThreadAPIs.as_view()),# get all threads of the current user
    path('threads/<int:id>',ThreadAPIs.as_view()), # delete all threads when user is deleted
    path('threads/<int:id>/messages',MessageAPI.as_view()), # ask if user id needed to pass
    path('messages',MessageAPI.as_view()), # create message
    path('educations',EducationAPIs.as_view()),
    path('educations/<int:id>', EducationAPIs.as_view()),
    path('users/<int:id>/educations',EducationAPIs.as_view()),
    path('educations/<int:id>',EducationAPIs.as_view()),
    path('users/<int:id>/skillsets',SkillSetAPIs.as_view()), # get all skills of user
    path('skillsets/<int:id>', SkillSetAPIs.as_view()),
    path('skillsets',SkillSetAPIs.as_view()),
    path('certifications', CertificationAPIs.as_view()), # get all certifications post
    path('certifications/<int:id>', CertificationAPIs.as_view()),
    path('users/<int:id>/usercertifications', UserCertificationAPIs.as_view()), # get user certifications
    path('usercertifications', UserCertificationAPIs.as_view()), # create usercertification
    path('users/<int:uid>/certifications/<int:cid>/quizes', QuizList.as_view()), # get qquizes of a specific certification
    path('usercertifications/<int:id>', send_certificate, name="send_certificate"),
    path('quizes', QuizAPIs.as_view()), # create a quiz
    path('quizes/<int:id>', QuizAPIs.as_view()), # get a quiz or delete quiz
    path('quizes/<int:id>/questions', QuestionAPI.as_view()), # get all questions of a quiz
    path('questions',QuestionAPI.as_view()),#create a question
    path('questions/<int:id>', QuestionAPI.as_view()), # PATCH questions
    path('login', login)
]
