from django.db import models

# Create your models here.
class GraphEntity(models.Model):
    wikidataId = models.CharField("Wikidata Id", max_length=255, primary_key=True)
    label = models.CharField("Label", max_length=255)
    # type? TODO: Check whether this would make life easier

    def __str__(self) -> str:
        return f"{self.wikidataId}: {self.label}"

class GraphFact(models.Model):
    leftEntity = models.ForeignKey(GraphEntity, on_delete=models.CASCADE, related_name='left_entity')
    property = models.ForeignKey(GraphEntity, on_delete=models.CASCADE, related_name='property')
    rightEntity = models.ForeignKey(GraphEntity, on_delete=models.CASCADE, related_name='right_entity')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['leftEntity', 'property', 'rightEntity'], name='factConstraint')
        ]
    
    def __str__(self) -> str:
        return f"[{self.leftEntity}] [{self.property}] [{self.rightEntity}]"