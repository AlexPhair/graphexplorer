from multiprocessing import context
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q

from api.wikidata_helper import WikidataHelper     

from .models import GraphEntity, GraphFact
from .serializers import GraphEntitySerializer, GraphFactSerializer, RegisterSerializer
from .permissions import UserPermissions

# Auth
class AuthRegister(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class VerifyAuthTokenPermissions(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UserPermissions,)

    def post(self, request, *args, **kwargs):
        is_authenticated = IsAuthenticated.has_permission(self, request, self)
        is_admin = IsAdminUser.has_permission(self, request, self)

        payload = {
            'is_authenticated': is_authenticated,
            'is_admin': is_admin
        }

        return Response(payload)

class GraphEntityList(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UserPermissions,)

    def get(self, request, *args, **kwargs):
        if 'query' in request.GET:
            query = request.GET['query']

            wikidataEntities = WikidataHelper.queryWikidataEntities(query)
            for wikidataEntity in wikidataEntities:
                if GraphEntity.objects.filter(wikidataId=wikidataEntity['wikidataId']).exists():
                    continue

                newEntity = GraphEntity(wikidataEntity['wikidataId'], wikidataEntity['label'])
                newEntity.save()

            data = GraphEntity.objects.filter(Q(wikidataId__contains=query) | Q(label__contains=query))
        else:
            data = GraphEntity.objects.all()

        serializer = GraphEntitySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = GraphEntitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GraphEntityDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UserPermissions,)

    def get(self, request, *args, **kwargs):
        try:
            graphEntity = GraphEntity.objects.get(wikidataId=args[0])
        except GraphFact.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        serializer = GraphEntitySerializer(graphEntity, context={'request': request})
        return Response(serializer.data)


    def put(self, request, *args, **kwargs):
        try:
            graphEntity = GraphEntity.objects.get(wikidataId=args[0])
        except GraphEntity.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        serializer = GraphEntitySerializer(graphEntity, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            graphEntity = GraphEntity.objects.get(wikidataId=args[0])
        except GraphEntity.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        graphEntity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GraphFactList(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        data = GraphFact.objects.all()
        serializer = GraphFactSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = GraphFactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GraphFactDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            graphFacts = GraphFact.objects.filter(Q(leftEntity = args[0]) | Q(property = args[0]) | Q(rightEntity = args[0]))
        except GraphFact.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        serializer = GraphFactSerializer(graphFacts, context={'request': request}, many=True)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        try:
            graphFact = GraphFact.objects.get(id=args[0])
        except GraphFact.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    
        serializer = GraphFactSerializer(graphFact, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            graphFact = GraphFact.objects.get(id=args[0])
        except GraphFact.DoesNotExist as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

        graphFact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
