from rest_framework import serializers
from .models import User, SellerRequests, Categorie, Products, Favoris, Panier


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SellerRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerRequests
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie  
        fields = '__all__'    
        
class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
         model = Products
         fields = '__all__'

class FavSerializer(serializers.ModelSerializer):
    productId = ProductsSerializer(many=False, read_only=True)
 
    class Meta:
        model = Favoris 
        fields = '__all__'  


class PanierCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panier
        exclude = ['userId']  # Exclude userId from creation serializer

class PanierRetrievalSerializer(serializers.ModelSerializer):
    productId = ProductsSerializer()  # Include product data in retrieval serializer

    class Meta:
        model = Panier
        fields = '__all__'
