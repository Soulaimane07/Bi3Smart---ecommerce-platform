from django.urls import path
from .views import CreateCheckoutSessionView, stripe_webhook
from . import views

urlpatterns = [
    path('checkout/', CreateCheckoutSessionView.as_view()),
    path('webhook/', stripe_webhook),
    path('commandes/', views.CommandesReqq.as_view(), name='commandes-by-user'),
    path('commandes/<int:userId>/', views.CommandesReq.as_view(), name='commandes-by-user'),
    path('commandesdetails/<int:commandeId>/', views.CommandesDetailsReq.as_view()),
]

# acct_1PC4svCTx4GzaOVo
# whsec_4236b7c3d758f5cdc8611adfb9baca3e1b76afa8bcb809bf124da271ee3126e9