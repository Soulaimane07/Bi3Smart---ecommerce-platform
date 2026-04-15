from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
from rest_framework.views import APIView
from .models import Commande, CommandeDetails
from api.models import User, Products
from rest_framework import generics, status
from .serializers import CommandeSerializer, CommandeDetailsSerializer
from rest_framework.response import Response


stripe.api_key = 'test'

class CreateCheckoutSessionView(APIView):
    def post(self, request):
        try:
            products_data = request.data
            
            line_items = []
            for product_data in products_data:
                line_item = {
                    'price_data': {
                        'currency': 'usd',  # Adjust currency as needed
                        'unit_amount':  product_data['prix'] * 100,  # Convert price to cents
                        'product_data': {
                            'name': product_data['productId']['titre'],
                            'images': ['http://127.0.0.1:8000/api/files/products/dark_R2iqUaz.jpg'],
                        },
                    },
                    'quantity': product_data['quantite'],
                }
                line_items.append(line_item)

            session = stripe.checkout.Session.create(
                payment_method_types=['card', 'paypal'],
                line_items= line_items,
                mode='payment',
                success_url='http://localhost:3000/profile',
                cancel_url='http://localhost:3000/panier',
                client_reference_id = products_data[0]['userId']
            )


            if session:
                user_instance = User.objects.get(id=products_data[0]['userId'])
                Commande.objects.create(userId=user_instance)

                return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        


@csrf_exempt
def stripe_webhook(request):
    endpoint_secret = 'whsec_4236b7c3d758f5cdc8611adfb9baca3e1b76afa8bcb809bf124da271ee3126e9'
    payload = request.body
    sig_header = request.headers.get('stripe-signature')
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        line_items = stripe.checkout.Session.list_line_items(session['id'])

        try:
            user_id = session.get('client_reference_id')
            commande = Commande.objects.filter(userId=user_id).latest('id')
        except Commande.DoesNotExist:
            return JsonResponse({'error': 'No commande found for the provided user ID'}, status=400)

        # Create CommandeDetails instances for each line item
        for item in line_items['data']:
            product = Products.objects.get(titre=item['description'])

            CommandeDetails.objects.create(
                commandeId=commande,  # Associate CommandeDetails with the Commande instance
                productId=product,  # Update productId as needed
                quantite=item['quantity'],
                prix=session['amount_total'] / 100,
                size="1",
                paymentId=session['id']
            )

        return JsonResponse({'message': 'Webhook received successfully'}, status=200)


    else:
        return JsonResponse({'error': 'Unexpected event type'}, status=400)
    

class CommandesReqq(generics.ListAPIView):
    serializer_class = CommandeSerializer

    def get_queryset(self):
        return Commande.objects.all() 



class CommandesReq(generics.ListAPIView):
    serializer_class = CommandeDetailsSerializer


    def get_queryset(self):
        user_id = self.kwargs.get('userId')

        if user_id is not None:
            commande_details = CommandeDetails.objects.filter(commandeId__userId=user_id)
            return commande_details
        else:
            return CommandeDetails.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class CommandesDetailsReq(generics.ListCreateAPIView):
    serializer_class = CommandeDetailsSerializer

    def get_queryset(self):
        commandeId = self.kwargs.get('commandeId')

        if commandeId is not None:
            return CommandeDetails.objects.filter(commandeId=commandeId)
        else:
            return CommandeDetails.objects.all()
