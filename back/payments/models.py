from django.db import models
from api.models import Products, User


class Commande(models.Model):
    userId = models.ForeignKey(User, on_delete= models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.userId)


class CommandeDetails(models.Model):
    commandeId = models.ForeignKey(Commande, on_delete= models.CASCADE, null=True, blank=True)
    productId = models.ForeignKey(Products, on_delete= models.CASCADE)
    quantite = models.IntegerField(default=1)
    prix = models.FloatField(default=0)
    size = models.CharField(max_length=100)
    paymentId = models.CharField(max_length=200)

    def __str__(self):
        return str(self.userId)