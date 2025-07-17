from rest_framework import serializers
from .models import UserManager,User
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
import pickle
import numpy as np

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)


    def create(self,validated_data):
        user = get_user_model().objects.create_user(
            email = validated_data['email'],
            password= validated_data['password'],
            first_name = validated_data.get('first_name',""),
            last_name = validated_data.get('last_name',"")
        )
        return user
    class Meta:
        model = get_user_model()
        fields = ['email','password','first_name','last_name']
        extra_kwargs = {'password': {'write_only' : True}}

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    id = serializers.CharField(max_length = 15,read_only = True)
    password = serializers.CharField(max_length = 255,write_only = True)


    def validate(self,data):
        email = data.get('email',None)
        password = data.get('password',None)
        
    
        if email is None :
            raise serializers.ValidationError("An email address is required for login")
        if password is None:
            raise serializers.ValidationError("password required for the login")
        user = authenticate(username=email,password=password)

        if user is None:
            raise serializers.ValidationError("" 
            "Invalid email or password")
        if not user.is_active:
            raise serializers.ValidationError( 
            "No active  user")
        
        return {
            'email' : user.email,
            'id' : user.id
        }
    





class MainPageSerializer(serializers.Serializer):

    def validate_data(self):
        age = self.validated_data['age']
        bs_fast = self.validated_data['bs_fast']
        bs_pp = self.validated_data['bs_pp']
        plasma_r = self.validated_data['plasma_r']
        plasma_f = self.validated_data['plasma_f']
        hbA1c = self.validated_data['hbA1c']

        age = float(age)
        bs_fast = float(bs_fast)
        bs_pp = float(bs_pp)
        plasma_r = float(plasma_r)
        plasma_f = float(plasma_f)
        hbA1c = float(hbA1c)

        result = [age,bs_fast,bs_pp,plasma_r,plasma_f,hbA1c]
        """Passing data to model & loading the model from disks"""
        model_path = './my_models/model.pkl'
        classifier = pickle.load(open(model_path, 'rb'))
        prediction = classifier.predict([result])[0]
        conf_score = np.max(classifier.predict_proba([result]))*100



class HeartDiseaseInputSerializer(serializers.Serializer):
    age = serializers.FloatField()
    sex = serializers.IntegerField()
    cp = serializers.IntegerField()
    trestbps = serializers.FloatField()
    chol = serializers.FloatField()
    fbs = serializers.IntegerField()
    restecg = serializers.IntegerField()
    thalach = serializers.FloatField()
    exang = serializers.IntegerField()
    oldpeak = serializers.FloatField()
    slope = serializers.IntegerField()
    ca = serializers.IntegerField()
    thal = serializers.IntegerField()


        
        
