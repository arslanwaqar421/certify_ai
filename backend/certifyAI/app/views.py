from .models import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import *
from .serializers import *
from .quiz_bot import *
from .utils import *
from django.http import FileResponse
import base64


class UserApis(APIView):
    def get(self,request,id):
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data,status=HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            data = request.data
            serializer = UserSerializer(data = data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"})
        except Exception as e:
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({"message" : "User deleted Successfuly"}, status=HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message":"User not found"}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)},status=HTTP_400_BAD_REQUEST)

class UserDetailsApis(APIView):
    def get(self,request,id):
        try:
            details = UserDetails.objects.get(user__id=id)
            serializer = UserDetialsSerializer(details)
            data = serializer.data
            data['email'] = details.user.email
            return Response(data,status=HTTP_200_OK)
        except UserDetails.DoesNotExist:
            return Response({'message': 'User not found'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            data = request.data
            print(data)
            serializer = UserDetialsSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"})
        except Exception as e:
            print(e)
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)

    def patch(self,request,id):
        try:
            data = request.data
            detail = UserDetails.objects.get(user__id=id)
            serializer = UserDetialsSerializer(instance=detail, data = data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(status=HTTP_204_NO_CONTENT)
            else:
                return Response({"message":"Invalid Jason"},status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)


class ThreadAPIs(APIView):
    def get(self,request,id):
        try:
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({"message": "User does not exist"}, status=HTTP_404_NOT_FOUND)

            threads = Thread.objects.filter(user = user)
            serializer = ThreadSerializer(threads, many=True)
            return Response(serializer.data,status=HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            serializer = ThreadSerializer(data= request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        try:
            thread = Thread.objects.get(id=id)
            thread.delete()
            return Response({"message":"Thread Deleted Successfully"}, status=HTTP_200_OK)
        except Thread.DoesNotExist:
            return Response({"message":"Thread not found"},status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

class MessageAPI(APIView):
    def get(self,request,id):
        try:
            try:
                thread = Thread.objects.get(id=id)
            except Thread.DoesNotExist:
                return Response({"message": "Thread does not exist"}, status=HTTP_404_NOT_FOUND)

            messages = Message.objects.filter(thread = thread)
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data,status=HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)},status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            serializer = MessageSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"},status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

class EducationAPIs(APIView):
    def get(self,request,id):
        try:
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({"message": "User does not exist"}, status=HTTP_404_NOT_FOUND)

            educations = Education.objects.filter(user = user).order_by('-end_year')
            serializer = EducationSerializer(educations, many=True)
            return Response(serializer.data,status = HTTP_200_OK)
        except Exception as e:
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            serializer = EducationSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"},status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message", str(e)}, status=HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        try:
            education = Education.objects.get(id=id)
            education.delete()
            return Response({"message":"Education deleted Successfully"}, status=HTTP_200_OK)
        except Education.DoesNotExist:
            return Response({"message":"Education with given id not found"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

class SkillSetAPIs(APIView):
    def get(self,request,id):
        try:
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({"message": "User does not exist"}, status=HTTP_404_NOT_FOUND)

            skills = Skillset.objects.filter(user = user)
            serializer = SkillsetSerializer(skills,many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({"message" : str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            serializer = SkillsetSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message":str(e)}, status=HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        try:
            skill = Skillset.objects.get(id=id)
            skill.delete()
            return Response({"message":"Skill deleted Successfully"}, status=HTTP_200_OK)
        except Skillset.DoesNotExist:
            return Response({"message":"Skill not found"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message":str(e)}, status=HTTP_400_BAD_REQUEST)

class CertificationAPIs(APIView):
    def get(self, request):
        try:
            certifications = Certification.objects.all()
            cert_arr = []

            for cert in certifications:
                with open(cert.image.path, 'rb') as f:
                    base64_bytes = base64.b64encode(f.read())
                    base64_encoded = base64_bytes.decode()
                    data = {
                        'id': cert.id,
                        'name': cert.name,
                        'image': base64_encoded,
                    }
                    cert_arr.append(data)

            return Response(cert_arr, status=HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            serializer = CertificationSerializer(data= request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_201_CREATED)
            else:
                return Response({"message":"Invalid Json"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

    def delete(self,request,id):
        try:
            certification = Certification.objects.get(id=id)
            certification.delete()
            return Response({"message":"Certification deleted Successsfully"}, status=HTTP_200_OK)
        except Certification.DoesNotExist:
            return Response({"message":"Certification not found"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message":str(e)}, status=HTTP_400_BAD_REQUEST)

class UserCertificationAPIs(APIView):
    def get(self,request,id):
        try:
            data = []
            try:
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return Response({"message": "User does not exist"}, status=HTTP_404_NOT_FOUND)
            user_cert = UserCertification.objects.filter(user=user)
            for cert in user_cert:
                cert_name = Certification.objects.get(id = cert.certification.id).name
                obj = {
                    'certification_name':cert_name,
                    'completion_date':cert.completion_date,
                    'user':cert.user.id
                }
                data.append(obj)
            return Response(data, status=HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status = HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            user = request.data.get('user')
            certification = request.data.get('certification')

            try:
                # Attempt to retrieve existing user certification
                userCertification = UserCertification.objects.get(user__id=user, certification__id=certification)
                # Check if certificate file exists and return it
                if os.path.exists(userCertification.certificate.path):
                    return FileResponse(open(userCertification.certificate.path, 'rb'), status=HTTP_200_OK)
                else:
                    return Response({"message": "Certificate file not found"}, status=HTTP_404_NOT_FOUND)

            except UserCertification.DoesNotExist:
                # If no existing certification, generate a new one
                username = UserDetails.objects.get(user__id=user).name
                cert_name = Certification.objects.get(id=certification).name
                certificate = generate_certificate(username, cert_name)
                data = {
                    'user': user,
                    'certification': certification,
                    'certificate': certificate
                }
                serializer = UserCertificationSerializer(data=data)

                if serializer.is_valid():
                    user_certificate = serializer.save()
                    certificate_path = user_certificate.certificate.path

                    # Check if the file exists before returning it
                    if os.path.exists(certificate_path):
                        return FileResponse(open(certificate_path, 'rb'), status=HTTP_201_CREATED)
                    else:
                        return Response({"message": "Certificate file not found"}, status=HTTP_404_NOT_FOUND)
                else:
                    return Response({"message": "Invalid JSON"}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

class QuizAPIs(APIView):
    def get(self,request,id):
        try:
            quiz = Quiz.objects.get(id=id)
            serializer = QuizSerializer(quiz)
            return Response(serializer.data, status=HTTP_200_OK)
        except Quiz.DoesNotExist:
            return Response({"message":"Quiz not found"}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)},status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            difficulty = request.data.get('difficulty')
            cert = request.data.get('certification')
            user = request.data.get('user')

            # Check if the certification exists
            try:
                certification_name = Certification.objects.get(id=cert).name
            except Certification.DoesNotExist:
                return Response({"message": "Certification not found"}, status=HTTP_400_BAD_REQUEST)

            # Retrieve existing quizzes
            quizzes = Quiz.objects.filter(user__id=user, certification__id=cert)

            if quizzes.exists():
                # Return existing quizzes
                serializer = QuizSerializer(quizzes, many=True)
                return Response(serializer.data, status=HTTP_200_OK)

            # If no existing quizzes, generate new ones
            client = get_openai_client()
            quizzes_data = generate_quizes_json(client, certification_name, difficulty)['quizzes']
            updated_quizzes = []

            for quiz in quizzes_data:
                data = {
                    'difficulty': difficulty,
                    'name': quiz['quiz_name'],
                    'details': quiz['details'],
                    'certification': cert,
                    'user': user
                }

                serializer = QuizSerializer(data=data)
                if serializer.is_valid():
                    saved_quiz = serializer.save()
                    quiz['id'] = saved_quiz.id
                    updated_quizzes.append(quiz)
                else:
                    return Response({"message": "Invalid JSON"}, status=HTTP_400_BAD_REQUEST)

            # Return the newly created quizzes with IDs
            return Response(updated_quizzes, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': str(e)}, status=HTTP_400_BAD_REQUEST)

    def patch(self,request,id):
        try:
            data = request.data
            quiz = Quiz.objects.get(id=id)
            serializer = QuizSerializer(instance=quiz, data = data, partial=True)
            if serializer.is_valid():
                serializer.save()
                if calculate_quiz_marks(id):
                    return Response(serializer.data, status=HTTP_200_OK)
                else:
                    return Response({'message' : 'Failed to calculate score'})
            else:
                return Response({'message':'Invalid Json' }, status = HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message':str(e)}, status = HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            quiz = Quiz.objects.get(id=id)
            quiz.delete()
            return Response({'detail': 'Quiz deleted successfully.'}, status=HTTP_200_OK)

        except Quiz.DoesNotExist:
            return Response({'detail': 'Quiz not found.'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)



class QuizList(APIView):
    def get(self,request,cid,uid):
        try:
            quizes = Quiz.objects.filter(certification__id = cid, user__id=uid)
            serializer = QuizSerializer(quizes ,many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Quiz.DoesNotExist:
            return Response({"message":"Quiz not found"}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)},status=HTTP_400_BAD_REQUEST)

class QuestionAPI(APIView):
    def get(self,request,id):
        try:
            try:
                quiz = Quiz.objects.get(id=id)
            except Quiz.DoesNotExist:
                return Response({"message": "Quiz does not exist"}, status=HTTP_404_NOT_FOUND)

            questions = Question.objects.filter(quiz=quiz)
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status = HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self,request):
        try:
            quizzes= request.data.get('quizzes')
            for quiz in quizzes:
                for question in quiz['questions']:
                    choices = f"{question['options']['option1']}`{question['options']['option2']}`{question['options']['option3']}`{question['options']['option4']}"
                    data = {
                        'quiz' : quiz['id'],
                        'statement': question['question'],
                        'choices' : choices,
                        'correct_option' : question['correct_option']
                    }
                    serializer = QuestionSerializer(data = data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response({"message":"Invalid Json"}, status=HTTP_400_BAD_REQUEST)
            return Response({'message':"Questions Created"},status=HTTP_201_CREATED)
        except Exception as e:
            return Response({"message":str(e)}, status=HTTP_400_BAD_REQUEST)

    def patch(self,request,id):
        try:
            data = request.data
            question = Question.objects.get(id=id)
            serializer = QuestionSerializer(instance=question, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=HTTP_200_OK)
            else:
                return Response({"message" : "Invalid Json"} , status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def send_certificate(request, id):
    try:
        certificate = UserCertification.objects.get(id=id).certificate.path
        return FileResponse({"file":open(certificate ,'rb')}, status=HTTP_200_OK)
    except Exception as e:
        return Response({"message": str(e)}, status= HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.get(email=email)
        if user:
            if user.password == password:
                return Response({"id": user.id, "email" : user.email}, status = HTTP_200_OK)
            else:
                return Response({"message":"Incorrect Password"}, status= HTTP_400_BAD_REQUEST)
        else:
            return Response({"message":"No user with such email"}, status=HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"message": str(e)},status=HTTP_400_BAD_REQUEST)

# functions

def calculate_quiz_marks(id):
    try:
        score = 0
        questions = Question.objects.filter(quiz__id=id)
        quiz = Quiz.objects.get(id=id)
        for question in questions:
            if question.correct_option == question.user_option:
                score += 1

        serializer = QuizSerializer(instance=quiz, data={'score': score}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return True
        return False
    except Exception:
        return False
