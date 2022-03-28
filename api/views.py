from multiprocessing import context
import re
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import GraphEntity, GraphFact
from .serializers import GraphEntitySerializer, GraphFactSerializer

# TODO: Read from wikidata if records aren't found and cache them in the DB.

# Graph Entities
@api_view(['GET', 'POST'])
def graphentity_list(request):
    if request.method == 'GET':
        data = GraphEntity.objects.all()
        serializer = GraphEntitySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = GraphEntitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def graphentity_detail(request, wikidataId):
    try:
        graphEntity = GraphEntity.objects.get(wikidataId=wikidataId)
    except GraphEntity.DoesNotExist as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        serializer = GraphEntitySerializer(graphEntity, data=request.data, context={'request': request})
        if serializer.is_valid():
            # If we're changing the Primary Key, delete the old record before saving the new one.
            # This may cause a race condition in a high-traffic production system, but it works for our use case.
            # TODO: Improve
            if wikidataId != request.data['wikidataId']:
                graphEntity.delete()

            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        graphEntity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Graph Facts
@api_view(['GET', 'POST'])
def graphfact_list(request):
    if request.method == 'GET':
        data = GraphFact.objects.all()
        serializer = GraphFactSerializer(data, context={'request': request}, many=True)
        print(serializer.data)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = GraphFactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def graphfact_detail(request, id):
    try:
        graphFact = GraphFact.objects.get(id=id)
    except GraphFact.DoesNotExist as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        serializer = GraphFactSerializer(graphFact, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        graphFact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)