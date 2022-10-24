from contract.api.ContractView import ContractViewSet
from contract.api.LoginView import LoginView, RegisterNewUser
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('crud', ContractViewSet, basename='contract')
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterNewUser.as_view(), name='rigster'),
    
    path('', include(router.urls)),
]
   