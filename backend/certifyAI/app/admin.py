from django.contrib import admin
from .models import * # Import your User model

# Register your model here
admin.site.register(User)
admin.site.register(Thread)
admin.site.register(Message)
admin.site.register(Skillset)
admin.site.register(Education)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(UserDetails)
admin.site.register(UserCertification)
admin.site.register(Certification)
