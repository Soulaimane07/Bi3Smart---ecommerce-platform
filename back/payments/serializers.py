from rest_framework import serializers
from .models import Commande, CommandeDetails
from api.serializers import ProductsSerializer


class CommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = '__all__'

class CommandeDetailsSerializer(serializers.ModelSerializer):
    productId = ProductsSerializer(many=False, read_only=True)
    commandeId = CommandeSerializer(many=False, read_only=True)

    class Meta:
        model = CommandeDetails
        fields = '__all__'