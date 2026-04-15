from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('seller', 'Seller'),
    ]

    email = models.CharField(max_length=100, unique=True)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='client')

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    
class SellerRequests(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField()

    def __str__(self):
        return self.userId
    
    
class Categorie(models.Model):
    titre = models.CharField(max_length=100,unique=True)
    image = models.ImageField(upload_to="api/files/categories/", blank=True, null=True)

    def __str__(self):
        return self.titre 

class Products(models.Model):
    titre = models.CharField(max_length=100)
    prix = models.FloatField()
    image = models.ImageField(upload_to="api/files/products/", blank=True, null=True)
    categorie = models.ForeignKey(Categorie, on_delete= models.CASCADE)
    seller = models.ForeignKey(User, on_delete= models.CASCADE,default=0)
    fav = models.IntegerField(default=0)

    def __str__(self):
        return self.titre
    
class Favoris(models.Model):
    userId = models.ForeignKey(User, on_delete= models.CASCADE)
    productId = models.ForeignKey(Products, related_name='product', on_delete= models.CASCADE)

    def __str__(self):
        return self.userId
    




class Panier(models.Model):
    userId = models.ForeignKey(User, on_delete= models.CASCADE, null=True, blank=True)
    productId = models.ForeignKey(Products, on_delete= models.CASCADE)
    quantite = models.IntegerField(default=1)
    prix = models.FloatField(default=0)
    size = models.CharField(max_length=100)

    def __str__(self):
        return self.userId