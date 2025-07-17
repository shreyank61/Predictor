from django.urls import path
from . import views
urlpatterns = [
    path('register/', views.register_user,name='register'),
    path('login/', views.login,name='login'),
    path('predict/', views.predict_diabetictype),
    path('heart-predict/', views.predict_heart_disease),

]