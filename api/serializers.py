from rest_framework import serializers
from .models import GraphEntity, GraphFact

class GraphEntitySerializer(serializers.ModelSerializer):

    class Meta:
        model = GraphEntity
        fields = ('wikidataId', 'label')


class GraphFactSerializer(serializers.ModelSerializer):

    class Meta:
        model = GraphFact
        fields = ('id', 'leftEntity', 'property', 'rightEntity')