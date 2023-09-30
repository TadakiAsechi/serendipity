from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def send_answer(request):
    print(request)
    return Response({"message": "Hello, world!"}) 