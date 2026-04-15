from django.shortcuts import render
from rest_framework import generics, status
from .serializers import PanierCreationSerializer, PanierRetrievalSerializer, UserSerializer, SellerRequestsSerializer, CategorieSerializer, ProductsSerializer, FavSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import User, SellerRequests ,Categorie, Products, Favoris, Panier
from django.db.models import Q
import google.generativeai as genai



class UserListCreate(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format=None):
        email = request.data.get("email") 
        fname = request.data.get("fname") 
        lname = request.data.get("lname") 
        password = request.data.get("password") 
        role = request.data.get("role", "client") 

        if email and fname and lname and password :
            try:
                user = User.objects.create(
                    email=email,
                    fname=fname,
                    lname=lname,
                    password=password,
                    role=role
                )
                serializer = UserSerializer(user) 
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response("User not created", status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("Parameters missing", status=status.HTTP_400_BAD_REQUEST)      


class UserRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"


class UserLogin(APIView):
    def post(self, request, format=None):
        email = request.data.get("email", "") 
        
        if email:
            try:
                user = User.objects.get(email=email) 
                userSerializer = UserSerializer(user)
                serializer_data = userSerializer.data

                if user.role == "client" :
                    try:
                        isRequested = SellerRequests.objects.get(userId=user.id)
                        requestSerializer = SellerRequestsSerializer(isRequested)

                        if requestSerializer.data['id']:
                            serializer_data['isRequested'] = 1
                        else:
                            serializer_data['isRequested'] = 0
                    except SellerRequests.DoesNotExist:
                        serializer_data['isRequested'] = 0

                return Response(serializer_data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response( status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("Email parameter missing", status=status.HTTP_400_BAD_REQUEST)
        




class SellerRequestsList(generics.ListCreateAPIView):
    queryset = SellerRequests.objects.all()
    serializer_class = SellerRequestsSerializer


class SellerRequestsPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = SellerRequests.objects.all()
    serializer_class = SellerRequestsSerializer
    lookup_field = "pk"





class CategorieReq(generics.ListCreateAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer 


class CategorieReqPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    lookup_field = "pk"    


class CategorieReqTitle(generics.ListAPIView):
    serializer_class = CategorieSerializer

    def get(self, request, *args, **kwargs):
        title = kwargs.get('title')
        
        if title is not None:
            categorie = Categorie.objects.filter(titre__iexact=title).first()
            if categorie:
                categorieSerializer = CategorieSerializer(categorie)
                return Response(categorieSerializer.data, status=status.HTTP_200_OK)
            else:
                return Response("Categorie not found", status=status.HTTP_404_NOT_FOUND)
        else:
            categories = Categorie.objects.all()
            serializer = self.get_serializer(categories, many=True)
            return Response(serializer.data)




class ProductsReq(generics.ListAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self):
        id = self.kwargs.get('id')
        if id is not None:
            return Products.objects.filter(categorie=id)
        else:
            return Products.objects.all()


class ProductsReq1(generics.ListCreateAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self):
        return Products.objects.all()


class ProductsReqPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = "pk"
    

def getproductby(self, request, format=None):
    categorie = request.data.get("categorie", "") 
    print(categorie)

    products = Products.objects.all()
    serializer = ProductsSerializer(products) 
    return Response(serializer.data, status=status.HTTP_201_CREATED)


class Search(generics.ListCreateAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self):
        search_term = self.kwargs.get('searchTerm')
        if not search_term:
            return Products.objects.none()

        api_key = 'test'
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        chat = model.start_chat(history=[])

        
        productslist = Products.objects.all()
        
        instructions= 'i want the answer to be only from this list and just one  : ', productslist
        instructions2='  i want the response '
        condition ='this :%20 means space '
        
        response = chat.send_message(condition + str(instructions)   + search_term )
        print(response.text)
        return Products.objects.filter(titre__icontains=response.text )  
        

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class Productbyidseller(generics.ListAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self):
        sellerid = self.kwargs.get('sellerid')
        if sellerid is not None:
            return Products.objects.filter(seller=sellerid)
        else:
            return Products.objects.all()
        



class getFav(generics.ListCreateAPIView):
    serializer_class = FavSerializer

    def get_queryset(self):
        userid = self.kwargs.get('userid')
        if userid is not None:
            return Favoris.objects.filter(userId=userid)
        else:
            return Favoris.objects.all()

    def post(self, request, format=None):
        userId = request.data.get("userId", "") 
        productId = request.data.get("productId", "") 

        favorit = Favoris.objects.filter(productId=productId, userId=userId).first()

        if favorit:  
            favoritsSerializer = FavSerializer(favorit)
            return Response(favoritsSerializer.data, status=status.HTTP_200_OK)
        else:
            product = Products.objects.get(id=productId)
            user = User.objects.get(id=userId)

            favoris = Favoris.objects.create(
                userId=user,
                productId=product,
            )

            if favoris:
                product.fav += 1
                product.save()

                productSerializer = ProductsSerializer(product)
                return Response(productSerializer.data, status=status.HTTP_200_OK)

        
class removeFav(generics.ListCreateAPIView):
    serializer_class = FavSerializer
    
    def post(self, request, format=None):
        userId = request.data.get("userId", "") 
        productId = request.data.get("productId", "") 

        favorit = Favoris.objects.filter(productId=productId, userId=userId).first()
        product = Products.objects.get(id=productId)


        if favorit and product:  
            favorit.delete()
            product.fav -= 1
            product.save()

            return Response(status=status.HTTP_204_NO_CONTENT) 
        

class getFavPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favoris.objects.all()
    serializer_class = FavSerializer
    lookup_field = "pk"




class PanierReq(generics.ListCreateAPIView):
    queryset = Panier.objects.all()
    serializer_class = PanierRetrievalSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST': 
            return PanierCreationSerializer
        return PanierRetrievalSerializer

    def list(self, request, *args, **kwargs):
        userid = self.kwargs.get('userid')
        if userid is not None:
            paniers = Panier.objects.filter(userId=userid)
            serializer = PanierRetrievalSerializer(paniers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        user_id = self.request.data.get("userId")
        user = User.objects.get(pk=user_id)
        serializer.save(userId=user)

class PanierReqPk(generics.RetrieveUpdateDestroyAPIView):
    queryset = Panier.objects.all()
    serializer_class = PanierRetrievalSerializer
    lookup_field = "pk"