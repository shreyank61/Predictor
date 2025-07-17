from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.tokenauthentication import JWTAuthentication
from .serializers import UserSerializer,LoginSerializer
from rest_framework import status
from rest_framework.views import APIView
import pickle
import numpy as np
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import HeartDiseaseInputSerializer





@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data , status= 201)
    else:
        return Response(serializer.errors,status=400)
    
@api_view(['Post'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        token = JWTAuthentication.generate_token(payload=serializer.data)
        return Response({
            'message' : "Login Successfull",
            'token' : token,
            'user' : serializer.data
        }, status= status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)










@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_diabetictype(request):
    """
    Predicts diabetic type based on input health parameters.
    Only accessible to authenticated users.
    """
    try:
        # Extract input fields from request
        required_fields = ['age', 'bs_fast', 'bs_pp', 'plasma_r', 'plasma_f', 'hbA1c']
        inputs = [request.data.get(field) for field in required_fields]

        # Validate all fields are present
        if None in inputs:
            return Response({
                'Error': '1',
                'Message': 'Rendering Failed. Missing Parameters'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Convert inputs to float
        try:
            features = list(map(float, inputs))
        except ValueError:
            return Response({
                'Error': '1',
                'Message': 'Invalid input type. Please enter numeric values.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Load ML model and make prediction
        model_path = 'my_models/model.pkl'
        classifier = pickle.load(open(model_path, 'rb'))
        prediction = classifier.predict([features])[0]
        confidence = np.max(classifier.predict_proba([features])) * 100

        return Response({
            'Error': '0',
            'Message': 'Prediction successful.',
            'Prediction': prediction,
            'Confidence Score': f'{confidence:.2f}%'
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'Error': '2',
            'Message': f'Server Error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    





# Load the saved model once
with open('heart_model/heart_advanced_model.pkl', 'rb') as f:
    heart_model = pickle.load(f)

@api_view(['POST'])
def predict_heart_disease(request):
    serializer = HeartDiseaseInputSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        features = np.array([[
            data['age'], data['sex'], data['cp'], data['trestbps'], data['chol'],
            data['fbs'], data['restecg'], data['thalach'], data['exang'],
            data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]])
        prediction = heart_model.predict(features)[0]
        probability = heart_model.predict_proba(features)[0][1]

        return Response({
            'prediction': int(prediction),
            'confidence': f"{probability * 100:.2f}%",
            'result': "💓 Risk of Heart Disease" if prediction == 1 else "✅ No Risk Detected"
        })
    return Response(serializer.errors, status=400)

