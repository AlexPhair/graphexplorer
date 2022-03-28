# Generated by Django 4.0.3 on 2022-03-24 15:20

from django.db import migrations
from api.models import GraphEntity, GraphFact
def populate_graph_entities_facts(apps, schema_editor):
    leftEntity = GraphEntity("Q42", "Douglas Adams")
    leftEntity.save()

    property = GraphEntity("P106", "occupation")
    property.save()

    rightEntity = GraphEntity("Q214917", "playwright")
    rightEntity.save()

    GraphFact(leftEntity=leftEntity, property=property, rightEntity=rightEntity).save()

    # TODO: Make a few more seeds

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_graph_entities_facts),
    ]