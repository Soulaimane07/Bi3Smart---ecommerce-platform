from django.http import JsonResponse
from django.shortcuts import redirect
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import stripe
from rest_framework.views import APIView
from .models import Commande

stripe.api_key = 'test'

class CreateCheckoutSessionView(APIView):
    def post(self, request):
        try:
            products_data = request.data
            print(products_data)
            
            line_items = []
            for product_data in products_data:
                line_item = {
                    'price_data': {
                        'currency': 'usd',  # Adjust currency as needed
                        'unit_amount':  product_data['prix'] * 100,  # Convert price to cents
                        'product_data': {
                            'name': product_data['productId']['titre'],
                            # 'images': ['http://127.0.0.1:8000/api/files/products/dark_R2iqUaz.jpg'],
                        },
                    },
                    'quantity': product_data['quantite'],
                }
                line_items.append(line_item)

            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items= line_items,
                mode='payment',
                success_url='http://localhost:3000/profile',
                cancel_url='http://localhost:3000/panier',
            )

            return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        


class StripeWebhookView(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.headers['Stripe-Signature']
        event = None

        print('Created')

        # try:
        #     event = stripe.Webhook.construct_event(
        #         payload, sig_header, stripe_webhook_secret
        #     )
        # except ValueError as e:
        #     return JsonResponse({'error': 'Invalid payload'}, status=400)
        # except stripe.error.SignatureVerificationError as e:
        #     return JsonResponse({'error': 'Invalid signature'}, status=400)

        # # Handle the event
        # if event['type'] == 'checkout.session.completed':
        #     session = event['data']['object']
        #     session_id = session['id']
        #     # Fetch session data from Stripe
        #     session_data = stripe.checkout.Session.retrieve(session_id)
        #     # Extract payment information
        #     amount = session_data['amount_total'] / 100
        #     product_name = session_data['display_items'][0]['custom']['name']
        #     quantity = session_data['display_items'][0]['quantity']

        #     commande = Commande.objects.create(
        #         userId = 4,
        #         productId = 1,
        #         quantite = quantity,
        #         prix = amount,
        #         size = "ll",
        #         payment = session_id
        #     )
        #     return JsonResponse({'message': 'Webhook received successfully'}, status=200)
        # else:
        #     return JsonResponse({'error': 'Unexpected event type'}, status=400)